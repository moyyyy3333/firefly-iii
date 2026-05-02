import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Switch, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

import { COLORS } from '../theme';
import { SecurityService } from '../services/SecurityService';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    guardEnabled: true,
    realTimeAlerts: true,
    scanOnStartup: true,
    alertsVibrate: true,
    alertsSound: true,
  });
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    loadSettings();
    loadDeviceInfo();
  }, []);

  const loadSettings = async () => {
    const s = await SecurityService.getSettings();
    setSettings(s);
  };

  const loadDeviceInfo = () => {
    setDeviceInfo({
      brand: Device.brand || 'Unknown',
      modelName: Device.modelName || 'Unknown',
      osName: Device.osName || 'Unknown',
      osVersion: Device.osVersion || 'Unknown',
      isDevice: Device.isDevice,
    });
  };

  const updateSetting = async (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await SecurityService.saveSettings(updated);
  };

  const clearPatrolLog = () => {
    Alert.alert(
      'Clear Patrol Log',
      'This will delete all security events from the log. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await SecurityService.clearPatrolLog();
            Alert.alert('Done', 'Patrol log cleared.');
          },
        },
      ]
    );
  };

  const runManualScan = async () => {
    Alert.alert('Running Full Scan', 'NEO is scanning your device...');
    const report = await SecurityService.runFullScan();
    const t = report.threats.length;
    Alert.alert(
      t > 0 ? `⚠️ ${t} Threat${t > 1 ? 's' : ''} Found` : '✅ All Clear',
      t > 0
        ? report.threats.map(th => `• ${th.title}`).join('\n')
        : 'No threats detected on this scan.',
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Text style={styles.title}>⚙️ SETTINGS</Text>
          <Text style={styles.subtitle}>Configure NEO security guard</Text>
        </View>

        {/* ── GUARD SETTINGS ── */}
        <SettingsSection title="🛡️ Guard Control">
          <SettingToggle
            icon="shield-checkmark-outline"
            label="Active Guard"
            description="Continuously monitor your device"
            value={settings.guardEnabled}
            onValueChange={v => updateSetting('guardEnabled', v)}
            color={COLORS.blue}
          />
          <SettingToggle
            icon="search-outline"
            label="Scan on Startup"
            description="Run security scan when app opens"
            value={settings.scanOnStartup}
            onValueChange={v => updateSetting('scanOnStartup', v)}
            color={COLORS.green}
          />
        </SettingsSection>

        {/* ── ALERT SETTINGS ── */}
        <SettingsSection title="🔔 Alerts">
          <SettingToggle
            icon="notifications-outline"
            label="Real-time Alerts"
            description="Push notifications for threats"
            value={settings.realTimeAlerts}
            onValueChange={v => updateSetting('realTimeAlerts', v)}
            color={COLORS.blue}
          />
          <SettingToggle
            icon="volume-high-outline"
            label="Alert Sounds"
            description="Play sound on threat detection"
            value={settings.alertsSound}
            onValueChange={v => updateSetting('alertsSound', v)}
            color={COLORS.yellow}
          />
          <SettingToggle
            icon="phone-portrait-outline"
            label="Vibration"
            description="Vibrate on security alerts"
            value={settings.alertsVibrate}
            onValueChange={v => updateSetting('alertsVibrate', v)}
            color={COLORS.purple}
          />
        </SettingsSection>

        {/* ── ACTIONS ── */}
        <SettingsSection title="🔧 Actions">
          <SettingButton
            icon="scan-outline"
            label="Run Full Scan Now"
            description="Manually trigger a complete security scan"
            onPress={runManualScan}
            color={COLORS.blue}
          />
          <SettingButton
            icon="trash-outline"
            label="Clear Patrol Log"
            description="Delete all security event history"
            onPress={clearPatrolLog}
            color={COLORS.red}
            dangerous
          />
        </SettingsSection>

        {/* ── DEVICE INFO ── */}
        {deviceInfo && (
          <SettingsSection title="📱 Device Info">
            <InfoRow label="Brand" value={deviceInfo.brand} />
            <InfoRow label="Model" value={deviceInfo.modelName} />
            <InfoRow label="OS" value={`${deviceInfo.osName} ${deviceInfo.osVersion}`} />
            <InfoRow
              label="Hardware Device"
              value={deviceInfo.isDevice ? 'Yes' : 'Emulator'}
              valueColor={deviceInfo.isDevice ? COLORS.green : COLORS.yellow}
            />
          </SettingsSection>
        )}

        {/* ── ABOUT ── */}
        <SettingsSection title="ℹ️ About">
          <InfoRow label="App Version" value={Constants.expoConfig?.version || '1.0.0'} />
          <InfoRow label="Guard Status" value={settings.guardEnabled ? 'ACTIVE' : 'PAUSED'} valueColor={settings.guardEnabled ? COLORS.green : COLORS.yellow} />
          <InfoRow label="Build" value="Production" />
        </SettingsSection>

        {/* ── BRANDING ── */}
        <View style={styles.branding}>
          <Text style={styles.brandName}>NEO</Text>
          <Text style={styles.brandTagline}>Your Phone's Personal Security Guard</Text>
          <Text style={styles.brandVersion}>v{Constants.expoConfig?.version || '1.0.0'}</Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>
        {children}
      </View>
    </View>
  );
}

function SettingToggle({ icon, label, description, value, onValueChange, color }) {
  return (
    <View style={styles.settingRow}>
      <View style={[styles.settingIcon, { backgroundColor: color + '22', borderColor: color + '44' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.border, true: COLORS.blueGlow }}
        thumbColor={value ? COLORS.blue : COLORS.textMuted}
        ios_backgroundColor={COLORS.border}
      />
    </View>
  );
}

function SettingButton({ icon, label, description, onPress, color, dangerous }) {
  return (
    <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.settingIcon, { backgroundColor: color + '22', borderColor: color + '44' }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingLabel, dangerous && { color: COLORS.red }]}>{label}</Text>
        <Text style={styles.settingDesc}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

function InfoRow({ label, value, valueColor }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16 },

  header: { marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '900', color: COLORS.text, letterSpacing: 1 },
  subtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },

  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 },
  sectionCard: {
    backgroundColor: COLORS.card, borderRadius: 14,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },

  settingRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  settingIcon: {
    width: 36, height: 36, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1,
  },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 14, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  settingDesc: { fontSize: 12, color: COLORS.textMuted },

  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  infoLabel: { fontSize: 13, color: COLORS.textMuted },
  infoValue: { fontSize: 13, fontWeight: '700', color: COLORS.text },

  branding: { alignItems: 'center', paddingVertical: 24, gap: 4 },
  brandName: { fontSize: 32, fontWeight: '900', color: COLORS.blue, letterSpacing: 4 },
  brandTagline: { fontSize: 13, color: COLORS.textSecondary },
  brandVersion: { fontSize: 11, color: COLORS.textMuted, marginTop: 4 },
});
