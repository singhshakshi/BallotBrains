import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getTopicById, getNextTopic } from '../data/topics';
import { getLessonContent, getQuizQuestions } from '../services/geminiService';
import { addXP, completeLesson } from '../services/storage';
import { LoadingTelegram } from '../components/VintageUI';

export default function Lesson() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getTopicById(topicId);
  const [screen, setScreen] = useState(0); // 0=story, 1=visual, 2=quiz
  const [content, setContent] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [lessonData, quizData] = await Promise.all([
          getLessonContent(topicId),
          getQuizQuestions(topicId),
        ]);
        setContent(lessonData);
        setQuiz(quizData);
      } catch (e) {
        console.error('Failed to load lesson:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [topicId]);

  if (!topic) {
    return (
      <div className="page-wrapper py-16 text-center">
        <h2 className="font-playfair text-2xl" style={{ color: '#3D2B1F' }}>Topic Not Found</h2>
        <button className="stamp-btn mt-4 rounded" onClick={() => navigate('/learn')}>RETURN TO PATH</button>
      </div>
    );
  }

  if (loading) {
    return <LoadingTelegram message="VOX IS PREPARING YOUR LESSON — STAND BY — STOP" />;
  }

  function handleAnswer(answerIndex) {
    setSelectedAnswer(answerIndex);
  }

  function confirmAnswer() {
    const isCorrect = selectedAnswer === quiz[currentQuestion].correct;
    setQuizResults([...quizResults, { question: currentQuestion, correct: isCorrect }]);

    if (currentQuestion < quiz.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      }, 1500);
    } else {
      setTimeout(() => {
        const next = getNextTopic(topicId);
        addXP(topic.xp);
        completeLesson(topicId, next?.id);
        setCompleted(true);
      }, 1500);
    }
  }

  const screens = ['DISPATCH', 'VISUAL BRIEF', 'EXAMINATION'];

  return (
    <div className="page-wrapper py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <p className="font-elite text-xs tracking-widest mb-1" style={{ color: '#8B6F47' }}>
          LESSON {topic.order} OF 12
        </p>
        <h1 className="font-playfair text-2xl md:text-3xl font-bold" style={{ color: '#1A1008' }}>
          {topic.icon} {topic.title}
        </h1>
      </div>

      {/* Screen Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mb-6">
        {screens.map((label, i) => (
          <button
            key={i}
            onClick={() => !completed && setScreen(i)}
            className="flex items-center gap-1 cursor-pointer bg-transparent border-none"
          >
            <div
              style={{
                width: 12, height: 12, borderRadius: '50%',
                background: screen === i
                  ? 'radial-gradient(circle at 35% 35%, #d44545, #B33A3A 40%, #8a2828 100%)'
                  : '#C9A87C',
                boxShadow: screen === i ? '0 0 6px rgba(179,58,58,0.4)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <span className="font-elite text-xs hidden sm:inline" style={{ color: screen === i ? '#B33A3A' : '#8B6F47' }}>
              {label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Screen 1: Story / Telegraph Dispatch */}
        {screen === 0 && content && (
          <motion.div
            key="story"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="telegram-card p-6 md:p-8 rounded-lg">
              <div className="font-elite text-sm leading-relaxed" style={{ color: '#3D2B1F', lineHeight: 2 }}>
                {content.story}
              </div>
              {content.key_points && (
                <div className="mt-6 pt-4 border-t" style={{ borderColor: '#C9A87C' }}>
                  <p className="font-elite text-xs mb-3" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
                    KEY INTELLIGENCE:
                  </p>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {content.key_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span style={{ color: '#B33A3A' }}>▸</span>
                        <span className="font-lora text-sm" style={{ color: '#1A1008' }}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  <div className="wax-seal" style={{ width: 24, height: 24, fontSize: '0.5rem' }}>V</div>
                  <span className="font-caveat text-sm" style={{ color: '#8B6F47' }}>— Correspondent Vox</span>
                </div>
                <button className="stamp-btn text-xs py-2 px-4 rounded" onClick={() => setScreen(1)}>
                  NEXT →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 2: Visual Explainer */}
        {screen === 1 && content && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="paper-card p-6 md:p-8 rounded-lg">
              <h2 className="font-playfair text-xl font-bold mb-4" style={{ color: '#3D2B1F' }}>
                {content.visual_title || 'Visual Brief'}
              </h2>

              {/* SVG Infographic */}
              <div
                className="rounded-lg p-6 mb-6 text-center"
                style={{ background: 'rgba(201,168,124,0.15)', border: '1px dashed #C9A87C' }}
              >
                <svg viewBox="0 0 400 200" className="w-full" style={{ maxWidth: 500, margin: '0 auto' }}>
                  {/* Aged ink illustration style */}
                  <defs>
                    <filter id="inkFilter">
                      <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" />
                      <feDisplacementMap in="SourceGraphic" scale="2" />
                    </filter>
                  </defs>
                  {/* Simple conceptual diagram */}
                  <text x="200" y="30" textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="16" fill="#3D2B1F" fontWeight="700">
                    {content.visual_title || topic.title}
                  </text>
                  {/* Connected nodes */}
                  {content.key_points?.slice(0, 4).map((point, i) => {
                    const x = 60 + i * 100;
                    const y = 120;
                    return (
                      <g key={i}>
                        {i > 0 && (
                          <line x1={x - 80} y1={y} x2={x - 20} y2={y} stroke="#C9A87C" strokeWidth="2" strokeDasharray="4 4" />
                        )}
                        <circle cx={x} cy={y} r="20" fill="#EAD9B8" stroke="#B33A3A" strokeWidth="2" />
                        <text x={x} y={y + 4} textAnchor="middle" fontFamily="'Playfair Display', serif" fontSize="10" fill="#3D2B1F" fontWeight="700">
                          {i + 1}
                        </text>
                        <text x={x} y={y + 45} textAnchor="middle" fontFamily="'Special Elite', cursive" fontSize="8" fill="#8B6F47">
                          {point.split(' ').slice(0, 3).join(' ')}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="font-lora text-sm" style={{ color: '#1A1008', lineHeight: 1.7 }}>
                {content.visual_description || 'This visual breaks down the key concepts of the lesson into an easy-to-understand diagram.'}
              </p>

              <div className="flex justify-between mt-6">
                <button className="stamp-btn-outline text-xs py-2 px-4 rounded" onClick={() => setScreen(0)}>
                  ← BACK
                </button>
                <button className="stamp-btn text-xs py-2 px-4 rounded" onClick={() => setScreen(2)}>
                  TAKE EXAM →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Screen 3: Quiz */}
        {screen === 2 && quiz && !completed && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
          >
            <div className="paper-card-lined p-6 md:p-8 rounded-lg"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    transparent,
                    transparent 27px,
                    rgba(179,58,58,0.06) 27px,
                    rgba(179,58,58,0.06) 28px
                  )
                `,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-elite text-xs m-0" style={{ color: '#8B6F47', letterSpacing: '2px' }}>
                  QUESTION {currentQuestion + 1} OF {quiz.length}
                </p>
                <div className="flex gap-1">
                  {quizResults.map((r, i) => (
                    <div key={i} style={{
                      width: 10, height: 10, borderRadius: '50%',
                      background: r.correct ? '#3A5C3E' : '#B33A3A',
                    }} />
                  ))}
                </div>
              </div>

              <h3 className="font-lora text-lg font-semibold mb-6" style={{ color: '#1A1008', lineHeight: 1.5 }}>
                {quiz[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {quiz[currentQuestion].options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isSubmitted = quizResults.length > currentQuestion;
                  const isCorrect = i === quiz[currentQuestion].correct;

                  let bg = '#F5ECD7';
                  let border = '#C9A87C';
                  if (isSubmitted && isCorrect) { bg = 'rgba(58,92,62,0.15)'; border = '#3A5C3E'; }
                  else if (isSubmitted && isSelected && !isCorrect) { bg = 'rgba(179,58,58,0.1)'; border = '#B33A3A'; }
                  else if (isSelected) { bg = 'rgba(28,53,87,0.08)'; border = '#1C3557'; }

                  return (
                    <button
                      key={i}
                      onClick={() => !isSubmitted && handleAnswer(i)}
                      disabled={isSubmitted}
                      className="w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer"
                      style={{
                        background: bg,
                        border: `2px solid ${border}`,
                        fontFamily: "'Caveat', cursive",
                        fontSize: '1.1rem',
                        color: '#1A1008',
                      }}
                    >
                      <span className="font-elite text-xs mr-2" style={{ color: '#8B6F47' }}>
                        {String.fromCharCode(65 + i)}.
                      </span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && quizResults.length <= currentQuestion && (
                <div className="flex justify-end mt-4">
                  <button className="stamp-btn text-xs py-2 px-6 rounded" onClick={confirmAnswer}>
                    CONFIRM
                  </button>
                </div>
              )}

              {quizResults.length > currentQuestion && (
                <div className="mt-4 p-3 rounded" style={{
                  background: quizResults[currentQuestion].correct ? 'rgba(58,92,62,0.1)' : 'rgba(179,58,58,0.1)',
                  border: `1px solid ${quizResults[currentQuestion].correct ? '#3A5C3E' : '#B33A3A'}`,
                }}>
                  <p className="font-elite text-xs m-0 mb-1" style={{
                    color: quizResults[currentQuestion].correct ? '#3A5C3E' : '#B33A3A',
                  }}>
                    {quizResults[currentQuestion].correct ? 'WIRE CONFIRMED — CORRECT' : 'INCORRECT — SEE EXPLANATION'}
                  </p>
                  <p className="font-lora text-sm m-0" style={{ color: '#3D2B1F' }}>
                    {quiz[currentQuestion].explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-start mt-4">
                <button className="stamp-btn-outline text-xs py-2 px-4 rounded" onClick={() => setScreen(1)}>
                  ← BACK
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Completion Screen */}
        {completed && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="paper-card p-8 rounded-lg text-center">
              <div className="rubber-stamp text-lg mb-4 inline-block" style={{
                color: '#3A5C3E', borderColor: '#3A5C3E', transform: 'rotate(-3deg)',
                padding: '8px 24px', fontSize: '1rem',
              }}>
                LESSON COMPLETE
              </div>

              <h2 className="font-playfair text-2xl font-bold mt-4" style={{ color: '#3D2B1F' }}>
                Well Done, Correspondent!
              </h2>

              <div className="flex items-center justify-center gap-4 my-6">
                <div className="text-center">
                  <div className="gold-coin mx-auto" style={{ width: 48, height: 48, fontSize: '0.9rem' }}>
                    +{topic.xp}
                  </div>
                  <p className="font-elite text-xs mt-1" style={{ color: '#C8A84B' }}>XP EARNED</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl">
                    {quizResults.filter(r => r.correct).length}/{quizResults.length}
                  </div>
                  <p className="font-elite text-xs mt-1" style={{ color: '#8B6F47' }}>CORRECT</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <button className="stamp-btn rounded" onClick={() => navigate('/learn')}>
                  RETURN TO PATH
                </button>
                {getNextTopic(topicId) && (
                  <button
                    className="stamp-btn-outline rounded"
                    onClick={() => {
                      const next = getNextTopic(topicId);
                      navigate(`/learn/${next.id}`);
                    }}
                  >
                    NEXT LESSON →
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
