import { skills } from '../../data/skills'

export default function SkillsCard() {
  return (
    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skills & Tools</h2>

      <div className="space-y-5">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {group.items.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-1.5 group"
                  title={skill.name}
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-50 dark:bg-fb-darkcard border border-gray-200 dark:border-fb-darkborder flex items-center justify-center p-2 group-hover:border-fb-blue transition">
                    {skill.icon ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase leading-none">
                        {skill.name.slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 text-center leading-tight max-w-[56px]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}