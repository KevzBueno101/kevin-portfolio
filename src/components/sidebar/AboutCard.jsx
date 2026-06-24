export default function AboutCard() {
  return (
    <div className="group relative bg-white dark:bg-fb-dark rounded-xl shadow-sm border border-gray-200 dark:border-fb-darkborder overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Glow border on hover */}
      <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(59,130,246,0.3)' }}
      />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-1 rounded-full bg-fb-blue" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">About Me</h2>
        </div>

        {/* Intro */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          I enjoy turning ideas into real-world digital experiences using modern web technologies.
          I focus on building scalable, user-friendly applications while continuously improving
          my skills in software engineering.
        </p>

        {/* Highlight Feature Card */}
        <div className="relative mb-5 p-3.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/10 border border-blue-100/80 dark:border-blue-900/40 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700/50">
          <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: '0 0 20px rgba(59,130,246,0.08)' }}
          />
          <div className="relative flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
              🤖
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-0.5">AI-Assisted Development</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Leverage AI as a development partner for rapid prototyping, debugging, optimization, and accelerating productivity.
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

