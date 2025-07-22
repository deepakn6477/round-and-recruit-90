import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Calendar, Clock, CheckCircle, AlertCircle, XCircle, FileText, User, Plus, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SummaryTab } from "./SummaryTab";
import { ScheduleInterviewTab } from "./ScheduleInterviewTab";
import { AssessmentSummary } from "./AssessmentSummary";

// Mock candidate data
const mockCandidateData = {
  "RSM118820": {
    name: "Sivasankaran S",
    mobile: "+91 6370892917",
    email: "sivasankaran773@gmail.com",
    gender: "Male",
    dob: "15/08/1995",
    location: "Chennai",
    experience: "5 years",
    currentCompany: "Tech Solutions",
    designation: "Senior Developer",
    expectedCTC: "12 LPA",
    resume: "SIVASANKARAN_PDF",
    overallFitment: 85,
    roundsProgress: "3/4",
    assessmentHistory: [
      {
        round: 1,
        name: "Technical Screening",
        date: "2024-01-16",
        interviewer: "Sarah Johnson",
        status: "Cleared",
        score: 85,
        feedback: "Strong technical fundamentals, good problem-solving approach",
        recordingUrl: "https://example.com/recording1.mp4",
        duration: "45 mins"
      },
      {
        round: 2,
        name: "Technical Interview", 
        date: "2024-01-18",
        interviewer: "Mike Wilson",
        status: "Cleared",
        score: 78,
        feedback: "Good coding skills, needs improvement in system design concepts",
        recordingUrl: "https://example.com/recording2.mp4",
        duration: "60 mins"
      },
      {
        round: 3,
        name: "System Design",
        date: "2024-01-20",
        interviewer: "David Smith",
        status: "Cleared",
        score: 82,
        feedback: "Excellent system design skills, good understanding of scalability",
        recordingUrl: "https://example.com/recording3.mp4",
        duration: "90 mins"
      },
      {
        round: 4,
        name: "HR Interview",
        date: "2024-01-22",
        interviewer: "Emily Davis",
        status: "Pending",
        score: null,
        feedback: "Scheduled for next week",
        recordingUrl: null,
        duration: "TBD"
      }
    ]
  },
  "RSM001": {
    name: "John Doe",
    mobile: "+1 9876543210",
    email: "john.doe@email.com",
    gender: "Male",
    dob: "10/05/1990",
    location: "Bengaluru",
    experience: "6 years",
    currentCompany: "Azure Solutions Inc",
    designation: "Senior Developer",
    expectedCTC: "15 LPA",
    resume: "JOHN_DOE_PDF",
    overallFitment: 85,
    roundsProgress: "1/4",
    assessmentHistory: [
      {
        round: 1,
        name: "Technical Screening",
        date: "2024-01-16",
        interviewer: "Sarah Johnson",
        status: "Cleared",
        score: 85,
        feedback: "Strong technical fundamentals, good problem-solving approach",
        recordingUrl: "https://example.com/recording1.mp4",
        duration: "45 mins"
      }
    ]
  }
};

export const CandidateDetails = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const navigate = useNavigate();
  const [selectedJobId, setSelectedJobId] = useState("JB78945");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("In Progress");
  
  const candidate = mockCandidateData[resumeId as keyof typeof mockCandidateData];

  const jobOptions = [
    { id: "JB78945", title: "Azure - Senior Associate" },
    { id: "JB78946", title: "React Developer" },
    { id: "JB78947", title: "DevOps Engineer" }
  ];

  const handleScheduleInterview = (roundId: number) => {
    // This would integrate with Microsoft Teams calendar
    window.open("https://outlook.live.com/calendar/deeplink/compose", "_blank");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Cleared": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Pending": return <Clock className="h-4 w-4 text-orange-600" />;
      case "Failed": return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cleared": return "bg-green-100 text-green-800";
      case "Pending": return "bg-orange-100 text-orange-800";
      case "Failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/resume-list")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Candidate Details</h1>
            <p className="text-sm text-muted-foreground">Complete candidate profile and assessment history</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Candidate Profile + Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-b from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-green-800">{candidate.name}</h3>
                <p className="text-green-600">{candidate.designation}</p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">In Progress</Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-800">Overall Fitment</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={candidate.overallFitment} className="flex-1" />
                    <span className="text-2xl font-bold text-green-600">{candidate.overallFitment}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-green-800">Rounds Progress</p>
                  <p className="text-lg font-semibold text-green-600">{candidate.roundsProgress} rounds</p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">📧 Email:</span>
                    <span className="text-green-600">{candidate.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">📱 Phone:</span>
                    <span className="text-green-600">{candidate.mobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">📍 Location:</span>
                    <span className="text-green-600">{candidate.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">🎂 DOB:</span>
                    <span className="text-green-600">{candidate.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">💼 Experience:</span>
                    <span className="text-green-600">{candidate.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">🏢 Company:</span>
                    <span className="text-green-600">{candidate.currentCompany}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">📋 Applied:</span>
                    <span className="text-green-600">2024-01-15</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="resume-details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resume-details">Resume Details</TabsTrigger>
              <TabsTrigger value="schedule">Schedule Interview</TabsTrigger>
              <TabsTrigger value="assessment-summary">Assessment Summary</TabsTrigger>
            </TabsList>
            
              <TabsContent value="resume-details" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold">NAME:</h3>
                          <p>{candidate.name}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">MOBILE/CONTACT NO:</h4>
                            <p>{candidate.mobile}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">EDUCATIONAL QUALIFICATION:</h4>
                            <p>B.Tech Computer Science</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">EMAIL:</h4>
                            <p>{candidate.email}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">EXPERIENCE:</h4>
                            <p>{candidate.experience}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">GENDER:</h4>
                            <p>{candidate.gender}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">CURRENT COMPANY:</h4>
                            <p>{candidate.currentCompany}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">DOB:</h4>
                            <p>{candidate.dob}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">DESIGNATION:</h4>
                            <p>{candidate.designation}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">LOCATION:</h4>
                            <p>{candidate.location}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">INDUSTRY EXPERIENCE:</h4>
                            <p>IT Services</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">PREFERRED LOCATIONS:</h4>
                            <p>Bangalore, Chennai</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">RESUME:</h4>
                            <div className="flex items-center gap-2">
                              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">PDF</span>
                              <span>{candidate.resume}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">CERTIFICATIONS:</h4>
                            <p>Azure Fundamentals, Azure Developer</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">SKILLS:</h4>
                            <p>Azure, Logic Apps, JavaScript, React</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">NOTICE PERIOD:</h4>
                            <p>30 days</p>
                          </div>
                          <div>
                            <h4 className="font-semibold">CURRENT CTC:</h4>
                            <p>10 LPA</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold">EXPECTED CTC:</h4>
                            <p>{candidate.expectedCTC}</p>
                          </div>
                        </div>
                      </div>

                      <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                        <Edit className="w-4 h-4 mr-2" />
                        EDIT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Comments & Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Enter your comments here..."
                      className="min-h-[120px]"
                    />
                    
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hired">Hired</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="interview">Interview Stage</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>

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
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <ScheduleInterviewTab />
            </TabsContent>

            <TabsContent value="assessment-summary" className="mt-6">
              <AssessmentSummary 
                jobId="JB78945" 
                jobTitle="Azure - Senior Associate" 
                onBack={() => {}} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};