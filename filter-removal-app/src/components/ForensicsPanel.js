import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function MetricBar({ label, value, unit = '%', color }) {
  return (
    <View style={styles.metric}>
      <View style={styles.metricHeader}>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={[styles.metricValue, { color }]}>{value}{unit}</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${value}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function ForensicsPanel({ forensics }) {
  if (!forensics || Object.keys(forensics).length === 0) return null;

  return (
    <View style={styles.panel}>
      <Text style={styles.title}>Forensic Analysis</Text>

      <MetricBar
        label="Beauty Smoothing Detected"
        value={forensics.smoothing}
        color="#ff00ff"
      />
      <MetricBar
        label="Color Cast Strength"
        value={forensics.colorCast}
        color="#ffaa00"
      />
      <MetricBar
        label="Restoration Fidelity"
        value={Math.round(forensics.fidelity)}
        color="#00d4ff"
      />

      <View style={styles.row}>
        <Text style={styles.metricLabel}>Face Slimming</Text>
        <Text style={styles.badge}>{forensics.faceSlimming}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    margin: 16,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  metric: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  track: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    borderRadius: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  badge: {
    color: '#00ff88',
    fontSize: 13,
    fontWeight: '600',
    backgroundColor: 'rgba(0,255,136,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
});
