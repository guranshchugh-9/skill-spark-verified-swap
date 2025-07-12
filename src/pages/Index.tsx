
import { useState } from "react";
import { Search, Star, MapPin, Award, Users, TrendingUp, Shield, ChevronRight, Sparkles, Zap, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { SkillCard } from "@/components/SkillCard";
import { UserProfile } from "@/components/UserProfile";
import { SwapRequests } from "@/components/SwapRequests";
import { AdminDashboard } from "@/components/AdminDashboard";
import { HeroSection } from "@/components/HeroSection";
import { StatsSection } from "@/components/StatsSection";
import { FeaturedSection } from "@/components/FeaturedSection";
import { TrendingSection } from "@/components/TrendingSection";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for featured users
  const featuredUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      location: "San Francisco, CA",
      avatar: "/lovable-uploads/69a3918b-e481-4f64-a288-1d7830f60de4.png",
      skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
      skillsWanted: ["React", "Node.js"],
      rating: 4.9,
      verified: true,
      availability: "Weekends"
    },
    {
      id: 2,
      name: "Mike Johnson",
      location: "New York, NY",
      avatar: "",
      skillsOffered: ["Excel", "Data Analysis", "Python"],
      skillsWanted: ["Photography", "Video Editing"],
      rating: 4.7,
      verified: true,
      availability: "Evenings"
    },
    {
      id: 3,
      name: "Emma Davis",
      location: "Austin, TX",
      avatar: "",
      skillsOffered: ["Spanish", "Guitar", "Cooking"],
      skillsWanted: ["Web Design", "Marketing"],
      rating: 4.8,
      verified: false,
      availability: "Flexible"
    }
  ];

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCurrentUser(userData);
    setCurrentView("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView("home");
  };

  const renderContent = () => {
    switch (currentView) {
      case "profile":
        return <UserProfile user={currentUser} onBack={() => setCurrentView("home")} />;
      case "swaps":
        return <SwapRequests onBack={() => setCurrentView("home")} />;
      case "admin":
        return <AdminDashboard onBack={() => setCurrentView("home")} />;
      default:
        return (
          <div className="space-y-24">
            <HeroSection isLoggedIn={isLoggedIn} />
            
            {/* Enhanced Search Section */}
            <section className="max-w-4xl mx-auto px-6">
              <div className="relative group">
                <div className="absolute inset-0 gradient-primary opacity-20 blur-xl rounded-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative glass-morphism rounded-2xl p-8 border-2 border-white/20">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gradient mb-2">Find Your Perfect Skill Match</h2>
                    <p className="text-muted-foreground">Discover talented professionals ready to swap skills</p>
                  </div>
                  
                  <div className="relative max-w-2xl mx-auto">
                    <div className="absolute inset-0 gradient-primary rounded-xl blur-sm opacity-20"></div>
                    <div className="relative bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-2">
                      <div className="flex items-center">
                        <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          placeholder="Search skills like Photoshop, Excel, Guitar, Cooking..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-14 pr-32 h-14 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/70"
                        />
                        <Button 
                          size="lg" 
                          className="absolute right-2 gradient-primary hover:scale-105 transition-all duration-200 glow-secondary"
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <StatsSection />
            <FeaturedSection featuredUsers={featuredUsers} />
            <TrendingSection />

            {/* Enhanced CTA Section */}
            <section className="relative overflow-hidden">
              <div className="absolute inset-0 gradient-primary opacity-10"></div>
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-animation"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '2s'}}></div>
              
              <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
                <div className="space-y-8">
                  <div className="slide-up-fade">
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-medium gradient-secondary border-0">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Join 10,000+ Skill Swappers
                    </Badge>
                  </div>
                  
                  <h2 className="text-5xl font-bold text-gradient slide-up-fade stagger-1">
                    Ready to Unlock Your Potential?
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed slide-up-fade stagger-2">
                    Connect with talented individuals, share your expertise, and learn something amazing. 
                    Your next skill upgrade is just one swap away.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center slide-up-fade stagger-3">
                    {!isLoggedIn && (
                      <>
                        <Button 
                          size="lg" 
                          className="gradient-primary hover:scale-105 transition-all duration-200 glow-primary px-8 py-6 text-lg font-semibold group"
                        >
                          Start Your Journey
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="px-8 py-6 text-lg font-semibold border-2 hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
                        >
                          <Target className="h-5 w-5 mr-2" />
                          Explore Skills
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 slide-up-fade stagger-4">
                    {[
                      { label: "Success Rate", value: "94%" },
                      { label: "Avg Rating", value: "4.9" },
                      { label: "Skills Learned", value: "12K+" },
                      { label: "Happy Users", value: "8.5K+" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
