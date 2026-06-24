import { useTheme } from '../../context/ThemeContext'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
)

const ProjectsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)

const CertsIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
  </svg>
)

const ContactIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
)

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const navItems = [
  { icon: HomeIcon, label: 'Home', tab: 'About' },
  { icon: ProjectsIcon, label: 'Projects', tab: 'Projects' },
  { icon: CertsIcon, label: 'Certificates', tab: 'Certificates' },
  { icon: ContactIcon, label: 'Contact', tab: 'Contact' },
]

export default function Navbar({ activeTab, setActiveTab, searchQuery, onSearch }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-fb-dark border-b border-gray-200 dark:border-fb-darkborder shadow-sm">
      <div className="max-w-5xl mx-auto h-full flex items-center justify-between px-4">

        {/* Left — Logo */}
        {/* Left — Logo + Search */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-fb-blue flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            K
          </div>
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-48 pl-9 pr-4 py-2 rounded-full bg-gray-100 dark:bg-fb-darkcard text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-fb-blue/30 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              viewBox="0 0 24 24" width="14" height="14"
              fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
        </div>

        {/* Center — Nav Icons */}
        <div className="flex items-center gap-1">
          {navItems.map(({ icon: Icon, label, tab }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              title={label}
              className={`relative flex flex-col items-center justify-center w-16 h-12 rounded-lg transition-all group ${
                activeTab === tab
                  ? 'text-fb-blue'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-fb-darkcard'
              }`}
            >
              <Icon />
              {activeTab === tab && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-fb-blue rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right — Theme Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-fb-darkcard hover:bg-gray-200 dark:hover:bg-fb-darkhover transition-all"
            title={isDark ? 'Light Mode' : 'Dark Mode'}
          >
            {isDark
              ? <span className="text-yellow-400"><SunIcon /></span>
              : <span className="text-gray-600"><MoonIcon /></span>
            }
          </button>
        </div>
      </div>
    </nav>
  )
}