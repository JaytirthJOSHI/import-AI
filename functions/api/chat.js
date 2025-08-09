export async function onRequestPost({ request, env }) {
  try {
    const { message, history } = await request.json();

    if (!env.GROQ_API_KEY) {
      return new Response(JSON.stringify({ error: 'Missing GROQ_API_KEY' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid request: message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const systemPrompt = `You are Import AI, an import/export assistant.
Reply in concise Markdown with sections and bullet lists where useful. Use code fences for code or tabular data.
Focus on:
- HS code considerations
- Licensing/permit signals
- Sanctions/embargo screening
- Country-specific rules
- Tariffs/duties
- Documents (invoice, BoL, CoO, packing list)
Provide a short recommended risk category (Compliant / Needs Review / Non-Compliant) and next steps.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(Array.isArray(history) ? history : []).slice(-8),
      { role: 'user', content: message }
    ];

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        temperature: 0.2,
        max_tokens: 800,
        messages
      })
    });

    if (!groqRes.ok) {
      const text = await groqRes.text();
      return new Response(JSON.stringify({ error: 'Groq API error', details: text }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await groqRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || 'hi';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error', details: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
