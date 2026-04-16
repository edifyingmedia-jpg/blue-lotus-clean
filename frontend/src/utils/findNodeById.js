// frontend/src/utils/findNodeById.js

/**
 * findNodeById (Empire Edition)
 * ----------------------------
 * Recursively scans the neural manifest to locate a specific node.
 * Essential for targeted actuation and 10% revenue tracking.
 */
export function findNodeById(node, id) {
  if (!node) {
    return null;
  }

  // Exact Match Actuation
  if (node.id === id) {
    return node;
  }

  // Recursive Branch Scanning
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }

  // Fallback for terminal nodes or failed lookups
  return null;
}

/**
 * findNodeWithReport
 * -----------------
 * A hardened version that logs failures to the industrial console.
 */
export function findNodeWithReport(node, id) {
  const result = findNodeById(node, id);
  if (!result) {
    console.warn(`TRAVERSAL_WARNING: Node ID [${id}] not found in manifest.`);
  }
  return result;
}
