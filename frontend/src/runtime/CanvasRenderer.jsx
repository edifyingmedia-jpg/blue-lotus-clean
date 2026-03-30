export default function CanvasRenderer({ app }) {
  if (!app) {
    return (
      <div style={emptyStyle}>
        <h3>Canvas</h3>
        <p>No app rendered yet.</p>
      </div>
    )
  }

  return (
    <div style={canvasStyle}>
      <h3>{app.name}</h3>

      {app.pages.map((page) => (
        <div key={page.id} style={pageStyle}>
          <h4>{page.title}</h4>

          {page.components.map((c) => (
            <Component key={c.id} def={c} />
          ))}
        </div>
      ))}
    </div>
  )
}

function Component({ def }) {
  switch (def.type) {
    case 'text':
      return <p>{def.text}</p>

    case 'button':
      return <button>{def.label}</button>

    case 'video':
      return (
        <video controls width="320">
          <source src={def.src} />
        </video>
      )

    default:
      return <div>Unknown component</div>
  }
}

const canvasStyle = {
  padding: '16px',
  color: '#e5e7eb'
}

const pageStyle = {
  marginBottom: '24px',
  padding: '12px',
  border: '1px solid #1e293b',
  borderRadius: '10px'
}

const emptyStyle = {
  padding: '16px',
  color: '#94a3b8'
}
