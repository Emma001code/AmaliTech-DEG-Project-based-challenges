import './App.csswill'

function App() {
  return (
    // Full-page SecureVault shell (header + main + status bar)
    <div className="app">
     
      <header className="app__header">
        <div className="app__brand">
          {/* Simple logo block for now; will swap for a real icon later */}
          <span className="app__logo" aria-hidden="true" />
          <div>
            <h1 className="app__title">SecureVault</h1>
            <p className="app__subtitle">Document workspace</p>
          </div>
        </div>
      </header>

      {/* Main workspace: left explorer (~60%) + right properties (~40%) */}
      <main className="app__main">
        {/* File tree will go here in the next steps */}
        <section className="app__explorer" aria-label="File explorer">
          <p className="app__placeholder">Explorer (tree goes here)</p>
        </section>

        {/* Selected file details will go here later */}
        <aside className="app__properties" aria-label="File properties">
          <h2 className="app__panel-title">Properties</h2>
          <p className="app__placeholder">Select a file to inspect.</p>
        </aside>
      </main>

      {/* Bottom status bar (selection count / shortcuts later) */}
      <footer className="app__status">
        <span>Ready</span>
      </footer>
    </div>
  )
}

export default App