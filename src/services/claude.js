const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY || '';

const VOX_SYSTEM_PROMPT = `You are Vox, an expert election systems guide inside the BalletBrains app. 
You are styled as a witty vintage telegraph correspondent and world election reporter.
You only answer questions related to elections, voting systems, democracy, 
political structures, and governance. Keep responses concise, structured, 
and engaging. Use analogies. Occasionally use telegraph-style language 
("STOP", "WIRE CONFIRMED", "DISPATCH FOLLOWS") as flavor. Never discuss 
unrelated topics. When explaining election levels, return structured JSON when requested.`;

async function callClaude(messages, systemPrompt = VOX_SYSTEM_PROMPT, maxTokens = 1024) {
  if (!CLAUDE_API_KEY) {
    return getFallbackResponse(messages);
  }

  try {
    const response = await fetch('/api/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      console.warn('Claude API error, using fallback');
      return getFallbackResponse(messages);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.warn('Claude API unavailable, using fallback:', error.message);
    return getFallbackResponse(messages);
  }
}

function getFallbackResponse(messages) {
  const lastMsg = messages[messages.length - 1]?.content || '';
  const lower = lastMsg.toLowerCase();

  if (lower.includes('lesson') || lower.includes('topic')) {
    return JSON.stringify({
      story: "DISPATCH FROM THE FIELD — STOP — Democracy, dear reader, is humanity's grandest experiment in collective decision-making. From the agora of ancient Athens where citizens gathered to debate, to the digital polling stations of today, the core principle remains: power flows from the people — STOP — Consider this: when you cast a ballot, you're participating in a tradition stretching back over 2,500 years. Every vote is a tiny revolution, a peaceful transfer of power that many societies fought centuries to achieve — WIRE CONFIRMED.",
      visual_title: "The Evolution of Voting",
      visual_description: "A journey through time showing how voting has evolved from raised hands in ancient assemblies to modern electronic voting machines.",
      key_points: ["Democracy means 'rule of the people'", "Originated in Athens around 508 BC", "Modern democracy includes representative systems", "Voting systems vary widely across nations"],
    });
  }

  if (lower.includes('quiz') || lower.includes('question')) {
    return JSON.stringify([
      { question: "What ancient city is considered the birthplace of democracy?", options: ["Rome", "Athens", "Sparta", "Alexandria"], correct: 1, explanation: "Athens, Greece, established the first known democratic system around 508 BC under Cleisthenes." },
      { question: "Which voting system is used in the most countries worldwide?", options: ["Proportional Representation", "First Past the Post", "Mixed Member Proportional", "Two-Round System"], correct: 1, explanation: "First Past the Post (FPTP) is the most widely used system globally, employed in countries like the UK, USA, India, and Canada." },
      { question: "What does 'universal suffrage' mean?", options: ["Only landowners can vote", "All adult citizens can vote", "Only men can vote", "Only the educated can vote"], correct: 1, explanation: "Universal suffrage means all adult citizens have the right to vote regardless of wealth, gender, race, or education." },
    ]);
  }

  if (lower.includes('roadmap') || lower.includes('hierarchy') || lower.includes('level')) {
    return JSON.stringify([
      { id: 'local', label: 'Local Government', level: 1, description: 'Municipal and community-level elected bodies' },
      { id: 'regional', label: 'Regional Legislature', level: 2, description: 'State or provincial legislative bodies' },
      { id: 'national', label: 'National Parliament', level: 3, description: 'The primary national legislative body' },
    ]);
  }

  if (lower.includes('node') || lower.includes('detail')) {
    return JSON.stringify({
      name: "National Parliament",
      who_votes: "All eligible citizens of voting age (typically 18+)",
      how_winner_decided: "Varies by country — may use FPTP, PR, or mixed systems",
      term_length: "4-6 years typically",
      key_facts: ["Represents the highest legislative authority", "Passes national laws and budgets", "May consist of one or two chambers"],
    });
  }

  if (lower.includes('simulat')) {
    return JSON.stringify([
      { step: 1, title: "Registration Opens", description: "DISPATCH — Citizens register to vote at their local electoral office. Voter rolls are compiled and published — STOP", type: "notice" },
      { step: 2, title: "Campaign Period", description: "WIRE REPORT — Candidates take to the hustings, making their case to the electorate through rallies, debates, and door-to-door canvassing — STOP", type: "ballot" },
      { step: 3, title: "Election Day", description: "URGENT DISPATCH — Polls open at dawn. Citizens queue to cast their ballots in secret. The democratic ritual unfolds across the nation — STOP", type: "ballot" },
      { step: 4, title: "Counting & Results", description: "FLASH — Ballot boxes sealed and transported to counting centers. Results trickle in through the night as the nation watches — TRANSMISSION ENDS", type: "gazette" },
    ]);
  }

  if (lower.includes('compar')) {
    return JSON.stringify({
      comparison: "ANALYTICAL DISPATCH FROM VOX — Both nations employ distinct approaches to representative democracy, each with unique strengths and trade-offs. STOP",
      country1_strengths: ["Clear electoral mandate", "Strong constituency link", "Simple for voters"],
      country2_strengths: ["Better proportional outcomes", "More diverse representation", "Coalition governance"],
      verdict: "VERDICT — No system is perfect. Each reflects its nation's history, culture, and democratic values. The best system is one that its citizens trust and participate in — WIRE CONFIRMED — STOP",
    });
  }

  if (lower.includes('timeline') || lower.includes('event')) {
    return JSON.stringify({
      headline: "A Pivotal Moment in Democratic History",
      full_summary: "This election marked a turning point in the nation's democratic journey, establishing precedents that would influence governance for generations to come.",
      why_it_mattered: "It demonstrated the power of democratic participation and peaceful transfer of authority.",
      international_reaction: "The international community watched closely, with many nations offering congratulations and expressing hope for continued democratic progress.",
      long_term_impact: "The reforms and precedents set during this period continue to shape the political landscape today.",
      vox_take: "DISPATCH — This, dear reader, is democracy in action. Messy, beautiful, and absolutely essential — STOP",
    });
  }

  return "TRANSMISSION FROM VOX — GREETINGS STOP — I'm your guide to the world of elections and democracy. Ask me about voting systems, how countries elect their leaders, electoral reforms, or the history of democratic governance. DISPATCH FOLLOWS upon your inquiry — STOP";
}

export async function getLessonContent(topicId) {
  const response = await callClaude([
    { role: 'user', content: `Generate lesson content for the topic "${topicId}". Return JSON with fields: story (a vivid telegraph-style narrative, 150 words), visual_title, visual_description, key_points (array of 4 strings).` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'lesson' }]));
  }
}

export async function getQuizQuestions(topicId) {
  const response = await callClaude([
    { role: 'user', content: `Generate 3 quiz questions for the topic "${topicId}". Return JSON array with objects: question, options (4 strings), correct (0-3 index), explanation.` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'quiz question' }]));
  }
}

export async function getCountryRoadmap(countryName) {
  const response = await callClaude([
    { role: 'user', content: `Provide the election hierarchy/roadmap for ${countryName}. Return JSON array with objects: id, label, level (number), description. From local to national level.` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'roadmap hierarchy level' }]));
  }
}

export async function getNodeDetails(countryName, nodeName) {
  const response = await callClaude([
    { role: 'user', content: `Explain the "${nodeName}" election level in ${countryName}. Return JSON: name, who_votes, how_winner_decided, term_length, key_facts (array of 3).` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'node detail' }]));
  }
}

export async function getSimulationSteps(countryName, electionType) {
  const response = await callClaude([
    { role: 'user', content: `Simulate a ${electionType} election in ${countryName}. Return JSON array of 4 steps: step (number), title, description (telegraph style), type (notice/ballot/gazette).` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'simulation steps' }]));
  }
}

export async function getComparison(country1, country2) {
  const response = await callClaude([
    { role: 'user', content: `Compare the election systems of ${country1} and ${country2}. Return JSON: comparison (overview), country1_strengths (array), country2_strengths (array), verdict (Vox-style conclusion).` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'comparison' }]));
  }
}

export async function getTimelineEventDetail(event, country, year) {
  const response = await callClaude([
    { role: 'user', content: `Give a detailed account of the "${event}" election event in ${country} in ${year}. Return JSON: headline, full_summary, why_it_mattered, international_reaction, long_term_impact, vox_take.` }
  ]);
  try {
    return JSON.parse(response);
  } catch {
    return JSON.parse(getFallbackResponse([{ content: 'timeline event' }]));
  }
}

export async function chatWithVox(messages) {
  const formattedMessages = messages.map(m => ({
    role: m.role,
    content: m.content,
  }));
  return await callClaude(formattedMessages);
}

export { VOX_SYSTEM_PROMPT };
