export function findNodeById(node, id) {
  if (!node) return null;

  if (node.id === id) {
    return node;
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }

  return null;
}
