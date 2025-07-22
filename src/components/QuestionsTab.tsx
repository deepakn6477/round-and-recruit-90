import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phase, Question } from "./JobManagement";
import { Plus, Edit, Trash2, Save, HelpCircle, Settings } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionsTabProps {
  phases: Phase[];
  onUpdatePhases: (phases: Phase[]) => void;
}

export function QuestionsTab({ phases, onUpdatePhases }: QuestionsTabProps) {
  const [showCreatePhase, setShowCreatePhase] = useState(false);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [newPhaseName, setNewPhaseName] = useState("");
  const [newPhaseDescription, setNewPhaseDescription] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    type: "multiple-choice",
    options: ["", ""],
    required: false
  });

  const defaultPhases: Phase[] = [
    {
      id: "resume-screening",
      name: "Round 1: Resume Screening",
      description: "Evaluate basic qualifications and resume alignment",
      questions: [
        {
          id: "azure-experience",
          text: "Are you currently working on Azure cloud technologies?",
          type: "yes-no",
          required: true
        },
        {
          id: "azure-devops-experience",
          text: "How many years of experience do you have in Azure DevOps?",
          type: "text",
          required: true
        },
        {
          id: "project-link",
          text: "Share a link to your most relevant project/documentation.",
          type: "text",
          required: false
        }
      ]
    },
    {
      id: "technical-assessment",
      name: "Round 2: Technical Assessment – Azure Core",
      description: "Test understanding of Azure services",
      questions: [
        {
          id: "azure-storage",
          text: "What is the difference between Azure Blob Storage and File Storage?",
          type: "text",
          required: true
        },
        {
          id: "azure-services",
          text: "Select the Azure services you've used:",
          type: "multiple-choice",
          options: ["Azure VM", "Azure Functions", "Logic Apps", "Azure Kubernetes Service (AKS)"],
          required: true
        },
        {
          id: "github-demo",
          text: "Share your GitHub or demo deployment URL (if any).",
          type: "text",
          required: false
        }
      ]
    },
    {
      id: "solution-design",
      name: "Round 3: Solution Design Discussion",
      description: "Assess architectural thinking and implementation strategy",
      questions: [
        {
          id: "scalable-app",
          text: "Given a scenario, which Azure components would you use to build a scalable web app?",
          type: "text",
          required: true
        },
        {
          id: "monitoring-tools",
          text: "Select your preferred tools for monitoring in Azure:",
          type: "multiple-choice",
          options: ["Azure Monitor", "Application Insights", "Log Analytics", "Azure Advisor"],
          required: true
        }
      ]
    },
    {
      id: "team-fit",
      name: "Round 4: Team Fit & Communication",
      description: "Understand team collaboration and soft skills",
      questions: [
        {
          id: "conflict-handling",
          text: "How do you usually handle conflicts in a cross-functional team?",
          type: "text",
          required: true
        },
        {
          id: "communication-tools",
          text: "Choose the communication tools you've worked with:",
          type: "multiple-choice",
          options: ["Microsoft Teams", "Slack", "Zoom", "Skype"],
          required: true
        }
      ]
    },
    {
      id: "managerial-round",
      name: "Round 5: Final Managerial Round",
      description: "Gauge long-term alignment and strategic thinking",
      questions: [
        {
          id: "azure-motivation",
          text: "Why do you want to work on Azure-focused roles in this organization?",
          type: "text",
          required: true
        },
        {
          id: "impactful-decision",
          text: "Share your most impactful decision taken in a previous project.",
          type: "text",
          required: true
        }
      ]
    }
  ];

  const currentPhases = phases.length > 0 ? phases : defaultPhases;

  const handleCreatePhase = () => {
    if (!newPhaseName.trim()) return;

    const newPhase: Phase = {
      id: `phase-${Date.now()}`,
      name: newPhaseName,
      description: newPhaseDescription,
      questions: []
    };

    onUpdatePhases([...currentPhases, newPhase]);
    setNewPhaseName("");
    setNewPhaseDescription("");
    setShowCreatePhase(false);
  };

  const handleDeletePhase = (phaseId: string) => {
    onUpdatePhases(currentPhases.filter(p => p.id !== phaseId));
    if (selectedPhase === phaseId) {
      setSelectedPhase(null);
    }
  };

  const handleCreateQuestion = () => {
    if (!selectedPhase || !newQuestion.text?.trim()) return;

    const question: Question = {
      id: `question-${Date.now()}`,
      text: newQuestion.text,
      type: newQuestion.type || "multiple-choice",
      options: newQuestion.type === "multiple-choice" ? newQuestion.options?.filter(opt => opt.trim()) : undefined,
      required: newQuestion.required || false
    };

    const updatedPhases = currentPhases.map(phase => 
      phase.id === selectedPhase 
        ? { ...phase, questions: [...phase.questions, question] }
        : phase
    );

    onUpdatePhases(updatedPhases);
    setNewQuestion({ text: "", type: "multiple-choice", options: ["", ""], required: false });
    setShowCreateQuestion(false);
  };

  const handleDeleteQuestion = (phaseId: string, questionId: string) => {
    const updatedPhases = currentPhases.map(phase => 
      phase.id === phaseId 
        ? { ...phase, questions: phase.questions.filter(q => q.id !== questionId) }
        : phase
    );
    onUpdatePhases(updatedPhases);
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), ""]
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt)
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Questions Configuration</h2>
          <p className="text-muted-foreground">
            Create and manage questions for each phase of the hiring process
          </p>
        </div>
        <Button 
          onClick={() => setShowCreatePhase(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Tasks/Rounds
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Phase List */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Phases</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentPhases.map((phase) => (
                <div 
                  key={phase.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-accent/50 ${
                    selectedPhase === phase.id ? 'bg-primary/10 border-primary' : ''
                  }`}
                  onClick={() => setSelectedPhase(phase.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{phase.name}</h4>
                      {phase.description && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {phase.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {phase.questions.length} questions
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePhase(phase.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {showCreatePhase && (
                <Card className="border-dashed">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <Label htmlFor="phase-name">Phase Name</Label>
                      <Input
                        id="phase-name"
                        value={newPhaseName}
                        onChange={(e) => setNewPhaseName(e.target.value)}
                        placeholder="e.g., Technical Interview"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phase-description">Description</Label>
                      <Textarea
                        id="phase-description"
                        value={newPhaseDescription}
                        onChange={(e) => setNewPhaseDescription(e.target.value)}
                        placeholder="Brief description of this phase"
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCreatePhase} size="sm">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowCreatePhase(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Questions Configuration */}
        <div className="lg:col-span-8">
          {selectedPhase ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      {currentPhases.find(p => p.id === selectedPhase)?.name} Questions
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Configure questions for this phase
                    </p>
                  </div>
                  <Button 
                    onClick={() => setShowCreateQuestion(true)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentPhases.find(p => p.id === selectedPhase)?.questions.map((question, index) => (
                    <Card key={question.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h5 className="font-medium mb-2">
                              {index + 1}. {question.text}
                            </h5>
                            <div className="flex gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {question.type.replace('-', ' ')}
                              </Badge>
                              {question.required && (
                                <Badge variant="destructive" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            {question.options && (
                              <div className="space-y-1">
                                {question.options.map((option, optIndex) => (
                                  <div key={optIndex} className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 border rounded flex-shrink-0"></div>
                                    <span>{option}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteQuestion(selectedPhase, question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {showCreateQuestion && (
                    <Card className="border-dashed">
                      <CardContent className="p-4 space-y-4">
                        <div>
                          <Label htmlFor="question-text">Question Text</Label>
                          <Textarea
                            id="question-text"
                            value={newQuestion.text}
                            onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                            placeholder="Enter your question here..."
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor="question-type">Question Type</Label>
                          <Select 
                            value={newQuestion.type} 
                            onValueChange={(value) => setNewQuestion(prev => ({ ...prev, type: value as Question['type'] }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                              <SelectItem value="yes-no">Yes/No</SelectItem>
                              <SelectItem value="text">Text Response</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {newQuestion.type === 'multiple-choice' && (
                          <div>
                            <Label>Answer Options</Label>
                            <div className="space-y-2">
                              {newQuestion.options?.map((option, index) => (
                                <div key={index} className="flex gap-2">
                                  <Input
                                    value={option}
                                    onChange={(e) => updateOption(index, e.target.value)}
                                    placeholder={`Option ${index + 1}`}
                                  />
                                  {(newQuestion.options?.length || 0) > 2 && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => removeOption(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={addOption}
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Option
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="required"
                            checked={newQuestion.required}
                            onCheckedChange={(checked) => setNewQuestion(prev => ({ ...prev, required: !!checked }))}
                          />
                          <Label htmlFor="required">Required question</Label>
                        </div>

                        <div className="flex gap-2">
                          <Button onClick={handleCreateQuestion} size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Save Question
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowCreateQuestion(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center py-16">
                <div className="text-center">
                  <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Select a Phase</h3>
                  <p className="text-muted-foreground">
                    Choose a phase from the left panel to configure questions
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}