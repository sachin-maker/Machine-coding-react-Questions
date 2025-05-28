import React, { useState } from 'react';
import Folder from './Folder';
import explorer from './data';
import useTraverseTree from './hook';
import './style.css';

const FolderStructure = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorerData, nodeId);
    setExplorerData(finalTree);
  };

  const handleRenameNode = (nodeId, newName) => {
    const finalTree = renameNode(explorerData, nodeId, newName);
    setExplorerData(finalTree);
  };

  return (
    <div>
      <Folder
        explorer={explorerData}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  );
};

export default FolderStructure;
