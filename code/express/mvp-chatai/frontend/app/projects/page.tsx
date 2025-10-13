'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectsApi, conversationsApi } from '@/lib/api';
import { removeToken } from '@/lib/auth';
import { Plus, LogOut, MessageSquare } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  _count: { conversations: number };
}

interface Conversation {
  id: number;
  threadId: string;
  title: string;
  updatedAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await projectsApi.getAll();
      setProjects(response.data);
      if (response.data.length > 0) {
        selectProject(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectProject = async (project: Project) => {
    setSelectedProject(project);
    try {
      const response = await conversationsApi.getAll(project.id);
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      await projectsApi.create(newProjectName);
      setNewProjectName('');
      setShowNewProject(false);
      loadProjects();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const createThread = async () => {
    if (!newThreadTitle.trim() || !selectedProject) return;
    try {
      const response = await conversationsApi.create(selectedProject.id, newThreadTitle);
      setNewThreadTitle('');
      setShowNewThread(false);
      router.push(`/chat/${selectedProject.id}/${response.data.threadId}`);
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Projects */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold">🤖 ChatAI</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-600">Projects</h2>
            <button
              onClick={() => setShowNewProject(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus size={16} />
            </button>
          </div>

          {showNewProject && (
            <div className="mb-2 flex gap-1">
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project name"
                className="flex-1 px-2 py-1 text-sm border rounded"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && createProject()}
              />
              <button onClick={createProject} className="px-2 py-1 text-sm bg-blue-500 text-white rounded">
                ✓
              </button>
            </div>
          )}

          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => selectProject(project)}
              className={`w-full text-left px-3 py-2 rounded mb-1 ${
                selectedProject?.id === project.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium text-sm">{project.name}</div>
              <div className="text-xs text-gray-500">
                {project._count.conversations} threads
              </div>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - Threads */}
      <div className="flex-1 flex flex-col">
        {selectedProject ? (
          <>
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{selectedProject.name}</h2>
                <button
                  onClick={() => setShowNewThread(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <Plus size={16} />
                  New Chat
                </button>
              </div>

              {showNewThread && (
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                    placeholder="Thread title"
                    className="flex-1 px-3 py-2 border rounded"
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && createThread()}
                  />
                  <button onClick={createThread} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Create
                  </button>
                  <button onClick={() => setShowNewThread(false)} className="px-4 py-2 border rounded">
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {conversations.length === 0 ? (
                <div className="text-center text-gray-500 mt-20">
                  <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No conversations yet</p>
                  <p className="text-sm">Click "New Chat" to start</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => router.push(`/chat/${selectedProject.id}/${conv.threadId}`)}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-left"
                    >
                      <h3 className="font-medium mb-1">{conv.title}</h3>
                      <p className="text-xs text-gray-500">
                        {new Date(conv.updatedAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a project or create a new one
          </div>
        )}
      </div>
    </div>
  );
}
