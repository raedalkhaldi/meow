import { NextResponse } from 'next/server';
import { getProjects, addProject, updateProject, deleteProject } from '@/lib/google-sheets';
import type { Project } from '@/lib/types';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project: Project = await request.json();
    const success = await addProject(project);
    
    if (success) {
      return NextResponse.json({ message: 'Project added successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const project: Project = await request.json();
    const success = await updateProject(project);
    
    if (success) {
      return NextResponse.json({ message: 'Project updated successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { projectId } = await request.json();
    const success = await deleteProject(projectId);
    
    if (success) {
      return NextResponse.json({ message: 'Project deleted successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
} 