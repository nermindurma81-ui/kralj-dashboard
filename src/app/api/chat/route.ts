import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // Koristi OpenClaw sessions_spawn za pravi AI odgovor
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const escapedMessage = message.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    
    const result = await execAsync(
      `openclaw sessions spawn --task "${escapedMessage}" --mode run --runtime subagent --timeoutSeconds 120`,
      { 
        cwd: '/mnt/data/openclaw/workspace/.openclaw/workspace',
        timeout: 125000,
        env: { ...process.env, HOME: '/root' }
      }
    );

    // Parsiraj output
    const output = result.stdout || '';
    const reply = output.trim() || 'Poruka je obrađena! 👑';

    return NextResponse.json({ 
      reply: reply,
      success: true 
    });

  } catch (error: any) {
    // Pravi error response
    return NextResponse.json({ 
      error: 'Greška: ' + (error.message || 'Nije uspelo'),
      success: false 
    }, { status: 500 });
  }
}
