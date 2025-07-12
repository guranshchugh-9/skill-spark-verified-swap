
import { useState } from "react";
import { Search, Star, MapPin, Award, Users, TrendingUp, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { SkillCard } from "@/components/SkillCard";
import { UserProfile } from "@/components/UserProfile";
import { SwapRequests } from "@/components/SwapRequests";
import { AdminDashboard } from "@/components/AdminDashboard";

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

  const trendingSkills = [
    { name: "AI/Machine Learning", count: 127, growth: "+23%" },
    { name: "React Development", count: 89, growth: "+18%" },
    { name: "Digital Marketing", count: 156, growth: "+15%" },
    { name: "Photography", count: 78, growth: "+12%" },
    { name: "Data Analysis", count: 134, growth: "+20%" }
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
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl">
              <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                  Exchange Skills, Build Community
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Connect with skilled professionals, share your expertise, and learn something new. 
                  Join thousands of users already swapping skills.
                </p>
                {!isLoggedIn && (
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Get Started
                    </Button>
                    <Button variant="outline" size="lg">
                      Browse Skills
                    </Button>
                  </div>
                )}
              </div>
            </section>

            {/* Search Section */}
            <section className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search for skills (e.g., Photoshop, Excel, Guitar...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500"
                />
                <Button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700">
                  Search
                </Button>
              </div>
            </section>

            {/* Stats Section */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2,547</div>
                  <div className="text-gray-600">Active Users</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">8,921</div>
                  <div className="text-gray-600">Skills Swapped</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Shield className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">1,234</div>
                  <div className="text-gray-600">Verified Skills</div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-gray-600">Avg Rating</div>
                </CardContent>
              </Card>
            </section>

            {/* Featured Users */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Featured Skill Swappers</h2>
                <Button variant="outline" className="flex items-center gap-2">
                  View All <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredUsers.map((user) => (
                  <SkillCard key={user.id} user={user} />
                ))}
              </div>
            </section>

            {/* Trending Skills */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Trending Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trendingSkills.map((skill, index) => (
                  <Card key={skill.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          {skill.growth}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{skill.count} users offering</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Swapping Skills?</h2>
              <p className="text-xl mb-6 opacity-90">
                Join our community and unlock endless learning opportunities
              </p>
              {!isLoggedIn && (
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                  Sign Up Now
                </Button>
              )}
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
