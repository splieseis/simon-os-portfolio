import { useStore } from '@nanostores/react';
import { openWindows } from '../../store/os-store';

export default function WindowManager() {
  const windows = useStore(openWindows);

  return (
    <>
      {windows.map((window) => {
        const top = window.position?.top ?? 50;
        const left = window.position?.left ?? 50;
        const width = window.size?.width ?? 400;
        const height = window.size?.height ?? 300;
        
        return (
          <div
            key={window.id}
            className="absolute border border-neon bg-os-black text-neon font-pixel-body p-4 min-w-80 min-h-60"
            style={{
              top: `${top}px`,
              left: `${left}px`,
              width: `${width}px`,
              height: `${height}px`,
              zIndex: window.zIndex,
            }}
          >
            <div className="flex justify-between items-center mb-2 border-b border-neon pb-2">
              <h3 className="text-sm">{window.title}</h3>
              <button className="text-neon hover:text-neon/70 text-xl leading-none">
                ×
              </button>
            </div>
            <div className="overflow-auto h-[calc(100%-3rem)]">
              {window.type === 'component' && (
                <div>Component: {window.content}</div>
              )}
              {window.type === 'iframe' && (
                <iframe src={window.content} className="w-full h-full border-0" title={window.title} />
              )}
              {window.type === 'markdown' && <div>{window.content}</div>}
            </div>
          </div>
        );
      })}
    </>
  );
}
