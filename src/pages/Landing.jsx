import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrnamentalDivider, PageFooter } from '../components/VintageUI';

const features = [
  { icon: '📚', title: 'Guided Lessons', desc: 'Learn voting systems step by step like a seasoned correspondent', link: '/learn', rotate: -2 },
  { icon: '🗺️', title: 'World Explorer', desc: 'Browse 40+ countries and their unique electoral systems', link: '/explore', rotate: 1.5 },
  { icon: '🎭', title: 'Election Simulator', desc: 'Walk through real election processes as if you were there', link: '/simulate', rotate: -1 },
  { icon: '⚖️', title: 'Country Comparator', desc: 'Compare election systems head-to-head like a debate', link: '/compare', rotate: 2 },
  { icon: '📰', title: 'Election Timeline', desc: 'Journey through history\'s most pivotal election moments', link: '/timeline', rotate: -1.5 },
];

export default function Landing() {
  return (
    <div className="page-wrapper pb-8">
      {/* Newspaper Masthead Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center pt-10 pb-6"
      >
        {/* Masthead */}
        <div className="mb-2">
          <p className="font-elite text-xs tracking-widest m-0 mb-1" style={{ color: '#8B6F47' }}>
            ━━━ ESTABLISHED FOR THE INFORMED CITIZEN ━━━
          </p>
          <div style={{ height: 3, background: '#1A1008', margin: '0 auto', maxWidth: 600 }} />
          <div style={{ height: 1, background: '#1A1008', margin: '4px auto 0', maxWidth: 600 }} />
        </div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="newspaper-headline mt-6 mb-4"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', maxWidth: 800, margin: '24px auto 16px' }}
        >
          UNDERSTAND HOW THE{' '}
          <span style={{ color: '#B33A3A' }}>WORLD</span>{' '}
          VOTES
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p className="newspaper-subhead text-base mx-auto" style={{ maxWidth: 550 }}>
            Your Complete Guide to Global Election Systems, Democracy & Governance
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-4 mt-2">
          <div style={{ flex: 1, maxWidth: 200, height: 1, background: '#C9A87C' }} />
          <span className="font-elite text-xs" style={{ color: '#8B6F47', letterSpacing: '3px' }}>VOL. I — MMXXIV</span>
          <div style={{ flex: 1, maxWidth: 200, height: 1, background: '#C9A87C' }} />
        </div>
      </motion.section>

      {/* Globe / Map illustration area */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex justify-center my-8"
      >
        <div
          className="paper-card rounded-2xl p-8 text-center"
          style={{ maxWidth: 600, width: '100%' }}
        >
          {/* Animated globe using CSS */}
          <div
            className="mx-auto mb-4"
            style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: `
                radial-gradient(circle at 40% 35%, #D4B896 0%, #C9A87C 30%, #8B6F47 60%, #3D2B1F 100%)
              `,
              boxShadow: 'inset -8px -8px 20px rgba(0,0,0,0.3), 4px 6px 20px rgba(61,43,31,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Latitude lines */}
            {[25, 50, 75].map(top => (
              <div key={top} style={{
                position: 'absolute',
                top: `${top}%`,
                left: '10%',
                right: '10%',
                height: 1,
                background: 'rgba(245,236,215,0.2)',
                borderRadius: '50%',
              }} />
            ))}
            {/* Longitude lines */}
            {[30, 50, 70].map(left => (
              <div key={left} style={{
                position: 'absolute',
                top: '10%',
                bottom: '10%',
                left: `${left}%`,
                width: 1,
                background: 'rgba(245,236,215,0.15)',
              }} />
            ))}
            {/* Landmass shapes */}
            <div style={{
              position: 'absolute', top: '20%', left: '25%', width: 50, height: 35,
              background: 'rgba(58,92,62,0.4)', borderRadius: '40% 50% 30% 60%',
            }} />
            <div style={{
              position: 'absolute', top: '35%', left: '55%', width: 40, height: 45,
              background: 'rgba(58,92,62,0.35)', borderRadius: '30% 60% 40% 50%',
            }} />
            <div style={{
              position: 'absolute', top: '55%', left: '30%', width: 30, height: 25,
              background: 'rgba(58,92,62,0.3)', borderRadius: '50% 30% 60% 40%',
            }} />
            {/* Glow */}
            <div style={{
              position: 'absolute', top: '15%', left: '25%', width: 40, height: 30,
              background: 'rgba(245,236,215,0.1)', borderRadius: '50%', filter: 'blur(10px)',
            }} />
          </div>

          <p className="font-baskerville text-lg mt-4 mb-2" style={{ color: '#3D2B1F' }}>
            40+ Countries • 8 Voting Systems • Centuries of History
          </p>
          <p className="font-caveat text-base" style={{ color: '#8B6F47' }}>
            Your journey through global democracy starts here
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Link to="/learn">
              <button className="stamp-btn rounded">BEGIN LEARNING</button>
            </Link>
            <Link to="/explore">
              <button className="stamp-btn-outline rounded">EXPLORE COUNTRIES</button>
            </Link>
          </div>
        </div>
      </motion.section>

      <OrnamentalDivider />

      {/* Vox Telegram Greeting */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex justify-center mb-10"
      >
        <div className="airmail-border rounded-lg" style={{ maxWidth: 500 }}>
          <div className="telegram-card p-5 rounded-lg">
            <p className="font-elite text-sm mb-0 mt-3" style={{ color: '#3D2B1F', lineHeight: 1.8 }}>
              TRANSMISSION FROM VOX — GREETINGS STOP<br />
              WELCOME TO VOTEIQ STOP<br />
              YOUR GUIDE TO UNDERSTANDING HOW DEMOCRACY WORKS AROUND THE WORLD STOP<br />
              CLICK MY SEAL BELOW-RIGHT TO ASK QUESTIONS STOP<br />
              DISPATCH FOLLOWS — STOP
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="wax-seal" style={{ width: 24, height: 24, fontSize: '0.5rem' }}>V</div>
              <span className="font-caveat text-sm" style={{ color: '#8B6F47' }}>— Your correspondent, Vox</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Feature Postcards */}
      <section>
        <h2 className="font-playfair-sc text-2xl text-center mb-8" style={{ color: '#3D2B1F', letterSpacing: '2px' }}>
          Your Expedition Awaits
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15, duration: 0.5 }}
            >
              <Link to={feature.link} className="no-underline block">
                <div
                  className="postcard p-6 rounded-lg"
                  style={{ transform: `rotate(${feature.rotate}deg)` }}
                >
                  {/* Postmark */}
                  <div className="absolute top-3 right-3 opacity-20" style={{
                    width: 50, height: 50, borderRadius: '50%',
                    border: '2px solid #B33A3A',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span className="font-elite text-xs" style={{ color: '#B33A3A' }}>VOX</span>
                  </div>

                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="font-baskerville text-lg font-bold mb-2" style={{ color: '#3D2B1F' }}>
                    {feature.title}
                  </h3>
                  <p className="font-lora text-sm mb-0" style={{ color: '#8B6F47', lineHeight: 1.6 }}>
                    {feature.desc}
                  </p>

                  {/* Bottom stamp line */}
                  <div className="mt-4 pt-3 border-t flex items-center gap-2" style={{ borderColor: '#C9A87C' }}>
                    <span className="font-elite text-xs" style={{ color: '#B33A3A', letterSpacing: '2px' }}>
                      EXPLORE →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
