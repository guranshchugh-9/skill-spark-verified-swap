
import { Star, MapPin, Award, MessageSquare } from "lucide-react";
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
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {user.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <Award className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
              {user.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                  Verified
                </Badge>
              )}
            </div>
            
            {user.location && (
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <MapPin className="h-3 w-3 mr-1" />
                {user.location}
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{user.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{user.availability}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Offered</h4>
            <div className="flex flex-wrap gap-1">
              {user.skillsOffered.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                  {skill}
                </Badge>
              ))}
              {user.skillsOffered.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  +{user.skillsOffered.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Skills Wanted</h4>
            <div className="flex flex-wrap gap-1">
              {user.skillsWanted.slice(0, 2).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {user.skillsWanted.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{user.skillsWanted.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-blue-600 hover:bg-blue-700 group-hover:bg-blue-700 transition-colors"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Request Swap
          </Button>
          <Button size="sm" variant="outline" className="px-3">
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
