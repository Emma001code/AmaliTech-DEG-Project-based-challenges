// Wildcard feature: show where a file lives, jump to a parent folder, copy path.
function FileLocation({ path, onJumpToFolder, onCopyPath, copyDone }) {
  // path = [rootFolder, ..., parentFolder, file]
  const folders = path.filter((item) => item.type === 'folder')
  const file = path[path.length - 1]

  return (
    <div className="file-location">
      <div className="file-location__header">
        <div>
          <h3 className="file-location__title">File location</h3>
          <p className="file-location__subtitle">Full path within the vault</p>
        </div>
      </div>

      {/* Hierarchical path — each folder is clickable */}
      <ul className="file-location__path">
        {folders.map((folder) => (
          <li key={folder.id} className="file-location__step">
            <button
              type="button"
              className="file-location__link"
              // Jump: expand ancestors + focus this folder in the tree
              onClick={() => onJumpToFolder(folder.id)}
            >
              <span aria-hidden="true">📁</span>
              <span>{folder.name}</span>
            </button>
          </li>
        ))}

        {/* Current file (not a link — already selected) */}
        {file?.type === 'file' && (
          <li className="file-location__step file-location__step--file">
            <span aria-hidden="true">📄</span>
            <span>{file.name}</span>
          </li>
        )}
      </ul>

      <button type="button" className="file-location__copy" onClick={onCopyPath}>
        {copyDone ? 'Copied!' : 'Copy full path'}
      </button>
    </div>
  )
}

export default FileLocation
