import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithVox } from '../services/geminiService';

export default function VoxBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithVox([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'TRANSMISSION ERROR — PLEASE RETRY — STOP' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-4"
            style={{ width: 360, maxHeight: 480 }}
          >
            {/* Airmail border wrapper */}
            <div className="airmail-border rounded-lg overflow-hidden">
              <div className="telegram-card rounded-lg flex flex-col" style={{ maxHeight: 470 }}>
                {/* Header */}
                <div className="flex items-center justify-between p-3 border-b" style={{ borderColor: '#C9A87C' }}>
                  <div className="flex items-center gap-2">
                    <div className="wax-seal" style={{ width: 28, height: 28, fontSize: '0.6rem' }}>V</div>
                    <div>
                      <p className="font-elite text-xs m-0" style={{ color: '#3D2B1F', letterSpacing: '2px' }}>
                        VOX TELEGRAPH OFFICE
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="font-elite text-sm cursor-pointer bg-transparent border-none"
                    style={{ color: '#8B6F47' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: 320, minHeight: 200 }}>
                  {messages.length === 0 && (
                    <div className="telegram-card p-3 rounded" style={{ border: '1px solid #C9A87C' }}>
                      <p className="font-elite text-sm m-0" style={{ color: '#3D2B1F' }}>
                        TRANSMISSION FROM VOX — GREETINGS STOP
                      </p>
                      <p className="font-elite text-xs mt-2 m-0" style={{ color: '#8B6F47' }}>
                        ASK ME ABOUT ELECTIONS, VOTING SYSTEMS, OR DEMOCRACY — DISPATCH FOLLOWS — STOP
                      </p>
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.role === 'user' ? (
                        <div
                          className="p-2 px-3 rounded-lg max-w-[80%]"
                          style={{
                            background: '#F5ECD7',
                            border: '1px solid #C9A87C',
                            fontFamily: "'Caveat', cursive",
                            fontSize: '1rem',
                            color: '#1A1008',
                            transform: 'rotate(0.5deg)',
                          }}
                        >
                          {msg.content}
                        </div>
                      ) : (
                        <div
                          className="p-2 px-3 rounded max-w-[85%]"
                          style={{
                            background: 'linear-gradient(145deg, #F5ECD7, #EAD9B8)',
                            borderLeft: '3px solid #B33A3A',
                            fontFamily: "'Special Elite', cursive",
                            fontSize: '0.82rem',
                            color: '#3D2B1F',
                            lineHeight: 1.5,
                          }}
                        >
                          {msg.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="p-2 px-3" style={{ fontFamily: "'Special Elite', cursive", color: '#8B6F47', fontSize: '0.8rem' }}>
                        <div className="morse-dots">
                          <span></span><span></span><span></span><span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-3 border-t flex gap-2" style={{ borderColor: '#C9A87C' }}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="TYPE YOUR INQUIRY..."
                    className="telegraph-input flex-1 text-xs rounded"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="stamp-btn text-xs py-2 px-3 rounded"
                    style={{ opacity: isLoading || !input.trim() ? 0.5 : 1 }}
                  >
                    SEND
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button - Airmail Envelope */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer border-none"
        style={{
          background: 'linear-gradient(135deg, #D4A855, #C8A84B, #B89040)',
          boxShadow: '3px 5px 15px rgba(61,43,31,0.35), inset 0 1px 2px rgba(255,255,255,0.2)',
          position: 'relative',
        }}
        title="Ask Vox"
      >
        {/* Airmail stripes */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden opacity-30"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              #B33A3A 0px, #B33A3A 3px,
              transparent 3px, transparent 6px,
              #1C3557 6px, #1C3557 9px,
              transparent 9px, transparent 12px
            )`,
          }}
        />
        <div className="wax-seal" style={{ width: 36, height: 36, fontSize: '0.85rem', position: 'relative', zIndex: 2 }}>
          V
        </div>
      </motion.button>
    </div>
  );
}
