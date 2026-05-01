export const LEARN_TOPICS = [
  {
    id: 'what-is-democracy',
    title: 'What is Democracy?',
    subtitle: 'The foundation of self-governance',
    icon: '🏛️',
    xp: 50,
    order: 1,
    description: 'Explore the origins and principles of democratic governance, from ancient Athens to modern nations.',
  },
  {
    id: 'voting-systems-overview',
    title: 'Voting Systems Overview',
    subtitle: 'How votes become seats',
    icon: '🗳️',
    xp: 50,
    order: 2,
    description: 'A high-level tour of the major voting systems used around the world.',
  },
  {
    id: 'fptp-explained',
    title: 'FPTP Explained',
    subtitle: 'First Past the Post',
    icon: '🏇',
    xp: 75,
    order: 3,
    description: 'The simplest and most widely used system — winner takes all.',
  },
  {
    id: 'proportional-representation',
    title: 'Proportional Representation',
    subtitle: 'Seats match votes',
    icon: '⚖️',
    xp: 75,
    order: 4,
    description: 'How PR systems allocate seats proportionally to votes received.',
  },
  {
    id: 'mixed-systems',
    title: 'Mixed Systems',
    subtitle: 'Best of both worlds?',
    icon: '🔀',
    xp: 100,
    order: 5,
    description: 'MMP and parallel systems that combine FPTP with proportional allocation.',
  },
  {
    id: 'two-round-systems',
    title: 'Two-Round Systems',
    subtitle: 'If no majority, vote again',
    icon: '🔄',
    xp: 100,
    order: 6,
    description: 'How runoff elections work in France and other countries.',
  },
  {
    id: 'preferential-voting',
    title: 'Preferential Voting',
    subtitle: 'Rank your choices',
    icon: '📋',
    xp: 100,
    order: 7,
    description: 'Alternative Vote (AV) and STV — ranking candidates by preference.',
  },
  {
    id: 'how-india-votes',
    title: 'How India Votes',
    subtitle: 'The world\'s largest democracy',
    icon: '🇮🇳',
    xp: 125,
    order: 8,
    description: 'Elections across 900M+ voters — from panchayats to parliament.',
  },
  {
    id: 'how-usa-votes',
    title: 'How USA Votes',
    subtitle: 'Electoral college & beyond',
    icon: '🇺🇸',
    xp: 125,
    order: 9,
    description: 'Primaries, gerrymandering, the electoral college, and more.',
  },
  {
    id: 'how-germany-votes',
    title: 'How Germany Votes',
    subtitle: 'The MMP pioneer',
    icon: '🇩🇪',
    xp: 125,
    order: 10,
    description: 'Two votes, one election — Germany\'s sophisticated mixed system.',
  },
  {
    id: 'electoral-reforms',
    title: 'Electoral Reforms',
    subtitle: 'Changing the rules',
    icon: '🔧',
    xp: 150,
    order: 11,
    description: 'How countries have changed their voting systems and why.',
  },
  {
    id: 'your-vote-matters',
    title: 'Your Vote Matters',
    subtitle: 'Why participation counts',
    icon: '✊',
    xp: 200,
    order: 12,
    description: 'The impact of voter turnout and civic engagement worldwide.',
  },
];

export function getTopicById(id) {
  return LEARN_TOPICS.find(t => t.id === id);
}

export function getNextTopic(currentId) {
  const current = LEARN_TOPICS.find(t => t.id === currentId);
  if (!current) return null;
  return LEARN_TOPICS.find(t => t.order === current.order + 1);
}
