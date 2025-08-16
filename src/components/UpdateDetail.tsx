import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Badge } from './ui/Badge';
import { Separator } from './ui/Separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowLeft, Calendar, DollarSign, Heart, MessageCircle, Share } from 'lucide-react';

interface UpdateDetailProps {
  updateId: string | null;
  onBack: () => void;
}

// Mock update data
const updateDetails = {
  '1': {
    id: '1',
    project: 'Building My First Drone',
    creator: {
      name: 'Jamie Rodriguez',
      avatar: '/api/placeholder/48/48',
      bio: 'Robotics student & maker'
    },
    title: 'Just ordered the flight controller!',
    content: `Hey everyone! 🎉

Thanks to your incredible support, I was able to order the main flight controller board for the drone! This is basically the brain of the entire aircraft - it's what will handle all the stabilization, GPS navigation, and communication with the remote control.

I spent a lot of time researching different options and finally settled on the Pixhawk 4 mini. It's compact, reliable, and has all the features I need for this build. The shipping was a bit more than expected, but it should arrive by the end of the week.

Next steps:
1. Install the flight controller once it arrives
2. Configure the software settings
3. Start wiring up the motors and ESCs
4. Begin initial ground testing

I'm getting so excited to see this thing take shape! The frame looks amazing with all the components starting to come together. 

Thank you all again for making this possible. Your support means the world to me! ❤️`,
    date: '2025-08-15',
    image: '/api/placeholder/600/400',
    fundsUsed: [
      { item: 'Pixhawk 4 Mini Flight Controller', amount: 85, description: 'Main brain of the drone with GPS and stabilization' },
      { item: 'Express Shipping', amount: 12, description: 'To get the parts faster for the build' }
    ],
    likes: 8,
    comments: 3
  },
  '4': {
    id: '4',
    project: 'Community Garden App',
    creator: {
      name: 'Maria Santos',
      avatar: '/api/placeholder/48/48',
      bio: 'UX Designer & gardening enthusiast'
    },
    title: 'App design mockups ready',
    content: `Hello garden friends! 🌱

I'm thrilled to share the initial design mockups for our community garden app! After weeks of research and user interviews, I've created a clean, intuitive interface that will make garden management a breeze.

Key features in the design:
- Plant tracking with growth photos
- Community sharing and tips
- Harvest logging and recipes
- Weather integration
- Task reminders for watering/fertilizing

The design follows accessibility best practices and has been tested with gardeners of all tech comfort levels. The feedback has been overwhelmingly positive!

Your contribution helped me upgrade to the professional design software subscription, which gave me access to better collaboration tools and design systems. This made the whole process so much smoother.

Next up: Start building the actual app! I'm planning to use React Native so it works on both iPhone and Android.`,
    date: '2025-08-14',
    image: '/api/placeholder/600/400',
    fundsUsed: [
      { item: 'Figma Professional Subscription', amount: 25, description: 'Design software for creating mockups and prototypes' }
    ],
    likes: 12,
    comments: 5
  }
};

export function UpdateDetail({ updateId, onBack }: UpdateDetailProps) {
  if (!updateId || !updateDetails[updateId as keyof typeof updateDetails]) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Update not found</p>
        <Button onClick={onBack} className="mt-4 rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const update = updateDetails[updateId as keyof typeof updateDetails];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Button 
        onClick={onBack} 
        variant="ghost" 
        className="rounded-full text-gray-600 hover:bg-gray-100"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Update Header */}
      <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
              <AvatarImage src={update.creator.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white">
                {update.creator.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full">
                  {update.project}
                </Badge>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 rounded-full">
                  <Calendar className="w-3 h-3 mr-1" />
                  {update.date}
                </Badge>
              </div>
              <p className="text-gray-600 mb-1">by {update.creator.name}</p>
              <p className="text-sm text-gray-500">{update.creator.bio}</p>
            </div>
          </div>
          
          <CardTitle className="text-2xl text-gray-900 mb-2">{update.title}</CardTitle>
        </CardHeader>
      </Card>

      {/* Update Content */}
      <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl">
        <CardContent className="p-8 space-y-6">
          {/* Update Image */}
          {update.image && (
            <div className="rounded-xl overflow-hidden border-4 border-white shadow-lg">
              <ImageWithFallback 
                src={update.image} 
                alt={update.title}
                className="w-full h-80 object-cover"
              />
            </div>
          )}

          {/* Update Text */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {update.content}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Funds Used */}
          <div className="space-y-4">
            <h3 className="text-lg text-gray-900">How Your Support Was Used</h3>
            <div className="space-y-3">
              {update.fundsUsed.map((fund, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-gray-900">{fund.item}</span>
                    </div>
                    <p className="text-sm text-gray-600">{fund.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg text-green-600">${fund.amount}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total funds used:</span>
              <span className="text-xl text-green-600">
                ${update.fundsUsed.reduce((sum, fund) => sum + fund.amount, 0)}
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Engagement */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button variant="ghost" className="rounded-full text-red-500 hover:bg-red-50">
                <Heart className="w-4 h-4 mr-2" />
                {update.likes} likes
              </Button>
              <Button variant="ghost" className="rounded-full text-blue-500 hover:bg-blue-50">
                <MessageCircle className="w-4 h-4 mr-2" />
                {update.comments} comments
              </Button>
            </div>
            
            <Button variant="outline" className="rounded-full border-gray-200">
              <Share className="w-4 h-4 mr-2" />
              Share Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comments Section (Placeholder) */}
      <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-2xl">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Join the conversation about this update</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Comments feature coming soon!</p>
            <p className="text-sm">Supporters will be able to leave encouragement and questions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}