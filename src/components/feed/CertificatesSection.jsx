import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certificates } from '../../data/certificates'

const badgeStyle = {
  Workshop: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Course: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  Certification: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Seminar: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
}

export default function CertificatesSection() {
  const [modal, setModal] = useState(null)
  const [liked, setLiked] = useState(new Set())

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="px-1">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Certificates & Achievements</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Professional milestones and learning journey</p>
      </div>

      {certificates.map((cert, index) => {
        const Icon = typeIcons[cert.type] || AwardIcon
        return (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, duration: 0.4, ease: 'easeOut' }}
            className="group bg-white dark:bg-[#111827] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:dark:border-gray-700/80 hover:-translate-y-0.5"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 pb-3">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-fb-blue to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-base sm:text-lg"><Icon /></span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/20 dark:ring-white/10" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>
                    {/* Badge */}
                    <span className={`text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle[cert.type] || badgeStyle.Course} flex-shrink-0 mt-1`}>
                      {cert.type}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {cert.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      Online
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500">
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      Verified
                    </span>
                  </div>

                  {/* Caption */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed line-clamp-2">
                    {descriptions[cert.type] || descriptions.Course}
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="relative px-4 sm:px-5 pb-3">
              <motion.button
                onClick={() => setModal(cert)}
                className="relative w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 group/image cursor-pointer"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.25 }}
              >
                {cert.image ? (
                  <>
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto max-h-80 object-contain bg-gray-50 dark:bg-gray-900"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        View Certificate
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-40 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <AwardIcon />
                  </div>
                )}
              </motion.button>
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-gray-100 dark:border-gray-800/60">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={() => toggleLike(cert.id)} className={`flex items-center gap-1.5 transition-all duration-200 ${liked.has(cert.id) ? 'text-fb-blue' : 'text-gray-400 dark:text-gray-500 hover:text-fb-blue'}`}>
                    <svg viewBox="0 0 24 24" width="15" height="15" fill={liked.has(cert.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                    <span>{liked.has(cert.id) ? 'Liked' : 'Like'}</span>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-fb-blue dark:hover:text-fb-blue transition">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      Credential
                    </a>
                  )}
                  {cert.image && (
                    <button onClick={() => setModal(cert)} className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-fb-blue dark:hover:text-fb-blue transition">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 17 2 17 2 14"/><polyline points="6 17 2 17 2 14"/><polyline points="2 2 2 6 5 6"/><polyline points="22 8 22 12 18 12"/><polyline points="6 2 10 2 10 5"/><polyline points="2 18 6 22 10 22"/><polyline points="18 22 22 18 22 14"/><polyline points="14 2 18 2 22 6"/></svg>
                      Fullscreen
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setModal(null)}
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
                onClick={() => setModal(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
              <div className="p-5 pb-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{modal.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{modal.issuer}</p>
              </div>
              <div className="overflow-y-auto max-h-[70vh] p-5 pt-4">
                <img
                  src={modal.image}
                  alt={modal.title}
                  className="w-full h-auto rounded-lg shadow-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

const BookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)

const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
  </svg>
)

const typeIcons = {
  Workshop: AwardIcon,
  Course: BookIcon,
  Certification: CodeIcon,
  Seminar: MicIcon,
}

const descriptions = {
  Workshop: 'Hands-on training focused on building practical skills and real-world applications.',
  Course: 'Structured online learning covering fundamental to advanced concepts in the subject.',
  Certification: 'Industry-recognized credential validating technical competence and professional knowledge.',
  Seminar: 'Attended an insightful session on emerging trends and best practices in the field.',
}