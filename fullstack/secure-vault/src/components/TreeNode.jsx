import {useState} from 'react'

//One row in the explorer. can render more Treenodes for children.
function TreeNode({node, depth = 0}){
    //Track if this folder is open. Files dont need this.
    const [folderExpanded, setfolderExpanded] = useState(false)

    const isFolder = node.type === 'folder'
    //Indent each nested level (16px per depth from my figma Idea)
    const paddingLeft = depth * 16

    function handleRowClick(){
        //only folders can be expanded/collapsed
        if (isFolder){
            setfolderExpanded((open) => !open)
        }
    }
    return (
        <div className="tree-node">
          <button
            type="button"
            className="tree-node__row"
            style={{ paddingLeft }}
            onClick={handleRowClick}
          >
            {/* Chevron: > when closed, v when open. Spacer for files. */}
            <span className="tree-node__chevron" aria-hidden="true">
              {isFolder ? (folderExpanded ? '▼' : '▶') : ''}
            </span>
            <span className="tree-node__icon" aria-hidden="true">
              {isFolder ? '📁' : '📄'}
            </span>
            <span className="tree-node__name">{node.name}</span>
          </button>
          {/* RECURSION: if folder is open, render a TreeNode for each child */}
          {isFolder && folderExpanded && node.children?.length > 0 && (
            <div className="tree-node__children">
              {node.children.map((child) => (
                <TreeNode
                  key={child.id}
                  node={child}
                  depth={depth + 1} // go one level deeper
                />
              ))}
            </div>
          )}
        </div>
      )
}

// Make TreeNode available for App.jsx to import
export default TreeNode