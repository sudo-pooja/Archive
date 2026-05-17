export function Nav() {
  return (
    <header className="px-6 sm:px-8 pt-8 pb-0" role="banner">
      <div className="max-w-content mx-auto flex items-baseline justify-between">
        <a
          href="#"
          className="text-[15px] font-semibold tracking-tight transition-opacity hover:opacity-50"
          style={{ color: '#1C1C1E' }}
          aria-label="Archive — home"
        >
          Archive
        </a>
        <span className="text-xs font-medium" style={{ color: '#7C3AED' }} aria-hidden>
          AI Systems
        </span>
      </div>
    </header>
  )
}
