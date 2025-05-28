const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return { ...tree };
    }

    tree.items = tree.items.map((child) =>
      insertNode(child, folderId, item, isFolder)
    );
    return { ...tree };
  };

  const deleteNode = (tree, nodeId) => {
    tree.items = tree.items
      .filter((item) => item.id !== nodeId)
      .map((item) =>
        item.isFolder ? deleteNode(item, nodeId) : item
      );
    return { ...tree };
  };

  const renameNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      tree.name = newName;
      return { ...tree };
    }

    tree.items = tree.items.map((item) =>
      renameNode(item, nodeId, newName)
    );
    return { ...tree };
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
