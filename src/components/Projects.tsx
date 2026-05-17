import { useState, useRef, useCallback, useId } from 'react'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'
import { AccordionItem } from './AccordionItem'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

interface ProjectsProps {
  activeId: string | null
  onSelect: (id: string | null) => void
}

function EmptyState() {
  return (
    <div
      className="h-full flex items-center justify-center p-10"
      aria-label="No project selected. Choose one from the list."
    >
      <p className="flex items-center gap-2 text-sm select-none" style={{ color: '#A1A1AA' }}>
        <ArrowRight size={14} aria-hidden />
        Select a project to explore
      </p>
    </div>
  )
}

function ProjectDetail({
  project,
  visible,
  panelId,
  labelId,
}: {
  project: Project
  visible: boolean
  panelId: string
  labelId: string
}) {
  const hasDemo   = project.demoUrl   !== '#'
  const hasGithub = project.githubUrl !== '#'

  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={labelId}
      tabIndex={0}
      className="h-full p-8 lg:p-14 flex flex-col gap-7 relative focus:outline-none"
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.22s ease, transform 0.22s ease',
      }}
    >
      {/* Ghost number — decorative only */}
      <span
        className="absolute right-8 top-8 font-black select-none pointer-events-none leading-none"
        style={{ fontSize: 'clamp(80px, 12vw, 140px)', color: 'rgba(109,40,217,0.06)' }}
        aria-hidden
      >
        {project.id}
      </span>

      {/* Header */}
      <div>
        <p className="text-xs font-mono tracking-widest mb-3" style={{ color: '#71717A' }}>
          {project.id}
        </p>
        <h2
          id={labelId}
          className="text-3xl lg:text-4xl font-bold tracking-tight mb-2"
          style={{ color: '#18181B' }}
        >
          {project.name}
        </h2>
        <p className="text-base font-medium" style={{ color: '#7C3AED' }}>
          {project.tagline}
        </p>
      </div>

      {/* Core idea */}
      <p
        className="text-sm italic leading-relaxed pl-4 max-w-sm"
        style={{ color: '#71717A', borderLeft: '2px solid #DDD6FE' }}
      >
        {project.coreIdea}
      </p>

      {/* Description */}
      <p className="text-sm leading-relaxed max-w-md" style={{ color: '#52525B' }}>
        {project.description}
      </p>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2" aria-label="Technologies">
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

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {hasGithub ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border transition-colors duration-150"
            style={{ color: '#52525B', borderColor: '#E5E7EB', background: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#18181B'; el.style.borderColor = '#C4B5FD' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#52525B'; el.style.borderColor = '#E5E7EB' }}
          >
            <Github size={13} strokeWidth={1.75} />
            GitHub
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl border"
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
            className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-xl transition-colors duration-150"
            style={{ background: '#EDE9FE', color: '#6D28D9' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#DDD6FE')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#EDE9FE')}
          >
            <ExternalLink size={13} strokeWidth={1.75} />
            Live Demo
          </a>
        ) : (
          <span className="self-center text-xs" style={{ color: '#71717A' }}>
            Demo coming soon
          </span>
        )}
      </div>
    </div>
  )
}

export function Projects({ activeId, onSelect }: ProjectsProps) {
  const uid     = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [visible,     setVisible]     = useState(true)
  const [displayedId, setDisplayedId] = useState<string | null>(null)

  const handleSelect = useCallback(
    (id: string) => {
      const next = activeId === id ? null : id
      setVisible(false)
      setTimeout(() => { setDisplayedId(next); onSelect(next); setVisible(true) }, 180)
    },
    [activeId, onSelect],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, i: number) => {
      let target: number | null = null
      if      (e.key === 'ArrowDown'  || e.key === 'ArrowRight') target = (i + 1) % projects.length
      else if (e.key === 'ArrowUp'    || e.key === 'ArrowLeft')  target = (i - 1 + projects.length) % projects.length
      else if (e.key === 'Home') target = 0
      else if (e.key === 'End')  target = projects.length - 1
      if (target !== null) { e.preventDefault(); tabRefs.current[target]?.focus() }
    },
    [],
  )

  const displayed = projects.find(p => p.id === displayedId) ?? null
  const panelId   = (id: string) => `${uid}-panel-${id}`
  const tabId     = (id: string) => `${uid}-tab-${id}`

  return (
    <section id="projects" aria-label="Projects">

      {/* ── Desktop: split panel ───────────────────────────────── */}
      <div className="hidden md:flex" style={{ minHeight: '78vh' }}>

        {/* Left — tablist */}
        <nav
          role="tablist"
          aria-label="Project list"
          aria-orientation="vertical"
          className="flex flex-col py-12 border-r flex-shrink-0"
          style={{ width: '272px', borderColor: 'rgba(229,231,235,0.7)' }}
        >
          {projects.map((project, i) => {
            const isActive = activeId === project.id
            return (
              <button
                key={project.id}
                ref={el => { tabRefs.current[i] = el }}
                role="tab"
                id={tabId(project.id)}
                aria-selected={isActive}
                aria-controls={panelId(project.id)}
                tabIndex={isActive ? 0 : -1}
                className="relative group flex items-start gap-4 px-6 py-5 text-left w-full transition-colors duration-200"
                style={{ background: isActive ? 'rgba(245,243,255,0.7)' : 'transparent' }}
                onClick={() => handleSelect(project.id)}
                onKeyDown={e => handleKeyDown(e, i)}
              >
                {/* Active bar */}
                <span
                  className="absolute left-0 top-4 bottom-4 rounded-r-full transition-all duration-300"
                  style={{ width: '3px', background: isActive ? '#A78BFA' : 'transparent' }}
                  aria-hidden
                />

                <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: '#71717A' }}>
                  {project.id}
                </span>

                <div className="min-w-0 flex flex-col gap-0.5">
                  <span
                    className="text-sm font-semibold tracking-tight truncate transition-colors duration-150"
                    style={{ color: isActive ? '#7C3AED' : '#18181B' }}
                  >
                    {project.name}
                  </span>
                  <span className="text-xs truncate" style={{ color: '#71717A' }}>
                    {project.tagline}
                  </span>
                </div>
              </button>
            )
          })}
        </nav>

        {/* Right — detail panel */}
        <div className="flex-1 min-w-0">
          {displayed ? (
            <ProjectDetail
              project={displayed}
              visible={visible}
              panelId={panelId(displayed.id)}
              labelId={tabId(displayed.id) + '-label'}
            />
          ) : (
            <>
              {projects.map(p => (
                <div key={p.id} role="tabpanel" id={panelId(p.id)} aria-labelledby={tabId(p.id)} hidden />
              ))}
              <EmptyState />
            </>
          )}
        </div>
      </div>

      {/* ── Mobile: accordion ─────────────────────────────────── */}
      <div className="md:hidden px-5 py-10">
        <div className="border-t" style={{ borderColor: 'rgba(229,231,235,0.7)' }}>
          {projects.map((project, i) => (
            <AccordionItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

    </section>
  )
}
