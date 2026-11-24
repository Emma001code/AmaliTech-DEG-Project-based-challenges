import { useState } from 'react'
import './App.css'
import vaultData from '../data.json'
import TreeNode from './components/TreeNode'
import FileLocation from './components/FileLocation'

// Build a flat list of rows the user can currently see.
// Children only appear if their parent folder id is in expandedIds.
function getVisibleRows(nodes, expandedIds) {
  const rows = []

  function walk(list) {
    for (const node of list) {
      rows.push(node)

      if (
        node.type === 'folder' &&
        expandedIds.includes(node.id) &&
        node.children?.length
      ) {
        walk(node.children)
      }
    }
  }

  walk(nodes)
  return rows
}

// Tree traversal: find the chain of nodes from root -> target id.
// Example: [Legal, Active_Cases, Doe_vs_..., Discovery_Phase, Email.pdf]
function findPathToNode(nodes, targetId, path = []) {
  for (const node of nodes) {
    const nextPath = [...path, node]

    if (node.id === targetId) {
      return nextPath
    }

    if (node.children?.length) {
      const found = findPathToNode(node.children, targetId, nextPath)
      if (found) return found
    }
  }

  return null
}

function App() {
  const rootItems = vaultData

  const [selectedFile, setSelectedFile] = useState(null)
  const [expandedIds, setExpandedIds] = useState([])
  const [focusedId, setFocusedId] = useState(rootItems[0]?.id ?? null)
  // Short feedback after copying the path
  const [copyDone, setCopyDone] = useState(false)

  // Path for the selected file (used by wildcard File Location panel)
  const selectedPath = selectedFile
    ? findPathToNode(rootItems, selectedFile.id)
    : null

  function getFileTypeLabel(file) {
    const parts = file.name.split('.')
    if (parts.length < 2) return 'File'
    return parts[parts.length - 1].toUpperCase()
  }

  function toggleFolder(id) {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  function expandFolder(id) {
    setExpandedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  function collapseFolder(id) {
    setExpandedIds((prev) => prev.filter((x) => x !== id))
  }

  // Wildcard: open every folder on the way to this folder, then focus it
  function jumpToFolder(folderId) {
    const path = findPathToNode(rootItems, folderId)
    if (!path) return

    const folderIdsOnPath = path
      .filter((item) => item.type === 'folder')
      .map((item) => item.id)

    setExpandedIds((prev) => {
      const merged = new Set([...prev, ...folderIdsOnPath])
      return [...merged]
    })
    setFocusedId(folderId)
  }

  // Wildcard: copy "Legal / Active_Cases / ... / file.pdf" for sharing
  async function copyFullPath() {
    if (!selectedPath) return

    const pathText = selectedPath.map((item) => item.name).join(' / ')

    try {
      await navigator.clipboard.writeText(pathText)
      setCopyDone(true)
      // Reset the button label after a moment
      window.setTimeout(() => setCopyDone(false), 1500)
    } catch {
      // Fallback if clipboard permission is blocked
      window.prompt('Copy this path:', pathText)
    }
  }

  function handleExplorerKeyDown(event) {
    const visible = getVisibleRows(rootItems, expandedIds)
    if (visible.length === 0) return

    const currentIndex = Math.max(
      0,
      visible.findIndex((n) => n.id === focusedId),
    )
    const current = visible[currentIndex]

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      const next = visible[Math.min(visible.length - 1, currentIndex + 1)]
      setFocusedId(next.id)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      const prev = visible[Math.max(0, currentIndex - 1)]
      setFocusedId(prev.id)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      if (current?.type === 'folder') {
        expandFolder(current.id)
      }
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      if (current?.type === 'folder') {
        collapseFolder(current.id)
      }
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      if (current?.type === 'file') {
        setSelectedFile(current)
      }
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__logo" aria-hidden="true" />
          <div>
            <h1 className="app__title">SecureVault</h1>
            <p className="app__subtitle">Document workspace</p>
          </div>
        </div>
      </header>

      <main className="app__main">
        <section
          className="app__explorer"
          aria-label="File explorer"
          tabIndex={0}
          onKeyDown={handleExplorerKeyDown}
        >
          <div className="tree">
            {rootItems.map((item) => (
              <TreeNode
                key={item.id}
                node={item}
                depth={0}
                selectedId={selectedFile?.id ?? null}
                focusedId={focusedId}
                expandedIds={expandedIds}
                onToggleFolder={toggleFolder}
                onSelectFile={setSelectedFile}
                onFocusNode={setFocusedId}
              />
            ))}
          </div>
        </section>

        <aside className="app__properties" aria-label="File properties">
          <h2 className="app__panel-title">Properties</h2>

          {!selectedFile && (
            <p className="app__placeholder">Select a file to inspect.</p>
          )}

          {selectedFile && (
            <>
              <dl className="props">
                <div className="props__row">
                  <dt className="props__label">Name</dt>
                  <dd className="props__value">{selectedFile.name}</dd>
                </div>
                <div className="props__row">
                  <dt className="props__label">Type</dt>
                  <dd className="props__value">
                    {getFileTypeLabel(selectedFile)}
                  </dd>
                </div>
                <div className="props__row">
                  <dt className="props__label">Size</dt>
                  <dd className="props__value">{selectedFile.size}</dd>
                </div>
              </dl>

              {/* Wildcard: path + jump + copy */}
              {selectedPath && (
                <FileLocation
                  path={selectedPath}
                  onJumpToFolder={jumpToFolder}
                  onCopyPath={copyFullPath}
                  copyDone={copyDone}
                />
              )}
            </>
          )}
        </aside>
      </main>

      <footer className="app__status">
        <span>↑↓ Navigate</span>
        <span>← → Folders</span>
        <span>Enter Select</span>
        <span>
          {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
        </span>
      </footer>
    </div>
  )
}

export default App
