// backend/publish.js - The Sovereign Hand
export async function publishToGithub(files, repoName) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER;

  if (!GITHUB_TOKEN || !OWNER) {
    throw new Error("Sovereign Credentials Missing (GITHUB_TOKEN or OWNER)");
  }

  try {
    // 1. Create the Repo
    const repoRes = await fetch(`https://api.github.com/user/repos`, {
      method: 'POST',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: repoName, auto_init: true }),
    });

    // 2. Push the Blueprint Files
    for (const file of files) {
      const contentBase64 = btoa(file.content);
      
      // Check if file exists to get SHA (for updates)
      const existing = await fetch(
        `https://api.github.com/repos/${OWNER}/${repoName}/contents/${file.path}`,
        { headers: { Authorization: `token ${GITHUB_TOKEN}` } }
      ).then(res => res.json().catch(() => ({})));

      await fetch(`https://api.github.com/repos/${OWNER}/${repoName}/contents/${file.path}`, {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: "Nexus-TWIN: Sovereign Build Executed",
          content: contentBase64,
          sha: existing.sha || undefined
        }),
      });
    }

    return { success: true, repoUrl: `https://github.com/${OWNER}/${repoName}` };
  } catch (error) {
    console.error("Publishing Failed:", error);
    throw error;
  }
}
