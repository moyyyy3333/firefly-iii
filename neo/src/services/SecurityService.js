import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import NetInfo from '@react-native-community/netinfo';
import { Platform } from 'react-native';

const PATROL_LOG_KEY = 'neo_patrol_log';
const SETTINGS_KEY = 'neo_settings';

// Permissions classified by risk tier
const PERMISSION_TIERS = {
  safe: [
    'android.permission.INTERNET',
    'android.permission.ACCESS_NETWORK_STATE',
    'android.permission.VIBRATE',
    'android.permission.RECEIVE_BOOT_COMPLETED',
    'android.permission.FOREGROUND_SERVICE',
  ],
  warning: [
    'android.permission.CAMERA',
    'android.permission.RECORD_AUDIO',
    'android.permission.READ_EXTERNAL_STORAGE',
    'android.permission.WRITE_EXTERNAL_STORAGE',
    'android.permission.ACCESS_FINE_LOCATION',
    'android.permission.ACCESS_COARSE_LOCATION',
    'android.permission.READ_CONTACTS',
    'android.permission.WRITE_CONTACTS',
    'android.permission.READ_CALL_LOG',
    'android.permission.PROCESS_OUTGOING_CALLS',
  ],
  tracking: [
    'android.permission.READ_PHONE_STATE',
    'android.permission.SEND_SMS',
    'android.permission.RECEIVE_SMS',
    'android.permission.READ_SMS',
    'com.google.android.gms.permission.AD_ID',
    'android.permission.GET_ACCOUNTS',
    'android.permission.USE_BIOMETRIC',
    'android.permission.PACKAGE_USAGE_STATS',
  ],
};

// Known malicious URL patterns
const MALICIOUS_PATTERNS = [
  /bit\.ly\/[a-zA-Z0-9]{6,}/,
  /tinyurl\.com\//,
  /free.*prize/i,
  /you.*won/i,
  /verify.*account/i,
  /urgent.*action/i,
  /click.*here.*now/i,
  /login.*verify/i,
  /confirm.*payment/i,
  /suspicious.*activity/i,
  /account.*suspended/i,
  /unusual.*sign.*in/i,
];

const PHISHING_KEYWORDS = [
  'paypa1', 'paypall', 'g00gle', 'micros0ft', 'amaz0n',
  'faceb00k', 'inst4gram', 'app1e-id', 'bankofamerica-secure',
  'chase-verify', 'wellsfargo-alert',
];

export class SecurityService {
  static patrolLog = [];
  static listeners = new Set();

  static subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  static notify(event) {
    this.listeners.forEach(l => l(event));
  }

  static async initialize() {
    const stored = await AsyncStorage.getItem(PATROL_LOG_KEY);
    if (stored) {
      this.patrolLog = JSON.parse(stored);
    }
  }

  static async getSettings() {
    const stored = await AsyncStorage.getItem(SETTINGS_KEY);
    return stored ? JSON.parse(stored) : {
      guardEnabled: true,
      realTimeAlerts: true,
      scanOnStartup: true,
      alertsVibrate: true,
      alertsSound: true,
    };
  }

  static async saveSettings(settings) {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  // Core security scan - returns full report
  static async runFullScan() {
    const [networkState, deviceInfo] = await Promise.all([
      NetInfo.fetch(),
      this.getDeviceInfo(),
    ]);

    const permissionReport = this.analyzePermissions();
    const networkReport = this.analyzeNetwork(networkState);
    const threats = this.collectThreats(networkReport, permissionReport, deviceInfo);

    const score = this.calculateScore(threats, permissionReport, networkReport, deviceInfo);

    const report = {
      score,
      threats,
      permissionReport,
      networkReport,
      deviceInfo,
      timestamp: Date.now(),
    };

    if (threats.length > 0) {
      await this.logThreats(threats);
      await this.sendThreatAlert(threats);
    }

    return report;
  }

  static async getDeviceInfo() {
    return {
      isDevice: Device.isDevice,
      brand: Device.brand,
      modelName: Device.modelName,
      osName: Device.osName,
      osVersion: Device.osVersion,
      isRooted: false, // Would require native module for true detection
    };
  }

  // Analyze app's own permissions
  static analyzePermissions() {
    // We check the permissions NEO itself has been granted.
    // In a production app, on Android we'd enumerate installed packages.
    // Here we track NEO's own declared permissions categorized by risk.
    const declared = [
      'android.permission.CAMERA',
      'android.permission.INTERNET',
      'android.permission.ACCESS_NETWORK_STATE',
      'android.permission.ACCESS_WIFI_STATE',
      'android.permission.READ_PHONE_STATE',
      'android.permission.RECEIVE_BOOT_COMPLETED',
      'android.permission.VIBRATE',
      'android.permission.POST_NOTIFICATIONS',
    ];

    const safe = declared.filter(p => PERMISSION_TIERS.safe.includes(p));
    const warning = declared.filter(p => PERMISSION_TIERS.warning.includes(p));
    const tracking = declared.filter(p => PERMISSION_TIERS.tracking.includes(p));

    return {
      total: declared.length,
      safe: safe.length + (declared.length - safe.length - warning.length - tracking.length),
      warning: warning.length,
      tracking: tracking.length,
      details: { safe, warning, tracking },
    };
  }

  static analyzeNetwork(networkState) {
    const isConnected = networkState.isConnected;
    const type = networkState.type; // 'wifi', 'cellular', 'none', etc.
    const isWifi = type === 'wifi';
    const wifiDetails = networkState.details;
    const isOpenWifi = isWifi && wifiDetails && !wifiDetails.isConnectionExpensive;
    const ssid = wifiDetails?.ssid || null;
    const ip = wifiDetails?.ipAddress || null;
    const strength = wifiDetails?.strength || null;

    // Heuristic: common public WiFi SSIDs
    const publicWifiPatterns = /free|public|guest|airport|hotel|cafe|starbucks|mcdonalds|subway|open/i;
    const likelyPublic = ssid ? publicWifiPatterns.test(ssid) : false;

    return {
      isConnected,
      type,
      isWifi,
      ssid,
      ip,
      strength,
      isOpenWifi,
      likelyPublic,
      secure: !likelyPublic && type !== 'none',
    };
  }

  static collectThreats(networkReport, permissionReport, deviceInfo) {
    const threats = [];

    if (networkReport.likelyPublic) {
      threats.push({
        id: 'open-wifi',
        type: 'network',
        severity: 'high',
        title: 'Unsecured Public WiFi',
        description: `Connected to "${networkReport.ssid}" — traffic may be intercepted.`,
        timestamp: Date.now(),
      });
    }

    if (permissionReport.tracking > 2) {
      threats.push({
        id: 'tracking-perms',
        type: 'privacy',
        severity: 'medium',
        title: 'High Tracking Permissions',
        description: `${permissionReport.tracking} tracking-level permissions detected.`,
        timestamp: Date.now(),
      });
    }

    if (permissionReport.warning > 3) {
      threats.push({
        id: 'warning-perms',
        type: 'privacy',
        severity: 'low',
        title: 'Elevated Permission Usage',
        description: `${permissionReport.warning} sensitive permissions in use.`,
        timestamp: Date.now(),
      });
    }

    if (deviceInfo.isRooted) {
      threats.push({
        id: 'rooted-device',
        type: 'system',
        severity: 'high',
        title: 'Device Rooted / Jailbroken',
        description: 'Root access detected — system protections are disabled.',
        timestamp: Date.now(),
      });
    }

    return threats;
  }

  static calculateScore(threats, permissionReport, networkReport) {
    let score = 10.0;

    threats.forEach(t => {
      if (t.severity === 'high') score -= 1.5;
      else if (t.severity === 'medium') score -= 0.8;
      else score -= 0.3;
    });

    score -= permissionReport.tracking * 0.2;
    score -= permissionReport.warning * 0.1;

    if (!networkReport.isConnected) score += 0.5;

    return Math.max(0, Math.min(10, parseFloat(score.toFixed(1))));
  }

  // URL scanning (for QR/barcode results)
  static scanURL(url) {
    const result = {
      url,
      safe: true,
      risk: 'low',
      reasons: [],
      timestamp: Date.now(),
    };

    const lower = url.toLowerCase();

    PHISHING_KEYWORDS.forEach(kw => {
      if (lower.includes(kw)) {
        result.safe = false;
        result.risk = 'high';
        result.reasons.push(`Suspicious keyword: "${kw}"`);
      }
    });

    MALICIOUS_PATTERNS.forEach(pattern => {
      if (pattern.test(url)) {
        result.safe = false;
        result.risk = result.risk === 'high' ? 'high' : 'medium';
        result.reasons.push('Matches known threat pattern');
      }
    });

    if (!url.startsWith('https://') && url.startsWith('http://')) {
      result.risk = result.risk === 'high' ? 'high' : 'medium';
      result.reasons.push('Unencrypted HTTP connection');
    }

    return result;
  }

  static async logThreats(threats) {
    const entries = threats.map(t => ({
      ...t,
      id: `${t.id}-${Date.now()}`,
    }));

    this.patrolLog = [...entries, ...this.patrolLog].slice(0, 100);
    await AsyncStorage.setItem(PATROL_LOG_KEY, JSON.stringify(this.patrolLog));
    this.notify({ type: 'log_updated', log: this.patrolLog });
  }

  static async logScanResult(result) {
    const entry = {
      id: `scan-${Date.now()}`,
      type: 'scan',
      severity: result.safe ? 'safe' : result.risk,
      title: result.safe ? 'Clean QR Code' : 'Suspicious URL Detected',
      description: result.safe
        ? `Safe URL: ${result.url.substring(0, 40)}...`
        : `Threat found: ${result.reasons[0]}`,
      timestamp: result.timestamp,
    };

    this.patrolLog = [entry, ...this.patrolLog].slice(0, 100);
    await AsyncStorage.setItem(PATROL_LOG_KEY, JSON.stringify(this.patrolLog));
    this.notify({ type: 'log_updated', log: this.patrolLog });

    if (!result.safe) {
      await this.sendThreatAlert([entry]);
    }
  }

  static async getPatrolLog() {
    const stored = await AsyncStorage.getItem(PATROL_LOG_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  static async clearPatrolLog() {
    this.patrolLog = [];
    await AsyncStorage.removeItem(PATROL_LOG_KEY);
    this.notify({ type: 'log_updated', log: [] });
  }

  static async sendThreatAlert(threats) {
    const settings = await this.getSettings();
    if (!settings.realTimeAlerts) return;

    const topThreat = threats[0];
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🚨 NEO Alert: ${topThreat.title}`,
        body: topThreat.description,
        data: { threatId: topThreat.id },
        sound: settings.alertsSound,
        ...(Platform.OS === 'android' && {
          color: '#ff3344',
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: settings.alertsVibrate ? [0, 300, 200, 300] : [],
        }),
      },
      trigger: null,
    });
  }
}
