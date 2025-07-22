import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, CheckCircle, XCircle, Clock, Pause, Play, FileText, User } from "lucide-react";

interface AssessmentSummaryProps {
  jobId: string;
  jobTitle: string;
  onBack: () => void;
}

interface InterviewRound {
  id: string;
  round: string;
  interviewer: string;
  date: string;
  status: "Completed" | "Scheduled" | "Cancelled";
  remarks: string;
  hasRecording: boolean;
  jobId: string;
  jobTitle: string;
}

// Mock candidate data
const mockCandidateData = {
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
  roundsProgress: "3/4"
};

// Mock interview data  
const mockInterviewData: InterviewRound[] = [
  {
    id: "1",
    round: "HR Round",
    interviewer: "Savita Sharma",
    date: "2024-01-15",
    status: "Completed",
    remarks: "Excellent communication skills and good cultural fit. Shows enthusiasm for the role.",
    hasRecording: true,
    jobId: "JOB001",
    jobTitle: "Senior Software Developer"
  },
  {
    id: "2", 
    round: "Technical Round 1",
    interviewer: "Rajesh Kumar",
    date: "2024-01-18",
    status: "Completed",
    remarks: "Strong technical knowledge in React and Node.js. Good problem-solving approach.",
    hasRecording: true,
    jobId: "JOB001",
    jobTitle: "Senior Software Developer"
  },
  {
    id: "3",
    round: "Technical Round 2",
    interviewer: "Priya Patel",
    date: "2024-01-20",
    status: "Completed", 
    remarks: "Excellent system design skills. Demonstrated scalability concepts well.",
    hasRecording: false,
    jobId: "JOB001",
    jobTitle: "Senior Software Developer"
  }
];

export function AssessmentSummary({ jobId, jobTitle, onBack }: AssessmentSummaryProps) {
  const [selectedJobId, setSelectedJobId] = useState("JOB001");
  const [commonRemarks, setCommonRemarks] = useState("");

  const interviewRounds = mockInterviewData;
  const filteredRounds = interviewRounds.filter(round => round.jobId === selectedJobId);

  const handlePlayRecording = (roundId: string) => {
    console.log(`Playing recording for round ${roundId}`);
  };

  // Mock job data
  const mockJobs = [
    { id: "JOB001", title: "Senior Software Developer", description: "Full-stack development with React and Node.js" },
    { id: "JOB002", title: "DevOps Engineer", description: "Cloud infrastructure and deployment automation" },
    { id: "JOB003", title: "Frontend Developer", description: "React and TypeScript frontend development" }
  ];

  const selectedJob = mockJobs.find(job => job.id === selectedJobId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      

      {/* Right Panel - Assessment History and Performance Summary */}
      <div className="lg:col-span-3 space-y-6">
        {/* Assessment History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <FileText className="h-5 w-5" />
              Assessment History
            </CardTitle>
            <p className="text-sm text-muted-foreground">Detailed round-wise performance and feedback</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-l-green-500 pl-4 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Technical Screening</h4>
                      <p className="text-sm text-muted-foreground">📅 2024-01-16 • 👤 Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">✓ Cleared</Badge>
                    <p className="text-sm font-medium">Score: 85%</p>
                  </div>
                </div>
                <div className="ml-11">
                  <div className="mb-2">
                    <strong>Feedback:</strong>
                    <p className="text-sm mt-1">Strong technical fundamentals, good problem-solving approach</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>⏱ Duration: 45 mins</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                      ▶ View Recording
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-l-green-500 pl-4 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Technical Interview</h4>
                      <p className="text-sm text-muted-foreground">📅 2024-01-18 • 👤 Mike Wilson</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">✓ Cleared</Badge>
                    <p className="text-sm font-medium">Score: 78%</p>
                  </div>
                </div>
                <div className="ml-11">
                  <div className="mb-2">
                    <strong>Feedback:</strong>
                    <p className="text-sm mt-1">Good coding skills, needs improvement in system design concepts</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>⏱ Duration: 60 mins</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                      ▶ View Recording
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-l-green-500 pl-4 bg-gray-50 p-4 rounded-r-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-medium text-green-600">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">System Design</h4>
                      <p className="text-sm text-muted-foreground">📅 2024-01-20 • 👤 David Smith</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">✓ Cleared</Badge>
                    <p className="text-sm font-medium">Score: 82%</p>
                  </div>
                </div>
                <div className="ml-11">
                  <div className="mb-2">
                    <strong>Feedback:</strong>
                    <p className="text-sm mt-1">Excellent system design skills, good understanding of scalability</p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>⏱ Duration: 90 mins</span>
                    <Button variant="ghost" size="sm" className="h-auto p-1 text-xs">
                      ▶ View Recording
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Play Recording Section */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Play className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Play Recording</span>
              </div>
              <p className="text-sm text-muted-foreground">Interview recording available</p>
            </div>

            {/* Technical Round 2 Details */}
            <Card className="bg-white border">
              <CardContent className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-lg mb-2">Technical Round 2</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span>Interviewer: Priya Patel</span>
                    <span>Date: 2024-01-20</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>

                <div className="mb-4">
                  <h5 className="font-medium mb-2">Interviewer Remarks:</h5>
                  <p className="text-sm bg-gray-100 p-3 rounded-md">
                    Excellent system design skills. Demonstrated scalability concepts well.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">No recording available</span>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        

        {/* Overall Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">Completed Rounds</h4>
                <p className="text-2xl font-bold text-green-600">
                  {filteredRounds.filter(r => r.status === "Completed").length}
                </p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">Total Rounds</h4>
                <p className="text-2xl font-bold text-blue-600">{filteredRounds.length}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">Recordings</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredRounds.filter(r => r.hasRecording).length}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">Additional Remarks</h4>
              <Textarea
                placeholder="Enter additional remarks about the candidate's overall performance..."
                value={commonRemarks}
                onChange={(e) => setCommonRemarks(e.target.value)}
                className="min-h-[100px]"
              />
              <Button>Save Overall Remarks</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}