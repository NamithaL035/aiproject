import React from 'react';

interface CodeBlockProps {
  content: string;
  language?: string;
  title?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language, title }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 border border-gray-700">
      {title && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-gray-700">
          {title}
        </div>
      )}
      <pre className="p-4 text-sm text-yellow-300 overflow-x-auto">
        <code className={`language-${language}`}>
          {content}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
