import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { chatWithVox } from '../services/claude';
import { PageFooter } from '../components/VintageUI';

const STARTER_PROMPTS = [
  { text: 'What is FPTP and which countries use it?', icon: '🏇' },
  { text: 'How does the US Electoral College work?', icon: '🇺🇸' },
  { text: 'Compare parliamentary and presidential systems', icon: '⚖️' },
  { text: 'What is proportional representation?', icon: '📊' },
  { text: 'How does India manage elections for 900M voters?', icon: '🇮🇳' },
  { text: 'What are the biggest election controversies in history?', icon: '📰' },
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(text) {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await chatWithVox([...messages, userMsg]);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'TRANSMISSION ERROR — LINE DOWN — PLEASE RETRY — STOP' }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="page-wrapper py-8 max-w-4xl mx-auto" style={{ minHeight: 'calc(100vh - 200px)' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">VOX TELEGRAPH OFFICE</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 500 }}>
          Your direct line to the world's premier election correspondent
        </p>
      </motion.div>

      {/* Telegraph Office Chat Area */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: `
            linear-gradient(180deg, rgba(61,43,31,0.08) 0%, rgba(61,43,31,0.03) 100%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(61,43,31,0.02) 40px,
              rgba(61,43,31,0.02) 41px
            )
          `,
          border: '2px solid #3D2B1F',
          minHeight: 500,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header bar */}
        <div
          className="px-4 py-3 flex items-center gap-3"
          style={{
            background: 'linear-gradient(90deg, #3D2B1F, #5C3D2F)',
            borderBottom: '2px solid #C9A87C',
          }}
        >
          <div className="wax-seal" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>V</div>
          <div>
            <p className="font-elite text-sm m-0" style={{ color: '#F5ECD7', letterSpacing: '2px' }}>
              VOX — ON DUTY
            </p>
            <p className="font-caveat text-xs m-0" style={{ color: '#C9A87C' }}>
              World Election Correspondent
            </p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3A5C3E' }} />
            <span className="font-elite text-xs" style={{ color: '#3A5C3E' }}>ONLINE</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4" style={{ maxHeight: 500 }}>
          {/* Welcome message */}
          {messages.length === 0 && (
            <>
              <div className="flex justify-start mb-4">
                <div
                  className="p-4 rounded-lg max-w-lg"
                  style={{
                    background: 'linear-gradient(145deg, #F5ECD7, #EAD9B8)',
                    borderLeft: '3px solid #B33A3A',
                    fontFamily: "'Special Elite', cursive",
                    fontSize: '0.9rem',
                    color: '#3D2B1F',
                    lineHeight: 1.7,
                  }}
                >
                  GREETINGS STOP — I AM VOX, YOUR ELECTION CORRESPONDENT STOP —
                  ASK ME ANYTHING ABOUT VOTING SYSTEMS, DEMOCRACY, POLITICAL STRUCTURES,
                  OR ELECTORAL HISTORY STOP — DISPATCH FOLLOWS UPON YOUR INQUIRY STOP
                </div>
              </div>

              {/* Starter Prompts - Cork board with pinned postcards */}
              <div className="mb-4">
                <p className="font-elite text-xs text-center mb-3" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
                  SUGGESTED INQUIRIES
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {STARTER_PROMPTS.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(prompt.text)}
                      className="postcard p-3 rounded-lg text-left"
                      style={{ transform: `rotate(${(Math.random() - 0.5) * 3}deg)` }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{prompt.icon}</span>
                        <span className="font-lora text-sm" style={{ color: '#3D2B1F' }}>
                          {prompt.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'user' ? (
                <div
                  className="p-3 px-4 rounded-lg max-w-md"
                  style={{
                    background: '#F5ECD7',
                    border: '1px solid #C9A87C',
                    fontFamily: "'Caveat', cursive",
                    fontSize: '1.1rem',
                    color: '#1A1008',
                    transform: 'rotate(0.3deg)',
                    boxShadow: '2px 3px 8px rgba(61,43,31,0.15)',
                  }}
                >
                  {msg.content}
                </div>
              ) : (
                <div
                  className="p-4 rounded-lg max-w-lg"
                  style={{
                    background: 'linear-gradient(145deg, #F5ECD7, #EAD9B8)',
                    borderLeft: '3px solid #B33A3A',
                    fontFamily: "'Special Elite', cursive",
                    fontSize: '0.85rem',
                    color: '#3D2B1F',
                    lineHeight: 1.7,
                    boxShadow: '2px 3px 10px rgba(61,43,31,0.15)',
                  }}
                >
                  {msg.content}
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3" style={{ fontFamily: "'Special Elite', cursive", color: '#8B6F47' }}>
                <div className="morse-dots">
                  <span></span><span></span><span></span><span></span>
                </div>
                <p className="font-elite text-xs mt-2 m-0" style={{ color: '#8B6F47' }}>
                  INCOMING TRANSMISSION...
                </p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4" style={{ borderTop: '2px solid #C9A87C', background: '#EAD9B8' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="TYPE YOUR INQUIRY TO VOX..."
              className="telegraph-input flex-1 rounded-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="stamp-btn rounded-lg"
              style={{ opacity: loading || !input.trim() ? 0.5 : 1 }}
            >
              📨 SEND
            </button>
          </form>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
