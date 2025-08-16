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
//
import { useRouter } from 'next/navigation';

interface ProjectsOverviewProps {
  onViewProject?: (projectId: string) => void;
  onViewUpdate?: (updateId: string) => void;
}

// Build projects from data store
const projects = [
  {
    id: '1',
    title: 'Building My First Drone',
    creator: {
      name: 'Jamie Rodriguez',
      avatar: '/api/placeholder/48/48',
      bio: 'Robotics student & maker'
    },
    description: 'Building a custom drone for aerial photography! Learning electronics, programming, and mechanical design.',
    totalRaised: 450,
    goalAmount: 800,
    supporterCount: 12,
    status: 'active',
    category: 'Technology',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-15',
    isSupported: true,
    userContribution: 50,
    recentUpdateTitle: 'Just ordered the flight controller!'
  },
  {
    id: '2',
    title: 'Community Garden App',
    creator: {
      name: 'Maria Santos',
      avatar: '/api/placeholder/48/48',
      bio: 'UX Designer & gardening enthusiast'
    },
    description: 'Designing an app to help community gardens track plants, share tips, and coordinate harvests.',
    totalRaised: 320,
    goalAmount: 500,
    supporterCount: 8,
    status: 'active',
    category: 'Design',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-14',
    isSupported: true,
    userContribution: 35,
    recentUpdateTitle: 'App design mockups ready'
  },
  {
    id: '3',
    title: 'Local Art Zine',
    creator: {
      name: 'Alex Kim',
      avatar: '/api/placeholder/48/48',
      bio: 'Artist & community organizer'
    },
    description: 'Creating a quarterly zine showcasing local artists and their stories in our neighborhood.',
    totalRaised: 280,
    goalAmount: 300,
    supporterCount: 15,
    status: 'completed',
    category: 'Art',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-12',
    isSupported: true,
    userContribution: 40,
    recentUpdateTitle: 'Zine is printed and ready!'
  },
  {
    id: '4',
    title: 'Indie Game Soundtrack',
    creator: {
      name: 'Taylor Chen',
      avatar: '/api/placeholder/48/48',
      bio: 'Composer & sound designer'
    },
    description: 'Composing an atmospheric soundtrack for an upcoming indie game about space exploration.',
    totalRaised: 150,
    goalAmount: 600,
    supporterCount: 6,
    status: 'active',
    category: 'Music',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-13',
    isSupported: false,
    userContribution: 0,
    recentUpdateTitle: 'First track preview available'
  },
  {
    id: '5',
    title: 'Smart Plant Monitor',
    creator: {
      name: 'Sam Thompson',
      avatar: '/api/placeholder/48/48',
      bio: 'Engineer & plant enthusiast'
    },
    description: 'Building IoT sensors to monitor soil moisture, light, and temperature for houseplants.',
    totalRaised: 380,
    goalAmount: 750,
    supporterCount: 9,
    status: 'active',
    category: 'Technology',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-11',
    isSupported: false,
    userContribution: 0,
    recentUpdateTitle: 'Sensor prototypes working!'
  },
  {
    id: '6',
    title: 'Cookbook for Busy Parents',
    creator: {
      name: 'Jordan Williams',
      avatar: '/api/placeholder/48/48',
      bio: 'Chef & parent of three'
    },
    description: 'Writing a cookbook with 15-minute meals that kids will actually eat and parents can make easily.',
    totalRaised: 200,
    goalAmount: 400,
    supporterCount: 12,
    status: 'active',
    category: 'Food',
    image: '/api/placeholder/400/240',
    lastUpdate: '2025-08-09',
    isSupported: false,
    userContribution: 0,
    recentUpdateTitle: 'Recipe testing in progress'
  }
];

export function ProjectsOverview({ onViewProject, onViewUpdate }: ProjectsOverviewProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Temporary: use a known slug from the seeded data store so cards link to a real project page
  const seededSlug = 'johns-food-truck-dream';

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.creator.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'supported' && project.isSupported) ||
                         (selectedFilter === 'trending' && project.supporterCount > 8) ||
                         (selectedFilter === 'new' && project.totalRaised < 200);
    
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
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg">
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
              <TabsTrigger value="supported" className="rounded-full">Supported</TabsTrigger>
              <TabsTrigger value="trending" className="rounded-full">Trending</TabsTrigger>
              <TabsTrigger value="new" className="rounded-full">New</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const progressPercentage = (project.totalRaised / project.goalAmount) * 100;
          
          return (
            <Card 
              key={project.id} 
              className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => {
                router.push(`/p/${seededSlug}`);
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={`rounded-full text-xs ${getStatusColor(project.status)}`}
                  >
                    {getStatusIcon(project.status)}
                    <span className="ml-1 capitalize">{project.status}</span>
                  </Badge>
                  {project.isSupported && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Supporting
                    </Badge>
                  )}
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
                    <AvatarImage src={project.creator.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white text-sm">
                      {project.creator.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{project.creator.name}</p>
                    <p className="text-xs text-gray-500">{project.creator.bio}</p>
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
                    <span className="text-green-600">${project.totalRaised} raised</span>
                    <span className="text-gray-500">${project.goalAmount} goal</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-gray-100 rounded-full" />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{Math.round(progressPercentage)}% funded</span>
                    <span>{project.supporterCount} supporters</span>
                  </div>
                </div>

                {/* Recent Update */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="w-3 h-3 text-blue-600" />
                    <span className="text-xs text-blue-700">Latest update • {project.lastUpdate}</span>
                  </div>
                  <p className="text-xs text-gray-700">{project.recentUpdateTitle}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/p/${seededSlug}`);
                    }}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    View Project
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