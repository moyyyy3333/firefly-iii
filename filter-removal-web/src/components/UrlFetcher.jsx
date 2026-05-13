import React, { useState } from 'react'
import { fetchPostImageUrl, cdnUrlToObjectUrl } from '../utils/apify'

const LS_KEY = 'unmask_apify_token'

export default function UrlFetcher({ onObjectUrl, onCdnUrl }) {
  const [url, setUrl] = useState('')
  const [token, setToken] = useState(() => localStorage.getItem(LS_KEY) ?? '')
  const [showKey, setShowKey] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cdnResult, setCdnResult] = useState(null)

  const saveToken = (v) => {
    setToken(v)
    localStorage.setItem(LS_KEY, v)
  }

  const handleFetch = async () => {
    const trimmed = url.trim()
    if (!trimmed) return
    if (!token) { setError('Add your Apify API token below first'); setShowKey(true); return }

    setLoading(true)
    setError(null)
    setCdnResult(null)

    try {
      const imageUrl = await fetchPostImageUrl(trimmed, token)
      const objectUrl = await cdnUrlToObjectUrl(imageUrl)

      if (objectUrl) {
        onObjectUrl(objectUrl)
      } else {
        // CDN blocked CORS — surface raw URL so user can save & upload manually
        setCdnResult(imageUrl)
        onCdnUrl?.(imageUrl)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.wrap}>
      <p style={s.label}>Or fetch from social media via Apify</p>

      <div style={s.row}>
        <input
          style={s.input}
          placeholder="instagram.com/p/… · tiktok.com/@…/video/…"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleFetch()}
        />
        <button
          style={{ ...s.btn, opacity: loading ? 0.55 : 1 }}
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? '…' : 'Fetch'}
        </button>
      </div>

      <div style={s.keyRow}>
        <button style={s.keyToggle} onClick={() => setShowKey(v => !v)}>
          {token ? (showKey ? 'Hide Apify key' : 'Apify key saved ✓') : 'Set Apify API key'}
        </button>
        {showKey && (
          <input
            style={{ ...s.input, fontSize: 12, marginTop: 8 }}
            type="password"
            placeholder="apify_api_xxxxxxxxxxxxxxxx"
            value={token}
            onChange={e => saveToken(e.target.value)}
          />
        )}
      </div>

      {error && <p style={s.error}>{error}</p>}

      {cdnResult && (
        <div style={s.corsBox}>
          <p style={s.corsMsg}>
            CDN blocked direct fetch (normal for Instagram). Open the image below, save it, then upload above.
          </p>
          <a href={cdnResult} target="_blank" rel="noreferrer" style={s.cdnLink}>
            Open original image →
          </a>
        </div>
      )}

      <p style={s.note}>Powered by Apify · post image is fetched via Apify servers</p>
    </div>
  )
}

const s = {
  wrap: { marginTop: 32, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' },
  label: { fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 10 },
  row: { display: 'flex', gap: 8 },
  input: {
    flex: 1, padding: '12px 14px', borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)',
    color: '#fff', fontSize: 14, outline: 'none',
  },
  btn: {
    padding: '12px 20px', borderRadius: 12, border: 'none',
    background: '#7000ff', color: '#fff', fontWeight: 700, fontSize: 14,
    cursor: 'pointer', whiteSpace: 'nowrap',
  },
  keyRow: { marginTop: 8 },
  keyToggle: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, cursor: 'pointer', padding: 0 },
  error: { color: '#ff4444', fontSize: 13, marginTop: 8 },
  corsBox: { marginTop: 10, padding: '12px 14px', background: 'rgba(255,170,0,0.07)', borderRadius: 10, border: '1px solid rgba(255,170,0,0.2)' },
  corsMsg: { color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 6 },
  cdnLink: { color: '#ffaa00', fontSize: 13, fontWeight: 600 },
  note: { color: 'rgba(255,255,255,0.2)', fontSize: 11, marginTop: 8 },
}
