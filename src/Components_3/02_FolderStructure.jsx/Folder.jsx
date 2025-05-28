import React, { useState } from "react";

const Folder = ({ handleInsertNode, handleDeleteNode, handleRenameNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({ visible: false, isFolder: false });
  const [renameMode, setRenameMode] = useState(false);
  const [renameValue, setRenameValue] = useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({ visible: true, isFolder });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ visible: false, isFolder: false });
    }
  };

  const onRename = (e) => {
    if (e.keyCode === 13 && renameValue.trim()) {
      handleRenameNode(explorer.id, renameValue.trim());
      setRenameMode(false);
    }
  };

  return (
    <div style={{ marginTop: 5 }}>
      <div onClick={() => setExpand(!expand)} className="folder">
        {renameMode ? (
          <input
            type="text"
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={onRename}
            onBlur={() => setRenameMode(false)}
            autoFocus
          />
        ) : (
          <span>{explorer.isFolder ? "📁" : "📄"} {explorer.name}</span>
        )}

        <div>
          {explorer.isFolder && (
            <>
              <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
              <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
            </>
          )}
          <button onClick={(e) => {
            e.stopPropagation();
            setRenameMode(true);
          }}>Rename</button>
          <button onClick={(e) => {
            e.stopPropagation();
            handleDeleteNode(explorer.id);
          }}>Delete</button>
        </div>
      </div>

      <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
        {showInput.visible && (
          <div className="inputContainer">
            <span>{showInput.isFolder ? "📁" : "📄"}</span>
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onKeyDown={onAddFolder}
              onBlur={() => setShowInput({ visible: false })}
            />
          </div>
        )}

        {explorer.items.map((item) => (
          <Folder
            key={item.id}
            explorer={item}
            handleInsertNode={handleInsertNode}
            handleDeleteNode={handleDeleteNode}
            handleRenameNode={handleRenameNode}
          />
        ))}
      </div>
    </div>
  );
};

export default Folder;
