
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Award, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  isLoggedIn: boolean;
}

export const HeroSection = ({ isLoggedIn }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 gradient-primary opacity-20 rounded-full blur-3xl floating-animation"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center space-y-8">
          {/* Hero badge */}
          <div className="slide-up-fade">
            <Badge variant="secondary" className="px-6 py-3 text-base font-medium gradient-secondary border-0 hover:scale-105 transition-transform duration-200">
              <Sparkles className="h-5 w-5 mr-2 text-primary" />
              Welcome to the Future of Skill Exchange
            </Badge>
          </div>
          
          {/* Main headline */}
          <div className="space-y-6 slide-up-fade stagger-1">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="text-gradient">Exchange Skills,</span>
              <br />
              <span className="text-foreground">Build Dreams</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with talented professionals worldwide. Share your expertise, 
              learn new skills, and build meaningful relationships through our 
              revolutionary skill-swapping platform.
            </p>
          </div>
          
          {/* CTA buttons */}
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 slide-up-fade stagger-2">
              <Button 
                size="lg" 
                className="gradient-primary hover:scale-105 transition-all duration-200 glow-primary px-10 py-6 text-xl font-semibold group"
              >
                Get Started Free
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-10 py-6 text-xl font-semibold border-2 glass-morphism hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
              >
                Watch Demo
              </Button>
            </div>
          )}
          
          {/* Social proof */}
          <div className="pt-16 slide-up-fade stagger-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">10,000+ Active Members</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium">95% Success Rate</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">500+ Skills Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
