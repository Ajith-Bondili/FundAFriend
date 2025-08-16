import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Users, DollarSign, Calendar, Eye, ArrowRight, ArrowLeft, Share, Star } from 'lucide-react';

interface ProjectPageProps {
  projectId: string | null;
  onViewUpdate: (updateId: string) => void;
  onBack: () => void;
}

// Mock project data - in real app this would be fetched based on projectId
const projectsData = {
  '1': {
    id: '1',
    title: 'Building My First Drone',
    creator: {
      name: 'Jamie Rodriguez',
      avatar: '/api/placeholder/48/48',
      bio: 'Robotics student & maker'
    },
    description: 'I\'m building my first custom drone for aerial photography! This project will help me learn about electronics, programming, and mechanical design while creating something amazing. I\'ve always been fascinated by flight and this is my chance to create something that can soar through the sky while capturing beautiful moments from above.',
    totalRaised: 450,
    goalAmount: 800,
    supporterCount: 12,
    category: 'Technology',
    status: 'active',
    isSupported: true,
    userContribution: 50,
    image: '/api/placeholder/600/300',
    updates: [
      {
        id: '1',
        title: 'Just ordered the flight controller!',
        preview: 'Thanks to your support, I was able to order the main flight controller board. This is the brain of the drone!',
        date: '2025-08-15',
        image: '/api/placeholder/300/200',
        fundsUsed: [
          { item: 'Flight controller board', amount: 85 },
          { item: 'Shipping', amount: 12 }
        ]
      },
      {
        id: '2', 
        title: 'Frame assembly complete',
        preview: 'The carbon fiber frame is now fully assembled and looking solid. Next step: mounting the motors!',
        date: '2025-08-12',
        image: '/api/placeholder/300/200',
        fundsUsed: [
          { item: 'Carbon fiber frame kit', amount: 120 },
          { item: 'Assembly hardware', amount: 25 }
        ]
      },
      {
        id: '3',
        title: 'Motor testing successful',
        preview: 'All four motors are spinning perfectly! The power distribution is working great.',
        date: '2025-08-10',
        fundsUsed: [
          { item: 'Brushless motors (4x)', amount: 160 },
          { item: 'ESCs (4x)', amount: 80 }
        ]
      }
    ]
  }
};

export function ProjectPage({ projectId, onViewUpdate, onBack }: ProjectPageProps) {
  if (!projectId || !projectsData[projectId as keyof typeof projectsData]) {
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

  const project = projectsData[projectId as keyof typeof projectsData];
  const progressPercentage = (project.totalRaised / project.goalAmount) * 100;

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
        {project.image && (
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700 rounded-full">
                {project.category}
              </Badge>
              {project.isSupported && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full">
                  <Star className="w-3 h-3 mr-1" />
                  Supporting
                </Badge>
              )}
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
              <AvatarImage src={project.creator.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white">
                {project.creator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-gray-900 mb-1">{project.title}</CardTitle>
              <p className="text-gray-600 mb-2">by {project.creator.name}</p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 rounded-full">
                {project.creator.bio}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-gray-700 leading-relaxed">{project.description}</p>
          
          {/* Funding Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl text-green-600 mb-1">${project.totalRaised}</div>
                  <div className="text-sm text-gray-600">raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-blue-600 mb-1">{project.supporterCount}</div>
                  <div className="text-sm text-gray-600">supporters</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl text-gray-600 mb-1">${project.goalAmount}</div>
                  <div className="text-sm text-gray-600">goal</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {project.isSupported && (
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 rounded-full">
                    <DollarSign className="w-3 h-3 mr-1" />
                    You contributed ${project.userContribution}
                  </Badge>
                )}
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full px-8 shadow-lg">
                  <Heart className="w-4 h-4 mr-2" />
                  {project.isSupported ? 'Support More' : 'Fund This Project'}
                </Button>
              </div>
            </div>
            
            <Progress value={progressPercentage} className="h-3 bg-white/50 rounded-full" />
            <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% of goal reached</p>
          </div>
        </CardContent>
      </Card>

      {/* Updates Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-gray-900">Project Updates</h2>
          <Badge variant="outline" className="bg-white/60 rounded-full">
            {project.updates.length} updates
          </Badge>
        </div>
        
        <div className="space-y-4">
          {project.updates.map((update) => (
            <Card key={update.id} className="border-0 shadow-md bg-white/60 backdrop-blur-sm rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => onViewUpdate(update.id)}>
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  {update.image && (
                    <div className="flex-shrink-0">
                      <ImageWithFallback 
                        src={update.image} 
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
                        {update.date}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{update.preview}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {update.fundsUsed.map((fund, idx) => (
                          <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-full text-xs">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {fund.item} • ${fund.amount}
                          </Badge>
                        ))}
                      </div>
                      
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
      </div>
    </div>
  );
}