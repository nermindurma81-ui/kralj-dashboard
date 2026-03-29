import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // Koristi OpenClaw CLI preko fetch-a
    const response = await fetch('http://localhost:9110/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        to: 'nermin',
        channel: 'webchat'
      }),
    });

    if (!response.ok) {
      throw new Error('Gateway error: ' + response.status);
    }

    const data = await response.json();
    return NextResponse.json({ 
      reply: data.message || 'Poruka je poslata! 👑',
      success: true 
    });

  } catch (error: any) {
    // Fallback - jednostavan odgovor
    return NextResponse.json({ 
      reply: `👑 Kralj: Dobio sam tvoju poruku: "${message}"\n\nSpreman sam za akciju! Šta želiš da uradimo danas? 🚀`,
      success: true,
      fallback: true
    });
  }
}
