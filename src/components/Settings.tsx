import React from 'react';
import { X } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black border border-green-500 text-green-500 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">System Settings</h2>
          <button
            onClick={onClose}
            className="hover:text-green-400 transition-colors"
            aria-label="Close settings"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 font-mono">
          <section>
            <h3 className="text-lg font-bold mb-4">System Configuration</h3>
            <p className="text-sm opacity-80">MU-TH-UR 6000 is operating at optimal parameters.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;