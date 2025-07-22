import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Phase, JobData } from "./JobManagement";
import { Plus, Play, ArrowRight, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface WorkflowTabProps {
  workflow: Workflow | null;
  availablePhases: Phase[];
  onCreateWorkflow: (phases: Phase[]) => void;
  jobData: JobData;
}

export function WorkflowTab({ workflow, availablePhases, onCreateWorkflow, jobData }: WorkflowTabProps) {
  const [showPhaseSelector, setShowPhaseSelector] = useState(false);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);

  const defaultPhases: Phase[] = [
    {
      id: "resume-screening",
      name: "Resume Screening",
      description: "Check qualifications and role fit from the resume",
      questions: []
    },
    {
      id: "technical-assessment", 
      name: "Technical Assessment",
      description: "Evaluate technical skills through assessment",
      questions: []
    },
    {
      id: "technical-interview",
      name: "Technical Interview", 
      description: "In-depth technical discussion with candidates",
      questions: []
    },
    {
      id: "hr-round",
      name: "HR Round",
      description: "Final HR discussion and offer negotiation",
      questions: []
    }
  ];

  const phasesToShow = availablePhases.length > 0 ? availablePhases : defaultPhases;

  const handlePhaseToggle = (phaseId: string) => {
    setSelectedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const handleCreateWorkflow = () => {
    const selectedPhaseObjects = phasesToShow.filter(phase => 
      selectedPhases.includes(phase.id)
    );
    onCreateWorkflow(selectedPhaseObjects);
    setShowPhaseSelector(false);
    setSelectedPhases([]);
  };

  const getPhaseStatusColor = (index: number) => {
    const colors = [
      "bg-workflow-primary text-white",
      "bg-workflow-secondary text-white", 
      "bg-workflow-accent text-black",
      "bg-workflow-danger text-white"
    ];
    return colors[index % colors.length];
  };

  if (!workflow && !showPhaseSelector) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="max-w-md">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Workflow Created</h3>
            <p className="text-muted-foreground mb-6">
              Create a workflow to define the hiring process for <strong>{jobData.title}</strong>
            </p>
          </div>
          <Button 
            onClick={() => setShowPhaseSelector(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            size="lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>
      </div>
    );
  }

  if (showPhaseSelector) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Create Workflow</h2>
            <p className="text-muted-foreground">Select phases for {jobData.title} hiring process</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPhaseSelector(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleCreateWorkflow}
              disabled={selectedPhases.length === 0}
              className="bg-primary hover:bg-primary/90"
            >
              Create Workflow ({selectedPhases.length} phases)
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Phases</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select the phases you want to include in your workflow
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {phasesToShow.map((phase) => (
                <div 
                  key={phase.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Checkbox 
                    id={phase.id}
                    checked={selectedPhases.includes(phase.id)}
                    onCheckedChange={() => handlePhaseToggle(phase.id)}
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor={phase.id} 
                      className="text-sm font-medium cursor-pointer"
                    >
                      {phase.name}
                    </Label>
                    {phase.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {phase.description}
                      </p>
                    )}
                    {phase.questions.length > 0 && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {phase.questions.length} questions configured
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Workflow Preview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Preview of your selected workflow phases
              </p>
            </CardHeader>
            <CardContent>
              {selectedPhases.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Select phases to see workflow preview
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedPhases.map((phaseId, index) => {
                    const phase = phasesToShow.find(p => p.id === phaseId);
                    if (!phase) return null;
                    
                    return (
                      <div key={phase.id} className="flex items-center gap-2">
                        <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getPhaseStatusColor(index)}`}>
                          {index + 1}. {phase.name}
                        </div>
                        {index < selectedPhases.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Workflow Configuration</h2>
          <p className="text-muted-foreground">
            {workflow.name} • {workflow.phases.length} phases • Job ID: {jobData.id}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPhaseSelector(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Modify Workflow
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflow.phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${getPhaseStatusColor(index)}`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{phase.name}</h4>
                  {phase.description && (
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {phase.questions.length} questions
                    </Badge>
                  </div>
                </div>
                {index < workflow.phases.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workflow Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Job Description</Label>
              <p className="font-medium">{jobData.title}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Job Title</Label>
              <p className="font-medium">{jobData.title}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Job ID</Label>
              <p className="font-medium">{jobData.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}