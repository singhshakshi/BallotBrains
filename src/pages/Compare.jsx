import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { countries, SYSTEM_TYPES } from '../data/countries';
import { getComparison } from '../services/claude';
import { LoadingTelegram, OrnamentalDivider, PageFooter } from '../components/VintageUI';

export default function Compare() {
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  async function handleCompare() {
    if (!country1 || !country2) return;
    setLoading(true);
    try {
      const data = await getComparison(country1.name, country2.name);
      setResult(data);
    } catch {
      setResult(null);
    }
    setLoading(false);
  }

  function CountrySelector({ value, onChange, search, onSearch, open, onToggle, label, exclude }) {
    const filtered = countries.filter(c => {
      if (exclude && c.name === exclude) return false;
      if (!search.trim()) return true;
      return c.name.toLowerCase().includes(search.toLowerCase());
    });

    return (
      <div className="flex-1">
        <p className="font-elite text-xs tracking-widest mb-2 text-center" style={{ color: '#8B6F47' }}>
          {label}
        </p>
        <div
          className="postcard rounded-lg p-5 text-center"
          style={{ minHeight: 200, transform: 'rotate(0deg)' }}
        >
          {value ? (
            <div>
              <img
                src={`https://source.unsplash.com/400x200/?${encodeURIComponent(value.name)},landmark`}
                alt={value.name}
                className="sepia-image w-full h-32 object-cover rounded-lg mb-3"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-3xl">{value.flag}</span>
              <h3 className="font-playfair text-xl font-bold mt-2 mb-1" style={{ color: '#1A1008' }}>
                {value.name}
              </h3>
              <span
                className="postage-stamp inline-block"
                style={{
                  color: SYSTEM_TYPES[value.system]?.color,
                  borderColor: SYSTEM_TYPES[value.system]?.color,
                }}
              >
                {SYSTEM_TYPES[value.system]?.label}
              </span>
              <button
                className="block mx-auto mt-3 stamp-btn-outline text-xs py-1 px-3 rounded"
                onClick={() => { onChange(null); onToggle(true); }}
              >
                CHANGE
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={search}
                onChange={(e) => { onSearch(e.target.value); onToggle(true); }}
                onFocus={() => onToggle(true)}
                placeholder="SEARCH COUNTRY..."
                className="telegraph-input text-xs rounded mb-3"
              />
              {open && (
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filtered.slice(0, 15).map(c => (
                    <button
                      key={c.name}
                      onClick={() => { onChange(c); onToggle(false); onSearch(''); }}
                      className="w-full text-left p-2 rounded cursor-pointer transition-all"
                      style={{
                        background: 'transparent',
                        border: '1px solid transparent',
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: '0.85rem',
                        color: '#3D2B1F',
                      }}
                      onMouseEnter={(e) => { e.target.style.background = 'rgba(179,58,58,0.08)'; e.target.style.borderColor = '#C9A87C'; }}
                      onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'transparent'; }}
                    >
                      {c.flag} {c.name}
                      <span className="font-elite text-xs ml-2" style={{ color: '#8B6F47' }}>
                        ({SYSTEM_TYPES[c.system]?.abbr})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper py-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">HEAD-TO-HEAD COMPARATOR</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 500 }}>
          Compare two nations' election systems side by side, like vintage postcards on a cork board
        </p>
      </motion.div>

      {/* Side by side postcards */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <CountrySelector
          value={country1} onChange={setCountry1}
          search={search1} onSearch={setSearch1}
          open={open1} onToggle={setOpen1}
          label="COUNTRY A"
          exclude={country2?.name}
        />

        <div className="flex items-center justify-center">
          <div className="font-playfair text-3xl font-bold" style={{ color: '#C9A87C' }}>VS</div>
        </div>

        <CountrySelector
          value={country2} onChange={setCountry2}
          search={search2} onSearch={setSearch2}
          open={open2} onToggle={setOpen2}
          label="COUNTRY B"
          exclude={country1?.name}
        />
      </div>

      {/* Compare Button */}
      {country1 && country2 && !result && (
        <div className="text-center mb-8">
          <button className="stamp-btn text-sm py-3 px-8 rounded" onClick={handleCompare} disabled={loading}>
            {loading ? 'ANALYZING...' : 'COMPARE SYSTEMS'}
          </button>
        </div>
      )}

      {loading && <LoadingTelegram message="VOX IS ANALYZING BOTH SYSTEMS — STAND BY — STOP" />}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <OrnamentalDivider />

            {/* Comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Country 1 Strengths */}
              <div className="paper-card rounded-lg p-5">
                <h3 className="font-playfair text-lg font-bold mb-3" style={{ color: '#1A1008' }}>
                  {country1?.flag} {country1?.name} — Strengths
                </h3>
                <ul className="list-none p-0 m-0 space-y-2">
                  {(result.country1_strengths || []).map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#3A5C3E' }}>✦</span>
                      <span className="font-lora text-sm" style={{ color: '#1A1008' }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Country 2 Strengths */}
              <div className="paper-card rounded-lg p-5">
                <h3 className="font-playfair text-lg font-bold mb-3" style={{ color: '#1A1008' }}>
                  {country2?.flag} {country2?.name} — Strengths
                </h3>
                <ul className="list-none p-0 m-0 space-y-2">
                  {(result.country2_strengths || []).map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: '#1C3557' }}>✦</span>
                      <span className="font-lora text-sm" style={{ color: '#1A1008' }}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Vox Verdict */}
            <div className="airmail-border rounded-lg">
              <div className="telegram-card p-6 rounded-lg">
                <p className="font-elite text-xs mb-3" style={{ color: '#B33A3A', letterSpacing: '2px' }}>
                  VOX ANALYSIS FOLLOWS — STOP
                </p>
                <p className="font-elite text-sm mb-4" style={{ color: '#3D2B1F', lineHeight: 1.8 }}>
                  {result.comparison}
                </p>
                <div className="vintage-divider">✦</div>
                <p className="font-elite text-sm" style={{ color: '#3D2B1F', lineHeight: 1.8 }}>
                  {result.verdict}
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="wax-seal" style={{ width: 24, height: 24, fontSize: '0.5rem' }}>V</div>
                  <span className="font-caveat text-sm" style={{ color: '#8B6F47' }}>— Correspondent Vox</span>
                </div>
              </div>
            </div>

            <div className="text-center mt-6">
              <button className="stamp-btn-outline rounded" onClick={() => { setResult(null); setCountry1(null); setCountry2(null); }}>
                NEW COMPARISON
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <PageFooter />
    </div>
  );
}
