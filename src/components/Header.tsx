
import { useState } from "react";
import { LogIn, LogOut, User, MessageSquare, Settings, Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { LoginDialog } from "./LoginDialog";

interface HeaderProps {
  isLoggedIn: boolean;
  currentUser: any;
  onLogin: (userData: any) => void;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header = ({ isLoggedIn, currentUser, onLogin, onLogout, currentView, onViewChange }: HeaderProps) => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = (email: string, password: string) => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: email,
      avatar: "",
      skillsOffered: ["React", "JavaScript", "Node.js"],
      skillsWanted: ["Python", "Data Science"],
      rating: 4.5,
      verified: true,
      isAdmin: email === "admin@skillswap.com"
    };
    onLogin(mockUser);
    setShowLoginDialog(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onViewChange("home")}
            >
              <div className="relative">
                <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="absolute inset-0 gradient-primary rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-200"></div>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-bold text-gradient">SkillSwap</span>
                <div className="text-xs text-muted-foreground font-medium">Exchange • Learn • Grow</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Discover", view: "home" },
                { label: "How It Works", view: "how-it-works" },
                { label: "Success Stories", view: "stories" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => onViewChange(item.view)}
                  className={`text-base font-medium transition-all duration-200 hover:text-primary relative group ${
                    currentView === item.view ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-primary group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewChange("swaps")}
                    className="relative hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-primary/10 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Swaps</span>
                    <Badge className="bg-red-500 text-white text-xs px-2 py-1 -mr-2">3</Badge>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="relative p-2 hover:bg-primary/10 transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      2
                    </Badge>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 hover:scale-105 transition-transform">
                        <div className="absolute inset-0 gradient-primary rounded-full opacity-0 hover:opacity-20 transition-opacity"></div>
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                          <AvatarFallback className="gradient-secondary text-primary font-bold">
                            {currentUser?.name?.split(" ").map(n => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 mr-4 glass-morphism border-2 border-white/10" align="end" forceMount>
                      <div className="flex items-center justify-start gap-3 p-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                          <AvatarFallback className="gradient-secondary text-primary font-bold">
                            {currentUser?.name?.split(" ").map(n => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-semibold text-base">{currentUser?.name}</p>
                          <p className="w-[180px] truncate text-sm text-muted-foreground">
                            {currentUser?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewChange("profile")} className="py-3 px-4 cursor-pointer">
                        <User className="mr-3 h-4 w-4" />
                        <span className="font-medium">My Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewChange("swaps")} className="py-3 px-4 cursor-pointer">
                        <MessageSquare className="mr-3 h-4 w-4" />
                        <span className="font-medium">My Swaps</span>
                      </DropdownMenuItem>
                      {currentUser?.isAdmin && (
                        <DropdownMenuItem onClick={() => onViewChange("admin")} className="py-3 px-4 cursor-pointer">
                          <Settings className="mr-3 h-4 w-4" />
                          <span className="font-medium">Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout} className="py-3 px-4 cursor-pointer text-destructive">
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button 
                  onClick={() => setShowLoginDialog(true)} 
                  className="gradient-primary hover:scale-105 transition-all duration-200 glow-secondary px-6 py-3 font-semibold"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-6 border-t border-border/50">
              <nav className="space-y-4">
                {[
                  { label: "Discover", view: "home" },
                  { label: "How It Works", view: "how-it-works" },
                  { label: "Success Stories", view: "stories" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      onViewChange(item.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                      currentView === item.view ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </>
  );
};
