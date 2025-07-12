
import { Button } from "@/components/ui/button";
import { ChevronRight, Award } from "lucide-react";
import { SkillCard } from "./SkillCard";

interface User {
  id: number;
  name: string;
  location: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  verified: boolean;
  availability: string;
}

interface FeaturedSectionProps {
  featuredUsers: User[];
}

export const FeaturedSection = ({ featuredUsers }: FeaturedSectionProps) => {
  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 slide-up-fade">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 gradient-primary rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gradient">Featured Skill Masters</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Discover our top-rated professionals who excel in their fields and love sharing knowledge
          </p>
        </div>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2 px-6 py-3 text-lg font-semibold border-2 hover:bg-primary/5 hover:border-primary/50 hover:scale-105 transition-all duration-200 group"
        >
          View All Masters
          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredUsers.map((user, index) => (
          <div 
            key={user.id} 
            className="slide-up-fade"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <SkillCard user={user} />
          </div>
        ))}
      </div>
    </section>
  );
};
