import React from 'react';
import Editor from '@monaco-editor/react';
import { useAppContext } from '../context/AppContext';

const CodeEditor: React.FC = () => {
  const { 
    code, 
    setCode, 
    executionMode,
    highlightedLine
  } = useAppContext();

  // This function adds markers to highlight specific lines
  const handleEditorDidMount = (editor: any) => {
    if (highlightedLine > 0) {
      const decorations = editor.deltaDecorations(
        [],
        [
          {
            range: {
              startLineNumber: highlightedLine,
              startColumn: 1,
              endLineNumber: highlightedLine,
              endColumn: 1000,
            },
            options: {
              isWholeLine: true,
              className: 'bg-yellow-100 bg-opacity-50',
            },
          },
        ]
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
        <h2 className="font-medium text-slate-800">Code Editor</h2>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">C++ Code</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            readOnly: executionMode === 'stepByStep' && highlightedLine > 0,
            lineNumbers: 'on',
            renderLineHighlight: 'all',
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default CodeEditor;