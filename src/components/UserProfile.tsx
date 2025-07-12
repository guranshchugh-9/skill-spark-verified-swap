
import { useState } from "react";
import { ArrowLeft, Star, MapPin, Award, Camera, Plus, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserProfileProps {
  user: any;
  onBack: () => void;
}

export const UserProfile = ({ user, onBack }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    location: "San Francisco, CA",
    bio: "Passionate about design and technology. Love sharing knowledge and learning new skills.",
    skillsOffered: ["React", "JavaScript", "Node.js", "UI/UX Design"],
    skillsWanted: ["Python", "Data Science", "Machine Learning"],
    availability: "Weekends",
    isPublic: true,
    experience: "5+ years in web development"
  });
  
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setProfileData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setProfileData(prev => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()]
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
    }));
  };

  const removeSkillWanted = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log("Saving profile data:", profileData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <div className="ml-auto">
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="h-32 w-32 mx-auto">
                    <AvatarImage src={user?.avatar} alt={profileData.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-3xl font-semibold">
                      {profileData.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                  {user?.verified && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full p-2">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                
                {isEditing ? (
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <h2 className="text-2xl font-bold text-gray-900">{profileData.name}</h2>
                    <div className="flex items-center justify-center text-gray-500 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {profileData.location}
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">4.8</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Verified
                      </Badge>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                    />
                  ) : (
                    <p className="text-gray-600 mt-1">{profileData.bio}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  {isEditing ? (
                    <Select 
                      value={profileData.availability} 
                      onValueChange={(value) => setProfileData(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Weekends">Weekends</SelectItem>
                        <SelectItem value="Evenings">Evenings</SelectItem>
                        <SelectItem value="Flexible">Flexible</SelectItem>
                        <SelectItem value="Weekdays">Weekdays</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-600 mt-1">{profileData.availability}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <Switch
                    id="public-profile"
                    checked={profileData.isPublic}
                    onCheckedChange={(checked) => setProfileData(prev => ({ ...prev, isPublic: checked }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Skills */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Offered */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Skills I Offer
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {profileData.skillsOffered.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skillsOffered.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 flex items-center gap-1">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkillOffered(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you offer"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                  />
                  <Button onClick={addSkillOffered} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Wanted */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Skills I Want to Learn
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {profileData.skillsWanted.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skillsWanted.map((skill, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkillWanted(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill you want to learn"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                  />
                  <Button onClick={addSkillWanted} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>My Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Swaps Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4.8</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">28</div>
                  <div className="text-sm text-gray-600">Skills Taught</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">15</div>
                  <div className="text-sm text-gray-600">Skills Learned</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
