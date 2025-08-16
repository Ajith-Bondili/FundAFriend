import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Input } from './ui/Input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Users, DollarSign, Calendar, Search, Filter, TrendingUp, Star, Clock, CheckCircle } from 'lucide-react';
import { useDataStore } from '@/hooks/useDataStore';
import type { Project, User, Update } from '@/lib/types';

interface ProjectsOverviewProps {
  onViewProject: (projectSlug: string) => void; // Changed from projectId to projectSlug
  onViewUpdate?: (updateId: string) => void;
  onCreateProject?: () => void; // Add optional create project handler
}

// Extended project interface for display purposes
interface ProjectWithExtras extends Project {
  creator: User;
  progressPercentage: number;
  supporterCount: number;
  recentUpdate?: Update;
}

export function ProjectsOverview({ onViewProject, onViewUpdate, onCreateProject }: ProjectsOverviewProps) {
  const { db } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Get all projects from dataStore and enrich with creator and stats
  const enrichedProjects: ProjectWithExtras[] = db.getAllProjects().map(project => {
    const creator = db.getUserById(project.creator_id);
    const supporterCount = db.getProjectSupporterCount(project.id);
    const updates = db.getProjectUpdates(project.id);
    const recentUpdate = updates[0]; // Most recent update
    const progressPercentage = (project.current_funding / project.funding_goal) * 100;

    return {
      ...project,
      creator: creator || {
        id: 'unknown',
        name: 'Unknown Creator',
        email: '',
        avatar_url: '',
        created_at: '',
        updated_at: ''
      },
      supporterCount,
      recentUpdate,
      progressPercentage
    };
  });

  const filteredProjects = enrichedProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && project.status === 'active') ||
                         (selectedFilter === 'trending' && project.supporterCount > 5) ||
                         (selectedFilter === 'new' && project.current_funding < 100);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Discover Projects</h1>
            <p className="text-gray-600">Support creators and follow their journeys</p>
          </div>
          <Button 
            onClick={onCreateProject}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg"
          >
            <Heart className="w-4 h-4 mr-2" />
            Start a Project
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-200 bg-white/80"
            />
          </div>

          <Tabs value={selectedFilter} onValueChange={setSelectedFilter} className="w-auto">
            <TabsList className="bg-white/60 backdrop-blur-sm rounded-full">
              <TabsTrigger value="all" className="rounded-full">All Projects</TabsTrigger>
              <TabsTrigger value="active" className="rounded-full">Active</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full">Trending</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">New</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          return (
            <Card 
              key={project.id} 
              className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => onViewProject(project.slug)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                {project.cover_image_url ? (
                  <ImageWithFallback 
                    src={project.cover_image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                    <div className="text-center">
                      <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No image</p>
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`rounded-full text-xs ${getStatusColor(project.status)}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status}</span>
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/80 backdrop-blur-sm rounded-full text-xs">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <CardContent className="p-6 space-y-4">
                {/* Creator Info */}
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10 border-2 border-white shadow-sm">
                    <AvatarImage src={project.creator.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white text-sm">
                      {project.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{project.creator.name}</p>
                    <p className="text-xs text-gray-500">Creator</p>
                  </div>
                </div>

                {/* Project Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                </div>

                {/* Funding Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">${project.current_funding} raised</span>
                    <span className="text-gray-500">${project.funding_goal} goal</span>
                  </div>
                  <Progress value={project.progressPercentage} className="h-2 bg-gray-100 rounded-full" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{Math.round(project.progressPercentage)}% funded</span>
                    <span>{project.supporterCount} supporters</span>
                  </div>
                </div>

                {/* Recent Update */}
                {project.recentUpdate ? (
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-100">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-700">
                        Latest update • {new Date(project.recentUpdate.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700">{project.recentUpdate.title}</p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center space-x-2 mb-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">No updates yet</span>
                    </div>
                    <p className="text-xs text-gray-500">This project hasn&apos;t posted any updates</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle funding action
                    }}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Fund Project
                  </Button>
                  
                  <Button variant="outline" size="sm" className="rounded-full border-gray-200">
                    <Users className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={() => {setSearchTerm(''); setSelectedFilter('all');}} className="rounded-full">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}