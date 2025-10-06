
import React, { useEffect, useRef, useState } from 'react';

declare const mermaid: any;

interface MermaidDiagramProps {
  chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chart && typeof mermaid !== 'undefined') {
      const renderMermaid = async () => {
        try {
          const id = `mermaid-graph-${Math.random().toString(36).substr(2, 9)}`;
          const { svg: renderedSvg } = await mermaid.render(id, chart);
          setSvg(renderedSvg);
          setError(null);
        } catch (e) {
          console.error("Mermaid rendering error:", e);
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError("An unknown error occurred during diagram rendering.");
          }
          setSvg('');
        }
      };

      renderMermaid();
    }
  }, [chart]);

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-700 p-4 rounded-lg">
        <p className="font-bold text-red-200">Diagram Error:</p>
        <p className="text-red-300">{error}</p>
        <p className="text-gray-400 mt-2">The AI may have generated invalid Mermaid syntax. Here is the raw code:</p>
        <pre className="bg-gray-900 text-yellow-300 p-2 mt-2 rounded overflow-x-auto">
          <code>{chart}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gray-900/50 p-4 rounded-lg" ref={containerRef}>
      {svg ? (
        <div dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <div className="animate-pulse text-gray-400">Loading diagram...</div>
      )}
    </div>
  );
};

export default MermaidDiagram;
