import React, { useState, useEffect, useRef } from 'react'
import { restoreImage, warmup, computeForensics } from './utils/pipeline'
import ComparisonSlider from './components/ComparisonSlider'
import ForensicsPanel from './components/ForensicsPanel'

const STRENGTHS = [{ label: 'Mild', v: 0.5 }, { label: 'Normal', v: 1.0 }, { label: 'Aggressive', v: 1.5 }]
const STEPS = ['Reading image…', 'Detecting face…', 'Removing filters…', 'Correcting colors…', 'Computing forensics…']

export default function App() {
  const [modelReady, setModelReady] = useState(false)
  const [originalUrl, setOriginalUrl] = useState(null)
  const [restoredUrl, setRestoredUrl] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [step, setStep] = useState(0)
  const [forensics, setForensics] = useState(null)
  const [strength, setStrength] = useState(1.0)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  const origCanvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  useEffect(() => {
    warmup().then(() => setModelReady(true)).catch(() => setModelReady(true))
  }, [])

  const handleFile = (file) => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
    setRestoredUrl(null)
    setForensics(null)
    setSaved(false)
    setError(null)
    process(url)
  }

  const process = async (url) => {
    setProcessing(true)
    setStep(0)
    try {
      setStep(0)
      // Draw original to canvas for forensics later
      await new Promise(resolve => {
        const img = new Image()
        img.onload = () => {
          const c = document.createElement('canvas')
          c.width = 200; c.height = Math.round(img.naturalHeight * 200 / img.naturalWidth)
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height)
          origCanvasRef.current = c
          resolve()
        }
        img.src = url
      })

      setStep(1)
      await new Promise(r => setTimeout(r, 30))

      setStep(2)
      const restored = await restoreImage(url, strength)
      setRestoredUrl(restored)

      setStep(3)
      setStep(4)
      const metrics = await computeForensics(origCanvasRef.current, restored)
      setForensics(metrics)
    } catch (err) {
      setError(err.message || 'Processing failed')
    } finally {
      setProcessing(false)
    }
  }

  const download = () => {
    const a = document.createElement('a')
    a.href = restoredUrl
    a.download = `unmask-restored-${Date.now()}.jpg`
    a.click()
    setSaved(true)
  }

  const share = async () => {
    if (navigator.share) {
      const res = await fetch(restoredUrl)
      const blob = await res.blob()
      await navigator.share({ files: [new File([blob], 'unmask.jpg', { type: 'image/jpeg' })] })
    } else {
      download()
    }
  }

  return (
    <div style={s.app}>
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

      {/* Nav */}
      <div style={s.nav}>
        <span style={s.logo}>Unmask</span>
        <span style={s.tagline}>{modelReady ? 'AI Filter Removal' : 'Loading AI…'}</span>
      </div>

      <div style={s.content}>
        {/* Hero */}
        {!originalUrl && (
          <div style={s.hero}>
            <h1 style={s.title}>See what's <span style={s.accent}>actually</span> there</h1>
            <p style={s.subtitle}>On-device filter removal • Face-aware processing • Forensic analysis</p>

            <div style={s.features}>
              {[
                ['🧠', 'Face-Aware Unsharp', 'Stronger restoration inside detected face region'],
                ['🎨', 'Color Cast Removal', 'Per-channel histogram stretch removes filter tints'],
                ['🌗', 'Adaptive Contrast', 'Gamma correction restores natural midtones'],
                ['🔬', 'Forensic Scoring', 'ELA + SSIM measures what was removed'],
              ].map(([icon, label, desc]) => (
                <div key={label} style={s.feature}>
                  <span style={s.fIcon}>{icon}</span>
                  <div><p style={s.fLabel}>{label}</p><p style={s.fDesc}>{desc}</p></div>
                </div>
              ))}
            </div>

            <div style={s.strengthRow}>
              <p style={s.sLabel}>Removal Strength</p>
              <div style={s.pills}>
                {STRENGTHS.map(({ label, v }) => (
                  <button key={v} style={{ ...s.pill, ...(strength === v ? s.pillActive : {}) }} onClick={() => setStrength(v)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div style={s.btnRow}>
              <button style={s.ctaBtn} onClick={() => fileInputRef.current.click()}>Gallery</button>
              <button style={{ ...s.ctaBtn, background: '#7000ff' }} onClick={() => cameraInputRef.current.click()}>Camera</button>
            </div>

            <p style={s.disclaimer}>All processing runs in your browser. Nothing is uploaded.</p>
          </div>
        )}

        {/* Stepper */}
        {processing && (
          <div style={s.stepper}>
            <div style={s.spinner} />
            {STEPS.map((label, i) => (
              <p key={label} style={{ ...s.stepText, ...(i < step ? s.stepDone : i === step ? s.stepActive : {}) }}>
                {i < step ? '✓ ' : i === step ? '› ' : '  '}{label}
              </p>
            ))}
          </div>
        )}

        {/* Error */}
        {error && <p style={s.error}>{error}</p>}

        {/* Results */}
        {originalUrl && restoredUrl && !processing && (
          <>
            <p style={s.sectionTitle}>Before / After — drag to compare</p>
            <ComparisonSlider originalUrl={originalUrl} restoredUrl={restoredUrl} />
            <ForensicsPanel forensics={forensics} />

            <div style={s.actions}>
              <div style={s.actionRow}>
                <button style={s.saveBtn} onClick={download}>{saved ? '✓ Saved' : 'Download'}</button>
                <button style={s.shareBtn} onClick={share}>Share</button>
              </div>

              <div style={s.pills}>
                {STRENGTHS.map(({ label, v }) => (
                  <button key={v} style={{ ...s.pill, ...(strength === v ? s.pillActive : {}) }} onClick={() => setStrength(v)}>
                    {label}
                  </button>
                ))}
              </div>

              <div style={s.retryRow}>
                <button style={s.retryBtn} onClick={() => process(originalUrl)}>Re-process</button>
                <button style={s.retryBtn} onClick={() => fileInputRef.current.click()}>New Photo</button>
                <button style={s.retryBtn} onClick={() => cameraInputRef.current.click()}>Camera</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const s = {
  app: { minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  nav: { padding: '18px 24px', display: 'flex', alignItems: 'baseline', gap: 10 },
  logo: { fontSize: 24, fontWeight: 800, color: '#00d4ff', letterSpacing: -0.5 },
  tagline: { fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 },
  content: { maxWidth: 640, margin: '0 auto', padding: '0 20px 60px' },
  hero: { paddingTop: 20 },
  title: { fontSize: 38, fontWeight: 800, lineHeight: 1.15, letterSpacing: -1 },
  accent: { color: '#ff00ff' },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 12, lineHeight: 1.6 },
  features: { marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18 },
  feature: { display: 'flex', gap: 14, alignItems: 'flex-start' },
  fIcon: { fontSize: 22, width: 32, textAlign: 'center', flexShrink: 0 },
  fLabel: { fontWeight: 600, fontSize: 15, marginBottom: 2 },
  fDesc: { fontSize: 13, color: 'rgba(255,255,255,0.45)' },
  strengthRow: { marginTop: 36 },
  sLabel: { fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 10 },
  pills: { display: 'flex', gap: 10 },
  pill: { flex: 1, padding: '10px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.45)', fontWeight: 600, fontSize: 14, cursor: 'pointer' },
  pillActive: { borderColor: '#00d4ff', background: 'rgba(0,212,255,0.1)', color: '#00d4ff' },
  btnRow: { display: 'flex', gap: 12, marginTop: 28 },
  ctaBtn: { flex: 1, padding: '18px 0', borderRadius: 16, border: 'none', background: '#00d4ff', color: '#0a0a0f', fontWeight: 800, fontSize: 17, cursor: 'pointer' },
  disclaimer: { textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: 12, marginTop: 14 },
  stepper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '60px 0' },
  spinner: { width: 40, height: 40, border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid #00d4ff', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 14 },
  stepText: { fontSize: 14, color: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start' },
  stepActive: { color: '#00d4ff', fontWeight: 600 },
  stepDone: { color: 'rgba(0,255,136,0.7)' },
  error: { color: '#ff4444', padding: '20px 0', textAlign: 'center' },
  sectionTitle: { fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '24px 0 12px' },
  actions: { marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  actionRow: { display: 'flex', gap: 12 },
  saveBtn: { flex: 1, padding: '16px 0', borderRadius: 14, border: 'none', background: '#00ff88', color: '#0a0a0f', fontWeight: 800, fontSize: 15, cursor: 'pointer' },
  shareBtn: { flex: 1, padding: '16px 0', borderRadius: 14, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer' },
  retryRow: { display: 'flex', gap: 10 },
  retryBtn: { flex: 1, padding: '13px 0', borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: 13, cursor: 'pointer' },
}

// Inject spinner keyframes
const style = document.createElement('style')
style.textContent = '@keyframes spin { to { transform: rotate(360deg) } }'
document.head.appendChild(style)
