import {
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconFile,
  IconFolder,
} from './Icons'

// One row in the explorer. Can render more TreeNodes for children (recursion).
// Expand / focus / selection state come from App so keyboard can control them too.
function TreeNode({
  node,
  depth = 0,
  selectedId,
  focusedId,
  expandedIds,
  onToggleFolder,
  onSelectFile,
  onFocusNode,
}) {
  const isFolder = node.type === 'folder'
  const folderExpanded = isFolder && expandedIds.includes(node.id)
  const isSelected = !isFolder && node.id === selectedId
  const isFocused = node.id === focusedId
  const paddingLeft = depth * 16

  function handleRowClick() {
    onFocusNode(node.id)

    if (isFolder) {
      onToggleFolder(node.id)
    } else {
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
        {/* Chevron only for folders — SVG matches Figma outline style */}
        <span className="tree-node__chevron" aria-hidden="true">
          {isFolder ? (
            folderExpanded ? (
              <IconChevronDown />
            ) : (
              <IconChevronRight />
            )
          ) : null}
        </span>

        <span className="tree-node__icon" aria-hidden="true">
          {isFolder ? <IconFolder /> : <IconFile />}
        </span>

        <span className="tree-node__name">{node.name}</span>

        {isSelected && (
          <span className="tree-node__check" aria-hidden="true">
            <IconCheck />
          </span>
        )}
      </button>

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
