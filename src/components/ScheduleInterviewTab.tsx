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
    <div className="space-y-6">
      {/* Interview Scheduling */}
      <div className="space-y-6">
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage candidate status and schedule next steps
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full ">
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