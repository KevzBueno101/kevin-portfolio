import { useState } from 'react'
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

export default function App() {
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const q = searchQuery.toLowerCase().trim()

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tech.some((t) => t.toLowerCase().includes(q))
  )

  const filteredSkills = q === '' ? [] : [
    'Python', 'HTML5', 'CSS3', 'JavaScript', 'C', 'SQL',
    'React', 'Django', 'Bootstrap', 'Tailwind CSS',
    'Git', 'GitHub', 'VS Code', 'Notion', 'Canva', 'Arduino IDE',
  ].filter((s) => s.toLowerCase().includes(q))

  const filteredCerts = q === '' ? [] : [
    'Data Visualization', 'Building Blocks of Programming',
    'Python - Data Analytics', 'Git & Version Control',
    'NC II - Computer Systems Servicing', 'Certificate of Participation',
  ].filter((c) => c.toLowerCase().includes(q))

  const aboutKeywords = [
    'kevin', 'bueno', 'computer engineering', 'catsu', 'philippines',
    'software engineer', 'chess', 'statistics', 'dict', 'ojt',
    'grit', 'grind', 'grow', 'assistant statistician',
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

        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex gap-4 items-start">

            {/* LEFT SIDEBAR */}
            <div className="hidden md:flex flex-col gap-4 w-80 flex-shrink-0 sticky top-16">
              <AboutCard />
              <SkillsCard />
              <EducationCard />
              <LinksCard />
            </div>

            {/* MAIN FEED */}
            <div className="flex-1 space-y-4">

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
                <div className="space-y-4">
                  <div className="md:hidden space-y-4">
                    <AboutCard />
                    <SkillsCard />
                    <EducationCard />
                    <LinksCard />
                  </div>
                  <div className="hidden md:block space-y-4">
                    {projects.map((project, index) => (
                      <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {/* ABOUT TAB */}
              {activeTab === 'About' && q === '' && (
                <div className="space-y-4">
                  <AboutCard />
                  <EducationCard />
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'Projects' && q === '' && (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'Skills' && q === '' && (
                <div className="space-y-4">
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
    </div>
  )
}