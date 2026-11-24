import { useState } from 'react'
import './App.css'
import vaultData from '../data.json'
import TreeNode from './components/TreeNode'

function App() {
  const rootItems = vaultData

  // null = nothing selected yet; otherwise holds the clicked file object
  const [selectedFile, setSelectedFile] = useState(null)

  // Turn "Email_Thread_Jan2024.pdf" into a readable type like "PDF"
  function getFileTypeLabel(file) {
    const parts = file.name.split('.')
    if (parts.length < 2) return 'File'
    return parts[parts.length - 1].toUpperCase()
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
        <section className="app__explorer" aria-label="File explorer">
          <div className="tree">
            {rootItems.map((item) => (
              <TreeNode
                key={item.id}
                node={item}
                depth={0}
                // Share selection state with every node in the tree
                selectedId={selectedFile?.id ?? null}
                onSelectFile={setSelectedFile}
              />
            ))}
          </div>
        </section>

        <aside className="app__properties" aria-label="File properties">
          <h2 className="app__panel-title">Properties</h2>

          {/* Empty state (Figma) when no file is selected */}
          {!selectedFile && (
            <p className="app__placeholder">Select a file to inspect.</p>
          )}

          {/* Filled state: Name, Type, Size from the selected file */}
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
        <span>
          {selectedFile ? `Selected: ${selectedFile.name}` : 'No file selected'}
        </span>
      </footer>
    </div>
  )
}

export default App