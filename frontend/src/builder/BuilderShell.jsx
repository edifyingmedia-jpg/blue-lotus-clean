import { useState } from 'react'
import TwinPanel from '../twin/TwinPanel'
import CanvasRenderer from '../runtime/CanvasRenderer'

export default function BuilderShell() {
  const [app, setApp] = useState(null)

  return (
    <div style={shell}>
      <header style={header}>
        <strong>Blue Lotus Builder</strong>
        <span style={{ color: '#94a3b8' }}>Architect Mode</span>
      </header>

      <div style={body}>
        <aside style={left}>
          <TwinPanel onBuild={setApp} />
        </aside>

        <main style={right}>
          <CanvasRenderer app={app} />
        </main>
      </div>
    </div>
  )
}

const shell = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'
}

const header = {
  height: '48px',
  background: '#020617',
  color: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px'
}

const body = {
  flex: 1,
  display: 'flex'
}

const left = {
  width: '340px',
  background: '#020617',
  borderRight: '1px solid #1e293b',
  padding: '12px'
}

const right = {
  flex: 1,
  background: '#0f172a'
}
