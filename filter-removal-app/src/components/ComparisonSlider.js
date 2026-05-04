import React, { useRef } from 'react';
import { View, Text, Image, PanResponder, StyleSheet, Dimensions } from 'react-native';

const SCREEN_W = Dimensions.get('window').width;

export default function ComparisonSlider({ originalUri, restoredUri }) {
  const sliderX = useRef(SCREEN_W / 2);
  const sliderViewRef = useRef(null);
  const overlayRef = useRef(null);
  const handleRef = useRef(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gs) => {
        const x = Math.max(0, Math.min(SCREEN_W, gs.moveX));
        sliderX.current = x;

        // Direct manipulation — no setState, no re-render
        if (overlayRef.current) {
          overlayRef.current.setNativeProps({ style: { width: SCREEN_W - x } });
        }
        if (handleRef.current) {
          handleRef.current.setNativeProps({ style: { left: x - 20 } });
        }
      },
    })
  ).current;

  return (
    <View style={styles.container} ref={sliderViewRef} {...panResponder.panHandlers}>
      {/* Base layer: original */}
      <Image source={{ uri: originalUri }} style={styles.image} resizeMode="cover" />

      {/* Overlay: restored, clipped from the right */}
      <View ref={overlayRef} style={[styles.overlay, { width: SCREEN_W / 2 }]}>
        <Image source={{ uri: restoredUri }} style={styles.image} resizeMode="cover" />
      </View>

      {/* Divider handle */}
      <View ref={handleRef} style={[styles.handle, { left: SCREEN_W / 2 - 20 }]}>
        <View style={styles.line} />
        <View style={styles.knob}>
          <View style={styles.arrow} />
        </View>
        <View style={styles.line} />
      </View>

      {/* Labels */}
      <View style={styles.labelLeft} pointerEvents="none">
        <View style={styles.labelBg}><Text style={styles.labelText}>BEFORE</Text></View>
      </View>
      <View style={styles.labelRight} pointerEvents="none">
        <View style={styles.labelBg}><Text style={styles.labelText}>AFTER</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_W,
    height: 380,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  image: {
    position: 'absolute',
    width: SCREEN_W,
    height: 380,
  },
  overlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 380,
    overflow: 'hidden',
  },
  handle: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 380,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: '#fff',
  },
  knob: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  arrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: '#333',
    transform: [{ rotate: '45deg' }],
  },
  labelLeft: { position: 'absolute', top: 12, left: 12 },
  labelRight: { position: 'absolute', top: 12, right: 12 },
  labelBg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  labelText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
});
