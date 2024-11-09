import React from 'react';
import Cursor from './Cursor';

interface TerminalResponseProps {
  log: {
    text: string;
    type: 'input' | 'response';
    isProtocol?: boolean;
    isPriority?: boolean;
    isMotherOnline?: boolean;
  };
  isLast: boolean;
  isTyping: boolean;
}

const TerminalResponse: React.FC<TerminalResponseProps> = ({ log, isLast, isTyping }) => {
  const getResponseClass = () => {
    if (log.type === 'response') {
      if (log.isMotherOnline) {
        return 'mother-online protocol-line';
      }
      return log.isPriority ? 'text-red-500 font-bold' : 'text-green-400';
    }
    return 'text-green-600';
  };

  return (
    <div className={`mb-2 ${getResponseClass()}`}>
      <span className="opacity-50">
        {log.type === 'input' ? '> USER:' : '> MU-TH-UR:'}
      </span>{' '}
      {log.isProtocol && !log.isMotherOnline ? (
        <span className="protocol-line animate-glow">{log.text}</span>
      ) : (
        log.text
      )}
      {isLast && !isTyping && <Cursor />}
    </div>
  );
};

export default TerminalResponse;