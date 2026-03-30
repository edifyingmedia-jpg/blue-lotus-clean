import TwinPanel from '../twin/TwinPanel'

export default function BuilderShell() {
  return (
    <div style={shellStyle}>
      <header style={headerStyle}>
        <strong>Blue Lotus Builder</strong>
        <span style={{ color: '#94a3b8' }}>TWIN Online</span>
      </header>

      <div style={bodyStyle}>
        <aside style={twinPanelStyle}>
          <TwinPanel />
        </aside>

        <main style={canvasStyle}>
          <h3 style={{ marginTop: 0 }}>Canvas</h3>
          <p style={{ color: '#cbd5e1' }}>Runtime surface will render here.</p>
        </main>
      </div>
    </div>
  )
}

const shellStyle = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'system-ui'
}

const headerStyle = {
  height: '48px',
  background: '#020617',
  color: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px'
}

const bodyStyle = {
  flex: 1,
  display: 'flex'
}

const twinPanelStyle = {
  width: '340px',
  background: '#020617',
  color: '#e5e7eb',
  padding: '12px',
  borderRight: '1px solid #1e293b'
}

const canvasStyle = {
  flex: 1,
  background: '#0f172a',
  color: '#e5e7eb',
  padding: '16px'
}
