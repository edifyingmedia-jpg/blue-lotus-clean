export default class ProjectLoader {
  static load(project) {
    if (!project || typeof project !== "object") {
      throw new Error("Invalid project definition");
    }

    // Ensure required fields exist
    return {
      name: project.name || "Untitled App",
      pages: project.pages || {},
      components: project.components || {},
      theme: project.theme || {},
      state: project.state || {},
    };
  }
}
