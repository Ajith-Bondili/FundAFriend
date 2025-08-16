"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Separator } from '@/components/ui/Separator';
import { ProjectsOverview } from '@/components/ProjectOverview';
import { ProjectPage } from '@/components/ProjectPage';
import { CreatorDashboard } from '@/components/CreatorDashBoard';
import { SupporterDashboard } from '@/components/SupporterDashboard';
import { UpdateDetail } from '@/components/UpdateDetail';
import { Heart, Users, DollarSign, Home, User, Settings } from 'lucide-react';

type ViewType = 'projects' | 'project-detail' | 'creator' | 'supporter' | 'update';

interface UserType {
  id: string;
  name: string;
  avatar: string;
  role: 'creator' | 'supporter';
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('projects');
  const [selectedUpdateId, setSelectedUpdateId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentUser] = useState<UserType>({
    id: '1',
    name: 'Alex Chen',
    avatar: '/api/placeholder/40/40',
    role: 'supporter'
  });

  const handleViewUpdate = (updateId: string) => {
    setSelectedUpdateId(updateId);
    setCurrentView('update');
  };

  const handleViewProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentView('project-detail');
  };

  const handleBackToProjects = () => {
    setCurrentView('projects');
    setSelectedProjectId(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'projects':
        return <ProjectsOverview onViewProject={handleViewProject} onViewUpdate={handleViewUpdate} />;
      case 'project-detail':
        return <ProjectPage projectId={selectedProjectId} onViewUpdate={handleViewUpdate} onBack={handleBackToProjects} />;
      case 'creator':
        return <CreatorDashboard onViewUpdate={handleViewUpdate} />;
      case 'supporter':
        return <SupporterDashboard onViewUpdate={handleViewUpdate} />;
      case 'update':
        return <UpdateDetail updateId={selectedUpdateId} onBack={() => setCurrentView('supporter')} />;
      default:
        return <ProjectsOverview onViewProject={handleViewProject} onViewUpdate={handleViewUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-green-400 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl text-blue-900">FundAFriend</h1>
              </div>
            </div>
            <nav className="flex items-center space-x-6">
              <Button
                variant={currentView === 'projects' || currentView === 'project-detail' ? 'primary' : 'ghost'}
                onClick={() => setCurrentView('projects')}
                className="rounded-full"
              >
                <Home className="w-4 h-4 mr-2" />
                Projects
              </Button>
              <Button
                variant={currentView === 'creator' ? 'primary' : 'ghost'}
                onClick={() => setCurrentView('creator')}
                className="rounded-full"
              >
                <Settings className="w-4 h-4 mr-2" />
                Creator
              </Button>
              <Button
                variant={currentView === 'supporter' ? 'primary' : 'ghost'}
                onClick={() => setCurrentView('supporter')}
                className="rounded-full"
              >
                <User className="w-4 h-4 mr-2" />
                My Support
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-700">{currentUser.name}</span>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentView()}
      </main>
    </div>
  );
}
