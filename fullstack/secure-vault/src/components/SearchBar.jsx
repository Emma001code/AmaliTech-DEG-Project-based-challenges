import { IconClear, IconSearch } from './Icons'

// Bonus feature UI: type to filter the vault tree.
function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">
        <IconSearch />
      </span>

      <input
        className="search-bar__input"
        type="search"
        value={value}
        // Every keystroke updates App search state
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search files and folders..."
        aria-label="Search files and folders"
      />

      {/* Show clear only when there is text */}
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={onClear}
          aria-label="Clear search"
        >
          <IconClear />
        </button>
      )}
    </div>
  )
}

export default SearchBar
