import { NextRequest, NextResponse } from 'next/server';

// In-memory task store (za demo - u produkciji koristiti bazu)
let tasks: any[] = [];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  let filteredTasks = tasks;
  
  if (status) {
    filteredTasks = tasks.filter(t => t.status === status);
  }
  
  // Sort by createdAt descending
  filteredTasks = filteredTasks.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, limit);
  
  return NextResponse.json({
    success: true,
    count: filteredTasks.length,
    total: tasks.length,
    tasks: filteredTasks,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, skillName, action, params } = body;
    
    if (!skillId) {
      return NextResponse.json(
        { error: 'skillId is required' },
        { status: 400 }
      );
    }
    
    // Kreiraj novi task
    const task = {
      id: `task-${Date.now()}`,
      skillId,
      skillName: skillName || skillId,
      action: action || 'run',
      params: params || {},
      status: 'pending',
      progress: 0,
      logs: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
    };
    
    tasks.push(task);
    
    // Simuliraj izvršavanje (za demo)
    simulateTaskExecution(task.id);
    
    return NextResponse.json({
      success: true,
      task: task,
      message: `Task kreiran za skill: ${task.skillName}`,
    });
  } catch (error) {
    console.error('Tasks API Error:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('id');
    
    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID required' },
        { status: 400 }
      );
    }
    
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }
    
    tasks.splice(taskIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Task deleted',
    });
  } catch (error) {
    console.error('Tasks API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

// Helper za simulaciju izvršavanja taska
function simulateTaskExecution(taskId: string) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;
  
  // Update status to running
  task.status = 'running';
  task.logs.push(`[${new Date().toISOString()}] Task started`);
  
  // Simulate progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      task.status = 'completed';
      task.logs.push(`[${new Date().toISOString()}] Task completed`);
      task.completedAt = new Date().toISOString();
      clearInterval(interval);
    } else {
      task.logs.push(`[${new Date().toISOString()}] Progress: ${Math.round(progress)}%`);
    }
    task.progress = Math.round(progress);
    task.updatedAt = new Date().toISOString();
  }, 1000);
}
