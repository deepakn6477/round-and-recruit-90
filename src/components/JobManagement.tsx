import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobDetails } from "./JobDetails";
import { WorkflowTab } from "./WorkflowTab";
import { QuestionsTab } from "./QuestionsTab";
import { Briefcase, GitBranch, HelpCircle } from "lucide-react";

export interface Phase {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'yes-no';
  options?: string[];
  required: boolean;
}

export interface Workflow {
  id: string;
  name: string;
  phases: Phase[];
  jobId: string;
}

export interface JobData {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
}

export function JobManagement() {
  const [activeTab, setActiveTab] = useState("job-details");
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [jobData, setJobData] = useState<JobData>({
    id: "JB78945",
    title: "Azure - Senior Associate",
    description: "Design and develop integration workflows using Azure Logic Apps, Azure Functions, Service Bus, and Event Grid.",
    department: "IT & Information Security",
    location: "Bengaluru",
    employmentType: "Full Time, Permanent",
    experience: "2-5 years",
    salary: {
      min: 500000,
      max: 750000,
      currency: "INR"
    }
  });

  const handleCreateWorkflow = (selectedPhases: Phase[]) => {
    const newWorkflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: `${jobData.title} Workflow`,
      phases: selectedPhases,
      jobId: jobData.id
    };
    setWorkflow(newWorkflow);
  };

  const handleUpdatePhases = (updatedPhases: Phase[]) => {
    setPhases(updatedPhases);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Briefcase className="h-6 w-6 text-primary" />
              Job Management - {jobData.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/30 p-1 m-4 rounded-lg">
                <TabsTrigger 
                  value="job-details" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Briefcase className="h-4 w-4" />
                  Job Details
                </TabsTrigger>
                <TabsTrigger 
                  value="workflow" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <GitBranch className="h-4 w-4" />
                  Workflow
                </TabsTrigger>
                <TabsTrigger 
                  value="questions" 
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <HelpCircle className="h-4 w-4" />
                  Questions
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="job-details" className="mt-0">
                  <JobDetails jobData={jobData} onUpdateJobData={setJobData} />
                </TabsContent>

                <TabsContent value="workflow" className="mt-0">
                  <WorkflowTab 
                    workflow={workflow} 
                    availablePhases={phases}
                    onCreateWorkflow={handleCreateWorkflow}
                    jobData={jobData}
                  />
                </TabsContent>

                <TabsContent value="questions" className="mt-0">
                  <QuestionsTab 
                    phases={phases} 
                    onUpdatePhases={handleUpdatePhases}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}