import { Github, Linkedin, Mail, FileText } from 'lucide-react'

const links = [
  { icon: Github,   label: 'GitHub',   href: 'https://github.com/sudo-Harshk', external: true  },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com',            external: true  },
  { icon: FileText, label: 'Resume',   href: '#',                               external: false },
  { icon: Mail,     label: 'Email',    href: 'mailto:harshk1744@gmail.com',     external: false },
]

export function Footer() {
  return (
    <footer
      id="contact"
      className="px-5 sm:px-8 py-10 border-t"
      style={{ background: '#FAFAF8', borderColor: '#E5E7EB' }}
    >
      <div className="max-w-content mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <p className="text-[13px] font-semibold" style={{ color: '#1C1C1E' }}>Archive</p>

        <div className="flex flex-wrap items-center gap-4">
          {links.map(({ icon: Icon, label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[#1C1C1E]"
              style={{ color: '#71717A' }}
            >
              <Icon size={14} strokeWidth={1.75} />
              {label}
            </a>
          ))}
          <span className="text-xs" style={{ color: '#A1A1AA' }}>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  )
}
