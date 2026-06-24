import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const isVideo = (src) => /\.(mp4|webm|mov|gif)$/i.test(src)

const MAX_VISIBLE = 3

export default function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalIdx, setModalIdx] = useState(0)
  const [likeSet, setLikeSet] = useState(new Set())
  const [touchStart, setTouchStart] = useState(null)
  const modalRef = useRef()

  const mediaList = project.images?.length > 0
    ? project.images
    : project.image
      ? [project.image]
      : []

  const visible = mediaList.slice(0, MAX_VISIBLE)
  const remaining = mediaList.length - MAX_VISIBLE

  const liked = likeSet.has(project.id)
  const descLong = project.description.length > 120
  const status = project.featured ? 'Featured' : 'Completed'
  const statusColor = project.featured
    ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
    : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'

  const openModal = (i) => {
    setModalIdx(i)
    setModalOpen(true)
  }

  const goNext = useCallback(() => {
    setModalIdx((p) => (p + 1) % mediaList.length)
  }, [mediaList.length])

  const goPrev = useCallback(() => {
    setModalIdx((p) => (p - 1 + mediaList.length) % mediaList.length)
  }, [mediaList.length])

  useEffect(() => {
    if (!modalOpen) return
    const handler = (e) => {
      if (e.key === 'Escape') setModalOpen(false)
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [modalOpen, goNext, goPrev])

  useEffect(() => {
    if (modalOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e) => {
    if (!touchStart) return
    const diff = e.changedTouches[0].clientX - touchStart
    if (Math.abs(diff) > 60) {
      if (diff < 0) goNext()
      else goPrev()
    }
    setTouchStart(null)
  }

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
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  {project.category && (
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {project.category}
                    </p>
                  )}
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
        {mediaList.length > 0 ? (
          <div className="px-4 sm:px-5 pb-3">
            {/* Mobile: horizontal carousel */}
            <div className="sm:hidden rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none">
                {mediaList.map((src, i) => (
                  <button key={i} onClick={() => openModal(i)} className="snap-center snap-always w-full flex-shrink-0 focus:outline-none">
                    <div className="relative group/thumb">
                      <div className="h-48">
                        {isVideo(src) ? (
                          <video src={src} className="w-full h-full object-cover" muted playsInline />
                        ) : (
                          <img src={src} alt={`${project.title} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/20 transition" />
                      {isVideo(src) && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-md backdrop-blur-sm">
                          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          Play
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {/* Dots */}
              {mediaList.length > 1 && (
                <div className="flex justify-center gap-1.5 py-2">
                  {mediaList.map((_, i) => (
                    <button key={i} onClick={() => openModal(i)} className={`w-1.5 h-1.5 rounded-full transition ${i === 0 ? 'bg-fb-blue w-3' : 'bg-gray-300 dark:bg-gray-600'}`} />
                  ))}
                </div>
              )}
            </div>

            {/* Desktop: asymmetric layout */}
            <div className="hidden sm:flex gap-0.5 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60">
              {/* Main image — 70% */}
              {visible[0] && (
                <button onClick={() => openModal(0)} className="flex-[7] relative group/thumb focus:outline-none min-h-0">
                  <div className="h-full min-h-[200px] sm:min-h-[240px]">
                    {isVideo(visible[0]) ? (
                      <video src={visible[0]} className="w-full h-full object-cover" muted playsInline />
                    ) : (
                      <img src={visible[0]} alt={`${project.title} 1`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-all duration-250 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="2" className="opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-250 drop-shadow-md">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </div>
                  {isVideo(visible[0]) && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-md backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      Play
                    </div>
                  )}
                </button>
              )}

              {/* Right column — 30% */}
              {visible.length > 1 && (
                <div className="flex-[3] flex flex-col gap-0.5">
                  {[visible[1], visible[2]].map((src, i) => {
                    if (!src) return null
                    const idx = i + 1
                    const isLastWithOverlay = idx === MAX_VISIBLE - 1 && remaining > 0
                    return (
                      <button key={idx} onClick={() => openModal(idx)} className="relative group/thumb flex-1 focus:outline-none min-h-0">
                        <div className="h-full min-h-[98px] sm:min-h-[118px]">
                          {isVideo(src) ? (
                            <video src={src} className="w-full h-full object-cover" muted playsInline />
                          ) : (
                            <img src={src} alt={`${project.title} ${idx + 1}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-105" />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover/thumb:bg-black/25 transition-all duration-250 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2" className="opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-250 drop-shadow-md">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                          </svg>
                        </div>
                        {isVideo(src) && (
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 bg-black/60 text-white text-[10px] rounded-md backdrop-blur-sm">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            Play
                          </div>
                        )}
                        {isLastWithOverlay && (
                          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                            <span className="text-2xl sm:text-3xl font-bold drop-shadow-sm leading-none">+{remaining}</span>
                            <span className="text-[11px] sm:text-xs font-medium mt-1 opacity-80">See More</span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="px-4 sm:px-5 pb-3">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1f2d] to-[#1a1a2e] flex items-center justify-center h-44 sm:h-52 border border-gray-200 dark:border-gray-700/60">
              <div className="text-center">
                <CodeIcon />
                <p className="text-gray-500 text-xs mt-2">{project.title}</p>
              </div>
            </div>
          </div>
        )}

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
              <button onClick={() => setLikeSet((prev) => {
                const next = new Set(prev)
                if (next.has(project.id)) next.delete(project.id)
                else next.add(project.id)
                return next
              })}
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

      {/* Fullscreen Modal Viewer */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md"
            ref={modalRef}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 flex-shrink-0">
              <h3 className="text-sm sm:text-base font-semibold text-white truncate max-w-[60%]">
                {project.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm text-white/60 font-medium tabular-nums">
                  {modalIdx + 1} / {mediaList.length}
                </span>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* Image area */}
            <div
              className="flex-1 flex items-center justify-center relative min-h-0 px-4 sm:px-6"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {mediaList.length > 1 && (
                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition backdrop-blur-sm shadow-lg"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
              )}

              <motion.div
                key={modalIdx}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="max-w-full max-h-full flex items-center justify-center"
              >
                {isVideo(mediaList[modalIdx]) ? (
                  <video
                    src={mediaList[modalIdx]}
                    controls
                    autoPlay
                    className="max-w-full max-h-[75vh] rounded-xl shadow-2xl"
                  />
                ) : (
                  <img
                    src={mediaList[modalIdx]}
                    alt={`${project.title} ${modalIdx + 1}`}
                    className="max-w-full max-h-[75vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
                  />
                )}
              </motion.div>

              {mediaList.length > 1 && (
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition backdrop-blur-sm shadow-lg"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              )}
            </div>

            {/* Thumbnail strip */}
            {mediaList.length > 1 && (
              <div className="flex-shrink-0 flex justify-center px-4 sm:px-6 pb-4 sm:pb-6 pt-3 overflow-x-auto scrollbar-none">
                <div className="flex gap-2">
                  {mediaList.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setModalIdx(i)}
                      className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        i === modalIdx
                          ? 'border-white opacity-100 ring-1 ring-white/30'
                          : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      {isVideo(src) ? (
                        <div className="relative w-full h-full bg-gray-800">
                          <video src={src} className="w-full h-full object-cover" muted playsInline />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                          </div>
                        </div>
                      ) : (
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
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