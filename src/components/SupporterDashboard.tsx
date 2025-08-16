import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Separator } from './ui/Separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Calendar, DollarSign, ExternalLink, Eye, ArrowRight } from 'lucide-react';

interface SupporterDashboardProps {
  onViewUpdate: (updateId: string) => void;
}

// Mock supporter data
const supporterData = {
  totalDonated: 125,
  projectsSupported: 3,
  updatesReceived: 8
};

const donations = [
  {
    id: '1',
    project: 'Building My First Drone',
    creator: 'Jamie Rodriguez',
    amount: 50,
    date: '2025-08-10',
    status: 'active',
    linkedUpdate: {
      id: '1',
      title: 'Just ordered the flight controller!',
      date: '2025-08-15',
      fundsUsed: 'Flight controller board $85'
    }
  },
  {
    id: '2',
    project: 'Community Garden App',
    creator: 'Maria Santos',
    amount: 35,
    date: '2025-08-05',
    status: 'active',
    linkedUpdate: {
      id: '4',
      title: 'App design mockups ready',
      date: '2025-08-14',
      fundsUsed: 'Design software subscription $25'
    }
  },
  {
    id: '3',
    project: 'Local Art Zine',
    creator: 'Alex Kim',
    amount: 40,
    date: '2025-07-28',
    status: 'completed',
    linkedUpdate: {
      id: '5',
      title: 'Zine is printed and ready!',
      date: '2025-08-12',
      fundsUsed: 'Printing costs $120'
    }
  }
];

const recentUpdates = [
  {
    id: '1',
    project: 'Building My First Drone',
    creator: 'Jamie Rodriguez',
    title: 'Just ordered the flight controller!',
    preview: 'Thanks to your support, I was able to order the main flight controller board. This is the brain of the drone!',
    date: '2025-08-15',
    image: '/api/placeholder/200/150',
    fundsUsed: [
      { item: 'Flight controller board', amount: 85 },
      { item: 'Shipping', amount: 12 }
    ]
  },
  {
    id: '4',
    project: 'Community Garden App',
    creator: 'Maria Santos',
    title: 'App design mockups ready',
    preview: 'Just finished the initial design mockups for the garden tracking features. The UI is looking clean and user-friendly!',
    date: '2025-08-14',
    image: '/api/placeholder/200/150',
    fundsUsed: [
      { item: 'Design software subscription', amount: 25 }
    ]
  },
  {
    id: '5',
    project: 'Local Art Zine',
    creator: 'Alex Kim',
    title: 'Zine is printed and ready!',
    preview: 'The community art zine is finally printed! Thanks to everyone who contributed artwork and funding.',
    date: '2025-08-12',
    image: '/api/placeholder/200/150',
    fundsUsed: [
      { item: 'Printing costs', amount: 120 },
      { item: 'Shipping materials', amount: 15 }
    ]
  }
];

export function SupporterDashboard({ onViewUpdate }: SupporterDashboardProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900 mb-2">My Support Dashboard</h1>
          <p className="text-gray-600">Track your contributions and stay updated on the projects you love</p>
        </div>
        <Button variant="outline" className="rounded-full border-gray-200">
          <Heart className="w-4 h-4 mr-2" />
          Discover Projects
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500 rounded-xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Total Contributed</p>
                <p className="text-2xl text-blue-900">${supporterData.totalDonated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-700">Projects Supported</p>
                <p className="text-2xl text-green-900">{supporterData.projectsSupported}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Updates Received</p>
                <p className="text-2xl text-yellow-900">{supporterData.updatesReceived}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation History */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-900">Your Contributions</h2>
          
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation.id} className="border-0 shadow-md bg-white/60 backdrop-blur-sm rounded-xl">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg text-gray-900">{donation.project}</h3>
                        <Badge 
                          variant={donation.status === 'active' ? 'default' : 'secondary'}
                          className={`rounded-full text-xs ${
                            donation.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {donation.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">by {donation.creator}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>${donation.amount} donated</span>
                        <span>•</span>
                        <span>{donation.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {donation.linkedUpdate && (
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>Latest update:</strong> {donation.linkedUpdate.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            Your contribution helped with: {donation.linkedUpdate.fundsUsed}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => onViewUpdate(donation.linkedUpdate.id)}
                          className="rounded-full text-blue-600 hover:bg-blue-50 text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Updates Feed */}
        <div className="space-y-4">
          <h2 className="text-xl text-gray-900">Latest Updates</h2>
          
          <div className="space-y-4">
            {recentUpdates.map((update) => (
              <Card key={update.id} className="border-0 shadow-md bg-white/60 backdrop-blur-sm rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => onViewUpdate(update.id)}>
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    {update.image && (
                      <div className="flex-shrink-0">
                        <ImageWithFallback 
                          src={update.image} 
                          alt={update.title}
                          className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-sm"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full text-xs">
                          {update.project}
                        </Badge>
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {update.date}
                        </Badge>
                      </div>
                      
                      <h3 className="text-sm text-gray-900 mb-2">{update.title}</h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">{update.preview}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {update.fundsUsed.slice(0, 2).map((fund, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200 rounded-full text-xs">
                              <DollarSign className="w-3 h-3 mr-1" />
                              ${fund.amount}
                            </Badge>
                          ))}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="rounded-full text-blue-600 hover:bg-blue-50 text-xs p-2">
                          <ArrowRight className="w-3 h-3" />
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
    </div>
  );
}