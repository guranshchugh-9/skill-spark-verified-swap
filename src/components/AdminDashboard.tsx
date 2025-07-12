
import { useState } from "react";
import { ArrowLeft, Users, MessageSquare, Shield, AlertTriangle, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AdminDashboardProps {
  onBack: () => void;
}

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 1,
      user: { name: "Sarah Chen", avatar: "", email: "sarah@example.com" },
      skill: "Photoshop",
      evidence: "Portfolio website link and Adobe certification",
      submittedAt: "2 hours ago"
    },
    {
      id: 2,
      user: { name: "Mike Johnson", avatar: "", email: "mike@example.com" },
      skill: "Data Analysis",
      evidence: "Google Analytics certification and work samples",
      submittedAt: "1 day ago"
    }
  ]);

  const [reportedUsers, setReportedUsers] = useState([
    {
      id: 1,
      reportedUser: { name: "Spam User", avatar: "", email: "spam@example.com" },
      reportedBy: { name: "John Doe", avatar: "" },
      reason: "Spam and inappropriate content",
      details: "This user has been sending inappropriate messages and posting spam content.",
      reportedAt: "3 hours ago",
      status: "pending"
    }
  ]);

  const [platformMessage, setPlatformMessage] = useState("");

  const handleApproveVerification = (id: number) => {
    setPendingVerifications(prev => prev.filter(item => item.id !== id));
    // In real app, this would update the user's verification status
  };

  const handleRejectVerification = (id: number) => {
    setPendingVerifications(prev => prev.filter(item => item.id !== id));
  };

  const handleBanUser = (id: number) => {
    setReportedUsers(prev => prev.map(report => 
      report.id === id ? { ...report, status: "banned" } : report
    ));
  };

  const handleDismissReport = (id: number) => {
    setReportedUsers(prev => prev.map(report => 
      report.id === id ? { ...report, status: "dismissed" } : report
    ));
  };

  const handleSendPlatformMessage = () => {
    if (platformMessage.trim()) {
      // In real app, this would send message to all users
      alert("Platform message sent to all users!");
      setPlatformMessage("");
    }
  };

  const stats = {
    totalUsers: 2547,
    activeSwaps: 156,
    pendingReports: reportedUsers.filter(r => r.status === "pending").length,
    pendingVerifications: pendingVerifications.length
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.activeSwaps}</p>
                <p className="text-gray-600">Active Swaps</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.pendingReports}</p>
                <p className="text-gray-600">Pending Reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
                <p className="text-gray-600">Pending Verifications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="verifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="verifications" className="flex items-center gap-2">
            Skill Verifications
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {pendingVerifications.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            User Reports
            <Badge variant="secondary" className="bg-red-100 text-red-700">
              {stats.pendingReports}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="messaging">
            Platform Messaging
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verifications" className="space-y-6">
          {pendingVerifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending verifications</h3>
                <p className="text-gray-600">All skill verification requests have been processed.</p>
              </CardContent>
            </Card>
          ) : (
            pendingVerifications.map(verification => (
              <Card key={verification.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={verification.user.avatar} alt={verification.user.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {verification.user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{verification.user.name}</h3>
                        <span className="text-sm text-gray-600">{verification.submittedAt}</span>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{verification.user.email}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium text-gray-700">Skill to verify:</span>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                            {verification.skill}
                          </Badge>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Evidence:</strong> {verification.evidence}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveVerification(verification.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRejectVerification(verification.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Evidence
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Verification Evidence</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p className="text-gray-600">Detailed evidence review would be shown here, including uploaded files, certificates, and portfolio links.</p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          {reportedUsers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No pending reports</h3>
                <p className="text-gray-600">All user reports have been reviewed and processed.</p>
              </CardContent>
            </Card>
          ) : (
            reportedUsers.map(report => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={report.reportedUser.avatar} alt={report.reportedUser.name} />
                      <AvatarFallback className="bg-red-100 text-red-600">
                        {report.reportedUser.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{report.reportedUser.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              report.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                              report.status === "banned" ? "bg-red-100 text-red-700" :
                              "bg-green-100 text-green-700"
                            }
                          >
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-600">{report.reportedAt}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2">{report.reportedUser.email}</p>
                      <p className="text-gray-600 text-sm mb-3">Reported by: {report.reportedBy.name}</p>
                      
                      <div className="mb-4">
                        <div className="bg-red-50 p-3 rounded-lg mb-2">
                          <p className="text-sm font-medium text-red-800 mb-1">Reason: {report.reason}</p>
                          <p className="text-sm text-red-700">{report.details}</p>
                        </div>
                      </div>
                      
                      {report.status === "pending" && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleBanUser(report.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Ban User
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDismissReport(report.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Dismiss Report
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="messaging">
          <Card>
            <CardHeader>
              <CardTitle>Send Platform-wide Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="message">Message Content</Label>
                <Textarea
                  id="message"
                  placeholder="Type your platform-wide message here..."
                  value={platformMessage}
                  onChange={(e) => setPlatformMessage(e.target.value)}
                  rows={4}
                />
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={handleSendPlatformMessage}
                  disabled={!platformMessage.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Send to All Users
                </Button>
                <span className="text-sm text-gray-600">
                  This will send a notification to all {stats.totalUsers} users
                </span>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Use cases:</strong> Feature updates, maintenance announcements, 
                  policy changes, or important platform news.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
