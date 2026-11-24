// One row in the explorer. Can render more TreeNodes for children (recursion).
// Expand / focus / selection state come from App so keyboard can control them too.
function TreeNode({
  node,
  depth = 0,
  selectedId,
  focusedId,
  expandedIds, // list of open folder ids owned by App
  onToggleFolder,
  onSelectFile,
  onFocusNode,
}) {
  const isFolder = node.type === 'folder'
  // Is this folder currently open? App stores that in expandedIds.
  const folderExpanded = isFolder && expandedIds.includes(node.id)
  // Selected = file shown in Properties (mouse click or Enter)
  const isSelected = !isFolder && node.id === selectedId
  // Focused = keyboard outline (can be a folder OR a file)
  const isFocused = node.id === focusedId
  // Indent deeper levels (16px per level, from your Figma)
  const paddingLeft = depth * 16

  function handleRowClick() {
    // Clicking also moves keyboard focus to this row
    onFocusNode(node.id)

    if (isFolder) {
      // Folders: open / close
      onToggleFolder(node.id)
    } else {
      // Files: show details in Properties
      onSelectFile(node)
    }
  }

  return (
    <div className="tree-node">
      <button
        type="button"
        className={[
          'tree-node__row',
          isSelected ? 'is-selected' : '',
          isFocused ? 'is-focused' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ paddingLeft }}
        onClick={handleRowClick}
      >
        {/* Chevron only for folders */}
        <span className="tree-node__chevron" aria-hidden="true">
          {isFolder ? (folderExpanded ? '▼' : '▶') : ''}
        </span>

        <span className="tree-node__icon" aria-hidden="true">
          {isFolder ? '📁' : '📄'}
        </span>

        <span className="tree-node__name">{node.name}</span>

        {isSelected && (
          <span className="tree-node__check" aria-hidden="true">
            ✓
          </span>
        )}
      </button>

      {/* RECURSION: if this folder is open, render TreeNode for each child */}
      {isFolder && folderExpanded && node.children?.length > 0 && (
        <div className="tree-node__children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              focusedId={focusedId}
              expandedIds={expandedIds}
              onToggleFolder={onToggleFolder}
              onSelectFile={onSelectFile}
              onFocusNode={onFocusNode}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeNode
