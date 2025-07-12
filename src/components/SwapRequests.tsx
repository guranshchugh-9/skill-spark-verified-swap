
import { useState } from "react";
import { ArrowLeft, Clock, Check, X, Star, MessageSquare, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SwapRequestsProps {
  onBack: () => void;
}

export const SwapRequests = ({ onBack }: SwapRequestsProps) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "incoming",
      user: { name: "Sarah Chen", avatar: "", rating: 4.9 },
      skillOffered: "Photoshop",
      skillWanted: "React",
      message: "Hi! I'd love to learn React from you. I can teach advanced Photoshop techniques including photo manipulation and design principles.",
      status: "pending",
      createdAt: "2 hours ago"
    },
    {
      id: 2,
      type: "outgoing",
      user: { name: "Mike Johnson", avatar: "", rating: 4.7 },
      skillOffered: "Excel",
      skillWanted: "JavaScript",
      message: "Hello! I'm interested in improving my JavaScript skills. I can help you with advanced Excel formulas and data analysis.",
      status: "pending",
      createdAt: "1 day ago"
    },
    {
      id: 3,
      type: "incoming",
      user: { name: "Emma Davis", avatar: "", rating: 4.8 },
      skillOffered: "Spanish",
      skillWanted: "Web Design",
      message: "¡Hola! I'm a native Spanish speaker and would love to learn web design. I can help you become conversational in Spanish.",
      status: "accepted",
      createdAt: "3 days ago"
    },
    {
      id: 4,
      type: "outgoing",
      user: { name: "Alex Rivera", avatar: "", rating: 4.6 },
      skillOffered: "Python",
      skillWanted: "Node.js",
      message: "Hey! I'd like to learn Node.js from you. I can teach Python programming from basics to advanced topics.",
      status: "rejected",
      createdAt: "5 days ago"
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleAccept = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: "accepted" } : req
    ));
  };

  const handleReject = (requestId: number) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: "rejected" } : req
    ));
  };

  const handleDelete = (requestId: number) => {
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "accepted": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "accepted": return <Check className="h-4 w-4" />;
      case "rejected": return <X className="h-4 w-4" />;
      default: return null;
    }
  };

  const incomingRequests = requests.filter(req => req.type === "incoming");
  const outgoingRequests = requests.filter(req => req.type === "outgoing");

  const RequestCard = ({ request }: { request: any }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={request.user.avatar} alt={request.user.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {request.user.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">{request.user.name}</h3>
              <Badge className={getStatusColor(request.status)}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(request.status)}
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </Badge>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1">{request.user.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">{request.createdAt}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-sm text-gray-600">
                  {request.type === "incoming" ? "Offers:" : "You offered:"}
                </span>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 ml-2">
                  {request.skillOffered}
                </Badge>
              </div>
              <div>
                <span className="text-sm text-gray-600">
                  {request.type === "incoming" ? "Wants:" : "You want:"}
                </span>
                <Badge variant="outline" className="ml-2">
                  {request.skillWanted}
                </Badge>
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-4">{request.message}</p>
            
            <div className="flex gap-2">
              {request.type === "incoming" && request.status === "pending" && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => handleAccept(request.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReject(request.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </>
              )}
              
              {request.type === "outgoing" && request.status === "pending" && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleDelete(request.id)}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Cancel Request
                </Button>
              )}
              
              {request.status === "accepted" && (
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Start Chat
                </Button>
              )}
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <User className="h-4 w-4 mr-1" />
                    View Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{request.user.name}'s Profile</DialogTitle>
                  </DialogHeader>
                  <div className="text-center py-4">
                    <p className="text-gray-600">Profile details would be shown here</p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Swap Requests</h1>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            Incoming Requests
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {incomingRequests.filter(req => req.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            My Requests
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {outgoingRequests.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incoming" className="space-y-6">
          {incomingRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No incoming requests</h3>
                <p className="text-gray-600">When someone wants to swap skills with you, their requests will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            incomingRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-6">
          {outgoingRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No outgoing requests</h3>
                <p className="text-gray-600">Start browsing skills and send swap requests to get started!</p>
                <Button className="mt-4" onClick={onBack}>
                  Browse Skills
                </Button>
              </CardContent>
            </Card>
          ) : (
            outgoingRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
