// force redeploy
export default function BuilderShell() {
  return (
    <div style={shellStyle}>
      <header style={headerStyle}>
        <strong>Blue Lotus Builder</strong>
        <span>TWIN Online</span>
      </header>

      <div style={bodyStyle}>
        <aside style={twinPanelStyle}>
          <h3>TWIN</h3>
          <p>Command panel will live here.</p>
        </aside>

        <main style={canvasStyle}>
          <h3>Canvas</h3>
          <p>Runtime surface will render here.</p>
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
  width: '280px',
  background: '#020617',
  color: '#e5e7eb',
  padding: '16px',
  borderRight: '1px solid #1e293b'
}

const canvasStyle = {
  flex: 1,
  background: '#0f172a',
  color: '#e5e7eb',
  padding: '16px'
}
