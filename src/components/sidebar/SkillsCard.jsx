import { skills } from '../../data/skills'

export default function SkillsCard() {
  return (
    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Skills & Tools</h2>

      <div className="space-y-4">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-fb-darkcard text-fb-blue dark:text-blue-400 border border-blue-100 dark:border-fb-darkborder"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}