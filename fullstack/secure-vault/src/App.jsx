import './App.css'
import vaultData from '../data.json'
import TreeNode from './components/TreeNode'

function App() {
  const rootItems = vaultData

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
          {/* Root level: one TreeNode per top item (recursion handles the rest) */}
          <div className="tree">
            {rootItems.map((item) => (
              <TreeNode key={item.id} node={item} depth={0} />
            ))}
          </div>
        </section>

        <aside className="app__properties" aria-label="File properties">
          <h2 className="app__panel-title">Properties</h2>
          <p className="app__placeholder">Select a file to inspect.</p>
        </aside>
      </main>

      <footer className="app__status">
        <span>Click folders to expand or collapse</span>
      </footer>
    </div>
  )
}

export default App