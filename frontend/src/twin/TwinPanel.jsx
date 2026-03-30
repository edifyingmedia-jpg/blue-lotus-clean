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

  const [pendingProposal, setPendingProposal] = useState(null)

  const canSend = useMemo(() => command.trim().length > 0, [command])

  const send = () => {
    const text = command.trim()
    if (!text) return

    const userItem = { id: cryptoRandomId(), type: 'user', text }
    const proposal = buildProposalFromCommand(text)

    if (proposal) {
      const twinItem = {
        id: cryptoRandomId(),
        type: 'twin',
        text: `Proposal ready: ${proposal.title}\nApprove to execute, or reject to revise.`
      }
      setItems((prev) => [...prev, userItem, twinItem])
      setPendingProposal(proposal)
    } else {
      const twinItem = {
        id: cryptoRandomId(),
        type: 'twin',
        text:
          "Received. I can propose next steps, but I need a clearer target.\nTry: 'Build a YouTube MVP: feed, watch page, upload UI, routing.'"
      }
      setItems((prev) => [...prev, userItem, twinItem])
    }

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
    setPendingProposal(null)
  }

  const approve = () => {
    if (!pendingProposal) return
    const approvedItem = {
      id: cryptoRandomId(),
      type: 'system',
      text: `Approved: ${pendingProposal.title}`
    }
    const execItem = {
      id: cryptoRandomId(),
      type: 'twin',
      text:
        'Execution stub: next we will generate files and wire routes. (No silent changes—everything will be paste-ready.)'
    }
    setItems((prev) => [...prev, approvedItem, execItem])
    setPendingProposal(null)
  }

  const reject = () => {
    if (!pendingProposal) return
    const rejectedItem = {
      id: cryptoRandomId(),
      type: 'system',
      text: `Rejected: ${pendingProposal.title} (Tell me what to change—scope, features, or timeline.)`
    }
    setItems((prev) => [...prev, rejectedItem])
    setPendingProposal(null)
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

        {pendingProposal ? (
          <div style={{ marginTop: '10px' }}>
            <ProposalCard proposal={pendingProposal} onApprove={approve} onReject={reject} />
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} style={composerStyle}>
        <textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Type a command… (e.g., 'Build a YouTube MVP: feed, watch page, upload UI, routing')"
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

function ProposalCard({ proposal, onApprove, onReject }) {
  return (
    <div style={proposalCardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <div>
          <div style={proposalTitleStyle}>{proposal.title}</div>
          <div style={proposalMetaStyle}>{proposal.summary}</div>
        </div>
        <div style={proposalBadgeStyle}>Proposal</div>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div style={proposalSectionLabelStyle}>Scope</div>
        <ul style={proposalListStyle}>
          {proposal.scope.map((x) => (
            <li key={x} style={proposalListItemStyle}>
              {x}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '10px' }}>
        <div style={proposalSectionLabelStyle}>Out of scope</div>
        <ul style={proposalListStyle}>
          {proposal.outOfScope.map((x) => (
            <li key={x} style={proposalListItemStyle}>
              {x}
            </li>
          ))}
        </ul>
      </div>

      <div style={proposalActionsStyle}>
        <button type="button" onClick={onReject} style={proposalRejectStyle}>
          Reject
        </button>
        <button type="button" onClick={onApprove} style={proposalApproveStyle}>
          Approve
        </button>
      </div>
    </div>
  )
}

function buildProposalFromCommand(text) {
  const t = text.toLowerCase()

  const mentionsYoutube = t.includes('youtube')
  const mentionsClone = t.includes('clone')
  const mentionsMvp = t.includes('mvp') || t.includes('phase 1') || t.includes('skeleton')
  const mentionsFeed = t.includes('feed') || t.includes('home')
  const mentionsWatch = t.includes('watch') || t.includes('player')
  const mentionsUpload = t.includes('upload')

  if (mentionsYoutube && (mentionsClone || mentionsMvp || mentionsFeed || mentionsWatch || mentionsUpload)) {
    return {
      id: cryptoRandomId(),
      title: 'YouTube MVP (Phase 1)',
      summary: 'Feed + watch page + upload UI + routing. No backend/storage yet.',
      scope: [
        'Add routes: / (feed), /watch/:id (player), /upload (upload UI)',
        'Create Feed page with mock video list',
        'Create Watch page with video player + metadata',
        'Create Upload page UI (form only, handler stub)',
        'Keep owner-only gate as-is'
      ],
      outOfScope: [
        'Real video storage/transcoding',
        'Search, recommendations, subscriptions',
        'Comments/likes, channels, analytics',
        'Multi-user auth'
      ]
    }
  }

  return null
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

const proposalCardStyle = {
  border: '1px solid #1e293b',
  borderRadius: '12px',
  padding: '12px',
  background: '#07101f'
}

const proposalTitleStyle = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#e5e7eb'
}

const proposalMetaStyle = {
  marginTop: '4px',
  fontSize: '12px',
  color: '#94a3b8'
}

const proposalBadgeStyle = {
  alignSelf: 'flex-start',
  fontSize: '11px',
  padding: '4px 8px',
  borderRadius: '999px',
  border: '1px solid #1e293b',
  background: '#0b1220',
  color: '#67e8f9'
}

const proposalSectionLabelStyle = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#cbd5e1',
  marginBottom: '6px'
}

const proposalListStyle = {
  margin: 0,
  paddingLeft: '18px',
  color: '#e5e7eb',
  fontSize: '12px',
  lineHeight: 1.35
}

const proposalListItemStyle = {
  marginBottom: '4px'
}

const proposalActionsStyle = {
  marginTop: '12px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px'
}

const proposalRejectStyle = {
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: '#0b1220',
  color: '#cbd5e1',
  cursor: 'pointer'
}

const proposalApproveStyle = {
  padding: '8px 10px',
  borderRadius: '10px',
  border: '1px solid #1e293b',
  background: '#16a34a',
  color: '#052e16',
  cursor: 'pointer',
  fontWeight: 700
}
