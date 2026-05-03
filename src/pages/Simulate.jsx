import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countries, SYSTEM_TYPES } from '../data/countries';
import { getSimulationSteps } from '../services/geminiService';
import { LoadingTelegram, OrnamentalDivider, PageFooter } from '../components/VintageUI';

const STEP_STYLES = {
  notice: { icon: '📋', label: 'OFFICIAL NOTICE', bg: 'linear-gradient(145deg, #F5ECD7, #EAD9B8)', border: '#1C3557' },
  ballot: { icon: '🗳️', label: 'BALLOT PAPER', bg: 'linear-gradient(145deg, #F0E0C0, #E8D4B0)', border: '#B33A3A' },
  gazette: { icon: '📰', label: 'OFFICIAL GAZETTE', bg: 'linear-gradient(145deg, #F5ECD7, #E8D0A0)', border: '#3A5C3E' },
};

export default function Simulate() {
  const [step, setStep] = useState(0); // 0=country, 1=type, 2=narration, 3=walkthrough, 4=results
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [electionType, setElectionType] = useState('');
  const [simSteps, setSimSteps] = useState(null);
  const [currentSimStep, setCurrentSimStep] = useState(0);
  const [loading, setLoading] = useState(false);

  async function startSimulation() {
    setLoading(true);
    try {
      const steps = await getSimulationSteps(selectedCountry.name, electionType);
      setSimSteps(steps);
      setStep(2);
    } catch {
      setSimSteps([]);
    }
    setLoading(false);
  }

  const electionTypes = selectedCountry ? [
    'General/Parliamentary Election',
    'Presidential Election',
    'Local/Municipal Election',
    'State/Provincial Election',
    'Referendum',
  ] : [];

  return (
    <div className="page-wrapper py-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">ELECTION SIMULATOR</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 500 }}>
          Step into a vintage voting booth and experience democracy firsthand
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 0: Country Picker */}
        {step === 0 && (
          <motion.div
            key="country"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="telegram-card p-6 rounded-lg">
              <p className="font-elite text-xs tracking-widest mb-4" style={{ color: '#8B6F47' }}>
                STEP 1: SELECT YOUR DESTINATION
              </p>
              <h2 className="font-playfair text-xl font-bold mb-4" style={{ color: '#3D2B1F' }}>
                Choose a Country to Simulate
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto p-2">
                {countries.map(c => (
                  <button
                    key={c.name}
                    onClick={() => { setSelectedCountry(c); setStep(1); }}
                    className="paper-card p-3 rounded-lg cursor-pointer text-left transition-all duration-200"
                    style={{
                      border: selectedCountry?.name === c.name ? '2px solid #B33A3A' : '1.5px solid #C9A87C',
                      transform: `rotate(${(Math.random() - 0.5) * 2}deg)`,
                    }}
                  >
                    <span className="text-xl">{c.flag}</span>
                    <p className="font-baskerville text-xs font-bold mt-1 mb-0" style={{ color: '#3D2B1F' }}>
                      {c.name}
                    </p>
                    <p className="font-elite text-xs m-0 mt-0.5" style={{ color: '#8B6F47', fontSize: '0.6rem' }}>
                      {SYSTEM_TYPES[c.system]?.abbr}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Election Type */}
        {step === 1 && selectedCountry && (
          <motion.div
            key="type"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="paper-card p-6 rounded-lg">
              <p className="font-elite text-xs tracking-widest mb-2" style={{ color: '#8B6F47' }}>
                STEP 2: SELECT ELECTION TYPE
              </p>
              <h2 className="font-playfair text-xl font-bold mb-1" style={{ color: '#3D2B1F' }}>
                {selectedCountry.flag} {selectedCountry.name}
              </h2>
              <p className="font-lora text-sm mb-6" style={{ color: '#8B6F47' }}>
                Choose the type of election to simulate
              </p>

              {/* Ballot paper style */}
              <div
                className="p-6 rounded-lg mx-auto"
                style={{
                  maxWidth: 400,
                  background: '#F5ECD7',
                  border: '2px solid #3D2B1F',
                  boxShadow: 'inset 0 0 30px rgba(201,168,124,0.2)',
                }}
              >
                <p className="font-playfair text-center text-sm font-bold mb-4" style={{ color: '#3D2B1F', borderBottom: '1px solid #3D2B1F', paddingBottom: 8 }}>
                  OFFICIAL BALLOT
                </p>
                <div className="space-y-3">
                  {electionTypes.map(type => (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded transition-all"
                      style={{
                        background: electionType === type ? 'rgba(179,58,58,0.08)' : 'transparent',
                        border: `1px solid ${electionType === type ? '#B33A3A' : 'transparent'}`,
                      }}
                    >
                      <div
                        style={{
                          width: 20, height: 20,
                          border: '2px solid #3D2B1F',
                          borderRadius: 2,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: electionType === type ? '#3D2B1F' : 'transparent',
                          color: '#F5ECD7',
                          fontSize: '0.75rem',
                        }}
                      >
                        {electionType === type && '✓'}
                      </div>
                      <input
                        type="radio"
                        name="electionType"
                        value={type}
                        checked={electionType === type}
                        onChange={() => setElectionType(type)}
                        className="hidden"
                      />
                      <span className="font-lora text-sm" style={{ color: '#1A1008' }}>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button className="stamp-btn-outline text-xs py-2 px-4 rounded" onClick={() => setStep(0)}>
                  ← BACK
                </button>
                <button
                  className="stamp-btn text-xs py-2 px-4 rounded"
                  disabled={!electionType}
                  style={{ opacity: electionType ? 1 : 0.5 }}
                  onClick={startSimulation}
                >
                  BEGIN SIMULATION →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading */}
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoadingTelegram message="VOX IS PREPARING THE SIMULATION — STAND BY — STOP" />
          </motion.div>
        )}

        {/* Step 2: Vox Narration */}
        {step === 2 && simSteps && !loading && (
          <motion.div
            key="narration"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="airmail-border rounded-lg mb-6">
              <div className="telegram-card p-6 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <div className="wax-seal" style={{ width: 28, height: 28, fontSize: '0.6rem' }}>V</div>
                  <span className="font-elite text-xs" style={{ color: '#8B6F47', letterSpacing: '2px' }}>VOX DISPATCH</span>
                </div>
                <p className="font-elite text-sm" style={{ color: '#3D2B1F', lineHeight: 2, textTransform: 'uppercase' }}>
                  ATTENTION — SIMULATION BEGINS — STOP<br />
                  YOU ARE ABOUT TO WITNESS A {electionType.toUpperCase()} IN {selectedCountry.name.toUpperCase()} — STOP<br />
                  THE {SYSTEM_TYPES[selectedCountry.system]?.label.toUpperCase()} SYSTEM WILL BE DEMONSTRATED — STOP<br />
                  PROCEED THROUGH EACH STAGE — DISPATCH FOLLOWS — STOP
                </p>
                <button className="stamp-btn text-xs py-2 px-6 rounded mt-4" onClick={() => setStep(3)}>
                  PROCEED TO WALKTHROUGH →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Walkthrough */}
        {step === 3 && simSteps && (
          <motion.div
            key="walkthrough"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {simSteps.map((_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: i <= currentSimStep
                        ? 'radial-gradient(circle at 35% 35%, #d44545, #B33A3A 40%, #8a2828 100%)'
                        : '#C9A87C',
                      color: '#F5ECD7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.8rem', fontWeight: 700,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < simSteps.length - 1 && (
                    <div style={{
                      width: 40, height: 2,
                      background: i < currentSimStep ? '#B33A3A' : '#C9A87C',
                      marginLeft: 4, marginRight: 4,
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Current Step Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSimStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const s = simSteps[currentSimStep];
                  const style = STEP_STYLES[s?.type] || STEP_STYLES.notice;
                  return (
                    <div
                      className="p-6 md:p-8 rounded-lg"
                      style={{
                        background: style.bg,
                        border: `2px solid ${style.border}`,
                        boxShadow: '3px 5px 15px rgba(61,43,31,0.2)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">{style.icon}</span>
                        <span className="font-elite text-xs tracking-widest" style={{ color: style.border, letterSpacing: '2px' }}>
                          {style.label}
                        </span>
                      </div>
                      <h3 className="font-playfair text-xl font-bold mb-3" style={{ color: '#1A1008' }}>
                        {s?.title || `Step ${currentSimStep + 1}`}
                      </h3>
                      <p className="font-elite text-sm" style={{ color: '#3D2B1F', lineHeight: 1.8 }}>
                        {s?.description || 'Proceeding...'}
                      </p>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              <button
                className="stamp-btn-outline text-xs py-2 px-4 rounded"
                disabled={currentSimStep === 0}
                style={{ opacity: currentSimStep === 0 ? 0.5 : 1 }}
                onClick={() => setCurrentSimStep(currentSimStep - 1)}
              >
                ← PREVIOUS
              </button>
              {currentSimStep < simSteps.length - 1 ? (
                <button
                  className="stamp-btn text-xs py-2 px-4 rounded"
                  onClick={() => setCurrentSimStep(currentSimStep + 1)}
                >
                  NEXT STAGE →
                </button>
              ) : (
                <button
                  className="stamp-btn text-xs py-2 px-4 rounded"
                  onClick={() => setStep(4)}
                >
                  VIEW RESULTS →
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="paper-card p-6 md:p-8 rounded-lg">
              {/* Newspaper results header */}
              <div className="text-center mb-6">
                <div style={{ height: 3, background: '#1A1008' }} />
                <div style={{ height: 1, background: '#1A1008', marginTop: 3 }} />
                <h2 className="newspaper-headline text-2xl md:text-3xl my-4">
                  ELECTION RESULTS
                </h2>
                <p className="font-elite text-xs tracking-widest" style={{ color: '#B33A3A' }}>
                  ━━━ SPECIAL EDITION ━━━
                </p>
                <div style={{ height: 1, background: '#1A1008', marginTop: 8 }} />
              </div>

              <div className="text-center mb-6">
                <span className="text-4xl">{selectedCountry?.flag}</span>
                <h3 className="font-playfair text-xl font-bold mt-2" style={{ color: '#1A1008' }}>
                  {selectedCountry?.name} — {electionType}
                </h3>
                <span className="postage-stamp mt-2 inline-block" style={{
                  color: SYSTEM_TYPES[selectedCountry?.system]?.color,
                  borderColor: SYSTEM_TYPES[selectedCountry?.system]?.color,
                }}>
                  {SYSTEM_TYPES[selectedCountry?.system]?.label}
                </span>
              </div>

              <div className="rubber-stamp text-center mx-auto mb-6" style={{
                color: '#3A5C3E', borderColor: '#3A5C3E',
                padding: '8px 24px', transform: 'rotate(-3deg)',
              }}>
                SIMULATION COMPLETE
              </div>

              <p className="font-lora text-sm text-center mb-6" style={{ color: '#3D2B1F', lineHeight: 1.7 }}>
                You have successfully walked through the entire election process. 
                From registration to results, you've experienced how democracy unfolds in {selectedCountry?.name}.
              </p>

              <div className="flex justify-center gap-4">
                <button className="stamp-btn rounded" onClick={() => {
                  setStep(0); setSelectedCountry(null); setElectionType('');
                  setSimSteps(null); setCurrentSimStep(0);
                }}>
                  NEW SIMULATION
                </button>
                <button className="stamp-btn-outline rounded" onClick={() => setStep(3)}>
                  REPLAY
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageFooter />
    </div>
  );
}
