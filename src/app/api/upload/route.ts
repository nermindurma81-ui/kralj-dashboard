import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Upload directory
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${randomString}-${originalName}`;
    const filepath = join(UPLOAD_DIR, filename);

    // Convert file to buffer and write
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Get file info
    const stats = await getFileStats(filepath);

    // Return file info
    return NextResponse.json({
      success: true,
      file: {
        name: filename,
        originalName: file.name,
        size: stats.size,
        type: file.type,
        url: `/uploads/${filename}`,
        uploadedAt: new Date().toISOString(),
      },
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (filename) {
      // Get specific file info
      const filepath = join(UPLOAD_DIR, filename);
      if (!existsSync(filepath)) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }
      const stats = await getFileStats(filepath);
      return NextResponse.json({
        success: true,
        file: {
          name: filename,
          ...stats,
          url: `/uploads/${filename}`,
        },
      });
    } else {
      // List all files
      const { readdir } = await import('fs/promises');
      if (!existsSync(UPLOAD_DIR)) {
        return NextResponse.json({
          success: true,
          files: [],
          count: 0,
        });
      }
      const files = await readdir(UPLOAD_DIR);
      return NextResponse.json({
        success: true,
        files: files.map(name => ({
          name,
          url: `/uploads/${name}`,
        })),
        count: files.length,
      });
    }
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'Failed to list files' },
      { status: 500 }
    );
  }
}

async function getFileStats(filepath: string) {
  const { stat } = await import('fs/promises');
  const stats = await stat(filepath);
  return {
    size: stats.size,
    createdAt: stats.birthtime.toISOString(),
    modifiedAt: stats.mtime.toISOString(),
  };
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('file');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename required' },
        { status: 400 }
      );
    }

    const { unlink } = await import('fs/promises');
    const filepath = join(UPLOAD_DIR, filename);

    if (!existsSync(filepath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    await unlink(filepath);

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
