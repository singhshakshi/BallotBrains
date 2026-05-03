require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3001;

app.use(helmet());
app.use(cors({ origin: [/^http:\/\/localhost:517[0-9]$/] })); // restrict to frontend origins
app.use(express.json());

// Gemini rate limiter
const geminiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // Gemini free tier allows 15 RPM
  message: { error: 'Too many requests, please try again later.' }
});

const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({}); // Uses process.env.GEMINI_API_KEY

// Basic sanitize helper
function sanitizeMessage(str) {
  if (typeof str !== 'string') return '';
  // Strip HTML tags
  const stripped = str.replace(/<\/?[^>]+(>|$)/g, "");
  // Cap at 2000 characters
  return stripped.substring(0, 2000);
}

app.post('/api/auth/verify', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ error: 'No credential provided' });
  }

  try {
    // Verify Google ID token using Google's tokeninfo endpoint
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!response.ok) {
      throw new Error('Invalid token');
    }
    const data = await response.json();
    
    // Optionally verify that data.aud matches our GOOGLE_CLIENT_ID
    if (process.env.GOOGLE_CLIENT_ID && data.aud !== process.env.GOOGLE_CLIENT_ID) {
      throw new Error('Invalid client ID');
    }

    res.json({
      name: data.name,
      email: data.email,
      picture: data.picture,
    });
  } catch (error) {
    console.error('Auth verification error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

app.post('/api/gemini/message', geminiLimiter, async (req, res) => {
  try {
    const { system, messages, model } = req.body;

    let contents = [];
    if (messages && messages.length > 0) {
      contents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: sanitizeMessage(msg.content) }]
      }));
    } else {
      contents = [{ role: 'user', parts: [{ text: 'Hello' }] }];
    }

    const response = await ai.models.generateContent({
        model: model || 'gemini-2.5-flash',
        contents: contents,
        config: {
            systemInstruction: system || '',
        }
    });

    res.json({ content: [{ text: response.text }] });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
