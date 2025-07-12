
import { useState } from "react";
import { LogIn, LogOut, User, MessageSquare, Settings, Bell } from "lucide-react";
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

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would validate credentials
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
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onViewChange("home")}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SS</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">SkillSwap</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onViewChange("home")}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  currentView === "home" ? "text-blue-600 font-medium" : ""
                }`}
              >
                Browse Skills
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">
                Success Stories
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewChange("swaps")}
                    className="relative"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Swaps
                    <Badge className="ml-2 bg-red-500 text-white text-xs">3</Badge>
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      2
                    </Badge>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                          <AvatarFallback>
                            {currentUser?.name?.split(" ").map(n => n[0]).join("") || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{currentUser?.name}</p>
                          <p className="w-[200px] truncate text-sm text-muted-foreground">
                            {currentUser?.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onViewChange("profile")}>
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewChange("swaps")}>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        My Swaps
                      </DropdownMenuItem>
                      {currentUser?.isAdmin && (
                        <DropdownMenuItem onClick={() => onViewChange("admin")}>
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={onLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button onClick={() => setShowLoginDialog(true)} className="bg-blue-600 hover:bg-blue-700">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}
            </div>
          </div>
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
