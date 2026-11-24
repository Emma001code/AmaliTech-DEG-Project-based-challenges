// Small outline SVG icons matching the Figma SecureVault design.
// currentColor = they inherit text color from CSS (muted / text / accent).

const svgProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
  focusable: false,
}

// ▶ collapsed folder chevron
export function IconChevronRight() {
  return (
    <svg {...svgProps}>
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ▼ expanded folder chevron
export function IconChevronDown() {
  return (
    <svg {...svgProps}>
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Outline folder (tab on top-left)
export function IconFolder() {
  return (
    <svg {...svgProps}>
      <path
        d="M2.5 4.5h3l1.2 1.2H13.5a.8.8 0 0 1 .8.8v6.2a.8.8 0 0 1-.8.8H2.5a.8.8 0 0 1-.8-.8V5.3a.8.8 0 0 1 .8-.8Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Outline document with folded top-right corner
export function IconFile() {
  return (
    <svg {...svgProps}>
      <path
        d="M4.5 2.5h5l3 3V13a.8.8 0 0 1-.8.8H4.5a.8.8 0 0 1-.8-.8V3.3a.8.8 0 0 1 .8-.8Z"
  fill="currentColor"
      />
      <path
        d="M9.5 2.5V5.5H12.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Selected-row check mark
export function IconCheck() {
  return (
    <svg {...svgProps}>
      <path
        d="M3.5 8.2l2.8 2.8 6.2-6.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Magnifying glass for the search field
export function IconSearch() {
  return (
    <svg {...svgProps}>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M10.5 10.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Clear (X) button inside the search field
export function IconClear() {
  return (
    <svg {...svgProps}>
      <path
        d="M4.5 4.5l7 7M11.5 4.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Header brand lock (two-tone blue, matches Figma mark)
export function IconLock({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Shackle — darker blue */}
      <path
        d="M8 11V8.5a4 4 0 0 1 8 0V11"
        stroke="#4C7FB8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Body — lighter blue */}
      <rect x="5.5" y="11" width="13" height="10" rx="2.2" fill="#A8C8EA" />
      {/* Keyhole — darker blue */}
      <rect x="11" y="14.2" width="2" height="3.6" rx="1" fill="#4C7FB8" />
    </svg>
  )
}
