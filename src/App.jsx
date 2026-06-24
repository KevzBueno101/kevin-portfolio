import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import CoverPhoto from './components/profile/CoverPhoto'
import ProfileHeader from './components/profile/ProfileHeader'
import AboutCard from './components/sidebar/AboutCard'
import SkillsCard from './components/sidebar/SkillsCard'
import EducationCard from './components/sidebar/EducationCard'
import LinksCard from './components/sidebar/LinksCard'
import ProjectCard from './components/feed/ProjectCard'
import CertificatesSection from './components/feed/CertificatesSection'
import { projects } from './data/projects'
import { skills } from './data/skills'
import { certificates } from './data/certificates'

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-fb-blue text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      title="Scroll to top"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.toLowerCase().trim()

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tech.some((t) => t.toLowerCase().includes(q))
  )

  const allSkillNames = skills.flatMap((cat) => cat.items.map((s) => s.name))
  const filteredSkills = q === '' ? [] : allSkillNames.filter((s) => s.toLowerCase().includes(q))

  const allCertTitles = certificates.map((c) => c.title)
  const filteredCerts = q === '' ? [] : allCertTitles.filter((c) => c.toLowerCase().includes(q))

  const aboutKeywords = [
    'kevin', 'bueno', 'computer engineering', 'catsu', 'philippines',
    'software engineer', 'chess', 'statistics', 'dict', 'ojt',
    'grit', 'grind', 'grow', 'assistant statistician',
    'calatagan', 'high school', 'computer systems servicing', 'nc ii',
    'with high honors', 'work immersion', 'hello world',
    'data analytics', 'web development', 'desktop',
    'python', 'html', 'css', 'javascript', 'react', 'django',
    'github', 'jasp', 'jamovi', 'adobe photoshop', 'windows server',
  ]
  const aboutMatch = q !== '' && aboutKeywords.some((k) => k.includes(q))
  const hasResults = filteredProjects.length > 0 || filteredSkills.length > 0 || filteredCerts.length > 0 || aboutMatch

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.trim() !== '') setActiveTab('All')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-fb-darker transition-colors duration-300">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />

      <div className="pt-14">
        <div className="max-w-7xl mx-auto">
          <CoverPhoto />
          <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-6 items-start">

            {/* LEFT SIDEBAR */}
            <div className="hidden md:flex flex-col gap-4 w-72 flex-shrink-0 sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-none pb-4">
              <AboutCard />
              <EducationCard />
              <LinksCard />
            </div>

            {/* MAIN FEED */}
            <div className="flex-1 space-y-4 min-w-0">

              {/* SEARCH RESULTS */}
              {q !== '' && (
                <div className="space-y-4">
                  <div className="text-sm text-gray-500 dark:text-gray-400 px-1">
                    {hasResults ? `Results for "${searchQuery}"` : `No results for "${searchQuery}"`}
                  </div>

                  {aboutMatch && (
                    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 border border-gray-200 dark:border-fb-darkborder">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">About</p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Kevin B. Bueno — BS Computer Engineering student at CatSU, aspiring Software Engineer. "Grit. Grind. Grow."
                      </p>
                    </div>
                  )}

                  {filteredSkills.length > 0 && (
                    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 border border-gray-200 dark:border-fb-darkborder">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {filteredSkills.map((s) => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-fb-darkcard text-fb-blue border border-blue-100 dark:border-fb-darkborder">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredCerts.length > 0 && (
                    <div className="bg-white dark:bg-fb-dark rounded-lg p-4 border border-gray-200 dark:border-fb-darkborder">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Certificates</p>
                      <div className="space-y-1">
                        {filteredCerts.map((c) => (
                          <p key={c} className="text-sm text-gray-700 dark:text-gray-300">🏆 {c}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredProjects.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase px-1">Projects</p>
                      {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                      ))}
                    </div>
                  )}

                  {!hasResults && (
                    <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                      <p className="text-lg font-medium">No results found</p>
                      <p className="text-sm mt-1">Try a different keyword</p>
                    </div>
                  )}
                </div>
              )}

              {/* ALL TAB */}
              {activeTab === 'All' && q === '' && (
                <div className="space-y-5">
                  <div className="md:hidden space-y-5">
                    <AboutCard />
                    <EducationCard />
                    <SkillsCard />
                    <LinksCard />
                  </div>

                  {/* About */}
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Welcome to my portfolio</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Explore my projects, skills, and journey in tech.</p>
                  </div>
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About Me</h3>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        A motivated and detail-oriented Computer Engineering student with a strong passion for
                        technology and continuous learning. Skilled in software development, data analytics,
                        and building practical systems using modern tools and programming languages.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        My journey in tech began in February 2024 during my senior high school internship at
                        DICT-Catanduanes, where I wrote my first "Hello World" program. Since then, I've evolved
                        from building simple HTML/CSS pages to developing full-featured web and desktop applications
                        using React, Django, and Python.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic border-l-4 border-fb-blue pl-3">
                        ♟ Competitive chess player — strategic thinking translates well into software development.
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Skills & Tools</h3>
                    <SkillsCard />
                  </div>

                  {/* Projects */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white px-1 mb-3">Projects</h3>
                    <div className="space-y-5">
                      {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                      ))}
                    </div>
                  </div>

                  {/* Certificates */}
                  <CertificatesSection />

                  {/* Experience */}
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Experience</h3>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                          📊
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Assistant Statistician</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Part-time</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Statistical data analysis for academic research using Python, JASP, and Jamovi.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                          🏛️
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">DICT-Catanduanes</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">OJT · Feb 2024</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">80-hour training on MS Office, Adobe Photoshop, Windows Server, and HTML/CSS.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <LinksCard />
                </div>
              )}

              {/* ABOUT TAB */}
              {activeTab === 'About' && q === '' && (
                <div className="space-y-5">
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        A motivated and detail-oriented Computer Engineering student with a strong passion for
                        technology and continuous learning. Skilled in software development, data analytics,
                        and building practical systems using modern tools and programming languages.
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        My journey in tech began in February 2024 during my senior high school internship at
                        DICT-Catanduanes, where I wrote my first "Hello World" program. Since then, I've evolved
                        from building simple HTML/CSS pages to developing full-featured web and desktop applications
                        using React, Django, and Python.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic border-l-4 border-fb-blue pl-3">
                        ♟ Competitive chess player — strategic thinking translates well into software development.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { value: '2024', label: 'Started Coding', color: 'text-blue-600' },
                      { value: '5+', label: 'Projects Built', color: 'text-green-600' },
                      { value: '6+', label: 'Certificates', color: 'text-purple-600' },
                      { value: '3', label: 'Tech Stacks', color: 'text-orange-600' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white dark:bg-fb-dark rounded-lg p-4 shadow-sm border border-gray-200 dark:border-fb-darkborder text-center">
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white dark:bg-fb-dark rounded-lg p-5 shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">My Philosophy</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      I believe in building solutions that matter. Every line of code I write is driven by a
                      desire to solve real-world problems — whether it's automating tedious tasks, making data
                      accessible, or creating platforms that connect people. Grit. Grind. Grow.
                    </p>
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'Projects' && q === '' && (
                <div className="space-y-5">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'Skills' && q === '' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-fb-dark rounded-lg shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Skills & Tools</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Technologies and tools I work with.</p>
                  </div>
                  <SkillsCard />
                </div>
              )}

              {/* CERTIFICATES TAB */}
              {activeTab === 'Certificates' && q === '' && (
                <CertificatesSection />
              )}

              {/* OTHERS TAB */}
              {activeTab === 'Others' && q === '' && (
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-fb-dark rounded-lg shadow-sm border border-gray-200 dark:border-fb-darkborder">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">More About Me</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Experience, contact, and other details.</p>
                  </div>
                  <LinksCard />
                  <div className="bg-white dark:bg-fb-dark rounded-lg p-4 border border-gray-200 dark:border-fb-darkborder">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Experience</h2>
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                          📊
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Assistant Statistician</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Part-time</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Statistical data analysis for academic research using Python, JASP, and Jamovi.</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-fb-darkcard flex items-center justify-center text-lg flex-shrink-0">
                          🏛️
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">DICT-Catanduanes</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">OJT · Feb 2024</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">80-hour training on MS Office, Adobe Photoshop, Windows Server, and HTML/CSS.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </div>
  )
}