import { NextRequest, NextResponse } from 'next/server';

// OpenClaw Gateway API
const OPENCLAW_GATEWAY = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationId } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Pozovi OpenClaw Gateway za chat poruku
    const response = await fetch(`${OPENCLAW_GATEWAY}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'send',
        channel: 'webchat',
        message: message,
        conversationId: conversationId || null,
      }),
    });

    if (!response.ok) {
      // Fallback response ako gateway nije dostupan
      return NextResponse.json({
        success: true,
        response: `Razumio sam: "${message}". Koristit ću odgovarajući skill! 👑\n\n(Napomena: OpenClaw Gateway nije dostupan na ${OPENCLAW_GATEWAY})`,
        fallback: true,
      });
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      response: data.message || data.content || 'Poruka poslana',
      conversationId: data.conversationId || conversationId,
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Fallback response za demo
    return NextResponse.json({
      success: true,
      response: `Razumio sam: "${request}". Koristit ću odgovarajući skill! 👑\n\n(Ovo je demo response - poveži OpenClaw Gateway za pravi AI)`,
      fallback: true,
    });
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    gateway: OPENCLAW_GATEWAY,
    timestamp: new Date().toISOString(),
  });
}
