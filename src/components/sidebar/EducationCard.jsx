const TimelineItem = ({ icon, title, subtitle, date, description, tags, last }) => (
  <div className={`relative flex gap-4 ${last ? '' : 'pb-6'}`}>
    {/* Timeline line */}
    {!last && <div className="absolute left-[19px] top-8 bottom-0 w-0.5 bg-fb-blue/20 dark:bg-fb-blue/10" />}
    {/* Circle + icon */}
    <div className="relative z-10 w-10 h-10 rounded-full bg-fb-blue/10 dark:bg-fb-blue/5 border-2 border-fb-blue/30 flex items-center justify-center text-base flex-shrink-0">
      {icon}
    </div>
    {/* Content */}
    <div className="flex-1 min-w-0 pt-0.5">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
      {date && <p className="text-xs text-fb-blue mt-0.5">{date}</p>}
      {description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
      {tags && tags.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-yellow-50 dark:bg-fb-darkcard text-yellow-600 dark:text-yellow-400 rounded-full border border-yellow-100 dark:border-fb-darkborder">
              🏆 {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
)

const sectionHeader = (label) => (
  <div className="relative flex items-center gap-3 mb-4 mt-2">
    <div className="flex-1 h-px bg-gray-200 dark:border-fb-darkborder" />
    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex-shrink-0">{label}</span>
    <div className="flex-1 h-px bg-gray-200 dark:border-fb-darkborder" />
  </div>
)

export default function EducationCard() {
  return (
    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Education & Experience</h2>

      <div className="pl-1">
        {/* Education section */}
        <div className="relative">
          <TimelineItem
            icon="🎓"
            title="Catanduanes State University"
            subtitle="BS in Computer Engineering"
            date="2024 – Present"
          />
          <TimelineItem
            icon="🏫"
            title="Calatagan High School"
            subtitle="TVL – Computer Systems Servicing"
            date="2022 – 2024"
            tags={['With High Honors', 'NC II Passer', 'Best in Work Immersion']}
          />
        </div>

        {sectionHeader('Experience')}

        {/* Experience section */}
        <div className="relative">
          <TimelineItem
            icon="📊"
            title="Assistant Statistician"
            subtitle="Part-time"
            description="Statistical data analysis for academic research and theses using Python, JASP, and Jamovi."
          />
          <TimelineItem
            icon="🏛️"
            title="DICT-Catanduanes"
            subtitle="OJT · Feb 2024"
            description="80-hour training on MS Office, Adobe Photoshop, Windows Server, and HTML/CSS."
            last
          />
        </div>
      </div>
    </div>
  )
}