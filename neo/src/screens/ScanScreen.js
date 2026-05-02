import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Linking, Alert, Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../theme';
import { SecurityService } from '../services/SecurityService';

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [torchOn, setTorchOn] = useState(false);
  const scanLock = useRef(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const log = await SecurityService.getPatrolLog();
    const scans = log.filter(e => e.type === 'scan');
    setScanHistory(scans.slice(0, 10));
  };

  const handleBarcodeScan = async ({ data, type }) => {
    if (scanLock.current) return;
    scanLock.current = true;

    Vibration.vibrate(100);

    const result = SecurityService.scanURL(data);
    result.barcodeType = type;
    setLastScan(result);
    await SecurityService.logScanResult(result);
    await loadHistory();

    if (!result.safe) {
      Alert.alert(
        '🚨 Threat Detected',
        `${result.reasons.join('\n')}\n\nURL: ${data.substring(0, 80)}`,
        [
          { text: 'Block', style: 'destructive' },
          { text: 'View Anyway', onPress: () => Linking.openURL(data) },
        ]
      );
    }

    setTimeout(() => {
      scanLock.current = false;
    }, 2000);
  };

  const openURL = (url) => {
    Linking.canOpenURL(url).then(can => {
      if (can) Linking.openURL(url);
    });
  };

  if (!permission) {
    return <LoadingView />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.permissionView}>
          <Ionicons name="camera-outline" size={64} color={COLORS.blue} />
          <Text style={styles.permTitle}>Camera Access Required</Text>
          <Text style={styles.permSub}>
            NEO needs camera access to scan QR codes and barcodes for threats.
          </Text>
          <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
            <Text style={styles.permBtnText}>Grant Camera Access</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Text style={styles.title}>📷 CAMERA SCAN</Text>
          <Text style={styles.subtitle}>Point at any QR code or barcode</Text>
        </View>

        {/* ── CAMERA VIEWFINDER ── */}
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            facing="back"
            enableTorch={torchOn}
            barcodeScannerSettings={{ barcodeTypes: ['qr', 'pdf417', 'aztec', 'ean13', 'ean8', 'upc_a', 'upc_e', 'code128', 'code39'] }}
            onBarcodeScanned={scanning ? handleBarcodeScan : undefined}
          >
            {/* Scanner overlay */}
            <View style={styles.overlay}>
              <View style={styles.scanFrame}>
                <View style={[styles.corner, styles.cornerTL]} />
                <View style={[styles.corner, styles.cornerTR]} />
                <View style={[styles.corner, styles.cornerBL]} />
                <View style={[styles.corner, styles.cornerBR]} />
                {scanning && (
                  <View style={styles.scanLine} />
                )}
              </View>
              <Text style={styles.overlayHint}>
                {scanning ? 'Scanning for threats...' : 'Tap START SCAN to begin'}
              </Text>
            </View>
          </CameraView>

          {/* Camera controls */}
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={[styles.ctrlBtn, torchOn && styles.ctrlBtnActive]}
              onPress={() => setTorchOn(t => !t)}
            >
              <Ionicons name={torchOn ? 'flashlight' : 'flashlight-outline'} size={20} color={torchOn ? COLORS.yellow : COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.scanBtn, scanning && styles.scanBtnActive]}
              onPress={() => setScanning(s => !s)}
            >
              <LinearGradient
                colors={scanning ? ['#330011', '#220008'] : ['#001133', '#001a55']}
                style={styles.scanBtnGrad}
              >
                <Ionicons name={scanning ? 'stop-circle' : 'scan'} size={24} color={scanning ? COLORS.red : COLORS.blue} />
                <Text style={[styles.scanBtnText, { color: scanning ? COLORS.red : COLORS.blue }]}>
                  {scanning ? 'STOP SCAN' : 'START SCAN'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ctrlBtn} onPress={loadHistory}>
              <Ionicons name="refresh" size={20} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── LAST SCAN RESULT ── */}
        {lastScan && (
          <View style={[styles.resultCard, { borderColor: lastScan.safe ? COLORS.green : COLORS.red }]}>
            <View style={styles.resultHeader}>
              <Text style={styles.resultIcon}>{lastScan.safe ? '✅' : '🚨'}</Text>
              <Text style={[styles.resultStatus, { color: lastScan.safe ? COLORS.green : COLORS.red }]}>
                {lastScan.safe ? 'SAFE' : 'THREAT DETECTED'}
              </Text>
              <TouchableOpacity style={styles.openBtn} onPress={() => openURL(lastScan.url)}>
                <Ionicons name="open-outline" size={16} color={COLORS.blue} />
              </TouchableOpacity>
            </View>
            <Text style={styles.resultUrl} numberOfLines={2}>{lastScan.url}</Text>
            {lastScan.reasons.length > 0 && (
              <View style={styles.reasonsList}>
                {lastScan.reasons.map((r, i) => (
                  <View key={i} style={styles.reasonItem}>
                    <Ionicons name="warning-outline" size={12} color={COLORS.red} />
                    <Text style={styles.reasonText}>{r}</Text>
                  </View>
                ))}
              </View>
            )}
            <Text style={styles.resultType}>Type: {lastScan.barcodeType || 'QR'}</Text>
          </View>
        )}

        {/* ── SCAN HISTORY ── */}
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>🎯 SCAN HISTORY</Text>
            <Text style={styles.historyCount}>{scanHistory.length} scans</Text>
          </View>

          {scanHistory.length === 0 ? (
            <View style={styles.emptyHistory}>
              <Ionicons name="scan-outline" size={32} color={COLORS.textMuted} />
              <Text style={styles.emptyText}>No scans yet. Start scanning to detect threats.</Text>
            </View>
          ) : (
            scanHistory.map((scan, i) => (
              <View
                key={scan.id || i}
                style={[
                  styles.historyItem,
                  { borderLeftColor: scan.severity === 'safe' ? COLORS.green : COLORS.red }
                ]}
              >
                <View style={styles.historyItemHeader}>
                  <Text style={styles.historyItemTitle}>{scan.title}</Text>
                  <Text style={styles.historyItemTime}>
                    {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Text style={styles.historyItemDesc} numberOfLines={1}>{scan.description}</Text>
              </View>
            ))
          )}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function LoadingView() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.permissionView}>
        <Text style={styles.permTitle}>Initializing Camera...</Text>
      </View>
    </SafeAreaView>
  );
}

const CORNER_SIZE = 24;
const CORNER_THICKNESS = 3;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { flex: 1 },

  header: { padding: 16, paddingBottom: 8 },
  title: { fontSize: 20, fontWeight: '900', color: COLORS.text, letterSpacing: 1 },
  subtitle: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },

  cameraContainer: { marginHorizontal: 16, marginBottom: 16 },
  camera: { height: 280, borderRadius: 16, overflow: 'hidden' },

  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.35)' },
  scanFrame: {
    width: 200, height: 200,
    position: 'relative', justifyContent: 'center', alignItems: 'center',
  },
  corner: { position: 'absolute', width: CORNER_SIZE, height: CORNER_SIZE },
  cornerTL: { top: 0, left: 0, borderTopWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS, borderColor: COLORS.blue },
  cornerTR: { top: 0, right: 0, borderTopWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS, borderColor: COLORS.blue },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: CORNER_THICKNESS, borderLeftWidth: CORNER_THICKNESS, borderColor: COLORS.blue },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: CORNER_THICKNESS, borderRightWidth: CORNER_THICKNESS, borderColor: COLORS.blue },
  scanLine: {
    position: 'absolute', width: '80%', height: 2,
    backgroundColor: COLORS.blue, opacity: 0.8,
  },
  overlayHint: {
    marginTop: 120, fontSize: 12, color: 'rgba(255,255,255,0.7)',
    textAlign: 'center', fontWeight: '600',
  },

  cameraControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 },
  ctrlBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border,
    justifyContent: 'center', alignItems: 'center',
  },
  ctrlBtnActive: { borderColor: COLORS.yellow, backgroundColor: '#1a1500' },
  scanBtn: { flex: 1, marginHorizontal: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.borderBright },
  scanBtnActive: { borderColor: COLORS.red },
  scanBtnGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, gap: 8 },
  scanBtnText: { fontSize: 14, fontWeight: '800', letterSpacing: 1 },

  // Permission
  permissionView: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 16 },
  permTitle: { fontSize: 20, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  permSub: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 22 },
  permBtn: {
    backgroundColor: COLORS.blue, borderRadius: 12,
    paddingHorizontal: 24, paddingVertical: 12, marginTop: 8,
  },
  permBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },

  // Result
  resultCard: {
    marginHorizontal: 16, marginBottom: 16,
    backgroundColor: COLORS.card, borderRadius: 12,
    padding: 14, borderWidth: 1,
  },
  resultHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  resultIcon: { fontSize: 20 },
  resultStatus: { fontSize: 14, fontWeight: '900', letterSpacing: 1, flex: 1 },
  openBtn: { padding: 4 },
  resultUrl: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 8, fontFamily: 'monospace' },
  reasonsList: { gap: 4, marginBottom: 8 },
  reasonItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reasonText: { fontSize: 12, color: COLORS.red },
  resultType: { fontSize: 10, color: COLORS.textMuted, fontWeight: '600' },

  // History
  historySection: { paddingHorizontal: 16 },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  historyTitle: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  historyCount: { fontSize: 12, color: COLORS.textMuted },
  emptyHistory: { alignItems: 'center', padding: 24, gap: 8 },
  emptyText: { fontSize: 13, color: COLORS.textMuted, textAlign: 'center' },
  historyItem: {
    backgroundColor: COLORS.card, borderRadius: 10,
    padding: 12, marginBottom: 8, borderLeftWidth: 3,
    borderWidth: 1, borderColor: COLORS.border,
  },
  historyItemHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  historyItemTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  historyItemTime: { fontSize: 11, color: COLORS.textMuted },
  historyItemDesc: { fontSize: 11, color: COLORS.textMuted },
});
