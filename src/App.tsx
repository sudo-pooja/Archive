import { useState } from 'react'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Footer } from './components/Footer'
import { projects } from './data/projects'

function App() {
  const [activeId, setActiveId] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen font-sans flex flex-col">
      {/* Base gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{ background: 'linear-gradient(145deg, #FDF4FF 0%, #EFF6FF 55%, #ECFDF5 100%)' }}
        aria-hidden
      />

      {/* Per-project ambient overlays — opacity-transitions give smooth colour shift */}
      {projects.map(p => (
        <div
          key={p.id}
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            background: p.ambientBg,
            opacity: activeId === p.id ? 1 : 0,
            transition: 'opacity 0.65s ease',
          }}
          aria-hidden
        />
      ))}

      <Nav />
      <main className="flex-1">
        <Projects activeId={activeId} onSelect={setActiveId} />
      </main>
      <Footer />
    </div>
  )
}

export default App
