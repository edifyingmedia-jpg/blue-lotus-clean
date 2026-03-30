import { useMemo, useState } from 'react'

export default function TwinPanel() {
  const [command, setCommand] = useState('')
  const [items, setItems] = useState([
    {
      id: cryptoRandomId(),
      type: 'system',
      text: 'TWIN online. Give me a command—keep it plain and specific.'
    }
  ])

  const canSend = useMemo(() => command.trim().length > 0, [command])

  const send = () => {
    const text = command.trim()
    if (!text) return

    const userItem = { id: cryptoRandomId(), type: 'user', text }
    const twinItem = {
      id: cryptoRandomId(),
      type: 'twin',
      text:
        'Received. I will translate this into a proposal next—then you approve execution.'
    }

    setItems((prev) => [...prev, userItem, twinItem])
    setCommand('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    send()
  }

  const clear = () => {
    setItems([
      {
        id: cryptoRandomId(),
        type: 'system',
        text: 'Cleared. New session—what are we building?'
      }
    ])
  }

  return (
    <div style={panelStyle}>
      <div style={topBarStyle}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
          <strong style={{ fontSize: '14px' }}>TWIN</strong>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Command panel</span>
        </div>

        <button type="button" onClick={clear} style={ghostButtonStyle}>
          Clear
        </button>
      </div>

      <div style={logStyle} aria-label="TWIN message log">
        {items.map((it) => (
          <div key={it.id} style={bubbleWrapStyle(it.type)}>
            <div style={bubbleStyle(it.type)}>
              <div style={bubbleLabelStyle(it.type)}>{labelFor(it.type)}</div>
              <div style={bubbleTextStyle}>{it.text}</div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} style={composerStyle}>
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Type a command… (e.g., 'Create a button component and render it on the canvas')"
          style={textareaStyle}
          rows={3}
        />
        <div style={composerActionsStyle}>
          <button type="submit" disabled={!canSend} style={primaryButtonStyle(!canSend)}>
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

function labelFor(type) {
  if (type === 'user') return 'You'
  if (type === 'twin') return 'TWIN'
  return 'System'
}

function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return String(Date.now()) + '-' + String(Math.random()).slice(2)
}

const panelStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
}

const topBarStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}

const logStyle = {
  flex: 1,
  overflow: 'auto',
  padding: '8px',
  border: '1px solid #1e293b',
  borderRadius: '10px',
  background: '#0b1220'
}

const bubbleWrapStyle = (type) => ({
  display: 'flex',
  justifyContent: type === 'user' ? 'flex-end' : 'flex-start',
  marginBottom: '8px'
})

const bubbleStyle = (type) => ({
  maxWidth: '92%',
  padding: '10px 10px 8px',
  borderRadius: '12px',
  border: '1px solid #1e293b',
  background:
    type === 'user'
      ? '#0f172a'
      : type === 'twin'
      ? '#0a1a2f'
      : '#0b1220'
})

const bubbleLabelStyle = (type) => ({
  fontSize: '11px',
  color: type === 'user' ? '#a5b4fc' : type === 'twin' ? '#67e8f9' : '#94a3b8',
  marginBottom: '4px'
})

const bubbleTextStyle = {
  fontSize: '13px',
  lineHeight: 1.35,
  color: '#e5e7eb',
  whiteSpace: 'pre-wrap'
}

const composerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
}

const textareaStyle = {
  width: '100%',
  resize: 'none',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: '#0b1220',
  color: '#e5e7eb',
  outline: 'none',
  fontFamily: 'system-ui'
}

const composerActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end'
}

const primaryButtonStyle = (disabled) => ({
  padding: '8px 12px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: disabled ? '#0b1220' : '#1d4ed8',
  color: disabled ? '#64748b' : '#e5e7eb',
  cursor: disabled ? 'not-allowed' : 'pointer'
})

const ghostButtonStyle = {
  padding: '6px 10px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: '#0b1220',
  color: '#cbd5e1',
  cursor: 'pointer'
}
