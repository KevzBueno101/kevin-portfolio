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

      <div className="border-t border-gray-200 dark:border-fb-darkborder pt-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
          ♟️ Competitive chess player — strategic thinking translates well into software development.
        </p>
      </div>

      {/* Quick Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>🎓</span>
          <span>BS Computer Engineering, CatSU</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>📍</span>
          <span>Catanduanes, Philippines</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>💼</span>
          <span>Assistant Statistician (Part-time)</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>📧</span>
          <a href="mailto:kevinbueno360@gmail.com" className="text-fb-blue hover:underline">
            kevinbueno360@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}