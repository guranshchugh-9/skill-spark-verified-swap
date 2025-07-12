
import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Shield, Star, Zap, Award } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "10,247",
      label: "Active Swappers",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Growing community"
    },
    {
      icon: TrendingUp,
      value: "23,891",
      label: "Skills Exchanged",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "This month"
    },
    {
      icon: Shield,
      value: "2,547",
      label: "Verified Experts",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Trusted professionals"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      description: "User satisfaction"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16 slide-up-fade">
        <h2 className="text-4xl font-bold text-gradient mb-4">Trusted by Thousands</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join our thriving community of skill enthusiasts and unlock endless learning opportunities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="group relative overflow-hidden glass-morphism border-2 border-white/10 hover:border-primary/20 transition-all duration-300 hover:scale-105 slide-up-fade"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <CardContent className="p-8 text-center relative">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
