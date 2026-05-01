import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { countries, SYSTEM_TYPES } from '../data/countries';
import { PageFooter } from '../components/VintageUI';

const FILTERS = ['All', 'FPTP', 'PR', 'MMP', 'TWO_ROUND', 'AV', 'STV', 'BLOCK', 'OTHER'];

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = activeFilter === 'All' ? countries : countries.filter(c => c.system === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeFilter, search]);

  return (
    <div className="page-wrapper py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">WORLD ELECTION EXPLORER</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 500 }}>
          Browse voting systems from every corner of the globe
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-elite text-sm" style={{ color: '#8B6F47' }}>
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="SEARCH COUNTRIES OR REGIONS..."
            className="telegraph-input pl-10 rounded-lg"
          />
        </div>
      </div>

      {/* Filter Tabs - Postage Stamp Style */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {FILTERS.map(filter => {
          const sys = SYSTEM_TYPES[filter];
          const color = sys?.color || '#3D2B1F';
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                padding: '6px 14px',
                background: isActive ? color : '#EAD9B8',
                color: isActive ? '#F5ECD7' : color,
                border: `2px solid ${color}`,
                borderRadius: 0,
                position: 'relative',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {/* Serrated edge effect */}
              <div style={{
                position: 'absolute',
                inset: -3,
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${isActive ? color : '#EAD9B8'} 2px, ${isActive ? color : '#EAD9B8'} 3px, transparent 3px, transparent 5px)`,
                opacity: 0.3,
                pointerEvents: 'none',
              }} />
              {filter === 'All' ? 'All' : sys?.abbr || filter}
            </button>
          );
        })}
      </div>

      {/* Country Count */}
      <p className="font-elite text-xs text-center mb-6" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
        {filtered.length} {filtered.length === 1 ? 'COUNTRY' : 'COUNTRIES'} FOUND
      </p>

      {/* Country Postcards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((country, i) => {
          const sys = SYSTEM_TYPES[country.system];
          const rotation = (Math.random() - 0.5) * 4; // -2 to +2 deg

          return (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.4 }}
            >
              <Link to={`/country/${encodeURIComponent(country.name)}`} className="no-underline block">
                <div
                  className="postcard rounded-lg overflow-hidden"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Image */}
                  <div className="relative" style={{ height: 160 }}>
                    <img
                      src={`https://source.unsplash.com/400x300/?${encodeURIComponent(country.name)},landmark`}
                      alt={country.name}
                      className="sepia-image w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.background = 'linear-gradient(145deg, #C9A87C, #8B6F47)';
                        e.target.style.display = 'none';
                      }}
                    />
                    {/* Flag stamp */}
                    <div
                      className="absolute top-2 right-2 text-2xl"
                      style={{
                        background: '#EAD9B8',
                        padding: '4px 6px',
                        border: '2px solid #C9A87C',
                        lineHeight: 1,
                      }}
                      title={country.name}
                    >
                      {country.flag}
                    </div>

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(transparent 40%, rgba(234,217,184,0.9) 100%)' }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 -mt-4 relative">
                    {/* Country name ribbon */}
                    <h3
                      className="font-playfair text-lg font-bold mb-2"
                      style={{ color: '#1A1008' }}
                    >
                      {country.name}
                    </h3>

                    {/* System stamp */}
                    <div
                      className="inline-block font-elite text-xs uppercase px-2 py-1 mb-2"
                      style={{
                        color: sys?.color || '#3D2B1F',
                        border: `2px solid ${sys?.color || '#3D2B1F'}`,
                        transform: 'rotate(-2deg)',
                        letterSpacing: '1px',
                        opacity: 0.8,
                      }}
                    >
                      {sys?.label || country.system}
                    </div>

                    <p className="font-lora text-xs m-0 mt-2" style={{ color: '#8B6F47' }}>
                      {country.continent} · {country.population}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="font-elite text-lg" style={{ color: '#8B6F47' }}>
            NO DISPATCHES FOUND FOR THIS QUERY — STOP
          </p>
        </div>
      )}

      <PageFooter />
    </div>
  );
}
