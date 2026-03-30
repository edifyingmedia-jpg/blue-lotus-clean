import { useState } from 'react'

export default function App() {
  const [authorized, setAuthorized] = useState(false)
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === 'lotus-owner') {
      setAuthorized(true)
    } else {
      alert('Access denied')
    }
  }

  if (!authorized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#e5e7eb',
          fontFamily: 'system-ui'
        }}
      >
        <form onSubmit={handleSubmit}>
          <h2>Blue Lotus Access</h2>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '8px', marginTop: '10px' }}
          />
          <br />
          <button
            type="submit"
            style={{ marginTop: '10px', padding: '8px' }}
          >
            Enter
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Blue Lotus Builder</h1>
      <p>Authorized access granted.</p>
    </div>
  )
}
