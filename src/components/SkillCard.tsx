
import { Star, MapPin, Award, MessageSquare, Eye, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface SkillCardProps {
  user: User;
}

export const SkillCard = ({ user }: SkillCardProps) => {
  return (
    <Card className="group relative overflow-hidden glass-morphism border-2 border-white/10 hover:border-primary/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-secondary"></div>
      
      <CardContent className="p-8 relative">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
            <Avatar className="h-20 w-20 border-4 border-white/10 relative z-10">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="gradient-secondary text-primary text-2xl font-bold">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {user.verified && (
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full p-2 border-4 border-background">
                <Award className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-foreground truncate group-hover:text-gradient transition-colors duration-300">
                {user.name}
              </h3>
              {user.verified && (
                <Badge className="gradient-primary text-white border-0 px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            {user.location && (
              <div className="flex items-center text-muted-foreground text-base mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                {user.location}
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold ml-2">{user.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-base text-muted-foreground font-medium">{user.availability}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 gradient-primary rounded-full"></div>
              Skills Offered
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.slice(0, 3).map((skill) => (
                <Badge key={skill} className="gradient-secondary text-primary border-0 px-3 py-1 text-sm font-medium">
                  {skill}
                </Badge>
              ))}
              {user.skillsOffered.length > 3 && (
                <Badge variant="outline" className="border-primary/30 text-primary px-3 py-1 text-sm">
                  +{user.skillsOffered.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              Looking to Learn
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.skillsWanted.slice(0, 2).map((skill) => (
                <Badge key={skill} variant="outline" className="border-muted-foreground/30 text-muted-foreground px-3 py-1 text-sm hover:border-primary/50 hover:text-primary transition-colors">
                  {skill}
                </Badge>
              ))}
              {user.skillsWanted.length > 2 && (
                <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground px-3 py-1 text-sm">
                  +{user.skillsWanted.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 gradient-primary hover:scale-105 transition-all duration-200 font-semibold py-6 text-base group/btn"
          >
            <MessageSquare className="h-5 w-5 mr-2 group-hover/btn:rotate-12 transition-transform" />
            Start Swap
          </Button>
          <Button 
            variant="outline" 
            className="px-6 py-6 border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200 group/btn"
          >
            <Eye className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
