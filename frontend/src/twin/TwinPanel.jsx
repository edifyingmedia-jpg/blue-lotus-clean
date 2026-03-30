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
            { id: 't1', type: 'text', text: 'Recommended Videos' },
            { id: 'v1', type: 'video', src: '' }
          ]
        },
        {
          id: 'watch',
          title: 'Watch',
          components: [
            { id: 'v2', type: 'video', src: '' },
            { id: 't2', type: 'text', text: 'Video description' }
          ]
        },
        {
          id: 'upload',
          title: 'Upload',
          components: [
            { id: 't3', type: 'text', text: 'Upload a video' },
            { id: 'b1', type: 'button', label: 'Upload' }
          ]
        }
      ]
    }

    onBuild(app)

    return {
      id: id(),
      role: 'twin',
      text:
        'YouTube‑style MVP rendered.\n\n' +
        'Feed, Watch, and Upload pages are live in the canvas.\n' +
        'Tell me what to change or what to add next.'
    }
  }

  return {
    id: id(),
    role: 'twin',
    text: 'Executing inferred build.'
  }
}
