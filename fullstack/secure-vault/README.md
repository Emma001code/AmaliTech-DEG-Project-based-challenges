# SecureVault — File Explorer

A dark, high-performance file explorer UI for SecureVault Inc. built for law firms and banks that need to navigate deeply nested confidential folders without page reloads.

**Live demo:** [https://secure-vault-lemon-pi.vercel.app/](https://secure-vault-lemon-pi.vercel.app/)  
**Design file (Figma):** [SecureVault File Explorer](https://www.figma.com/design/gLWpNlKe6inCLsoRp3tqVI/SecureVault-File-Explorer?node-id=10-2&t=jinVYxqRLUlb0s0p-1)

> Figma access: set to **Anyone with the link can view**.

---

## Overview

SecureVault’s backend already returns an efficient nested folder tree as JSON. This project is the frontend: a recursive explorer with keyboard navigation, a properties inspector, search, and a File Location wildcard for path context and quick navigation.

### Features

- Recursive folder tree (any depth) with expand / collapse
- File selection with Properties panel (Name, Type, Size)
- Keyboard navigation (`↑↓` focus, `←→` folders, `Enter` select)
- **Wildcard — File Location & Quick Navigation:** ancestor path, jump to folder, copy full path
- **Bonus — Search:** filter by name and auto-expand folders that contain matches
- Custom design system (no Bootstrap / MUI / Chakra / Ant Design)

---

## Tech stack

- React (Vite)
- Plain CSS with design tokens (`src/styles/tokens.css`)
- Local data from `data.json` (provided vault structure)

---

## Setup

```bash
cd fullstack/secure-vault
npm install
npm run dev
```

Open the local URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

---

## Design system

The UI follows a dedicated Figma design system page covering:

- Color palette (canvas, surface, hover, selected, accent, focus, …)
- Typography (Manrope + IBM Plex Mono)
- Spacing scale (4–32px)
- Component states (folder / file rows, search, properties, keyboard focus vs selection)

Brand direction: dark, precise, cyber-secure.

---

## Recursive strategy

The explorer is driven by a single recursive component: `TreeNode`.

1. Each `TreeNode` renders one vault item (folder or file).
2. If the item is a **folder** and its id is in `expandedIds`, the component maps over `node.children` and renders another `TreeNode` for each child with `depth + 1`.
3. Indentation uses `depth * 16px`, so nesting stays readable at any level.
4. Expand state lives in `App` (`expandedIds`) so mouse clicks **and** keyboard shortcuts can open/close the same folders.
5. Selection (`selectedFile`) and keyboard focus (`focusedId`) are separate: focus moves the outline; selecting a file fills Properties.

This keeps one mental model for 2 levels or 20: same component, deeper props.

Path helpers (`findPathToNode`, `filterTree`, `getVisibleRows`) also walk the tree recursively for location, search, and keyboard-visible rows.

---

## Wildcard feature — File Location & Quick Navigation

**Problem:** Lawyers and finance teams often have files with the same name in different folders. Showing only the filename does not establish context.

**Solution:** When a file is selected, Properties shows a **File location** panel that:

1. Displays the full ancestor path (folder → folder → file)
2. Lets users **click an ancestor folder** to expand that path and focus it in the tree
3. Offers **Copy full path** for sharing with colleagues

**Engineering value:** Demonstrates tree traversal (finding ancestors) without a backend — all derived from `data.json` in memory.

---

## Bonus — Search & filter

A search field above the tree filters by name. Matching items deep in the vault keep their parent folders in the filtered tree, and those folders are **auto-expanded** so matches are immediately visible. Clearing search restores the full tree.

---

## Project structure

```text
fullstack/secure-vault/
├── data.json                 # Vault folder/file tree
├── index.html
├── package.json
├── public/
│   ├── favicon.png
│   └── apple-touch-icon.png
└── src/
    ├── App.jsx               # Layout, state, keyboard, search, path helpers
    ├── App.css
    ├── main.jsx
    ├── index.css
    ├── styles/tokens.css     # Design tokens + component styles
    └── components/
        ├── TreeNode.jsx      # Recursive explorer row
        ├── FileLocation.jsx  # Wildcard path UI
        ├── SearchBar.jsx     # Bonus search input
        └── Icons.jsx         # Custom SVG icons
```

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| `↑` / `↓` | Move focus among visible rows |
| `→` | Expand focused folder |
| `←` | Collapse focused folder |
| `Enter` | Select focused file |

Click the explorer panel first so it can receive keyboard focus.

---

## License

See `LICENSE` in this folder.
