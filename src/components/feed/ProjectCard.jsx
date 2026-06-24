import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [mediaModal, setMediaModal] = useState(null)
  const [likeSet, setLikeSet] = useState(new Set())

  const toggleLike = () => {
    setLikeSet((prev) => {
      const next = new Set(prev)
      if (next.has(project.id)) next.delete(project.id)
      else next.add(project.id)
      return next
    })
  }

  const liked = likeSet.has(project.id)
  const descLong = project.description.length > 120
  const status = project.featured ? 'Featured' : 'Completed'
  const statusColor = project.featured
    ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
        className="group bg-white dark:bg-[#1F2937] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:dark:border-gray-700/80 hover:-translate-y-1"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 pb-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-fb-blue to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm">
              <CodeIcon />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Kevin B. Bueno • Personal Project
                  </p>
                </div>
                <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColor} flex-shrink-0 mt-1`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 sm:px-5 pb-3">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {expanded || !descLong
              ? project.description
              : project.description.slice(0, 120) + '...'}
          </p>
          {descLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-fb-blue hover:underline mt-1 font-medium"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Media Gallery */}
        <div className="px-4 sm:px-5 pb-3">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60">
            {project.image ? (
              <button onClick={() => setMediaModal(project)} className="w-full cursor-pointer group/media">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto max-h-72 object-contain bg-gray-50 dark:bg-gray-900"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/media:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    Preview
                  </span>
                </div>
              </button>
            ) : (
              <div className="h-44 sm:h-52 bg-gradient-to-br from-[#0d1f2d] to-[#1a1a2e] flex items-center justify-center">
                <div className="text-center">
                  <CodeIcon />
                  <p className="text-gray-500 text-xs mt-2">{project.title}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="px-4 sm:px-5 pb-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <span key={tech}
                className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-5 pb-4 pt-3 border-t border-gray-100 dark:border-gray-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button onClick={toggleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  liked
                    ? 'text-fb-blue bg-blue-50 dark:bg-blue-500/10'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
                {liked ? 'Liked' : 'Like'}
              </button>
            </div>
            <div className="flex items-center gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <GithubIcon />
                  Code
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-fb-blue text-white hover:bg-blue-600 transition shadow-sm"
                >
                  <ExternalLinkIcon />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Media Modal */}
      <AnimatePresence>
        {mediaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setMediaModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative max-w-3xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setMediaModal(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="p-5 pb-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mediaModal.title}</h3>
              </div>
              <div className="overflow-y-auto max-h-[70vh] p-5 pt-4">
                {mediaModal.image ? (
                  <img src={mediaModal.image} alt={mediaModal.title} className="w-full h-auto rounded-lg shadow-sm" />
                ) : (
                  <div className="h-60 flex items-center justify-center text-gray-400">
                    <CodeIcon />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fb-blue/60">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)