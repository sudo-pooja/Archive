import { useState } from 'react'
import { Plus, Minus, Github, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'

interface AccordionItemProps {
  project: Project
  index: number
}

export function AccordionItem({ project, index }: AccordionItemProps) {
  const [open, setOpen] = useState(false)

  const hasDemo   = project.demoUrl   !== '#'
  const hasGithub = project.githubUrl !== '#'

  return (
    <div className="border-b" style={{ borderColor: '#E5E7EB' }}>
      <button
        className="w-full flex items-center gap-4 py-5 text-left group"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        {/* Index */}
        <span className="text-xs font-mono flex-shrink-0 w-6" style={{ color: '#71717A' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Name */}
        <span
          className="text-base font-semibold tracking-tight flex-shrink-0 transition-colors duration-150"
          style={{ color: open ? '#7C3AED' : '#18181B' }}
        >
          {project.name}
        </span>

        {/* One-liner — collapsed only, desktop */}
        {!open && (
          <span className="text-sm truncate hidden sm:block" style={{ color: '#71717A' }}>
            {project.coreIdea}
          </span>
        )}

        {/* Toggle icon */}
        <span className="ml-auto flex-shrink-0">
          <span
            className="w-6 h-6 flex items-center justify-center rounded-full transition-all duration-150"
            style={{
              background: open ? '#EDE9FE' : '#F4F4F5',
              color:      open ? '#7C3AED' : '#71717A',
            }}
          >
            {open
              ? <Minus size={12} strokeWidth={2.5} />
              : <Plus  size={12} strokeWidth={2.5} />
            }
          </span>
        </span>
      </button>

      {/* Body — grid trick for smooth height */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.28s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="pb-6 sm:pl-10 flex flex-col gap-4">
            <p className="text-sm leading-relaxed" style={{ color: '#52525B' }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(tag => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg"
                  style={{ background: '#F5F3FF', color: '#6D28D9', border: '1px solid #DDD6FE' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {hasGithub ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm rounded-xl border transition-colors duration-150"
                  style={{ color: '#52525B', borderColor: '#E5E7EB' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#18181B'; el.style.borderColor = '#C4B5FD' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#52525B'; el.style.borderColor = '#E5E7EB' }}
                >
                  <Github size={13} strokeWidth={1.75} />
                  GitHub
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm rounded-xl border"
                  style={{ color: '#A1A1AA', borderColor: '#F4F4F5' }}
                >
                  <Github size={13} strokeWidth={1.75} />
                  Private
                </span>
              )}

              {hasDemo ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 text-sm rounded-xl transition-colors duration-150"
                  style={{ background: '#EDE9FE', color: '#6D28D9' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#DDD6FE')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#EDE9FE')}
                >
                  <ExternalLink size={13} strokeWidth={1.75} />
                  Live Demo
                </a>
              ) : (
                <span className="text-xs" style={{ color: '#71717A' }}>
                  Demo coming soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
