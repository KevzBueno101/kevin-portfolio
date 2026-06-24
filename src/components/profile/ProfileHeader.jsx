import { motion } from 'framer-motion'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)


export default function ProfileHeader({ activeTab, setActiveTab }) {

const tabs = ['All', 'About', 'Projects', 'Skills', 'Certificates', 'Others']
  return (
    <div className="bg-white dark:bg-fb-dark border-b border-gray-200 dark:border-fb-darkborder px-4">

      {/* Profile pic + info + buttons row */}
      <div className="flex items-end gap-4 pb-4 -mt-10">

        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 flex-shrink-0"
        >
          <img
            src="/profilepic.jpg"
            alt="Kevin Bueno"
            className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white dark:border-fb-dark object-cover shadow-lg"
          />
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-fb-dark" />
        </motion.div>

        {/* Name + info + skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pb-1 flex-1 min-w-0"
        >
             <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Kevin B. Bueno
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            BS Computer Engineering · CatSU · 2024–Present
          </p>

          {/* Social links inline */}
          <div className="flex items-center gap-1 mt-1 flex-wrap">
            <span className="text-fb-blue font-medium text-sm">Aspiring Software Engineer</span>
            <span className="text-gray-300 dark:text-gray-600 mx-1">·</span>
            {[
              { Icon: GithubIcon, href: 'https://github.com/KevzBueno101', label: 'GitHub' },
              { Icon: GlobeIcon, href: 'https://www.facebook.com/kevin.b.bueno.5', label: 'Facebook' },
              { Icon: LinkedinIcon, href: 'https://www.linkedin.com/in/kevin-bueno-922174375', label: 'LinkedIn' },
              { Icon: MailIcon, href: 'mailto:kevinbueno360@gmail.com', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" title={label}
                className="p-1.5 rounded-full text-gray-500 dark:text-gray-400 hover:text-fb-blue hover:bg-blue-50 dark:hover:bg-fb-darkcard transition">
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — Message + Contact buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="hidden sm:flex gap-2 pb-2 flex-shrink-0"
        >
          
            <a href="mailto:kevinbueno360@gmail.com"
            className="flex items-center gap-2 px-4 py-2 bg-fb-blue text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            <MessageIcon />
            Message
          </a>
          
          <a   href="https://github.com/KevzBueno101"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-fb-darkcard text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-fb-darkhover transition"
          >
            <GithubIcon />
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-t border-gray-200 dark:border-fb-darkborder">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab
                ? 'border-fb-blue text-fb-blue'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-fb-darkcard'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}