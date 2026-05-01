import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_EVENTS, getEventsByFilter } from '../data/timeline';
import { getTimelineEventDetail } from '../services/claude';
import { OrnamentalDivider, PageFooter, LoadingTelegram } from '../components/VintageUI';

const REGIONS = ['All', 'Europe', 'Americas', 'Asia', 'Africa', 'Oceania', 'Middle East'];
const ERAS = ['All', 'Pre-1900', '1900-1950', '1950-2000', '2000-Present'];
const TYPES = ['All', 'First Election', 'Landmark Victory', 'Constitutional Change', 'Disputed Election', 'Historic Turnout', "Women's Suffrage Milestone"];

const SIGNIFICANCE_COLORS = {
  HISTORIC: '#B33A3A',
  FIRST: '#1C3557',
  DISPUTED: '#5C3D6E',
};

export default function Timeline() {
  const [filters, setFilters] = useState({ region: 'All', era: 'All', type: 'All', search: '' });
  const [expandedId, setExpandedId] = useState(null);
  const [expandedDetail, setExpandedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const events = useMemo(() => getEventsByFilter(filters), [filters]);

  async function handleExpand(event) {
    if (expandedId === event.id) {
      setExpandedId(null);
      setExpandedDetail(null);
      return;
    }
    setExpandedId(event.id);
    setDetailLoading(true);
    try {
      const detail = await getTimelineEventDetail(event.headline, event.country, event.year);
      setExpandedDetail(detail);
    } catch {
      setExpandedDetail(null);
    }
    setDetailLoading(false);
  }

  function FilterSection({ label, options, value, onChange }) {
    return (
      <div className="mb-3">
        <p className="font-elite text-xs mb-2" style={{ color: '#8B6F47', letterSpacing: '1px' }}>{label}</p>
        <div className="flex flex-wrap gap-1">
          {options.map(opt => (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className="cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: '0.7rem',
                padding: '4px 10px',
                background: value === opt ? '#3D2B1F' : '#EAD9B8',
                color: value === opt ? '#F5ECD7' : '#3D2B1F',
                border: '1px solid #3D2B1F',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">GLOBAL ELECTION TIMELINE</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 550 }}>
          A newspaper archive of the world's most pivotal election moments, from ancient Athens to today
        </p>
      </motion.div>

      {/* Filters */}
      <div className="paper-card rounded-lg p-4 mb-8 max-w-4xl mx-auto">
        <div className="mb-3">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="SEARCH EVENTS BY COUNTRY, YEAR, OR KEYWORD..."
            className="telegraph-input rounded-lg text-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FilterSection label="REGION" options={REGIONS} value={filters.region} onChange={(v) => setFilters({ ...filters, region: v })} />
          <FilterSection label="ERA" options={ERAS} value={filters.era} onChange={(v) => setFilters({ ...filters, era: v })} />
          <FilterSection label="EVENT TYPE" options={TYPES} value={filters.type} onChange={(v) => setFilters({ ...filters, type: v })} />
        </div>
      </div>

      <p className="font-elite text-xs text-center mb-6" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
        {events.length} DISPATCH{events.length !== 1 ? 'ES' : ''} FOUND
      </p>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical timeline line */}
        <div
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0"
          style={{
            width: 2,
            background: `repeating-linear-gradient(
              180deg,
              #C9A87C 0px,
              #C9A87C 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
        />

        {/* Events */}
        <div className="space-y-8">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const isExpanded = expandedId === event.id;
            const sigColor = SIGNIFICANCE_COLORS[event.significance] || '#8B6F47';

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.4 }}
                className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ paddingLeft: 40 }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3 md:left-1/2 md:-translate-x-1/2 z-10"
                  style={{
                    width: 14, height: 14, borderRadius: '50%',
                    background: sigColor,
                    border: '2px solid #EAD9B8',
                    top: 20,
                  }}
                />

                {/* Event Card */}
                <div
                  className={`${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} md:w-[45%] w-full`}
                >
                  <div
                    className="paper-card rounded-lg p-5 cursor-pointer transition-all duration-300"
                    onClick={() => handleExpand(event)}
                    style={{
                      transform: `rotate(${(Math.random() - 0.5) * 1.5}deg)`,
                      borderLeft: isExpanded ? `4px solid ${sigColor}` : undefined,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {/* Flag stamp */}
                        <span
                          className="text-xl"
                          style={{
                            background: '#EAD9B8',
                            padding: '2px 4px',
                            border: '1px solid #C9A87C',
                          }}
                        >
                          {event.flag}
                        </span>
                        <div>
                          <p className="font-elite text-xs m-0" style={{ color: '#8B6F47' }}>{event.country}</p>
                        </div>
                      </div>
                      {/* Year */}
                      <span
                        className="font-playfair-sc text-xl font-bold"
                        style={{ color: '#3D2B1F' }}
                      >
                        {event.year < 0 ? `${Math.abs(event.year)} BC` : event.year}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-playfair text-base font-bold mb-2" style={{ color: '#1A1008', lineHeight: 1.3 }}>
                      {event.headline}
                    </h3>

                    {/* Summary */}
                    <p className="font-lora text-sm mb-3" style={{ color: '#3D2B1F', lineHeight: 1.6 }}>
                      {event.summary}
                    </p>

                    {/* Significance stamp + Actions */}
                    <div className="flex items-center justify-between">
                      <span
                        className="rubber-stamp"
                        style={{
                          color: sigColor,
                          borderColor: sigColor,
                          fontSize: '0.65rem',
                          padding: '2px 8px',
                          transform: `rotate(${-3 + Math.random() * 6}deg)`,
                        }}
                      >
                        {event.significance}
                      </span>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/country/${encodeURIComponent(event.country)}`}
                          className="font-elite text-xs no-underline"
                          style={{ color: '#1C3557' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          GO TO COUNTRY →
                        </Link>
                      </div>
                    </div>

                    {/* Expanded Detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t" style={{ borderColor: '#C9A87C' }}>
                            {detailLoading ? (
                              <div className="py-4">
                                <div className="loading-telegram text-xs text-center">
                                  RETRIEVING FULL DISPATCH — STAND BY
                                </div>
                              </div>
                            ) : expandedDetail ? (
                              <div>
                                {/* Two-column newspaper layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <p className="font-elite text-xs mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>
                                      FULL ACCOUNT
                                    </p>
                                    <p className="font-lora text-sm" style={{ color: '#1A1008', lineHeight: 1.7 }}>
                                      {expandedDetail.full_summary}
                                    </p>
                                  </div>
                                  <div className="column-rule md:pl-4">
                                    <p className="font-elite text-xs mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>
                                      WHY IT MATTERED
                                    </p>
                                    <p className="font-lora text-sm mb-3" style={{ color: '#1A1008', lineHeight: 1.7 }}>
                                      {expandedDetail.why_it_mattered}
                                    </p>
                                    <p className="font-elite text-xs mb-1" style={{ color: '#8B6F47', letterSpacing: '1px' }}>
                                      LONG-TERM IMPACT
                                    </p>
                                    <p className="font-lora text-sm" style={{ color: '#1A1008', lineHeight: 1.7 }}>
                                      {expandedDetail.long_term_impact}
                                    </p>
                                  </div>
                                </div>

                                {/* Vox Take */}
                                <div className="mt-4 p-3 rounded" style={{ background: 'rgba(201,168,124,0.2)', border: '1px solid #C9A87C' }}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="wax-seal" style={{ width: 20, height: 20, fontSize: '0.4rem' }}>V</div>
                                    <span className="font-elite text-xs" style={{ color: '#B33A3A', letterSpacing: '1px' }}>
                                      VOX COMMENTARY
                                    </span>
                                  </div>
                                  <p className="font-elite text-sm m-0" style={{ color: '#3D2B1F', lineHeight: 1.6 }}>
                                    {expandedDetail.vox_take}
                                  </p>
                                </div>

                                <Link
                                  to={`/chat`}
                                  className="stamp-btn text-xs py-2 px-4 rounded inline-block mt-3 no-underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  📨 ASK VOX ABOUT THIS EVENT
                                </Link>
                              </div>
                            ) : (
                              <p className="font-elite text-xs text-center" style={{ color: '#8B6F47' }}>
                                FULL DISPATCH UNAVAILABLE — CONSULT VOX — STOP
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="font-elite text-lg" style={{ color: '#8B6F47' }}>
              NO DISPATCHES MATCH YOUR FILTERS — ADJUST AND RETRY — STOP
            </p>
          </div>
        )}
      </div>

      <PageFooter />
    </div>
  );
}
