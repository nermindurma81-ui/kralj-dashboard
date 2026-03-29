import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // Koristi OpenClaw webhook
    const response = await fetch('https://openclaw.io/api/chat', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENCLAW_API_KEY}`
      },
      body: JSON.stringify({
        message: message,
        sessionId: 'kralj-dashboard',
        mode: 'direct'
      }),
    });

    if (!response.ok) {
      throw new Error('Webhook error: ' + response.status);
    }

    const data = await response.json();
    return NextResponse.json({ 
      reply: data.reply || 'Hvala na poruci!',
      success: true 
    });

  } catch (error: any) {
    // Fallback - jednostavan odgovor
    return NextResponse.json({ 
      reply: `👑 Kralj: Dobio sam tvoju poruku: "${message}"\n\nJoš uvijek pravim pravi chat - sačekaj malo! 🚀`,
      success: true,
      fallback: true
    });
  }
}
