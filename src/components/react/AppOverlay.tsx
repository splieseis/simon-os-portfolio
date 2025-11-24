import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { activeAppId, closeApp } from '../../store/os-store';
import { inventory } from '../../config/inventory';
import { AppRegistry } from '../../apps/registry';
import type { ItemAction } from '../../types';
import { X } from 'lucide-react';

export const AppOverlay: React.FC = () => {
  const appId = useStore(activeAppId);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appId) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeApp();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const modal = target.closest('[data-modal-content]');
      if (!modal) {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, [appId]);

  useEffect(() => {
    if (appId && contentRef.current) {
      const timer = setTimeout(() => {
        contentRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [appId]);

  if (!appId) {
    return null;
  }

  const item = inventory.find((i) => i.id === appId);
  if (!item) {
    return null;
  }

  const action: ItemAction = item.action || (item.componentKey ? 'component' : item.link ? 'link' : 'component');
  const Component = item.componentKey ? AppRegistry[item.componentKey] : null;

  const handleClose = () => {
    closeApp();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const renderContent = () => {
    switch (action) {
      case 'iframe':
        if (!item.link) {
          return (
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <p className="font-pixel-body text-lg sm:text-xl text-neon/70">
                No URL provided for iframe.
              </p>
            </div>
          );
        }
        return (
          <iframe
            src={item.link}
            className="w-full h-full min-h-[500px] border-0 bg-os-black"
            title={item.title}
            allow="fullscreen"
          />
        );

      case 'download':
        if (!Component) {
          return (
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <p className="font-pixel-body text-lg sm:text-xl text-neon/70">
                No component found for this item.
              </p>
            </div>
          );
        }
        return (
          <div className="bg-os-black">
            <Component downloadPath={item.downloadPath} />
          </div>
        );

      case 'component':
        if (!Component) {
          return (
            <div className="p-6 sm:p-8 md:p-10 text-center">
              <p className="font-pixel-body text-lg sm:text-xl text-neon/70">
                {item.description || 'No content available for this item.'}
              </p>
            </div>
          );
        }
        return (
          <div className="bg-os-black">
            <Component />
          </div>
        );

      default:
        return (
          <div className="p-6 sm:p-8 md:p-10 text-center">
            <p className="font-pixel-body text-lg sm:text-xl text-neon/70">
              {item.description || 'No content available for this item.'}
            </p>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-pixel-body text-base sm:text-lg text-neon border border-neon px-4 py-2 hover:bg-neon/20 transition-colors duration-200"
              >
                OPEN LINK
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${action === 'iframe' ? 'p-0' : 'p-4 sm:p-6 md:p-8'}`}
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-os-black/90 backdrop-blur-sm" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`relative w-full ${action === 'iframe' ? 'max-w-full h-full max-h-full' : 'max-w-4xl max-h-[90vh]'} bg-os-black border-4 border-neon crt-frame shadow-neon flex flex-col`}
        >
          <div className="absolute inset-0 crt-overlay pointer-events-none z-10" />

          <div className="relative z-20 flex items-center justify-between border-b-4 border-neon bg-os-darker/50 p-4 sm:p-6 flex-shrink-0">
            <h2 className="font-pixel-header text-lg sm:text-xl md:text-2xl text-neon text-glow">
              {item.title}
            </h2>
            <div className="flex items-center gap-2 sm:gap-3">
              {action === 'download' && item.downloadPath && (
                <a
                  href={item.downloadPath}
                  download
                  className="text-neon hover:text-neon/70 hover:bg-neon/20 border border-neon/50 hover:border-neon px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-200 font-pixel-body text-sm sm:text-base flex items-center gap-2"
                  aria-label="Download PDF"
                >
                  <span className="hidden sm:inline">DOWNLOAD</span>
                  <span className="sm:hidden">↓</span>
                </a>
              )}
              <button
                onClick={handleClose}
                className="text-neon hover:text-neon/70 hover:bg-neon/20 border border-neon/50 hover:border-neon px-3 py-1.5 sm:px-4 sm:py-2 transition-all duration-200 font-pixel-body text-sm sm:text-base flex items-center gap-2"
                aria-label="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">CLOSE</span>
              </button>
            </div>
          </div>

          <div 
            ref={contentRef}
            data-modal-content
            tabIndex={0}
            className="relative z-20 overflow-y-auto flex-1 min-h-0 focus:outline-none"
            onKeyDown={(e) => {
              const content = contentRef.current;
              if (!content) return;

              const scrollAmount = 100;
              switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                  e.preventDefault();
                  e.stopPropagation();
                  content.scrollBy({ top: scrollAmount, behavior: 'smooth' });
                  break;
                case 'ArrowUp':
                case 'PageUp':
                  e.preventDefault();
                  e.stopPropagation();
                  content.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
                  break;
                case 'Home':
                  e.preventDefault();
                  e.stopPropagation();
                  content.scrollTo({ top: 0, behavior: 'smooth' });
                  break;
                case 'End':
                  e.preventDefault();
                  e.stopPropagation();
                  content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
                  break;
              }
            }}
          >
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

