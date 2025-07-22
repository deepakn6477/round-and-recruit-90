import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, FileText, BarChart3, Calendar, Clock, CheckCircle, XCircle, Pause } from "lucide-react";
import { AssessmentSummary } from "./AssessmentSummary";
import { CandidatesSummary } from "./CandidatesSummary";

export function JobSummary() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState<"overview" | "assessment" | "candidates">("overview");
  const [selectedJobId, setSelectedJobId] = useState(jobId || "JB78945");

  // Mock job data
  const jobOptions = [
    { id: "JB78945", title: "Azure - Senior Associate" },
    { id: "JB78946", title: "React Developer" },
    { id: "JB78947", title: "DevOps Engineer" }
  ];

  const selectedJob = jobOptions.find(job => job.id === selectedJobId);

  const overviewStats = {
    totalApplications: 45,
    shortlisted: 12,
    interviewsScheduled: 8,
    daysActive: 15
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/job-details/${selectedJobId}`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Job Details
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Job Analysis & Reports</h1>
              <p className="text-muted-foreground">
                Select the type of analysis you want to view for this job
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={selectedJobId} onValueChange={setSelectedJobId}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select Job ID & JD" />
              </SelectTrigger>
              <SelectContent>
                {jobOptions.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.id} - {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedView === "overview" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Applications</p>
                      <h3 className="text-3xl font-bold">{overviewStats.totalApplications}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Shortlisted</p>
                      <h3 className="text-3xl font-bold">{overviewStats.shortlisted}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                      <h3 className="text-3xl font-bold">{overviewStats.interviewsScheduled}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Days Active</p>
                      <h3 className="text-3xl font-bold">{overviewStats.daysActive}</h3>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analysis Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Analysis & Reports
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select the type of analysis you want to view for this job
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="font-medium">Choose Analysis Type</p>
                  <Select onValueChange={(value) => setSelectedView(value as "assessment" | "candidates")}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select analysis type..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assessment">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Assessment Summary
                        </div>
                      </SelectItem>
                      <SelectItem value="candidates">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Candidates Summary
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedView("assessment")}>
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <FileText className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Assessment Summary</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          View detailed assessment results and candidate performance metrics
                        </p>
                        <Button variant="outline" className="w-full">
                          View Analysis
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-dashed border-muted-foreground/20 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedView("candidates")}>
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Users className="h-8 w-8 text-blue-600" />
                        </div>
                        <h3 className="font-semibold mb-2">Candidates Summary</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Analyze candidate profiles, qualifications, and application status
                        </p>
                        <Button variant="outline" className="w-full">
                          View Analysis
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {selectedView === "assessment" && (
          <AssessmentSummary 
            jobId={selectedJobId} 
            jobTitle={selectedJob?.title || ""}
            onBack={() => setSelectedView("overview")}
          />
        )}

        {selectedView === "candidates" && (
          <CandidatesSummary 
            jobId={selectedJobId} 
            jobTitle={selectedJob?.title || ""}
            onBack={() => setSelectedView("overview")}
          />
        )}
      </div>
    </div>
  );
}