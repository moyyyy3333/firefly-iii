import React from 'react'

function Bar({ label, value, color }) {
  return (
    <div style={s.metric}>
      <div style={s.row}>
        <span style={s.label}>{label}</span>
        <span style={{ ...s.value, color }}>{value}%</span>
      </div>
      <div style={s.track}>
        <div style={{ ...s.fill, width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

export default function ForensicsPanel({ forensics }) {
  if (!forensics) return null
  return (
    <div style={s.panel}>
      <p style={s.title}>Forensic Analysis</p>
      <Bar label="Beauty Smoothing Detected" value={forensics.smoothing} color="#ff00ff" />
      <Bar label="Color Cast Strength" value={forensics.colorCast} color="#ffaa00" />
      <Bar label="Restoration Fidelity" value={Math.round(forensics.fidelity)} color="#00d4ff" />
      <div style={s.row}>
        <span style={s.label}>Face Slimming</span>
        <span style={s.badge}>{forensics.faceSlimming}</span>
      </div>
    </div>
  )
}

const s = {
  panel: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginTop: 16 },
  title: { color: '#fff', fontSize: 17, fontWeight: 700, marginBottom: 20 },
  metric: { marginBottom: 16 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { color: 'rgba(255,255,255,0.55)', fontSize: 13 },
  value: { fontSize: 13, fontWeight: 700 },
  track: { height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  fill: { height: 4, borderRadius: 2, transition: 'width 0.6s ease' },
  badge: { color: '#00ff88', fontSize: 13, fontWeight: 600, background: 'rgba(0,255,136,0.1)', padding: '2px 10px', borderRadius: 20 },
}
