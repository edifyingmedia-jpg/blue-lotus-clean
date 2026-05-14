// lib/twin/twinEngine.js

export class TwinEngine {
  constructor({ owner, repo, branch = "main" }) {
    this.owner = owner;
    this.repo = repo;
    this.branch = branch;
  }

  async pushFile(filePath, content, message = "TWIN auto‑generated file") {
    const res = await fetch("/api/github-push", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        owner: this.owner,
        repo: this.repo,
        branch: this.branch,
        filePath,
        content,
        message
      })
    });

    return res.json();
  }

  async pushProject(fileMap) {
    const results = [];

    for (const filePath of Object.keys(fileMap)) {
      const content = fileMap[filePath];

      const result = await this.pushFile(
        filePath,
        content,
        `TWIN: created ${filePath}`
      );

      results.push({
        filePath,
        success: result.success,
        commit: result.commit,
        url: result.url,
        error: result.error
      });
    }

    return results;
  }
}
