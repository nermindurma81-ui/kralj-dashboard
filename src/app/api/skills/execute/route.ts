import { NextRequest, NextResponse } from 'next/server';

interface SkillTask {
  id: string;
  skill: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  createdAt: string;
  logs: string[];
  result?: any;
}

// In-memory task store (za demo - kasnije ide baza)
const taskStore: Map<string, SkillTask> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skill, description, params } = body;

    if (!skill) {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      );
    }

    // Kreiraj novi task
    const taskId = `task-${Date.now()}`;
    const task: SkillTask = {
      id: taskId,
      skill,
      description: description || `Executing ${skill}`,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      logs: [`⚡ Task created at ${new Date().toLocaleTimeString()}`],
    };

    taskStore.set(taskId, task);

    // Simuliraj izvršenje (kasnije ovo ide na pravi OpenClaw)
    simulateSkillExecution(taskId, skill, params);

    return NextResponse.json({
      success: true,
      taskId,
      message: `Skill ${skill} pokrenut`,
      task,
    });
  } catch (error) {
    console.error('Skill Execution Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const taskId = searchParams.get('id');

  if (taskId) {
    // Vrati specifični task
    const task = taskStore.get(taskId);
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, task });
  }

  // Vrati sve taskove
  const tasks = Array.from(taskStore.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json({
    success: true,
    tasks,
    total: tasks.length,
  });
}

// Simulacija izvršenja skill-a
async function simulateSkillExecution(
  taskId: string,
  skill: string,
  params?: any
) {
  const task = taskStore.get(taskId);
  if (!task) return;

  // Update status na running
  task.status = 'running';
  task.progress = 10;
  task.logs.push(`🚀 Starting ${skill} execution...`);
  taskStore.set(taskId, task);

  // Simuliraj progres
  const progressInterval = setInterval(() => {
    const currentTask = taskStore.get(taskId);
    if (!currentTask) {
      clearInterval(progressInterval);
      return;
    }

    if (currentTask.progress < 90) {
      currentTask.progress += Math.floor(Math.random() * 15);
      currentTask.logs.push(`⏳ Processing... ${currentTask.progress}%`);
      taskStore.set(taskId, currentTask);
    }
  }, 2000);

  // Završi task nakon 10 sekundi
  setTimeout(() => {
    clearInterval(progressInterval);
    const currentTask = taskStore.get(taskId);
    if (!currentTask) return;

    currentTask.progress = 100;
    currentTask.status = 'completed';
    currentTask.logs.push(`✅ ${skill} completed successfully!`);
    currentTask.result = {
      message: `${skill} execution finished`,
      timestamp: new Date().toISOString(),
      params,
    };
    taskStore.set(taskId, currentTask);
  }, 10000);
}
