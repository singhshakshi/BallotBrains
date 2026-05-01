import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCountryByName, SYSTEM_TYPES, ELECTION_ROADMAPS } from '../data/countries';
import { getCountryRoadmap, getNodeDetails } from '../services/claude';
import { LoadingTelegram, PageFooter, OrnamentalDivider } from '../components/VintageUI';

export default function CountryDeepDive() {
  const { countryName } = useParams();
  const decodedName = decodeURIComponent(countryName);
  const country = getCountryByName(decodedName);
  const [roadmap, setRoadmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeDetails, setNodeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nodeLoading, setNodeLoading] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (ELECTION_ROADMAPS[decodedName]) {
        setRoadmap(ELECTION_ROADMAPS[decodedName]);
      } else {
        try {
          const data = await getCountryRoadmap(decodedName);
          setRoadmap(data);
        } catch {
          setRoadmap([]);
        }
      }
      setLoading(false);
    }
    load();
  }, [decodedName]);

  async function handleNodeClick(node) {
    setSelectedNode(node);
    setNodeLoading(true);
    try {
      const details = await getNodeDetails(decodedName, node.label);
      setNodeDetails(details);
    } catch {
      setNodeDetails({
        name: node.label,
        who_votes: 'Information loading...',
        how_winner_decided: 'Information loading...',
        term_length: 'Varies',
        key_facts: ['Click "Ask Vox" for more details'],
      });
    }
    setNodeLoading(false);
  }

  if (!country) {
    return (
      <div className="page-wrapper py-16 text-center">
        <h2 className="font-playfair text-2xl" style={{ color: '#3D2B1F' }}>Country Not Found</h2>
        <p className="font-elite text-sm" style={{ color: '#8B6F47' }}>
          NO DISPATCH AVAILABLE FOR "{decodedName}" — STOP
        </p>
      </div>
    );
  }

  const sys = SYSTEM_TYPES[country.system];

  return (
    <div className="page-wrapper py-8">
      {/* Hero - Newspaper Masthead */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 rounded-xl overflow-hidden"
      >
        {/* Background image */}
        <div className="relative" style={{ minHeight: 250 }}>
          <img
            src={`https://source.unsplash.com/1200x400/?${encodeURIComponent(country.name)},landmark,architecture`}
            alt={country.name}
            className="sepia-image w-full object-cover"
            style={{ height: 250 }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(transparent 20%, rgba(234,217,184,0.85) 60%, rgba(234,217,184,1) 100%)',
          }} />

          {/* Masthead overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-elite text-xs tracking-widest mb-1" style={{ color: '#8B6F47' }}>
                  ━━━ COUNTRY DISPATCH ━━━
                </p>
                <h1 className="font-playfair-sc text-3xl md:text-5xl font-bold m-0" style={{ color: '#1A1008' }}>
                  {country.flag} {country.name}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  <span
                    className="postage-stamp"
                    style={{ color: sys?.color, borderColor: sys?.color }}
                  >
                    {sys?.label}
                  </span>
                  <span className="font-lora text-sm" style={{ color: '#8B6F47' }}>
                    {country.continent} · Pop: {country.population}
                  </span>
                </div>
              </div>
              <div className="text-5xl hidden md:block">{country.flag}</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Legislature Info */}
      <div className="paper-card rounded-lg p-4 mb-8 flex items-center gap-4">
        <span className="font-elite text-xs" style={{ color: '#8B6F47', letterSpacing: '2px' }}>LEGISLATURES:</span>
        <span className="font-baskerville text-sm" style={{ color: '#1A1008' }}>{country.legislatures}</span>
      </div>

      <OrnamentalDivider />

      {/* Election Roadmap */}
      <section className="mb-8">
        <h2 className="font-playfair-sc text-2xl text-center mb-6" style={{ color: '#3D2B1F', letterSpacing: '2px' }}>
          ELECTION HIERARCHY
        </h2>

        {loading ? (
          <LoadingTelegram message="VOX IS MAPPING THE ELECTORAL STRUCTURE — STAND BY — STOP" />
        ) : roadmap && roadmap.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6">
            {/* SVG Roadmap */}
            <div className="flex-1">
              <div
                className="paper-card rounded-xl p-6"
                style={{ background: 'linear-gradient(145deg, #F5ECD7, #EAD9B8)' }}
              >
                <svg
                  ref={svgRef}
                  viewBox={`0 0 500 ${roadmap.length * 80 + 40}`}
                  className="w-full"
                  style={{ maxWidth: 500, margin: '0 auto', display: 'block' }}
                >
                  {/* Dashed path line */}
                  {roadmap.map((node, i) => {
                    if (i === roadmap.length - 1) return null;
                    const y1 = 40 + i * 80;
                    const y2 = 40 + (i + 1) * 80;
                    return (
                      <line
                        key={`line-${i}`}
                        x1="250" y1={y1 + 20}
                        x2="250" y2={y2 - 20}
                        stroke="#C9A87C"
                        strokeWidth="2"
                        strokeDasharray="6 4"
                      />
                    );
                  })}

                  {/* Nodes */}
                  {roadmap.map((node, i) => {
                    const y = 40 + i * 80;
                    const isSelected = selectedNode?.id === node.id;
                    return (
                      <g
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Wax seal circle */}
                        <circle
                          cx="250" cy={y}
                          r={isSelected ? 22 : 18}
                          fill={isSelected
                            ? 'url(#sealGradientActive)'
                            : 'url(#sealGradient)'
                          }
                          stroke={isSelected ? '#B33A3A' : '#8a2828'}
                          strokeWidth="2"
                          style={{ transition: 'all 0.3s ease' }}
                        />
                        <text
                          x="250" y={y + 5}
                          textAnchor="middle"
                          fontFamily="'Playfair Display', serif"
                          fontSize="12"
                          fill="#F5ECD7"
                          fontWeight="700"
                        >
                          {i + 1}
                        </text>

                        {/* Label */}
                        <text
                          x={i % 2 === 0 ? 120 : 380}
                          y={y + 5}
                          textAnchor={i % 2 === 0 ? 'end' : 'start'}
                          fontFamily="'Playfair Display SC', serif"
                          fontSize="13"
                          fill={isSelected ? '#B33A3A' : '#3D2B1F'}
                          fontWeight="700"
                        >
                          {node.label}
                        </text>

                        {/* Sublabel */}
                        <text
                          x={i % 2 === 0 ? 120 : 380}
                          y={y + 22}
                          textAnchor={i % 2 === 0 ? 'end' : 'start'}
                          fontFamily="'Special Elite', cursive"
                          fontSize="9"
                          fill="#8B6F47"
                        >
                          {node.description}
                        </text>
                      </g>
                    );
                  })}

                  {/* Gradients */}
                  <defs>
                    <radialGradient id="sealGradient" cx="35%" cy="35%">
                      <stop offset="0%" stopColor="#d44545" />
                      <stop offset="40%" stopColor="#B33A3A" />
                      <stop offset="100%" stopColor="#8a2828" />
                    </radialGradient>
                    <radialGradient id="sealGradientActive" cx="35%" cy="35%">
                      <stop offset="0%" stopColor="#e85555" />
                      <stop offset="40%" stopColor="#cc4444" />
                      <stop offset="100%" stopColor="#a03030" />
                    </radialGradient>
                  </defs>
                </svg>

                <p className="font-caveat text-sm text-center mt-4" style={{ color: '#8B6F47' }}>
                  Click any level to learn more ↑
                </p>
              </div>
            </div>

            {/* Detail Panel */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-96"
                >
                  <div className="paper-card rounded-lg p-6" style={{ transform: 'rotate(0.5deg)' }}>
                    {nodeLoading ? (
                      <div className="py-8">
                        <div className="loading-telegram text-xs text-center">RETRIEVING INTEL — STAND BY</div>
                      </div>
                    ) : nodeDetails ? (
                      <>
                        <h3 className="font-playfair text-xl font-bold mb-1" style={{ color: '#1A1008' }}>
                          {nodeDetails.name || selectedNode.label}
                        </h3>
                        <div className="vintage-divider" style={{ padding: '8px 0' }}>✦</div>

                        <div className="space-y-4">
                          <div>
                            <p className="font-elite text-xs m-0 mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>WHO VOTES</p>
                            <p className="font-lora text-sm m-0" style={{ color: '#1A1008', lineHeight: 1.6 }}>
                              {nodeDetails.who_votes}
                            </p>
                          </div>
                          <div>
                            <p className="font-elite text-xs m-0 mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>HOW WINNER IS DECIDED</p>
                            <p className="font-lora text-sm m-0" style={{ color: '#1A1008', lineHeight: 1.6 }}>
                              {nodeDetails.how_winner_decided}
                            </p>
                          </div>
                          <div>
                            <p className="font-elite text-xs m-0 mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>TERM LENGTH</p>
                            <p className="font-lora text-sm m-0" style={{ color: '#1A1008' }}>
                              {nodeDetails.term_length}
                            </p>
                          </div>
                          {nodeDetails.key_facts && (
                            <div>
                              <p className="font-elite text-xs m-0 mb-2" style={{ color: '#8B6F47', letterSpacing: '1px' }}>KEY FACTS</p>
                              <ul className="list-none p-0 m-0 space-y-1">
                                {nodeDetails.key_facts.map((fact, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span style={{ color: '#B33A3A', fontSize: '0.7rem', marginTop: 3 }}>▸</span>
                                    <span className="font-lora text-sm" style={{ color: '#1A1008' }}>{fact}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <button className="stamp-btn text-xs py-2 px-4 rounded mt-4 w-full">
                          📨 ASK VOX MORE
                        </button>
                      </>
                    ) : null}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="font-elite" style={{ color: '#8B6F47' }}>
              NO ROADMAP DATA AVAILABLE — CONSULT VOX FOR DETAILS — STOP
            </p>
          </div>
        )}
      </section>

      <PageFooter />
    </div>
  );
}
