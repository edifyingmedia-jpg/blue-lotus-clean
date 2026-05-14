// api/publish.js
// Nexus‑TWIN — The Sovereign Gate
// This function physically creates the repo and pushes the AI's blueprint.

export default async function handler(req, res) {
  // 1. Only allow POST requests (The 'Execute' command)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { files, repoName } = req.body;
  
  // 2. Access the Sovereign Keys from your Vercel Environment Variables
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;

  if (!GITHUB_TOKEN || !OWNER) {
    return res.status(500).json({ 
      error: "Sovereign Credentials Missing. Ensure GITHUB_TOKEN and NEXT_PUBLIC_GITHUB_OWNER are set in Vercel." 
    });
  }

  try {
    // 3. Create the Repository on GitHub
    const createRepoRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name: repoName, 
        auto_init: true,
        description: "A Sovereign Blueprint manifested via Nexus-TWIN / Blue Lotus Clean"
      }),
    });

    const repoData = await createRepoRes.json();
    if (!createRepoRes.ok) {
      throw new Error(repoData.message || 'GitHub Repository creation failed.');
    }

    // 4. Manifest (Push) the Blueprint Files
    for (const file of files) {
      // GitHub requires content to be Base64 encoded
      const contentBase64 = Buffer.from(file.content).toString('base64');
      
      const fileUrl = `https://api.github.com/repos/${OWNER}/${repoName}/contents/${file.path}`;
      
      await fetch(fileUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "Nexus-TWIN: Sovereign Manifestation",
          content: contentBase64,
        }),
      });
    }

    // 5. Success — Return the direct link to the new creation
    return res.status(200).json({ 
      success: true, 
      repoUrl: `https://github.com/${OWNER}/${repoName}` 
    });

  } catch (error) {
    console.error("Manifestation Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
