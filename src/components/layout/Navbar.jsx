import { useTheme } from '../../context/ThemeContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { isDark } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-fb-dark border-b border-gray-200 dark:border-fb-darkborder shadow-sm flex items-center justify-between px-4">
      {/* Left — Logo/Name */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-fb-blue flex items-center justify-center text-white font-bold text-lg">
          K
        </div>
        <span className="font-semibold text-gray-800 dark:text-white hidden sm:block">
          Kevin Bueno
        </span>
      </div>

      {/* Right — Theme Toggle */}
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </nav>
  )
}