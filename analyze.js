// api/analyze.js
export default async function handler(req, res) {
    const { idea } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // This pulls from Vercel's secret slot

    const prompt = `Analyze this business idea: "${idea}". 
    Return ONLY a JSON object with these keys: 
    "sustainability" (1-10), "ecoFriendly" (1-10), "profit" (1-10), "market" (1-10), 
    "isGoodForEnv" (boolean), "summary" (detailed 4-5 sentence explanation).`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text;
        const cleanJson = JSON.parse(rawText.replace(/```json|```/g, ""));
        
        res.status(200).json(cleanJson);
    } catch (error) {
        res.status(500).json({ error: "Failed to reach AI" });
    }
}
