
// dataStore.ts - Your TypeScript data store
import { User, Project, Contribution, DataSchema, CreateUserInput, CreateProjectInput, CreateContributionInput, CreateUpdateInput, CreatorDashboard } from './types';

class DataStore {
    private data: DataSchema;
    
    constructor() {
      this.data = {
        users: [
          {
            id: "user_001",
            email: "john@example.com",
            name: "John Smith",
            avatar_url: "https://example.com/avatars/john.jpg",
            created_at: "2024-01-15T10:30:00Z",
            updated_at: "2024-08-10T14:22:00Z"
          },
          {
            id: "user_002",
            email: "sarah@example.com",
            name: "Sarah Johnson",
            avatar_url: "https://example.com/avatars/sarah.jpg",
            created_at: "2024-02-20T15:45:00Z",
            updated_at: "2024-08-12T09:30:00Z"
          }
        ],
        
        projects: [
          {
            id: "project_001",
            creator_id: "user_001",
            title: "My Food Truck Dream",
            description: "Starting a sustainable street food business focused on locally sourced ingredients and eco-friendly packaging.",
            goals: [
              "Purchase and customize a food truck",
              "Obtain necessary permits and licenses",
              "Build initial inventory and equipment",
              "Launch in downtown area by spring 2025"
            ],
            why_funding_helpful: "Your support will help me cover the initial startup costs including the truck down payment, commercial kitchen equipment, and the first month of ingredients.",
            funding_goal: 25000,
            current_funding: 8750,
            currency: "USD",
            status: "active",
            created_at: "2024-07-01T09:00:00Z",
            updated_at: "2024-08-15T16:45:00Z",
            slug: "johns-food-truck-dream",
            cover_image_url: "https://example.com/projects/food-truck-cover.jpg",
            category: "business",
            visibility: "public"
          }
        ],
        
        contributions: [
          {
            id: "contribution_001",
            project_id: "project_001",
            supporter_id: "user_002",
            amount: 250,
            currency: "USD",
            message: "So excited to support your dream! Can't wait to try your tacos!",
            is_anonymous: false,
            status: "completed",
            created_at: "2024-08-01T11:15:00Z"
          }
        ],
        
        updates: [
          {
            id: "update_001",
            project_id: "project_001",
            creator_id: "user_001",
            title: "Found the Perfect Truck!",
            content: "Amazing news everyone! I found a 2019 Ford Transit that's been converted into a food truck.",
            images: ["https://example.com/updates/truck-exterior.jpg"],
            is_milestone: true,
            created_at: "2024-08-10T13:30:00Z",
            updated_at: "2024-08-10T13:30:00Z"
          }
        ],
        
        project_supporters: [
          {
            project_id: "project_001",
            supporter_id: "user_002",
            total_contributed: 250,
            first_contribution_date: "2024-08-01T11:15:00Z",
            last_contribution_date: "2024-08-01T11:15:00Z",
            contribution_count: 1,
            is_following: true
          }
        ],
        
        categories: [
          { id: "business", name: "Business & Entrepreneurship", description: "Start your own business or expand an existing one" },
          { id: "creative", name: "Creative Projects", description: "Art, music, writing, and other creative endeavors" },
          { id: "education", name: "Education & Learning", description: "Courses, certifications, and educational pursuits" },
          { id: "personal", name: "Personal Goals", description: "Personal development and life goals" }
        ]
      };
    }

    // Export data as JSON string for localStorage persistence
    exportData(): string {
      return JSON.stringify(this.data);
    }

    // Load data from parsed JSON object
    loadData(data: DataSchema): void {
      this.data = data;
    }

    // Find project by slug
    getProjectBySlug(slug: string): Project | undefined {
      return this.data.projects.find(project => project.slug === slug);
    }

    // Find user by ID
    getUserById(id: string): User | undefined {
      return this.data.users.find(user => user.id === id);
    }

    // Generate creator dashboard data
    getCreatorDashboard(userId: string): CreatorDashboard {
      const userProjects = this.data.projects.filter(project => project.creator_id === userId);
      
      const dashboardProjects = userProjects.map(project => {
        const projectContributions = this.data.contributions.filter(
          contribution => contribution.project_id === project.id && contribution.status === 'completed'
        );
        
        const supporters = new Set(projectContributions.map(c => c.supporter_id)).size;
        const contributionsCount = projectContributions.length;
        
        const recentUpdates = this.data.updates
          .filter(update => update.project_id === project.id)
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3);

        return {
          ...project,
          contributions: contributionsCount,
          supporters: supporters,
          recent_updates: recentUpdates
        };
      });

      const totalFunding = userProjects.reduce((sum, project) => sum + project.current_funding, 0);
      const allContributions = this.data.contributions.filter(
        contribution => userProjects.some(p => p.id === contribution.project_id) && contribution.status === 'completed'
      );
      const totalSupporters = new Set(allContributions.map(c => c.supporter_id)).size;

      return {
        projects: dashboardProjects,
        total_funding: totalFunding,
        total_supporters: totalSupporters
      };
    }
}


let dataStoreInstance: DataStore;

export function getDataStore(): DataStore {
  if (!dataStoreInstance) {
    dataStoreInstance = new DataStore();
  }
  return dataStoreInstance;
}

export default DataStore;