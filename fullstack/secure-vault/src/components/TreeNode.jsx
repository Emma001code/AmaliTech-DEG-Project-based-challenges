import { useState } from 'react'

// One row in the explorer. Can render more TreeNodes for children.
// selectedId / onSelectFile come from App and are passed down the tree.
function TreeNode({ node, depth = 0, selectedId, onSelectFile }) {
  // Track if this folder is open. Files don't need this.
  const [folderExpanded, setfolderExpanded] = useState(false)

  const isFolder = node.type === 'folder'
  // True when this file is the one shown in Properties
  const isSelected = !isFolder && node.id === selectedId
  // Indent each nested level (16px per depth from your Figma)
  const paddingLeft = depth * 16

  function handleRowClick() {
    if (isFolder) {
      // Folders: open / close only
      setfolderExpanded((open) => !open)
    } else {
      // Files: tell App "this one is selected"
      onSelectFile(node)
    }
  }

  return (
    <div className="tree-node">
      <button
        type="button"
        // Add selected class when this file is active (Figma selected state)
        className={`tree-node__row${isSelected ? ' is-selected' : ''}`}
        style={{ paddingLeft }}
        onClick={handleRowClick}
      >
        {/* Chevron: > closed, v open. Empty for files. */}
        <span className="tree-node__chevron" aria-hidden="true">
          {isFolder ? (folderExpanded ? '▼' : '▶') : ''}
        </span>

        <span className="tree-node__icon" aria-hidden="true">
          {isFolder ? '📁' : '📄'}
        </span>

        <span className="tree-node__name">{node.name}</span>

        {/* Check mark like your Figma selected state */}
        {isSelected && (
          <span className="tree-node__check" aria-hidden="true">
            ✓
          </span>
        )}
      </button>

      {/* RECURSION: pass selectedId + onSelectFile to every child */}
      {isFolder && folderExpanded && node.children?.length > 0 && (
        <div className="tree-node__children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode