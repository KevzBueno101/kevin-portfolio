import { motion } from 'framer-motion'
import { certificates } from '../../data/certificates'

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

export default function CertificatesSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white px-1">
        Certificates & Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-fb-dark rounded-lg shadow-sm border border-gray-200 dark:border-fb-darkborder overflow-hidden"
          >
            <div className="w-full h-32 bg-gradient-to-br from-[#0d1f2d] to-[#1a1a2e] flex items-center justify-center">
              {cert.image ? (
                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-fb-blue/40">
                  <AwardIcon />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {cert.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}