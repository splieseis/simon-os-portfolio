import React from 'react';
import { aboutMeConfig } from '../../config/about-me';
import { getThemeIconPath } from '../../store/theme-store';
import * as LucideIcons from 'lucide-react';

export const AboutMe: React.FC = () => {
  const {
    name,
    tagline,
    bio,
    currentRole,
    location,
    skills,
    interests,
    socials,
    funFacts,
  } = aboutMeConfig;

  return (
    <div className="w-full p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
      <div className="border-b-2 border-neon pb-4 sm:pb-6">
        {name && (
          <h1 className="font-pixel-header text-2xl sm:text-3xl md:text-4xl text-neon mb-2 text-glow">
            {name}
          </h1>
        )}
        {tagline && (
          <p className="font-pixel-body text-lg sm:text-xl md:text-2xl text-neon/80">
            {tagline}
          </p>
        )}
        {(currentRole || location) && (
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 sm:mt-4">
            {currentRole && (
              <span className="font-pixel-body text-sm sm:text-base text-neon/70 border border-neon/50 px-3 py-1">
                {currentRole}
              </span>
            )}
            {location && (
              <span className="font-pixel-body text-sm sm:text-base text-neon/70 border border-neon/50 px-3 py-1">
                {location}
              </span>
            )}
          </div>
        )}
      </div>

      {bio && bio.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            ABOUT
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {bio.map((paragraph, index) => (
              <p
                key={index}
                className="font-pixel-body text-base sm:text-lg md:text-xl text-neon/90 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            SKILLS
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="font-pixel-body text-sm sm:text-base text-neon bg-neon/10 border border-neon/50 px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-neon/20 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {interests && interests.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            INTERESTS
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="font-pixel-body text-sm sm:text-base text-neon/80 border border-neon/30 px-3 sm:px-4 py-1.5 sm:py-2"
              >
                {interest}
              </span>
            ))}
          </div>
        </section>
      )}

      {funFacts && funFacts.length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            FUN FACTS
          </h2>
          <ul className="space-y-2 sm:space-y-3 list-none">
            {funFacts.map((fact, index) => (
              <li
                key={index}
                className="font-pixel-body text-base sm:text-lg text-neon/90 flex items-start gap-2 sm:gap-3"
              >
                <span className="text-neon mt-1">▸</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {socials && Object.keys(socials).length > 0 && (
        <section className="space-y-3 sm:space-y-4">
          <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon border-b border-neon/50 pb-2">
            CONNECT
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            {socials.github && (
              <SocialLink
                href={socials.github}
                label="GitHub"
                iconName="github"
              />
            )}
            {socials.linkedin && (
              <SocialLink
                href={socials.linkedin}
                label="LinkedIn"
                iconName="linkedin"
              />
            )}
            {socials.x && (
              <SocialLink
                href={socials.x}
                label="X"
                iconName="x"
              />
            )}
            {socials.website && (
              <SocialLink
                href={socials.website}
                label="Website"
                iconName="globe"
              />
            )}
            {socials.email && (
              <SocialLink
                href={`mailto:${socials.email}`}
                label="Email"
                iconName="mail"
                isExternal={false}
              />
            )}
          </div>
        </section>
      )}
    </div>
  );
};

interface SocialLinkProps {
  href: string;
  label: string;
  iconName: string;
  isExternal?: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({ 
  href, 
  label, 
  iconName,
  isExternal = true 
}) => {
  const themeIconPath = getThemeIconPath(iconName);
  const isImageIcon = themeIconPath && (themeIconPath.startsWith('/') || /\.(webp|png|jpg|jpeg|svg|gif)$/i.test(themeIconPath));
  
  const LucideIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    github: LucideIcons.Github,
    linkedin: LucideIcons.Linkedin,
    x: LucideIcons.Twitter,
    globe: LucideIcons.Globe,
    mail: LucideIcons.Mail,
  };
  
  const IconComponent = !isImageIcon ? (LucideIconMap[iconName] || LucideIcons.Circle) : null;

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-2 font-pixel-body text-sm sm:text-base text-neon border border-neon/50 px-4 py-2 hover:bg-neon/20 hover:border-neon transition-all duration-200"
    >
      {isImageIcon ? (
        <img 
          src={themeIconPath} 
          alt={`${label} icon`}
          className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
        />
      ) : IconComponent ? (
        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <LucideIcons.Circle className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
      {label}
    </a>
  );
};

