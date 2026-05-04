import React, { useState } from 'react'

export default function ComparisonSlider({ originalUrl, restoredUrl }) {
  const [pos, setPos] = useState(50)

  return (
    <div style={styles.wrap}>
      <img src={originalUrl} style={styles.img} alt="original" draggable={false} />
      <div style={{ ...styles.overlay, clipPath: `inset(0 0 0 ${pos}%)` }}>
        <img src={restoredUrl} style={styles.img} alt="restored" draggable={false} />
      </div>
      <div style={{ ...styles.divider, left: `${pos}%` }} />
      <div style={{ ...styles.handle, left: `${pos}%` }}>
        <span style={styles.arrow}>◀▶</span>
      </div>
      <input
        type="range" min={0} max={100} value={pos}
        onChange={e => setPos(Number(e.target.value))}
        style={styles.range}
      />
      <div style={styles.labelBefore}>BEFORE</div>
      <div style={styles.labelAfter}>AFTER</div>
    </div>
  )
}

const styles = {
  wrap: { position: 'relative', width: '100%', maxWidth: 600, margin: '0 auto', userSelect: 'none', borderRadius: 12, overflow: 'hidden', background: '#000' },
  img: { display: 'block', width: '100%', height: 'auto', maxHeight: 420, objectFit: 'cover' },
  overlay: { position: 'absolute', inset: 0, overflow: 'hidden' },
  divider: { position: 'absolute', top: 0, bottom: 0, width: 2, background: '#fff', transform: 'translateX(-50%)', pointerEvents: 'none' },
  handle: { position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)', width: 36, height: 36, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' },
  arrow: { fontSize: 10, color: '#333', letterSpacing: -2 },
  range: { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 },
  labelBefore: { position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: '3px 8px', borderRadius: 6, pointerEvents: 'none' },
  labelAfter: { position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: '3px 8px', borderRadius: 6, pointerEvents: 'none' },
}
