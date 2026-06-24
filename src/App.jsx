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
  const [activeTab, setActiveTab] = useState('About')

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-fb-darker transition-colors duration-300">
      <Navbar />

      {/* Main content — offset for fixed navbar */}
      <div className="pt-14">

        {/* Cover + Profile Header */}
        <div className="max-w-5xl mx-auto">
          <CoverPhoto />
          <ProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Body — Sidebar + Feed */}
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

              {/* Mobile: show About/Skills/Education/Links inline */}
              {activeTab === 'About' && (
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

              {activeTab === 'Projects' && (
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}

              {activeTab === 'Certificates' && (
                <CertificatesSection />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}