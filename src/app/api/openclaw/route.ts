import { NextRequest, NextResponse } from 'next/server';

// OpenClaw Gateway API
const OPENCLAW_GATEWAY = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:8080';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, message, skill, params } = body;

    // Pozovi OpenClaw Gateway
    const response = await fetch(`${OPENCLAW_GATEWAY}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: action || 'send',
        channel: 'webchat',
        message: message || `Pokreni ${skill} skill`,
        params: params || {},
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenClaw Gateway error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: data,
      message: 'Successfully sent to OpenClaw',
    });
  } catch (error) {
    console.error('OpenClaw API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Health check endpoint
  return NextResponse.json({
    status: 'ok',
    gateway: OPENCLAW_GATEWAY,
    timestamp: new Date().toISOString(),
  });
}
