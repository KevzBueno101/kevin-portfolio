import { motion } from 'framer-motion'

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
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
)

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-fb-dark rounded-lg shadow-sm border border-gray-200 dark:border-fb-darkborder overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-fb-darkborder">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fb-blue to-blue-400 flex items-center justify-center flex-shrink-0 text-white">
          <CodeIcon />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
            {project.title}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Kevin B. Bueno · Project
          </p>
        </div>
        {project.featured && (
          <span className="ml-auto text-xs px-2 py-0.5 bg-fb-blue text-white rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Project Image or Placeholder */}
      <div className="w-full h-40 bg-gradient-to-br from-[#0d1f2d] to-[#1a1a2e] flex items-center justify-center">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <div className="text-fb-blue/40 mx-auto mb-2 flex justify-center">
              <CodeIcon />
            </div>
            <p className="text-gray-500 text-xs">{project.title}</p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs px-2 py-0.5 rounded-full bg-blue-50 dark:bg-fb-darkcard text-fb-blue dark:text-blue-400 border border-blue-100 dark:border-fb-darkborder">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex gap-2 border-t border-gray-100 dark:border-fb-darkborder pt-3">
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-fb-blue text-white text-sm rounded-lg hover:bg-blue-600 transition font-medium">
            <ExternalLinkIcon />
            Live Demo
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 dark:bg-fb-darkcard text-gray-700 dark:text-gray-300 text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-fb-darkhover transition font-medium">
            <GithubIcon />
            View Code
          </a>
        )}
      </div>
    </motion.div>
  )
}