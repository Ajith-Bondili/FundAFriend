import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Users, DollarSign, Calendar, Eye, ArrowRight, ArrowLeft, Share, Star } from 'lucide-react';
import { useDataStore } from '@/hooks/useDataStore';
import type { Project, User, Update } from '@/lib/types';

interface ProjectPageProps {
  projectSlug: string | null; // Changed from projectId to projectSlug to match dataStore
  onViewUpdate?: (updateId: string) => void;
  onBack: () => void;
}

export function ProjectPage({ projectSlug, onViewUpdate, onBack }: ProjectPageProps) {
  const { db } = useDataStore();
  
  // Get project data from dataStore
  const project: Project | undefined = projectSlug ? db.getProjectBySlug(projectSlug) : undefined;
  const creator: User | undefined = project ? db.getUserById(project.creator_id) : undefined;
  
  // Get project updates and contributions from dataStore
  const updates: Update[] = project ? db.getProjectUpdates(project.id) : [];
  const supporterCount = project ? db.getProjectSupporterCount(project.id) : 0;
  const progressPercentage = (project?.current_funding || 0) / (project?.funding_goal || 1) * 100;

  if (!project || !creator) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Project not found</p>
        <Button onClick={onBack} className="mt-4 rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="rounded-full text-gray-600 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Button>

      {/* Project Header */}
      <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden">
        {/* Hero Image */}
        {project.cover_image_url && (
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback 
              src={project.cover_image_url} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-full">
                {project.category}
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-full">
                {project.status}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Button variant="outline" size="sm" className="rounded-full bg-white/80 backdrop-blur-sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src={creator.avatar_url} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white">
                {creator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900 mb-1">{project.title}</CardTitle>
              <p className="text-gray-600 mb-2">by {creator.name}</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-full">
                Creator
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
          
          {/* Why Funding Helpful Section */}
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Why This Project Needs Support</h3>
            <p className="text-gray-700">{project.why_funding_helpful}</p>
          </div>
          
          {/* Funding Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl text-green-600 mb-1">${project.current_funding}</div>
                  <div className="text-sm text-gray-600">raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-blue-600 mb-1">{supporterCount}</div>
                  <div className="text-sm text-gray-600">supporters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-600 mb-1">${project.funding_goal}</div>
                  <div className="text-sm text-gray-600">goal</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full px-8 shadow-lg">
                  <Heart className="w-4 h-4 mr-2" />
                  Fund This Project
                </Button>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-3 bg-white/50 rounded-full" />
            <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% of goal reached</p>
          </div>

          {/* Project Goals */}
          {project.goals && project.goals.length > 0 && (
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Goals</h3>
              <ul className="space-y-2">
                {project.goals.map((goal, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Updates Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-gray-900">Project Updates</h2>
          <Badge variant="outline" className="bg-white/60 rounded-full">
            {updates.length} updates
          </Badge>
        </div>
        
        {updates.length > 0 ? (
          <div className="space-y-4">
            {updates.map((update) => (
              <Card key={update.id} className="border-0 shadow-md bg-white/60 backdrop-blur-sm rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onViewUpdate && onViewUpdate(update.id)}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    {update.images && update.images.length > 0 && (
                      <div className="flex-shrink-0">
                        <ImageWithFallback 
                          src={update.images[0]} 
                          alt={update.title}
                          className="w-24 h-24 rounded-lg object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg text-gray-900">{update.title}</h3>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(update.created_at).toLocaleDateString()}
                        </Badge>
                        {update.is_milestone && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 rounded-full text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Milestone
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{update.content}</p>
                      
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm" className="rounded-full text-blue-600 hover:bg-blue-50">
                          <Eye className="w-4 h-4 mr-1" />
                          View Update
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-md bg-white/60 backdrop-blur-sm rounded-xl">
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 mb-2">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Updates Yet</h3>
              <p className="text-gray-600">This project hasn&apos;t posted any updates yet. Check back later for progress updates!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}