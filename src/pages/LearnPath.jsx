import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LEARN_TOPICS } from '../data/topics';
import { getUserData } from '../services/storage';
import { OrnamentalDivider, PageFooter } from '../components/VintageUI';

export default function LearnPath() {
  const user = getUserData();

  return (
    <div className="page-wrapper py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="newspaper-headline text-3xl md:text-4xl mb-2">THE LEARNING PATH</h1>
        <p className="newspaper-subhead text-sm mx-auto" style={{ maxWidth: 500 }}>
          Your guided expedition through the world of democracy & voting systems
        </p>

        {/* XP & Streak */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="gold-coin">{user.xp}</div>
            <span className="font-elite text-xs" style={{ color: '#8B6F47' }}>XP EARNED</span>
          </div>
          {user.streak > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-lg">🔥</span>
              <span className="font-elite text-xs" style={{ color: '#B33A3A' }}>{user.streak} DAY STREAK</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="font-elite text-xs" style={{ color: '#3A5C3E' }}>
              {user.completedLessons.length}/{LEARN_TOPICS.length} COMPLETE
            </span>
          </div>
        </div>
      </motion.div>

      {/* Progress Trail */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vintage map trail line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block"
          style={{
            width: 3,
            background: `repeating-linear-gradient(
              180deg,
              #C9A87C 0px,
              #C9A87C 8px,
              transparent 8px,
              transparent 16px
            )`,
          }}
        />

        {/* Completed path overlay */}
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 hidden md:block"
          style={{
            width: 3,
            height: `${(user.completedLessons.length / LEARN_TOPICS.length) * 100}%`,
            background: '#B33A3A',
            transition: 'height 0.5s ease',
          }}
        />

        {/* Topic Cards */}
        <div className="space-y-6">
          {LEARN_TOPICS.map((topic, i) => {
            const isUnlocked = user.unlockedTopics.includes(topic.id);
            const isCompleted = user.completedLessons.includes(topic.id);
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className={`flex items-center gap-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Pin marker */}
                <div className="hidden md:flex items-center justify-center" style={{ flex: '0 0 50%' }}>
                  <div
                    className={`${isLeft ? 'ml-auto mr-4' : 'mr-auto ml-4'}`}
                    style={{ maxWidth: 350, width: '100%' }}
                  >
                    {isUnlocked ? (
                      <Link to={`/learn/${topic.id}`} className="no-underline block">
                        <TopicCard topic={topic} isCompleted={isCompleted} isUnlocked={true} />
                      </Link>
                    ) : (
                      <TopicCard topic={topic} isCompleted={false} isUnlocked={false} />
                    )}
                  </div>
                </div>

                {/* Center pin */}
                <div className="hidden md:flex items-center justify-center relative z-10" style={{ flex: '0 0 auto' }}>
                  <div
                    className={isCompleted ? 'wax-seal' : ''}
                    style={isCompleted ? { width: 32, height: 32, fontSize: '0.7rem' } : {
                      width: 32, height: 32, borderRadius: '50%',
                      background: isUnlocked ? '#EAD9B8' : '#C9A87C',
                      border: `2px solid ${isUnlocked ? '#B33A3A' : '#8B6F47'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem',
                    }}
                  >
                    {isCompleted ? '✓' : isUnlocked ? topic.icon : '🔒'}
                  </div>
                </div>

                <div className="hidden md:block" style={{ flex: '0 0 50%' }} />

                {/* Mobile version */}
                <div className="md:hidden w-full">
                  {isUnlocked ? (
                    <Link to={`/learn/${topic.id}`} className="no-underline block">
                      <TopicCard topic={topic} isCompleted={isCompleted} isUnlocked={true} />
                    </Link>
                  ) : (
                    <TopicCard topic={topic} isCompleted={false} isUnlocked={false} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}

function TopicCard({ topic, isCompleted, isUnlocked }) {
  return (
    <div
      className={`paper-card rounded-lg p-5 transition-all duration-300 ${isUnlocked ? 'cursor-pointer' : ''}`}
      style={{
        opacity: isUnlocked ? 1 : 0.5,
        transform: `rotate(${(Math.random() - 0.5) * 1.5}deg)`,
        filter: isUnlocked ? 'none' : 'grayscale(40%)',
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{topic.icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-baskerville text-base font-bold m-0" style={{ color: '#3D2B1F' }}>
              {topic.title}
            </h3>
            {isCompleted && (
              <span className="rubber-stamp text-xs" style={{
                color: '#3A5C3E', borderColor: '#3A5C3E', transform: 'rotate(-3deg)',
                padding: '2px 8px', fontSize: '0.6rem',
              }}>
                COMPLETE
              </span>
            )}
          </div>
          <p className="font-elite text-xs mt-1 mb-2" style={{ color: '#8B6F47' }}>
            {topic.subtitle}
          </p>
          <p className="font-lora text-sm m-0" style={{ color: '#1A1008', lineHeight: 1.5 }}>
            {topic.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="gold-coin" style={{ width: 24, height: 24, fontSize: '0.55rem' }}>{topic.xp}</div>
            <span className="font-elite text-xs" style={{ color: '#C8A84B' }}>XP</span>
            {!isUnlocked && (
              <span className="font-elite text-xs ml-auto" style={{ color: '#8B6F47' }}>🔒 LOCKED</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
