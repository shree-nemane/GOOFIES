// api/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  // 1. Method Validation
  if (req.method !== 'POST') {
    console.warn(`Attempted invalid method: ${req.method} for /api/chat`);
    return res.status(405).json({ success: false, message: 'Method Not Allowed', error: 'Only POST requests are supported.' });
  }

  // 2. API Key Check from Vercel Environment Variables
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  if (!GOOGLE_API_KEY) {
    console.error('Server Error: GOOGLE_API_KEY environment variable is not set.');
    return res.status(500).json({ success: false, message: 'Server configuration error.', error: 'API key not configured on the server.' });
  }

  // 3. Request Body Validation
  // Ensure 'contents' is always present and an array
  const { contents, model, generationConfig, safetySettings } = req.body;

  if (!contents || !Array.isArray(contents) || contents.length === 0) {
    console.warn('Bad Request: Missing or invalid "contents" in request body.');
    return res.status(400).json({ success: false, message: 'Bad Request', error: 'Missing or invalid "contents" in request body.' });
  }

  // Model can be defaulted, so no strict validation needed for it being present, but ensure it's a string if provided
  if (model && typeof model !== 'string') {
    console.warn('Bad Request: Invalid "model" format in request body.');
    return res.status(400).json({ success: false, message: 'Bad Request', error: 'If provided, "model" must be a string.' });
  }

  // generationConfig and safetySettings are optional, no strict validation needed for presence.

  const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
  // Use the model provided by the frontend, or default to "gemini-1.5-flash"
  const geminiModel = genAI.getGenerativeModel({ model: model || "gemini-1.5-flash" });

  try {
    const result = await geminiModel.generateContent({
      contents,
      generationConfig,
      safetySettings,
    });

    // Check if candidates exist and return the first one
    if (result.response && result.response.candidates && result.response.candidates.length > 0) {
      return res.status(200).json({ success: true, data: result.response.candidates[0] });
    } else {
      // Log full response if no candidates, helpful for debugging safety blocks etc.
      console.warn('Gemini API Warning: No candidates returned from generateContent.', JSON.stringify(result.response, null, 2));
      return res.status(200).json({ success: true, message: 'No content generated.', data: null });
    }

  } catch (error) {
    console.error('Error calling Google Gemini API from serverless function:', error);

    // Extract more specific error message from Google's API response if possible
    let errorMessage = 'An unexpected error occurred while communicating with the AI.';
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error.message || errorMessage;
    } else if (error.message) {
        errorMessage = error.message;
    }

    return res.status(500).json({ success: false, message: 'AI communication error.', error: errorMessage });
  }
}
