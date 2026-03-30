import { useMemo, useState } from 'react'

export default function TwinPanel({ onBuild }) {
  const [command, setCommand] = useState('')
  const [log, setLog] = useState([
    {
      id: id(),
      role: 'system',
      text:
        'TWIN online — Architect Mode active.\n' +
        'I will imagine the app and build immediately.\n' +
        'You can correct anything afterward.'
    }
  ])

  const canSend = useMemo(() => command.trim().length > 0, [command])

  const send = () => {
    const text = command.trim()
    if (!text) return

    const userMsg = { id: id(), role: 'user', text }
    const twinMsg = executeArchitectCommand(text, onBuild)

    setLog((prev) => [...prev, userMsg, twinMsg])
    setCommand('')
  }

  return (
    <div style={panel}>
      <header style={header}>
        <strong>TWIN</strong>
        <span style={sub}>Architect</span>
      </header>

      <div style={logBox}>
        {log.map((m) => (
          <div key={m.id} style={bubbleWrap(m.role)}>
            <div style={bubble(m.role)}>
              <div style={label(m.role)}>{m.role}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
        style={composer}
      >
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Build something…"
          rows={3}
          style={input}
        />
        <button disabled={!canSend} style={sendBtn(!canSend)}>
          Execute
        </button>
      </form>
    </div>
  )
}

/* ============================
   ARCHITECT EXECUTION LOGIC
============================ */

function executeArchitectCommand(text, onBuild) {
  const t = text.toLowerCase()

  if (t.includes('youtube')) {
    const app = {
      name: 'YouTube MVP',
      pages: [
        {
          id: 'feed',
          title: 'Feed',
          components: [
            {
              id: 'feed-title',
              type: 'text',
              text: 'Recommended Videos'
            },
            {
              id: 'feed-video',
              type: 'video',
              src: ''
            }
          ]
        },
        {
          id: 'watch',
          title: 'Watch',
          components: [
            {
              id: 'watch-video',
              type: 'video',
              src: ''
            },
            {
              id: 'watch-desc',
              type: 'text',
              text: 'Video description'
            }
          ]
        },
        {
          id: 'upload',
          title: 'Upload',
          components: [
            {
              id: 'upload-text',
              type: 'text',
              text: 'Upload a video'
            },
            {
              id: 'upload-button',
              type: 'button',
              label: 'Upload'
            }
          ]
        }
      ]
    }

    onBuild(app)

    return {
      id: id(),
      role: 'twin',
      text:
        'YouTube‑style MVP built and rendered.\n\n' +
        '• Feed page\n' +
        '• Watch page\n' +
        '• Upload UI\n\n' +
        'Tell me what looks wrong or what you want next.'
    }
  }

  return {
    id: id(),
    role: 'twin',
    text:
      'Executing inferred build.\n' +
      'I will construct the canonical structure and render it.\n' +
      'Correct me if anything is off.'
  }
}

/* ============================
   UTIL
============================ */

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString()
}

/* ============================
   STYLES
============================ */

const panel = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
}

const header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const sub = {
  fontSize: '12px',
  color: '#94a3b8'
}

const logBox = {
  flex: 1,
  overflow: 'auto',
  padding: '8px',
  border: '1px solid #1e293b',
  borderRadius: '10px',
  background: '#020617'
}

const bubbleWrap = (r) => ({
  display: 'flex',
  justifyContent: r === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: '8px'
})

const bubble = (r) => ({
  maxWidth: '90%',
  padding: '10px',
  borderRadius: '12px',
  background: r === 'user' ? '#0f172a' : '#07101f',
  border: '1px solid #1e293b'
})

const label = (r) => ({
  fontSize: '11px',
  color: r === 'user' ? '#a5b4fc' : '#67e8f9',
  marginBottom: '4px'
})

const composer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px'
}

const input = {
  resize: 'none',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: '#020617',
  color: '#e5e7eb'
}

const sendBtn = (disabled) => ({
  alignSelf: 'flex-end',
  padding: '8px 14px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: disabled ? '#020617' : '#2563eb',
  color: disabled ? '#64748b' : '#e5e7eb',
  cursor: disabled ? 'not-allowed' : 'pointer'
})
