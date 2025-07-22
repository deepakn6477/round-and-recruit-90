import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, FileText } from "lucide-react";

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

interface SummaryTabProps {
  candidateId: string;
}

// Mock interview data
const mockInterviewData: Record<string, InterviewRound[]> = {
  "RSM118820": [
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
    },
    {
      id: "4",
      round: "HR Round",
      interviewer: "Amit Singh",
      date: "2024-02-05",
      status: "Completed",
      remarks: "Good attitude but lacks experience in cloud technologies for this role.",
      hasRecording: true,
      jobId: "JOB002", 
      jobTitle: "DevOps Engineer"
    }
  ]
};

// Mock job data
const mockJobs = [
  { id: "JOB001", title: "Senior Software Developer", description: "Full-stack development with React and Node.js" },
  { id: "JOB002", title: "DevOps Engineer", description: "Cloud infrastructure and deployment automation" },
  { id: "JOB003", title: "Frontend Developer", description: "React and TypeScript frontend development" }
];

export const SummaryTab = ({ candidateId }: SummaryTabProps) => {
  const [selectedJobId, setSelectedJobId] = useState("JOB001");
  const [commonRemarks, setCommonRemarks] = useState("");

  const interviewRounds = mockInterviewData[candidateId] || [];
  const filteredRounds = interviewRounds.filter(round => round.jobId === selectedJobId);
  const selectedJob = mockJobs.find(job => job.id === selectedJobId);

  const handlePlayRecording = (roundId: string) => {
    // Mock function to play recording
    console.log(`Playing recording for round ${roundId}`);
  };

  if (interviewRounds.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Interview Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">No interview rounds found for this candidate.</p>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Common Remarks</h4>
            <Textarea
              placeholder="Enter general remarks about the candidate..."
              value={commonRemarks}
              onChange={(e) => setCommonRemarks(e.target.value)}
              className="min-h-[100px]"
            />
            <Button>Save Remarks</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Interview Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Job Role:</label>
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockJobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.id} - {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedJob && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold">{selectedJob.title}</h4>
              <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interview Rounds */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interview Rounds ({filteredRounds.length})</h3>
        
        {filteredRounds.map((round) => (
          <Card key={round.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg">{round.round}</h4>
                  <p className="text-sm text-muted-foreground">
                    Interviewer: {round.interviewer} | Date: {round.date}
                  </p>
                </div>
                <Badge 
                  variant={round.status === "Completed" ? "default" : "secondary"}
                  className={
                    round.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }
                >
                  {round.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Interviewer Remarks:</h5>
                  <p className="text-sm bg-muted p-3 rounded-md">{round.remarks}</p>
                </div>

                {round.hasRecording && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePlayRecording(round.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Recording
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Interview recording available
                    </span>
                  </div>
                )}

                {!round.hasRecording && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">No recording available</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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
  );
};