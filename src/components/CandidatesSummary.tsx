import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Eye, Users, ChevronRight } from "lucide-react";

interface CandidatesSummaryProps {
  jobId: string;
  jobTitle: string;
  onBack: () => void;
}

export function CandidatesSummary({ jobId, jobTitle, onBack }: CandidatesSummaryProps) {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedFitment, setSelectedFitment] = useState("All Fitment Levels");

  const summaryStats = {
    totalCandidates: 6,
    selected: 1,
    inProgress: 2,
    onHold: 1,
    rejected: 1
  };

  const candidatesData = [
    {
      id: "RSM001",
      name: "John Doe",
      email: "john.doe@email.com",
      contact: "+1 9876543210",
      fitment: 85,
      rounds: "1/4",
      status: "In Progress",
      lastRound: "HR Interview",
      appliedDate: "2024-01-15",
      badgeColor: "bg-blue-500"
    },
    {
      id: "RSM002",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      contact: "+1 9876543211",
      fitment: 92,
      rounds: "4/4",
      status: "Selected",
      lastRound: "Completed",
      appliedDate: "2024-01-14",
      badgeColor: "bg-green-500"
    },
    {
      id: "RSM003",
      name: "Mike Johnson",
      email: "mike.j@email.com",
      contact: "+1 9876543212",
      fitment: 78,
      rounds: "2/4",
      status: "On Hold",
      lastRound: "Technical Interview",
      appliedDate: "2024-01-16",
      badgeColor: "bg-orange-500"
    },
    {
      id: "RSM004",
      name: "Sarah Wilson",
      email: "sarah@email.com",
      contact: "+1 9876543213",
      fitment: 65,
      rounds: "1/4",
      status: "Rejected",
      lastRound: "Technical Screening",
      appliedDate: "2024-01-13",
      badgeColor: "bg-red-500"
    },
    {
      id: "RSM005",
      name: "David Brown",
      email: "david.brown@email.com",
      contact: "+1 9876543214",
      fitment: 0,
      rounds: "0/4",
      status: "No Response",
      lastRound: "Applied",
      appliedDate: "2024-01-12",
      badgeColor: "bg-gray-500"
    },
    {
      id: "RSM006",
      name: "Emily Davis",
      email: "emily.d@email.com",
      contact: "+1 9876543215",
      fitment: 88,
      rounds: "1/4",
      status: "In Progress",
      lastRound: "System Design",
      appliedDate: "2024-01-17",
      badgeColor: "bg-blue-500"
    }
  ];

  const handleCandidateClick = (candidateId: string) => {
    navigate(`/candidate-details/${candidateId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selected": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "On Hold": return "bg-orange-100 text-orange-800";
      case "Rejected": return "bg-red-100 text-red-800";
      case "No Response": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Summary
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Candidates Summary</h2>
          <p className="text-muted-foreground">Detailed candidate analysis and tracking</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{summaryStats.totalCandidates}</h3>
            <p className="text-sm text-blue-600">Total Candidates</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-green-600">{summaryStats.selected}</h3>
            <p className="text-sm text-green-600">Selected</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-blue-600">{summaryStats.inProgress}</h3>
            <p className="text-sm text-blue-600">In Progress</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-orange-600">{summaryStats.onHold}</h3>
            <p className="text-sm text-orange-600">On Hold</p>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <h3 className="text-2xl font-bold text-red-600">{summaryStats.rejected}</h3>
            <p className="text-sm text-red-600">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Filter Candidates
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Filter candidates by status and fitment percentage
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Selected">Selected</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="On Hold">On Hold</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="No Response">No Response</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Fitment Level</label>
              <Select value={selectedFitment} onValueChange={setSelectedFitment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Fitment Levels">All Fitment Levels</SelectItem>
                  <SelectItem value="High (80-100%)">High (80-100%)</SelectItem>
                  <SelectItem value="Medium (60-79%)">Medium (60-79%)</SelectItem>
                  <SelectItem value="Low (0-59%)">Low (0-59%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidates List */}
      <Card>
        <CardHeader>
          <CardTitle>Candidates List ({candidatesData.length})</CardTitle>
          <p className="text-sm text-muted-foreground">
            Click on any candidate to view detailed information
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {candidatesData.map((candidate, index) => (
              <Card 
                key={candidate.id}
                className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleCandidateClick(candidate.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-medium text-primary">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{candidate.name}</h4>
                          <Badge className={getStatusColor(candidate.status)}>
                            {candidate.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                        <p className="text-sm text-muted-foreground">{candidate.contact}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm font-medium">{candidate.fitment}%</p>
                        <p className="text-xs text-muted-foreground">Fitment</p>
                        <Progress value={candidate.fitment} className="w-16 h-2 mt-1" />
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium">{candidate.rounds}</p>
                        <p className="text-xs text-muted-foreground">Rounds Progress</p>
                      </div>

                      <div className="text-center">
                        <Badge variant="outline" className="text-xs">
                          {candidate.lastRound}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">Last Round</p>
                      </div>

                      <div className="text-center">
                        <p className="text-sm">{candidate.appliedDate}</p>
                        <p className="text-xs text-muted-foreground">Applied Date</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}