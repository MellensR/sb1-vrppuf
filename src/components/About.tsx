import React from 'react';
import { X } from 'lucide-react';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
}

const About: React.FC<AboutProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-black border border-green-500 text-green-500 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-black">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">About MU-TH-UR 6000</h2>
          <button
            onClick={onClose}
            className="hover:text-green-400 transition-colors"
            aria-label="Close about"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6 font-mono">
          <section>
            <h3 className="text-lg font-bold mb-4">Overview</h3>
            <p className="mb-4">
              MU-TH-UR 6000 serves as your digital companion for the Alien RPG solo experience, 
              providing an immersive way to log your journey and receive guidance through your missions.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Log entries for tracking mission progress</li>
              <li>Oracle system for decision validation</li>
              <li>Protocol matrix for generating mission events</li>
              <li>Downloadable mission logs</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Using Status Messages</h3>
            <div className="space-y-4">
              <p>
                Communication is vital. When playing Alien RPG solo, using short status messages to MU-TH-UR,
                the ship's AI, can be an immersive way to track your progress, document key events, and
                maintain a sense of connection to the larger narrative.
              </p>
              
              <div>
                <h4 className="font-bold mt-4 mb-2">Benefits:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Narrative Immersion: Reinforces the feeling of being in the Alien universe</li>
                  <li>Progress Tracking: Provides a concise record of key events and decisions</li>
                  <li>Decision Validation: Helps in critical decision-making situations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mt-4 mb-2">Example Interaction:</h4>
                <div className="bg-black/30 p-4 border border-green-500/30 rounded">
                  <p className="mb-2">USER: MU-TH-UR, APC is offline. Proceeding on foot. Are there any immediate threats?</p>
                  <p className="text-green-400">MU-TH-UR: Affirmative. Proceed with caution.</p>
                  <p className="text-green-400">MU-TH-UR: Biohazard detected.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">Best Practices</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Keep messages concise and to the point</li>
              <li>Log updates after significant events</li>
              <li>Focus on essential details and objectives</li>
              <li>Maintain consistent format and tone</li>
              <li>Download logs to track your progress</li>
            </ul>
          </section>

          <section className="mt-8 pt-6 border-t border-green-500/30">
            <h3 className="text-lg font-bold mb-4">Legal Disclaimer</h3>
            <p className="text-sm leading-relaxed opacity-80">
              This application is a fan-made tool created for personal, non-commercial use only. The developer holds no rights to the Alien franchise, Alien RPG, or any related intellectual property. All rights to the Alien universe, characters, and associated trademarks are owned by their respective copyright holders, including 20th Century Studios and Free League Publishing.
            </p>
            <p className="text-sm leading-relaxed opacity-80 mt-4">
              This application was developed to enhance the Alien RPG experience for fans and is not intended for sale, distribution, or any form of commercial use. The developer claims no ownership of any original Alien content, lore, or themes presented within this application.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;