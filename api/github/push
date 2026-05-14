// api/github-push.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const {
      owner,
      repo,
      branch = "main",
      filePath,
      content,
      message
    } = req.body;

    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return res.status(500).json({ success: false, error: "Missing GITHUB_TOKEN" });
    }

    const GITHUB_API = "https://api.github.com";

    // Step 1: Try to get existing file SHA
    let sha = null;
    try {
      const existing = await axios.get(
        `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      sha = existing.data.sha;
    } catch (err) {
      // File does not exist — SHA stays null
    }

    // Step 2: Create or update file
    const result = await axios.put(
      `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`,
      {
        message,
        content: Buffer.from(content).toString("base64"),
        branch,
        sha: sha || undefined
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    return res.status(200).json({
      success: true,
      url: result.data.content.html_url,
      commit: result.data.commit.sha
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });
  }
}
