import { useState } from 'react'
import './App.css'
import vaultData from '../data.json'
import TreeNode from './components/TreeNode'

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
        // Recurse into open folders only
        walk(node.children)
      }
    }
  }

  walk(nodes)
  return rows
}

function App() {
  const rootItems = vaultData

  // File shown in the Properties panel (null = empty state)
  const [selectedFile, setSelectedFile] = useState(null)
  // Which folders are open (we store their ids)
  const [expandedIds, setExpandedIds] = useState([])
  // Which row has the keyboard focus ring
  const [focusedId, setFocusedId] = useState(rootItems[0]?.id ?? null)

  // "report.pdf" -> "PDF"
  function getFileTypeLabel(file) {
    const parts = file.name.split('.')
    if (parts.length < 2) return 'File'
    return parts[parts.length - 1].toUpperCase()
  }

  // Click / toggle: open if closed, close if open
  function toggleFolder(id) {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }

  // Keyboard → : force open
  function expandFolder(id) {
    setExpandedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  // Keyboard ← : force close
  function collapseFolder(id) {
    setExpandedIds((prev) => prev.filter((x) => x !== id))
  }

  // Runs when the explorer panel has focus and a key is pressed
  function handleExplorerKeyDown(event) {
    const visible = getVisibleRows(rootItems, expandedIds)
    if (visible.length === 0) return

    // Find where the focus ring is right now
    const currentIndex = Math.max(
      0,
      visible.findIndex((n) => n.id === focusedId),
    )
    const current = visible[currentIndex]

    if (event.key === 'ArrowDown') {
      event.preventDefault() // stop page scroll
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
        {/* tabIndex={0} makes this section focusable so keys work here */}
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
            <dl className="props">
              <div className="props__row">
                <dt className="props__label">Name</dt>
                <dd className="props__value">{selectedFile.name}</dd>
              </div>
              <div className="props__row">
                <dt className="props__label">Type</dt>
                <dd className="props__value">{getFileTypeLabel(selectedFile)}</dd>
              </div>
              <div className="props__row">
                <dt className="props__label">Size</dt>
                <dd className="props__value">{selectedFile.size}</dd>
              </div>
            </dl>
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
