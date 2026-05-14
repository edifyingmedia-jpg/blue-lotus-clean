// /api/deploy.js
// Path: blue-lotus-clean/api/deploy.js

export default async function handler(req, res) {
  const { files, provider, repoName } = req.body;
  
  // These must be set in your Vercel Environment Variables when you get home
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;

  try {
    // Every deployment starts by manifesting to GitHub first
    // This ensures the client "owns" their code regardless of the provider
    const manifestRes = await fetch(`${req.headers.origin}/api/publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files, repoName })
    });

    if (provider === 'vercel') {
      // Vercel uses a Deploy Hook to pull the new GitHub repo
      await fetch(process.env.VERCEL_DEPLOY_HOOK, { method: 'POST' });
      return res.status(200).json({ success: true, provider: 'Vercel' });
    }

    if (provider === 'netlify') {
      // Netlify triggers via their Build Hook
      await fetch(process.env.NETLIFY_BUILD_HOOK, { method: 'POST' });
      return res.status(200).json({ success: true, provider: 'Netlify' });
    }

    return res.status(200).json({ success: true, message: "Manifested to GitHub" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
