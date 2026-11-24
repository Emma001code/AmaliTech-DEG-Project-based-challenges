import './App.css'
// Import the vault tree AmaliTech gave us (folders + files)
import vaultData from '../data.json'

function App() {
  // vaultData is an array of root items (Legal, Finance, files, etc.)
  const rootItems = vaultData

  return (
    // Full-page SecureVault shell (header + main + status bar)
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          {/* Simple logo block for now; can swap for a real icon later */}
          <span className="app__logo" aria-hidden="true" />
          <div>
            <h1 className="app__title">SecureVault</h1>
            <p className="app__subtitle">Document workspace</p>
          </div>
        </div>
      </header>

      <main className="app__main">
        <section className="app__explorer" aria-label="File explorer">
          {/* Temporary flat list — recursion comes next */}
          <ul className="root-list">
            {rootItems.map((item) => (
              // key helps React track each row efficiently
              <li key={item.id} className="root-list__item">
                {/* Show type so we can see folder vs file */}
                <span className="root-list__type">{item.type}</span>
                <span className="root-list__name">{item.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="app__properties" aria-label="File properties">
          <h2 className="app__panel-title">Properties</h2>
          <p className="app__placeholder">Select a file to inspect.</p>
        </aside>
      </main>

      <footer className="app__status">
        {/* Quick proof the JSON loaded */}
        <span>{rootItems.length} root items loaded</span>
      </footer>
    </div>
  )
}

export default App