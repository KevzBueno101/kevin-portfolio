const SchoolIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
)

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)

export default function AboutCard() {
  return (
    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About</h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        A motivated and detail-oriented Computer Engineering student with a strong passion for
        technology and continuous learning. Skilled in software development, data analytics,
        and building practical systems using modern tools and programming languages.
      </p>

      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        My journey in tech began in February 2024 during my senior high school internship at
        DICT-Catanduanes, where I wrote my first "Hello World" program. Since then, I've evolved
        from building simple HTML/CSS pages to developing full-featured web and desktop applications.
      </p>

      <div className="border-t border-gray-200 dark:border-fb-darkborder pt-3 mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          ♟ Competitive chess player — strategic thinking translates well into software development.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-fb-blue flex-shrink-0"><SchoolIcon /></span>
          BS Computer Engineering, CatSU
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-fb-blue flex-shrink-0"><MapPinIcon /></span>
          Catanduanes, Philippines
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-fb-blue flex-shrink-0"><BriefcaseIcon /></span>
          Assistant Statistician (Part-time)
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-fb-blue flex-shrink-0"><MailIcon /></span>
          <a href="mailto:kevinbueno360@gmail.com" className="text-fb-blue hover:underline">
            kevinbueno360@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}