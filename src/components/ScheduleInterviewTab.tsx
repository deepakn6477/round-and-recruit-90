import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, Plus } from "lucide-react";

interface Round {
  id: string;
  name: string;
  status: "Completed" | "Scheduled" | "Pending";
  date?: string;
  time?: string;
  interviewer?: string;
  meetingLink?: string;
}

export function ScheduleInterviewTab() {
  const [rounds] = useState<Round[]>([
    {
      id: "1",
      name: "Technical Screening",
      status: "Completed",
      date: "2024-01-16",
      time: "2:00 PM",
      interviewer: "Sarah Johnson",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/..."
    },
    {
      id: "2", 
      name: "Technical Interview",
      status: "Completed",
      date: "2024-01-18",
      time: "3:30 PM",
      interviewer: "Mike Wilson",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/..."
    },
    {
      id: "3",
      name: "System Design",
      status: "Completed", 
      date: "2024-01-20",
      time: "10:00 AM",
      interviewer: "David Smith",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/..."
    },
    {
      id: "4",
      name: "HR Interview",
      status: "Pending",
      interviewer: "Emily Davis"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "Scheduled": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleScheduleInterview = (roundId: string) => {
    // This would integrate with Microsoft Teams calendar
    // For now, we'll simulate the scheduling process
    window.open("https://outlook.live.com/calendar/deeplink/compose", "_blank");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Candidate Details + Quick Actions + Next Interview + Comments */}
      <div className="lg:col-span-1 space-y-6">
        {/* Candidate Details */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-semibold">Sivasankaran S</h3>
            <p className="text-sm text-muted-foreground">Senior Developer</p>
            <Badge className="mt-2 bg-blue-100 text-blue-800">In Progress</Badge>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Overall Fitment</span>
                <span className="font-medium text-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between">
                <span>Rounds Progress</span>
                <span className="font-medium">3/4 rounds</span>
              </div>
              
              <div className="space-y-1 text-left border-t pt-2 mt-3">
                <div className="flex justify-between">
                  <span>📧 Email:</span>
                  <span>sivasankaran773@gmail.com</span>
                </div>
                <div className="flex justify-between">
                  <span>📱 Phone:</span>
                  <span>+91 6370839917</span>
                </div>
                <div className="flex justify-between">
                  <span>📍 Location:</span>
                  <span>Chennai</span>
                </div>
                <div className="flex justify-between">
                  <span>🎂 DOB:</span>
                  <span>15/08/1995</span>
                </div>
                <div className="flex justify-between">
                  <span>💼 Experience:</span>
                  <span>5 years</span>
                </div>
                <div className="flex justify-between">
                  <span>🏢 Company:</span>
                  <span>Tech Solutions</span>
                </div>
                <div className="flex justify-between">
                  <span>📅 Applied:</span>
                  <span>2024-01-15</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage candidate status and schedule next steps
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Schedule Next Round
            </Button>
            <Button variant="outline" className="w-full">
              Send Email
            </Button>
            <Button variant="outline" className="w-full">
              Update Status
            </Button>
            <Button variant="outline" className="w-full">
              Mark as Selected
            </Button>
          </CardContent>
        </Card>

        {/* Next Interview */}
        <Card>
          <CardHeader>
            <CardTitle>Next Interview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">HR Interview</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Jan 25, 2024 - 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Emily Davis</span>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Reschedule
            </Button>
          </CardContent>
        </Card>

        {/* Comments & Status */}
        <Card>
          <CardHeader>
            <CardTitle>Comments & Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              placeholder="Enter your comments here..."
              className="w-full min-h-[120px] p-3 border rounded-md text-sm resize-none"
            />
            
            <select className="w-full p-3 border rounded-md text-sm">
              <option>Select Status</option>
              <option>Hired</option>
              <option>Offered</option>
              <option>Interview Stage</option>
              <option>Rejected</option>
              <option>On Hold</option>
            </select>

            <div className="space-y-2 text-sm border-t pt-4">
              <div className="flex justify-between">
                <span>Is Internal Employee:</span>
                <span>No</span>
              </div>
              <div className="flex justify-between">
                <span>Is Exit:</span>
                <span>No</span>
              </div>
              <div className="flex justify-between">
                <span>Is Talent:</span>
                <span>No</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1">CANCEL</Button>
              <Button className="flex-1">SUBMIT</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Interview Scheduling */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Interview Scheduling
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Schedule and manage interview rounds with Microsoft Teams integration
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {rounds.map((round) => (
              <Card key={round.id} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium text-primary">
                        {round.id}
                      </div>
                      <div>
                        <h4 className="font-semibold">{round.name}</h4>
                        {round.interviewer && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>{round.interviewer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(round.status)}>
                      {round.status}
                    </Badge>
                  </div>

                  {round.date && round.time && (
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{round.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{round.time}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    {round.status === "Pending" ? (
                      <Button 
                        onClick={() => handleScheduleInterview(round.id)}
                        className="flex items-center gap-2"
                      >
                        <Plus className="h-3 w-3" />
                        Schedule Interview
                      </Button>
                    ) : round.meetingLink ? (
                      <Button 
                        variant="outline" 
                        onClick={() => window.open(round.meetingLink, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <Video className="h-3 w-3" />
                        Join Meeting
                      </Button>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Interview completed
                      </div>
                    )}

                    {round.status === "Scheduled" && (
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teams Integration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Connect with Microsoft Teams for seamless interview scheduling
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium">Microsoft Teams</h4>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline">
                Configure Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}