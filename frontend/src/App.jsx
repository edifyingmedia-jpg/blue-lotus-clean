import { useState } from 'react'
import BuilderShell from './builder/BuilderShell'

export default function App() {
  const [stage, setStage] = useState('locked')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'lotus-owner') {
      setStage('welcome')
    } else {
      alert('Access denied')
    }
  }

  if (stage === 'locked') {
    return (
      <Screen>
        <form onSubmit={handleLogin}>
          <h2>Blue Lotus Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Enter
          </button>
        </form>
      </Screen>
    )
  }

  if (stage === 'welcome') {
    return (
      <Screen>
        <h1>Welcome, Tiffany</h1>
        <p>TWIN is online and ready.</p>
        <button onClick={() => setStage('builder')} style={buttonStyle}>
          Enter Builder
        </button>
      </Screen>
    )
  }

  return <BuilderShell />
}

function Screen({ children }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        color: '#e5e7eb',
        fontFamily: 'system-ui',
        textAlign: 'center'
      }}
    >
      <div>{children}</div>
    </div>
  )
}

const inputStyle = {
  padding: '8px',
  marginTop: '10px',
  width: '200px'
}

const buttonStyle = {
  marginTop: '12px',
  padding: '8px 16px',
  cursor: 'pointer'
}
