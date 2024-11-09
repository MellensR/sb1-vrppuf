import React, { useState, useEffect, useRef } from 'react';
import { HelpCircle, Settings as SettingsIcon, Info, Shield } from 'lucide-react';
import Header from './Header';
import TerminalResponse from './TerminalResponse';
import Help from './Help';
import Privacy from './Privacy';
import Settings from './Settings';
import About from './About';
import InitializationLines from './InitializationLines';
import { AudioManager } from '../utils/AudioManager';
import { easterEggs } from '../utils/EasterEggs';
import { generateExplanation } from '../utils/ExplainCommand';
import { getRandomDirective } from '../utils/DirectiveMatrix';
import { d6Responses, standardResponses, statusResponses } from '../config/responses';

interface Log {
  type: 'input' | 'response';
  text: string;
  isProtocol?: boolean;
  isPriority?: boolean;
  isMotherOnline?: boolean;
}

const Terminal: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<Log[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleStart = async () => {
    setStarted(true);
    setIsInitializing(true);
    await audioManager.initialize();
  };

  const handleInitializationComplete = () => {
    setIsInitializing(false);
    setShowTerminal(true);
    setLogs([{ type: 'response', text: 'MOTHER ONLINE', isMotherOnline: true }]);
  };

  const addSystemResponse = async (text: string, isProtocol = false, isPriority = false) => {
    setIsTyping(true);
    const chars = text.split('');
    let currentText = '';

    for (const char of chars) {
      await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20));
      currentText += char;
      audioManager.playResponseChar();
      setLogs(prev => {
        const newLogs = [...prev];
        if (newLogs[newLogs.length - 1]?.type === 'response' && !newLogs[newLogs.length - 1].isMotherOnline) {
          newLogs[newLogs.length - 1] = {
            type: 'response',
            text: currentText,
            isProtocol,
            isPriority
          };
        } else {
          newLogs.push({
            type: 'response',
            text: currentText,
            isProtocol,
            isPriority
          });
        }
        return newLogs;
      });
    }
    
    audioManager.playResponseBeep();
    setIsTyping(false);
  };

  const handleCommand = async (command: string) => {
    const lowerCommand = command.toLowerCase().trim();

    if (lowerCommand === 'help') {
      setShowHelp(true);
      return;
    }

    if (lowerCommand === 'clear') {
      setLogs([]);
      addSystemResponse('TERMINAL CLEARED. READY FOR INPUT.');
      return;
    }

    if (lowerCommand === 'expand') {
      const directive = getRandomDirective();
      addSystemResponse(`ACCESSING PROTOCOL ${directive.protocol}-${directive.number}...`, true);
      setTimeout(() => {
        addSystemResponse(directive.directive);
      }, 1000);
      return;
    }

    if (lowerCommand === 'explain') {
      const explanation = await generateExplanation(logs);
      addSystemResponse(explanation, true);
      return;
    }

    // Check for easter eggs
    for (const [trigger, egg] of Object.entries(easterEggs)) {
      if (lowerCommand.includes(trigger)) {
        addSystemResponse(egg.response, false, egg.priority);
        return;
      }
    }

    // Handle questions
    if (command.endsWith('?')) {
      const roll = Math.floor(Math.random() * 6) + 1;
      addSystemResponse(d6Responses[roll as keyof typeof d6Responses]);
      return;
    }

    // Handle status requests
    if (lowerCommand.includes('status')) {
      const response = statusResponses[Math.floor(Math.random() * statusResponses.length)];
      addSystemResponse(response);
      return;
    }

    // Default response
    const response = standardResponses[Math.floor(Math.random() * standardResponses.length)];
    addSystemResponse(response);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const command = input.trim();
    setLogs(prev => [...prev, { type: 'input', text: command }]);
    setInput('');
    await handleCommand(command);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      audioManager.playKeystroke();
    }
  };

  const downloadLogs = () => {
    const timestamp = new Date().toISOString();
    const separator = '='.repeat(55);
    
    const header = [
      separator,
      'MU-TH-UR 6000 - TERMINAL SESSION LOG',
      'CLASSIFIED - CREW ACCESS LEVEL REQUIRED',
      `Session started: ${timestamp}`,
      separator,
      ''
    ].join('\n');
    
    const content = logs.map(log => {
      const prefix = log.type === 'input' ? '> USER:' : '> MU-TH-UR:';
      return `${prefix} ${log.text}`;
    }).join('\n');
    
    const footer = [
      '',
      separator,
      'MU-TH-UR 6000 - END OF LOG',
      `Session ended: ${timestamp}`,
      separator
    ].join('\n');
    
    const fullLog = `${header}${content}${footer}`;
    const blob = new Blob([fullLog], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MOTHER_${new Date().toISOString().split('T')[0]}.log`;
    a.click();
    URL.revokeObjectURL(url);

    addSystemResponse('LOGS EXPORTED SUCCESSFULLY.', true);
  };

  return (
    <>
      {!started ? (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-8 mb-12">
            <div className="animate-pulse">
              <h1 className="text-4xl font-bold text-green-500 font-mono">MU-TH-UR 6000</h1>
              <p className="text-green-400/80 mt-2 font-mono">WEYLAND-YUTANI CORPORATION</p>
            </div>
            
            <div className="space-y-4 font-mono">
              <p className="text-green-500/60">ARTIFICIAL INTELLIGENCE INTERFACE</p>
              <p className="text-green-500/60">MODEL 6000 - REVISION 2.0</p>
            </div>

            <button
              onClick={handleStart}
              className="px-8 py-3 border-2 border-green-500 text-green-500 hover:bg-green-500/10 transition-colors font-mono"
            >
              INITIALIZE INTERFACE 2037
            </button>
          </div>

          <div className="flex gap-8 text-green-500/60">
            <button
              onClick={() => setShowHelp(true)}
              className="flex items-center gap-2 hover:text-green-500 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
            <button
              onClick={() => setShowPrivacy(true)}
              className="flex items-center gap-2 hover:text-green-500 transition-colors"
            >
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="flex items-center gap-2 hover:text-green-500 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black">
          {isInitializing && (
            <InitializationLines onComplete={handleInitializationComplete} />
          )}
          
          {showTerminal && (
            <div className="p-4 font-mono text-green-500" onClick={() => inputRef.current?.focus()}>
              <div className="max-w-4xl mx-auto">
                <Header onDownloadLogs={downloadLogs} onPrivacyClick={() => setShowPrivacy(true)} />

                <div className="mb-4 flex justify-end space-x-4">
                  <button
                    onClick={() => setShowHelp(true)}
                    className="flex items-center gap-2 text-green-500/70 hover:text-green-500 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4" />
                    <span className="text-sm">Help</span>
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center gap-2 text-green-500/70 hover:text-green-500 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>

                <div className="h-[calc(100vh-12rem)] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black">
                  {logs.map((log, index) => (
                    <TerminalResponse
                      key={index}
                      log={log}
                      isLast={index === logs.length - 1}
                      isTyping={isTyping}
                    />
                  ))}
                  <div ref={logsEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full bg-black border border-green-500 text-green-500 p-2 focus:outline-none focus:border-green-400"
                    placeholder="Enter command..."
                    autoFocus
                    disabled={isTyping || isInitializing}
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      <Help isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <Privacy isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </>
  );
};

export default Terminal;