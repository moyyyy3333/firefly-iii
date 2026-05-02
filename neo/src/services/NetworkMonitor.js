import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'neo_network_history';
const MAX_HISTORY = 50;

export class NetworkMonitor {
  static unsubscribe = null;
  static requestCount = 0;
  static requestsThisMinute = 0;
  static minuteTimer = null;
  static listeners = new Set();
  static currentState = null;
  static history = [];
  static originalFetch = null;
  static originalXHR = null;

  static subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  static notify(data) {
    this.listeners.forEach(l => l(data));
  }

  static async start() {
    await this.loadHistory();
    this.interceptRequests();
    this.startMinuteCounter();

    this.unsubscribe = NetInfo.addEventListener(state => {
      const prev = this.currentState;
      this.currentState = state;

      const entry = {
        timestamp: Date.now(),
        type: state.type,
        isConnected: state.isConnected,
        ssid: state.details?.ssid || null,
        ip: state.details?.ipAddress || null,
        strength: state.details?.strength || null,
      };

      if (!prev || prev.type !== state.type || prev.isConnected !== state.isConnected) {
        this.addHistoryEntry(entry);
        this.notify({ type: 'state_change', state, entry });
      }
    });
  }

  static stop() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
    this.restoreRequests();
    if (this.minuteTimer) {
      clearInterval(this.minuteTimer);
      this.minuteTimer = null;
    }
  }

  static interceptRequests() {
    // Intercept fetch to count network requests
    if (typeof global.fetch !== 'undefined' && !this.originalFetch) {
      this.originalFetch = global.fetch;
      global.fetch = (...args) => {
        this.requestCount++;
        this.requestsThisMinute++;
        this.notify({ type: 'request', count: this.requestsThisMinute, total: this.requestCount });
        return this.originalFetch(...args);
      };
    }
  }

  static restoreRequests() {
    if (this.originalFetch) {
      global.fetch = this.originalFetch;
      this.originalFetch = null;
    }
  }

  static startMinuteCounter() {
    this.minuteTimer = setInterval(() => {
      this.requestsThisMinute = 0;
      this.notify({ type: 'minute_reset', requestsPerMinute: this.requestsThisMinute });
    }, 60000);
  }

  static async getCurrentState() {
    const state = await NetInfo.fetch();
    this.currentState = state;
    return state;
  }

  static getRequestsPerMinute() {
    return this.requestsThisMinute;
  }

  static async addHistoryEntry(entry) {
    this.history = [entry, ...this.history].slice(0, MAX_HISTORY);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(this.history));
  }

  static async loadHistory() {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    if (stored) {
      this.history = JSON.parse(stored);
    }
  }

  static getHistory() {
    return this.history;
  }

  static getSecurityAssessment(state) {
    if (!state || !state.isConnected) {
      return { level: 'offline', color: '#556677', label: 'OFFLINE', detail: 'No connection.' };
    }

    const ssid = state.details?.ssid?.toLowerCase() || '';
    const publicPatterns = /free|public|guest|airport|hotel|cafe|open/i;

    if (state.type === 'wifi' && publicPatterns.test(ssid)) {
      return {
        level: 'danger',
        color: '#ff3344',
        label: 'DANGER',
        detail: 'Public WiFi — use a VPN.',
      };
    }

    if (state.type === 'wifi') {
      return {
        level: 'secure',
        color: '#00e87a',
        label: 'SECURE',
        detail: 'Private WiFi network.',
      };
    }

    if (state.type === 'cellular') {
      return {
        level: 'good',
        color: '#0080ff',
        label: 'GOOD',
        detail: 'Cellular — encrypted by carrier.',
      };
    }

    return { level: 'unknown', color: '#ffbb00', label: 'UNKNOWN', detail: 'Unknown connection type.' };
  }

  static formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  static formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}
