// --- Gemini API Call Function ---
export const callGeminiAPI = async (prompt, systemInstruction) => {
    const apiKey = ""; // Leave empty
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
    };
    
    if (systemInstruction) {
        payload.systemInstruction = { parts: [{ text: systemInstruction }] };
    }

    let response;
    let retries = 3;
    let delay = 1000;

    while (retries > 0) {
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                return result.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't get a response. Please try again.";
            }
        } catch (error) {
            console.error("API call failed:", error);
        }

        retries--;
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
    }

    return "Sorry, I'm having trouble connecting right now. Please try again later.";
};
