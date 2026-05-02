import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Animated, RefreshControl, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { COLORS, FONTS, SHADOWS } from '../theme';
import { SecurityService } from '../services/SecurityService';
import { NetworkMonitor } from '../services/NetworkMonitor';

const SCAN_INTERVAL = 30000; // re-scan every 30s

export default function HomeScreen({ navigation }) {
  const [report, setReport] = useState(null);
  const [patrolLog, setPatrolLog] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [guardActive, setGuardActive] = useState(true);
  const [reqPerMin, setReqPerMin] = useState(0);
  const [memUsed, setMemUsed] = useState(67);
  const [cpuUsage, setCpuUsage] = useState(12);
  const [activeApps, setActiveApps] = useState(3);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scanIntervalRef = useRef(null);

  // Pulse animation for LIVE indicator
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 700, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  // Network monitor subscription
  useEffect(() => {
    const unsub = NetworkMonitor.subscribe(event => {
      if (event.type === 'request') {
        setReqPerMin(event.count);
      }
    });
    NetworkMonitor.start();
    return () => {
      unsub();
      NetworkMonitor.stop();
    };
  }, []);

  // Security service subscription
  useEffect(() => {
    const unsub = SecurityService.subscribe(event => {
      if (event.type === 'log_updated') {
        setPatrolLog(event.log.slice(0, 10));
      }
    });
    return unsub;
  }, []);

  // Simulate dynamic device metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.max(5, Math.min(85, prev + (Math.random() * 8 - 4) | 0)));
      setMemUsed(prev => Math.max(30, Math.min(90, prev + (Math.random() * 4 - 2) | 0)));
      setActiveApps(prev => Math.max(1, Math.min(12, prev + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const runScan = useCallback(async () => {
    await SecurityService.initialize();
    const r = await SecurityService.runFullScan();
    setReport(r);
    const log = await SecurityService.getPatrolLog();
    setPatrolLog(log.slice(0, 10));
  }, []);

  useFocusEffect(
    useCallback(() => {
      runScan();
      scanIntervalRef.current = setInterval(runScan, SCAN_INTERVAL);
      return () => clearInterval(scanIntervalRef.current);
    }, [runScan])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await runScan();
    setRefreshing(false);
  };

  const score = report?.score ?? 8.2;
  const threats = report?.threats?.length ?? 0;
  const permReport = report?.permissionReport ?? { total: 12, safe: 8, warning: 2, tracking: 14 };

  const scoreColor = score >= 8 ? COLORS.green : score >= 6 ? COLORS.yellow : COLORS.red;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.blue}
            colors={[COLORS.blue]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.appName}>NEO</Text>
              <Text style={styles.appTagline}>🛡️ Your Phone's Personal Security Guard</Text>
            </View>
            <TouchableOpacity
              style={[styles.guardToggle, guardActive && styles.guardToggleActive]}
              onPress={() => setGuardActive(g => !g)}
            >
              <Ionicons
                name={guardActive ? 'shield-checkmark' : 'shield-outline'}
                size={24}
                color={guardActive ? COLORS.blue : COLORS.textMuted}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeRow}>
            <View style={[styles.badge, styles.badgeBlue]}>
              <View style={[styles.badgeDot, { backgroundColor: COLORS.blue }]} />
              <Text style={[styles.badgeText, { color: COLORS.blue }]}>BLUE</Text>
            </View>
            <View style={[styles.badge, styles.badgeRed]}>
              <View style={[styles.badgeDot, { backgroundColor: COLORS.red }]} />
              <Text style={[styles.badgeText, { color: COLORS.red }]}>RED</Text>
            </View>
            <View style={[styles.badge, styles.badgeNeutral]}>
              <Text style={[styles.badgeText, { color: COLORS.textSecondary }]}>SECURITY</Text>
            </View>
          </View>
        </View>

        {/* ── SCORE CARD ── */}
        <LinearGradient
          colors={['#0d0d28', '#111138']}
          style={[styles.scoreCard, SHADOWS.blue]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.scoreSection}>
            <Text style={[styles.scoreNumber, { color: scoreColor }]}>{score.toFixed(1)}</Text>
            <Text style={styles.scoreLabel}>SCORE</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreSection}>
            <Text style={[styles.scoreNumber, { color: threats > 0 ? COLORS.red : COLORS.green, fontSize: 38 }]}>
              {threats}
            </Text>
            <Text style={styles.scoreLabel}>THREATS</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scoreSection}>
            <View style={[styles.guardBadge, guardActive && styles.guardBadgeActive]}>
              <Text style={[styles.guardText, guardActive && styles.guardTextActive]}>
                {guardActive ? 'ACTIVE' : 'PAUSED'}
              </Text>
            </View>
            <Text style={styles.scoreLabel}>GUARD</Text>
          </View>
        </LinearGradient>

        {/* ── ACTION BUTTONS ── */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.actionScroll}>
          <ActionButton icon="📷" label="Camera Scan" onPress={() => navigation.navigate('Camera')} />
          <ActionButton icon="🌐" label="Network" onPress={() => navigation.navigate('Network')} />
          <ActionButton icon="👾" label="Malware" onPress={onRefresh} />
          <ActionButton icon="🔔" label="Real-time Alerts" onPress={() => navigation.navigate('Settings')} />
        </ScrollView>

        {/* ── LIVE MONITOR ── */}
        <View style={styles.monitorCard}>
          <View style={styles.monitorHeader}>
            <View>
              <Text style={styles.sectionTitle}>🔍 FULL SECURITY PATROL</Text>
              <Text style={styles.sectionSub}>📡 Real-time Monitor</Text>
            </View>
            <View style={styles.liveIndicator}>
              <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>

          <View style={styles.metricGrid}>
            <MetricCard label="CPU" value={`${cpuUsage}%`} icon="⚡" color={cpuUsage > 70 ? COLORS.red : COLORS.blue} />
            <MetricCard label="Memory" value={`${memUsed}%`} icon="💾" color={memUsed > 80 ? COLORS.red : COLORS.yellow} />
            <MetricCard label="Network" value={`${reqPerMin}/min`} icon="📡" color={COLORS.blue} />
            <MetricCard label="Active Apps" value={`${activeApps}`} icon="📱" color={COLORS.green} />
          </View>

          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>"I've got eyes on it."</Text>
          </View>
        </View>

        {/* ── PERMISSION STATS ── */}
        <View style={styles.permRow}>
          <PermCard value={permReport.total} icon="🔐" label="Perms" color={COLORS.textSecondary} />
          <PermCard value={permReport.safe} icon="✓" label="Secure" color={COLORS.green} />
          <PermCard value={permReport.warning} icon="⚠️" label="Warn" color={COLORS.yellow} />
          <PermCard value={permReport.tracking} icon="👁️" label="Track" color={COLORS.red} />
        </View>

        {/* ── PATROL LOG ── */}
        <View style={styles.patrolSection}>
          <View style={styles.patrolHeader}>
            <Text style={styles.sectionTitle}>🎯 PATROL LOG</Text>
            <View style={styles.foundBadge}>
              <Text style={styles.foundText}>{patrolLog.length} found</Text>
            </View>
          </View>

          {patrolLog.length === 0 ? (
            <View style={styles.emptyLog}>
              <Ionicons name="checkmark-circle" size={32} color={COLORS.green} />
              <Text style={styles.emptyText}>All clear — no threats detected</Text>
            </View>
          ) : (
            patrolLog.slice(0, 6).map((entry, i) => (
              <PatrolEntry key={entry.id || i} entry={entry} />
            ))
          )}
        </View>

        {/* ── THREAT LIST ── */}
        {report?.threats?.length > 0 && (
          <View style={styles.threatSection}>
            <Text style={styles.sectionTitle}>⚠️ ACTIVE THREATS</Text>
            {report.threats.map((t, i) => (
              <View key={t.id || i} style={[styles.threatCard, { borderLeftColor: t.severity === 'high' ? COLORS.red : COLORS.yellow }]}>
                <View style={styles.threatHeader}>
                  <Text style={styles.threatTitle}>{t.title}</Text>
                  <View style={[styles.severityBadge, { backgroundColor: t.severity === 'high' ? COLORS.redDim : '#553300' }]}>
                    <Text style={styles.severityText}>{t.severity.toUpperCase()}</Text>
                  </View>
                </View>
                <Text style={styles.threatDesc}>{t.description}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.actionBtn} onPress={onPress} activeOpacity={0.7}>
      <LinearGradient colors={['#1a1a40', '#111130']} style={styles.actionBtnInner}>
        <Text style={styles.actionIcon}>{icon}</Text>
        <Text style={styles.actionLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function MetricCard({ label, value, icon, color }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricIcon}>{icon}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

function PermCard({ value, icon, label, color }) {
  return (
    <View style={[styles.permCard, { borderColor: color + '33' }]}>
      <Text style={[styles.permValue, { color }]}>{value}</Text>
      <Text style={styles.permIcon}>{icon}</Text>
      <Text style={styles.permLabel}>{label}</Text>
    </View>
  );
}

function PatrolEntry({ entry }) {
  const sev = entry.severity;
  const color = sev === 'high' || sev === 'medium' ? COLORS.red
    : sev === 'low' ? COLORS.yellow
    : sev === 'safe' ? COLORS.green
    : COLORS.textMuted;
  const icon = sev === 'safe' ? '✓' : sev === 'high' ? '🚨' : sev === 'medium' ? '⚠️' : 'ℹ️';
  const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.logEntry}>
      <Text style={[styles.logIcon, { color }]}>{icon}</Text>
      <View style={styles.logContent}>
        <Text style={styles.logTitle} numberOfLines={1}>{entry.title}</Text>
        <Text style={styles.logDesc} numberOfLines={1}>{entry.description}</Text>
      </View>
      <Text style={styles.logTime}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },
  content: { padding: 16 },

  // Header
  header: { marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  appName: { fontSize: 36, fontWeight: '900', color: COLORS.blue, letterSpacing: 4 },
  appTagline: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  guardToggle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  guardToggleActive: { borderColor: COLORS.blueGlow, backgroundColor: '#0a1535' },
  badgeRow: { flexDirection: 'row', gap: 8 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 12, borderWidth: 1,
  },
  badgeBlue: { backgroundColor: '#001133', borderColor: '#0044aa' },
  badgeRed: { backgroundColor: '#1a0000', borderColor: '#880011' },
  badgeNeutral: { backgroundColor: COLORS.card, borderColor: COLORS.border },
  badgeDot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 11, fontWeight: '700', letterSpacing: 1 },

  // Score Card
  scoreCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderBright,
    marginBottom: 16,
    overflow: 'hidden',
  },
  scoreSection: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 20,
  },
  scoreNumber: { fontSize: 44, fontWeight: '900', letterSpacing: -1 },
  scoreLabel: { ...FONTS.label, marginTop: 4 },
  scoreDivider: { width: 1, backgroundColor: COLORS.border, marginVertical: 16 },
  guardBadge: {
    paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, borderWidth: 1,
    borderColor: COLORS.textMuted, backgroundColor: COLORS.card,
  },
  guardBadgeActive: { borderColor: COLORS.green, backgroundColor: '#001a0d' },
  guardText: { fontSize: 12, fontWeight: '800', color: COLORS.textMuted, letterSpacing: 1 },
  guardTextActive: { color: COLORS.green },

  // Action Buttons
  actionScroll: { marginBottom: 16 },
  actionBtn: { marginRight: 10, borderRadius: 12, overflow: 'hidden' },
  actionBtnInner: {
    paddingHorizontal: 16, paddingVertical: 12,
    alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: COLORS.border, borderRadius: 12,
    minWidth: 90,
  },
  actionIcon: { fontSize: 22 },
  actionLabel: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },

  // Monitor
  monitorCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    marginBottom: 16,
  },
  monitorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 },
  sectionTitle: { fontSize: 13, fontWeight: '800', color: COLORS.text, letterSpacing: 0.5 },
  sectionSub: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  liveIndicator: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.live },
  liveText: { fontSize: 11, fontWeight: '800', color: COLORS.live, letterSpacing: 2 },

  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 14 },
  metricCard: {
    flex: 1, minWidth: '44%', backgroundColor: COLORS.surface,
    borderRadius: 10, padding: 12, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
  },
  metricIcon: { fontSize: 18, marginBottom: 4 },
  metricValue: { fontSize: 20, fontWeight: '800' },
  metricLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textMuted, marginTop: 2, textTransform: 'uppercase' },

  quoteContainer: { alignItems: 'center', paddingTop: 4 },
  quoteText: { fontSize: 13, fontStyle: 'italic', color: COLORS.textSecondary, letterSpacing: 0.3 },

  // Permission Stats
  permRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  permCard: {
    flex: 1, backgroundColor: COLORS.card,
    borderRadius: 12, padding: 10, alignItems: 'center',
    borderWidth: 1,
  },
  permValue: { fontSize: 18, fontWeight: '900' },
  permIcon: { fontSize: 14, marginTop: 2 },
  permLabel: { fontSize: 9, fontWeight: '700', color: COLORS.textMuted, marginTop: 2, textTransform: 'uppercase' },

  // Patrol Log
  patrolSection: { marginBottom: 16 },
  patrolHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  foundBadge: {
    backgroundColor: COLORS.card, borderRadius: 10, borderWidth: 1,
    borderColor: COLORS.border, paddingHorizontal: 10, paddingVertical: 3,
  },
  foundText: { fontSize: 12, fontWeight: '700', color: COLORS.textSecondary },

  emptyLog: {
    alignItems: 'center', padding: 24,
    backgroundColor: COLORS.card, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
    gap: 8,
  },
  emptyText: { fontSize: 13, color: COLORS.textSecondary },

  logEntry: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: COLORS.card, borderRadius: 10,
    padding: 12, marginBottom: 6, gap: 10,
    borderWidth: 1, borderColor: COLORS.border,
  },
  logIcon: { fontSize: 16, width: 20, textAlign: 'center' },
  logContent: { flex: 1 },
  logTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  logDesc: { fontSize: 11, color: COLORS.textMuted, marginTop: 1 },
  logTime: { fontSize: 10, color: COLORS.textMuted },

  // Threat Cards
  threatSection: { marginBottom: 16 },
  threatCard: {
    backgroundColor: COLORS.card, borderRadius: 10,
    padding: 12, marginBottom: 8,
    borderLeftWidth: 3, borderWidth: 1, borderColor: COLORS.border,
  },
  threatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  threatTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, flex: 1 },
  threatDesc: { fontSize: 11, color: COLORS.textMuted },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginLeft: 8 },
  severityText: { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 1 },
});
