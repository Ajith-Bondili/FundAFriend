import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { Badge } from './ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Separator } from './ui/Separator';
import { PlusCircle, DollarSign, Users, TrendingUp, Camera, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NewProjectModal } from './ui/NewProjectModal';
import { ProjectFormData } from '@/types';

interface CreatorDashboardProps {
  onViewUpdate: (updateId: string) => void;
}

// Mock data
const projectStats = {
  totalRaised: 450,
  totalSupporters: 12,
  updatesPosted: 3,
  avgDonation: 37.50
};

const recentDonations = [
  { id: '1', supporter: 'Sarah M.', amount: 25, date: '2025-08-15', message: 'Great progress on the drone!' },
  { id: '2', supporter: 'Mike T.', amount: 50, date: '2025-08-14', message: 'Keep up the awesome work!' },
  { id: '3', supporter: 'Lisa K.', amount: 30, date: '2025-08-13', message: 'Can\'t wait to see it fly!' },
  { id: '4', supporter: 'David R.', amount: 45, date: '2025-08-12', message: 'This looks amazing!' },
  { id: '5', supporter: 'Emma W.', amount: 20, date: '2025-08-11', message: 'Rooting for you!' }
];

const chartData = [
  { name: 'Week 1', donations: 120 },
  { name: 'Week 2', donations: 180 },
  { name: 'Week 3', donations: 150 },
  { name: 'Week 4', donations: 0 }
];

export function CreatorDashboard({ onViewUpdate }: CreatorDashboardProps) {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newUpdate, setNewUpdate] = useState({
    title: '',
    content: '',
    fundsUsed: ''
  });

  const handleCreateProject = (projectData: ProjectFormData) => {
    console.log('Creating project:', projectData);
    // In real app, this would save to backend
    setIsNewProjectModalOpen(false);
  };

  const handlePostUpdate = () => {
    // In real app, this would save to backend
    console.log('Posting update:', newUpdate);
    setNewUpdate({ title: '', content: '', fundsUsed: '' });
  };

  return (
    <>
        <NewProjectModal
            isOpen={isNewProjectModalOpen}
            onClose={() => setIsNewProjectModalOpen(false)}
            onSubmit={handleCreateProject}
        />
        <div className="max-w-6xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl text-gray-900 mb-2">Creator Dashboard</h1>
            <p className="text-gray-600">Manage your projects and keep supporters updated</p>
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full shadow-lg" onClick={() => setIsNewProjectModalOpen(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            New Project
            </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
            <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-500 rounded-xl">
                    <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-sm text-green-700">Total Raised</p>
                    <p className="text-2xl text-green-900">${projectStats.totalRaised}</p>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
            <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-500 rounded-xl">
                    <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-sm text-blue-700">Supporters</p>
                    <p className="text-2xl text-blue-900">{projectStats.totalSupporters}</p>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
            <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                <div className="p-3 bg-yellow-500 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-sm text-yellow-700">Avg Donation</p>
                    <p className="text-2xl text-yellow-900">${projectStats.avgDonation}</p>
                </div>
                </div>
            </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
            <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-500 rounded-xl">
                    <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-sm text-purple-700">Updates Posted</p>
                    <p className="text-2xl text-purple-900">{projectStats.updatesPosted}</p>
                </div>
                </div>
            </CardContent>
            </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-sm rounded-full">
            <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
            <TabsTrigger value="supporters" className="rounded-full">Supporters</TabsTrigger>
            <TabsTrigger value="post-update" className="rounded-full">Post Update</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
            {/* Funding Chart */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-xl">
                <CardHeader>
                <CardTitle>Funding Over Time</CardTitle>
                <CardDescription>Weekly donation trends for your project</CardDescription>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                        contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        border: 'none', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }} 
                    />
                    <Bar dataKey="donations" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.7}/>
                        </linearGradient>
                    </defs>
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="supporters" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-xl">
                <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Latest support from your community</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                {recentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-100">
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-400 to-green-400 text-white">
                            {donation.supporter.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                        </Avatar>
                        <div>
                        <p className="text-gray-900">{donation.supporter}</p>
                        <p className="text-sm text-gray-600">{donation.message}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-lg text-green-600">${donation.amount}</p>
                        <p className="text-sm text-gray-500">{donation.date}</p>
                    </div>
                    </div>
                ))}
                </CardContent>
            </Card>
            </TabsContent>

            <TabsContent value="post-update" className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm rounded-xl">
                <CardHeader>
                <CardTitle>Post New Update</CardTitle>
                <CardDescription>Keep your supporters informed about your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="update-title">Update Title</Label>
                    <Input
                    id="update-title"
                    placeholder="What's the latest progress?"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                    className="rounded-xl border-gray-200 bg-white/80"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="update-content">Update Content</Label>
                    <Textarea
                    id="update-content"
                    placeholder="Share details about your progress, challenges, or next steps..."
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate({ ...newUpdate, content: e.target.value })}
                    className="rounded-xl border-gray-200 bg-white/80 min-h-[120px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="funds-used">What did the money go toward?</Label>
                    <Input
                    id="funds-used"
                    placeholder="e.g., Drone parts $85, Shipping $12"
                    value={newUpdate.fundsUsed}
                    onChange={(e) => setNewUpdate({ ...newUpdate, fundsUsed: e.target.value })}
                    className="rounded-xl border-gray-200 bg-white/80"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="rounded-full border-gray-200">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo
                    </Button>
                    
                    <Button 
                    onClick={handlePostUpdate}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full px-8 shadow-lg"
                    >
                    <Send className="w-4 h-4 mr-2" />
                    Post Update
                    </Button>
                </div>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
        </div>
    </>
  );
}