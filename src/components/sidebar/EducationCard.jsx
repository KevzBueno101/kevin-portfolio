export default function EducationCard() {
  return (
    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Education</h2>

      <div className="space-y-4">
        {/* CatSU */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
            🎓
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Catanduanes State University
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              BS in Computer Engineering
            </p>
            <p className="text-xs text-fb-blue">2024 – Present</p>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-fb-darkborder" />

        {/* Calatagan High School */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
            🏫
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Calatagan High School
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              TVL – Computer Systems Servicing
            </p>
            <p className="text-xs text-fb-blue">2022 – 2024</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {['With High Honors', 'NC II Passer', 'Best in Work Immersion'].map((award) => (
                <span key={award} className="text-xs px-2 py-0.5 bg-yellow-50 dark:bg-fb-darkcard text-yellow-600 dark:text-yellow-400 rounded-full border border-yellow-100 dark:border-fb-darkborder">
                  🏆 {award}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-fb-darkborder" />

        {/* Experience */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Experience
          </h3>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                📊
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Assistant Statistician
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Part-time</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Statistical data analysis for academic research and theses using Python, JASP, and Jamovi.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                🏛️
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  DICT-Catanduanes
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">OJT · Feb 2024</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  80-hour training on MS Office, Adobe Photoshop, Windows Server, and HTML/CSS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}