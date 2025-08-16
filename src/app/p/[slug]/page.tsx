"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProject } from '@/hooks/useDataStore';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export default function ProjectBySlugPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : (params?.slug as string);
  const { project, creator } = useProject(slug);

  if (!slug) return null;

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600">Project not found</p>
        <Button onClick={() => router.push('/')} className="mt-4 rounded-full">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  // Minimal detail view for now, can replace with richer UI later
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={() => router.push('/')} variant="ghost" className="rounded-full text-gray-600 hover:bg-gray-100">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Projects
      </Button>
      <h1 className="text-3xl text-gray-900">{project.title}</h1>
      <p className="text-gray-700">{project.description}</p>
      <div className="text-sm text-gray-600">
        <div>Creator: {creator?.name || 'Unknown'}</div>
        <div>Category: {project.category}</div>
        <div>Status: {project.status}</div>
        <div>
          Raised: {project.currency === 'USD' ? '$' : ''}{project.current_funding} / {project.currency === 'USD' ? '$' : ''}{project.funding_goal}
        </div>
      </div>
    </div>
  );
}


