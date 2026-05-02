import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';

import { COLORS } from '../theme';
import { NetworkMonitor } from '../services/NetworkMonitor';

export default function NetworkScreen() {
  const [netState, setNetState] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [history, setHistory] = useState([]);
  const [reqPerMin, setReqPerMin] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      fetchNetworkState();
      const unsub = NetInfo.addEventListener(state => {
        setNetState(state);
        setAssessment(NetworkMonitor.getSecurityAssessment(state));
      });
      const monUnsub = NetworkMonitor.subscribe(event => {
        if (event.type === 'request') setReqPerMin(event.count);
        if (event.type === 'state_change') setHistory(NetworkMonitor.getHistory());
      });
      setHistory(NetworkMonitor.getHistory());
      return () => {
        unsub();
        monUnsub();
      };
    }, [])
  );

  const fetchNetworkState = async () => {
    const state = await NetInfo.fetch();
    setNetState(state);
    setAssessment(NetworkMonitor.getSecurityAssessment(state));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNetworkState();
    setRefreshing(false);
  };

  const type = netState?.type || 'unknown';
  const details = netState?.details || {};
  const isConnected = netState?.isConnected ?? false;
  const isWifi = type === 'wifi';
  const typeIcon = type === 'wifi' ? '📶' : type === 'cellular' ? '📱' : type === 'none' ? '🚫' : '🌐';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.blue} colors={[COLORS.blue]} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Text style={styles.title}>🌐 NETWORK MONITOR</Text>
          <Text style={styles.subtitle}>Real-time connection security</Text>
        </View>

        {/* ── SECURITY STATUS ── */}
        {assessment && (
          <LinearGradient
            colors={assessment.level === 'danger' ? ['#1a0008', '#220010'] : ['#001a0d', '#00120a']}
            style={[styles.statusCard, { borderColor: assessment.color }]}
          >
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: assessment.color }]} />
              <Text style={[styles.statusLabel, { color: assessment.color }]}>{assessment.label}</Text>
            </View>
            <Text style={styles.statusDetail}>{assessment.detail}</Text>
            <View style={styles.statusStats}>
              <Text style={styles.statusStat}>
                {isConnected ? '● Connected' : '○ Disconnected'}
              </Text>
              <Text style={styles.statusStat}>{typeIcon} {type.toUpperCase()}</Text>
            </View>
          </LinearGradient>
        )}

        {/* ── CONNECTION INFO ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📡 Connection Details</Text>
          <View style={styles.infoGrid}>
            <InfoRow icon="wifi-outline" label="Network Type" value={type.toUpperCase()} />
            {isWifi && details.ssid && (
              <InfoRow icon="radio-outline" label="SSID" value={details.ssid} />
            )}
            {details.ipAddress && (
              <InfoRow icon="server-outline" label="IP Address" value={details.ipAddress} />
            )}
            {details.subnet && (
              <InfoRow icon="git-network-outline" label="Subnet" value={details.subnet} />
            )}
            {isWifi && details.strength !== null && details.strength !== undefined && (
              <InfoRow
                icon="cellular-outline"
                label="Signal Strength"
                value={`${details.strength}%`}
                valueColor={details.strength > 70 ? COLORS.green : details.strength > 40 ? COLORS.yellow : COLORS.red}
              />
            )}
            {details.isConnectionExpensive !== undefined && (
              <InfoRow
                icon="cash-outline"
                label="Metered"
                value={details.isConnectionExpensive ? 'Yes' : 'No'}
                valueColor={details.isConnectionExpensive ? COLORS.yellow : COLORS.green}
              />
            )}
            <InfoRow
              icon="shield-checkmark-outline"
              label="Reachable"
              value={netState?.isInternetReachable ? 'Yes' : 'No'}
              valueColor={netState?.isInternetReachable ? COLORS.green : COLORS.red}
            />
          </View>
        </View>

        {/* ── LIVE METRICS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Live Metrics</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{reqPerMin}</Text>
              <Text style={styles.metricLabel}>Requests/min</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={[styles.metricValue, { color: isConnected ? COLORS.green : COLORS.red }]}>
                {isConnected ? 'UP' : 'DOWN'}
              </Text>
              <Text style={styles.metricLabel}>Connection</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{isWifi ? '🔒' : '📶'}</Text>
              <Text style={styles.metricLabel}>{isWifi ? 'WiFi' : type}</Text>
            </View>
          </View>
        </View>

        {/* ── SECURITY TIPS ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🛡️ Security Tips</Text>
          <SecurityTip
            icon="lock-closed-outline"
            tip="Always use HTTPS websites on public networks."
            active={true}
          />
          <SecurityTip
            icon="eye-off-outline"
            tip="Use a VPN on public or open WiFi networks."
            active={assessment?.level === 'danger'}
            urgent={assessment?.level === 'danger'}
          />
          <SecurityTip
            icon="shield-outline"
            tip="Avoid banking or sensitive logins on cellular."
            active={type === 'cellular'}
          />
          <SecurityTip
            icon="wifi-outline"
            tip="Forget public WiFi networks after use."
            active={true}
          />
        </View>

        {/* ── CONNECTION HISTORY ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🕐 Connection History</Text>
          {history.length === 0 ? (
            <View style={styles.emptyHistory}>
              <Ionicons name="time-outline" size={28} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>No history yet — connections will appear here.</Text>
            </View>
          ) : (
            history.slice(0, 8).map((entry, i) => (
              <View key={i} style={styles.historyEntry}>
                <View style={[styles.histDot, { backgroundColor: entry.isConnected ? COLORS.green : COLORS.red }]} />
                <View style={styles.histContent}>
                  <Text style={styles.histType}>{entry.type?.toUpperCase() || 'UNKNOWN'}</Text>
                  {entry.ssid && <Text style={styles.histSub}>{entry.ssid}</Text>}
                  {entry.ip && <Text style={styles.histSub}>{entry.ip}</Text>}
                </View>
                <Text style={styles.histTime}>{NetworkMonitor.formatTime(entry.timestamp)}</Text>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, valueColor }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={16} color={COLORS.textMuted} />
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor && { color: valueColor }]}>{value || '—'}</Text>
    </View>
  );
}

function SecurityTip({ icon, tip, active, urgent }) {
  if (!active) return null;
  return (
    <View style={[styles.tipCard, urgent && styles.tipCardUrgent]}>
      <Ionicons name={icon} size={16} color={urgent ? COLORS.red : COLORS.blue} />
      <Text style={[styles.tipText, urgent && { color: COLORS.text }]}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16 },

  header: { marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '900', color: COLORS.text, letterSpacing: 1 },
  subtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },

  statusCard: {
    borderRadius: 14, borderWidth: 1.5,
    padding: 16, marginBottom: 16,
  },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusLabel: { fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  statusDetail: { fontSize: 13, color: COLORS.textSecondary, marginBottom: 10 },
  statusStats: { flexDirection: 'row', gap: 16 },
  statusStat: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },

  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text, marginBottom: 10 },

  infoGrid: {
    backgroundColor: COLORS.card, borderRadius: 12,
    borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  infoLabel: { flex: 1, fontSize: 13, color: COLORS.textMuted },
  infoValue: { fontSize: 13, fontWeight: '700', color: COLORS.text },

  metricsRow: { flexDirection: 'row', gap: 10 },
  metricCard: {
    flex: 1, backgroundColor: COLORS.card, borderRadius: 12,
    padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border,
  },
  metricValue: { fontSize: 22, fontWeight: '900', color: COLORS.blue, marginBottom: 4 },
  metricLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, textTransform: 'uppercase' },

  tipCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: COLORS.card, borderRadius: 10,
    padding: 12, marginBottom: 8,
    borderWidth: 1, borderColor: COLORS.border,
  },
  tipCardUrgent: { borderColor: COLORS.red, backgroundColor: '#1a0008' },
  tipText: { flex: 1, fontSize: 13, color: COLORS.textSecondary, lineHeight: 18 },

  emptyHistory: { alignItems: 'center', padding: 24, gap: 8 },
  emptyText: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center' },

  historyEntry: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: COLORS.card, borderRadius: 10,
    padding: 12, marginBottom: 6, borderWidth: 1, borderColor: COLORS.border,
  },
  histDot: { width: 8, height: 8, borderRadius: 4 },
  histContent: { flex: 1 },
  histType: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  histSub: { fontSize: 11, color: COLORS.textMuted },
  histTime: { fontSize: 11, color: COLORS.textMuted },
});
