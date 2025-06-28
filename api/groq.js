export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY; // Set this in your Vercel dashboard
  const { model, messages, temperature } = req.body;

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model, messages, temperature })
    });

    const data = await groqRes.json();
    res.status(groqRes.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}