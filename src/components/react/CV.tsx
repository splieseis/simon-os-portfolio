import React from 'react';
import { cvConfig } from '../../config/cv';
import { Download } from 'lucide-react';

interface CVProps {
  downloadPath?: string;
}

export const CV: React.FC<CVProps> = ({ downloadPath }) => {
  const {
    name,
    contact,
    summary,
    experience,
    education,
    skills,
    certifications,
    projects,
    languages,
  } = cvConfig;

  return (
    <div className="w-full p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
      <div className="border-b-2 border-neon pb-4 sm:pb-6">
        {name && (
          <h1 className="font-pixel-header text-2xl sm:text-3xl md:text-4xl text-neon mb-4 text-glow">
            {name}
          </h1>
        )}
        {contact && (
          <div className="flex flex-wrap gap-3 sm:gap-4 font-pixel-body text-sm sm:text-base text-neon/80">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.location && <span>{contact.location}</span>}
            {contact.website && (
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neon transition-colors"
              >
                {contact.website}
              </a>
            )}
          </div>
        )}
      </div>

      {summary && summary.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            SUMMARY
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {summary.map((paragraph, index) => (
              <p
                key={index}
                className="font-pixel-body text-base sm:text-lg text-neon/90 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            EXPERIENCE
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-neon/50 pl-4 sm:pl-6">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="font-pixel-header text-base sm:text-lg text-neon">
                    {exp.title}
                  </h3>
                  <span className="font-pixel-body text-sm sm:text-base text-neon/70">
                    @ {exp.company}
                  </span>
                  {exp.location && (
                    <span className="font-pixel-body text-xs sm:text-sm text-neon/50">
                      {exp.location}
                    </span>
                  )}
                </div>
                <p className="font-pixel-body text-xs sm:text-sm text-neon/60 mb-2">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                {exp.description && exp.description.length > 0 && (
                  <ul className="space-y-1 sm:space-y-2 mb-2">
                    {exp.description.map((desc, i) => (
                      <li
                        key={i}
                        className="font-pixel-body text-sm sm:text-base text-neon/80 flex items-start gap-2"
                      >
                        <span className="text-neon mt-1">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mt-2">
                    <p className="font-pixel-body text-xs sm:text-sm text-neon/70 mb-1">
                      Key Achievements:
                    </p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="font-pixel-body text-xs sm:text-sm text-neon/70 flex items-start gap-2"
                        >
                          <span className="text-neon/50 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            EDUCATION
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="border-l-2 border-neon/50 pl-4 sm:pl-6">
                <h3 className="font-pixel-header text-base sm:text-lg text-neon mb-1">
                  {edu.degree}
                </h3>
                <p className="font-pixel-body text-sm sm:text-base text-neon/80">
                  {edu.institution}
                  {edu.location && `, ${edu.location}`}
                  {edu.year && ` • ${edu.year}`}
                </p>
                {edu.description && edu.description.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {edu.description.map((desc, i) => (
                      <li
                        key={i}
                        className="font-pixel-body text-xs sm:text-sm text-neon/70 flex items-start gap-2"
                      >
                        <span className="text-neon/50 mt-1">▸</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && Object.keys(skills).length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            SKILLS
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div key={index}>
                <h3 className="font-pixel-body text-sm sm:text-base text-neon/70 mb-2">
                  {category}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill, i) => (
                    <span
                      key={i}
                      className="font-pixel-body text-xs sm:text-sm text-neon bg-neon/10 border border-neon/50 px-2 sm:px-3 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            CERTIFICATIONS
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="border-l-2 border-neon/50 pl-4 sm:pl-6">
                <h3 className="font-pixel-body text-sm sm:text-base text-neon">
                  {cert.name}
                </h3>
                <p className="font-pixel-body text-xs sm:text-sm text-neon/70">
                  {cert.issuer}
                  {cert.date && ` • ${cert.date}`}
                  {cert.credentialId && ` • ID: ${cert.credentialId}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {projects && projects.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            PROJECTS
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-neon/50 pl-4 sm:pl-6">
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <h3 className="font-pixel-header text-base sm:text-lg text-neon">
                    {project.name}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-pixel-body text-xs sm:text-sm text-neon/70 hover:text-neon transition-colors"
                    >
                      View →
                    </a>
                  )}
                </div>
                <p className="font-pixel-body text-sm sm:text-base text-neon/80 mb-2">
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="font-pixel-body text-xs text-neon/60 border border-neon/30 px-2 py-0.5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {languages.map((lang, index) => (
              <div key={index} className="font-pixel-body text-sm sm:text-base text-neon/80">
                <span className="text-neon">{lang.language}</span>
                <span className="text-neon/50"> - {lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

