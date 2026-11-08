// Small inline icons for the desk (@sanity/icons is not a direct dependency).
const svg = (children: React.ReactNode) => () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 25"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

export const FolderIcon = svg(<path d="M4.5 7.5v11h16v-9h-8l-2-2h-6z" />)

export const PageIcon = svg(
  <>
    <path d="M7.5 4.5h7l4 4v12h-11z" />
    <path d="M14.5 4.5v4h4M10 13.5h5M10 16.5h5" />
  </>,
)

export const ListIcon = svg(
  <>
    <path d="M9.5 7.5h10M9.5 12.5h10M9.5 17.5h10" />
    <circle cx="5.5" cy="7.5" r=".6" />
    <circle cx="5.5" cy="12.5" r=".6" />
    <circle cx="5.5" cy="17.5" r=".6" />
  </>,
)
