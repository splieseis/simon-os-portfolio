import { useStore } from '@nanostores/react';
import { openWindows } from '../../store/os-store';

export default function WindowManager() {
  const windows = useStore(openWindows);

  return (
    <>
      {windows.map((window) => (
        <div
          key={window.id}
          className="absolute border border-[#39ff14] bg-[#050505] text-[#39ff14] font-mono p-4"
          style={{
            top: '50px',
            left: '50px',
            width: '400px',
            height: '300px',
            zIndex: window.zIndex,
          }}
        >
          <div className="flex justify-between items-center mb-2 border-b border-[#39ff14] pb-2">
            <h3>{window.title}</h3>
            <button className="text-[#39ff14] hover:text-[#39ff14]/70">
              ×
            </button>
          </div>
          <div className="overflow-auto h-full">
            {window.type === 'component' && (
              <div>Component: {window.content}</div>
            )}
            {window.type === 'iframe' && (
              <iframe src={window.content} className="w-full h-full" />
            )}
            {window.type === 'markdown' && <div>{window.content}</div>}
          </div>
        </div>
      ))}
    </>
  );
}
