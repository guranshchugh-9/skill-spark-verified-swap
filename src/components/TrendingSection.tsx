
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Flame, ArrowUp } from "lucide-react";

export const TrendingSection = () => {
  const trendingSkills = [
    { name: "AI & Machine Learning", count: 2847, growth: "+47%", category: "Tech", hot: true },
    { name: "React Development", count: 1923, growth: "+32%", category: "Frontend" },
    { name: "Digital Marketing", count: 3156, growth: "+28%", category: "Marketing" },
    { name: "UI/UX Design", count: 2234, growth: "+41%", category: "Design", hot: true },
    { name: "Data Analysis", count: 1876, growth: "+35%", category: "Analytics" },
    { name: "Content Creation", count: 2567, growth: "+29%", category: "Creative" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 slide-up-fade">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 gradient-primary rounded-lg pulse-glow">
            <Flame className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gradient">Trending Skills</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay ahead of the curve with the most in-demand skills in our community
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingSkills.map((skill, index) => (
          <Card 
            key={skill.name} 
            className="group relative overflow-hidden glass-morphism border-2 border-white/10 hover:border-primary/20 transition-all duration-300 hover:scale-105 cursor-pointer slide-up-fade"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            {skill.hot && (
              <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-600 rounded-full text-xs font-medium">
                <Flame className="h-3 w-3" />
                Hot
              </div>
            )}
            
            <CardContent className="p-6 relative">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {skill.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-sm font-medium">
                  <ArrowUp className="h-3 w-3" />
                  {skill.growth}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{skill.count.toLocaleString()} users</span>
                </div>
                
                <div className="text-sm font-medium text-primary group-hover:underline">
                  Explore →
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
