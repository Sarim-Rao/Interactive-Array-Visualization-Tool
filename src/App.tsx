import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import Visualization from './components/Visualization';
import ControlPanel from './components/ControlPanel';
import { AppProvider } from './context/AppContext';
import './styles/splitPane.css';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 overflow-hidden">
          <PanelGroup direction="horizontal">
            <Panel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <CodeEditor />
              </div>
            </Panel>
            <PanelResizeHandle className="panel-resize-handle" />
            <Panel minSize={30}>
              <div className="h-full flex flex-col">
                <Visualization />
              </div>
            </Panel>
          </PanelGroup>
        </div>
        <ControlPanel />
      </div>
    </AppProvider>
  );
}

export default App;