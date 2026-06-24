import { motion } from 'framer-motion'

const skillIcons = [
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Django', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg' },
  { name: 'HTML5', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Git', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'JavaScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
]

export default function CoverPhoto() {
  return (
    <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden rounded-b-lg bg-gradient-to-br from-[#0a0a0a] via-[#0d1f2d] to-[#0a0a0a]">

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(24,119,242,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(24,119,242,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-4 left-1/4 w-32 h-32 bg-fb-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-4 right-1/4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl" />

      {/* Skill icons — top right */}
      <div className="absolute top-4 right-4 flex gap-2 flex-wrap justify-end max-w-xs">
        {skillIcons.map((icon, i) => (
          <motion.div
            key={icon.name}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20"
            title={icon.name}
          >
            <img src={icon.url} alt={icon.name} className="w-full h-full object-contain" />
          </motion.div>
        ))}
      </div>

      {/* Tagline — bottom right */}
      <div className="absolute bottom-4 right-4 text-right">
        <motion.h1
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-bold text-xl sm:text-2xl tracking-wide"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          Grit. Grind. Grow.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-400 text-sm mt-1"
        >
          BS Computer Engineering
        </motion.p>
      </div>
    </div>
  )
}