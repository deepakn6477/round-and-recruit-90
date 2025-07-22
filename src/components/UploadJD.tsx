import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, FileText, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const UploadJD = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        setExtractedData({
          title: "DevOps Engineer",
          experience: "3+ years of hands-on experience in DevOps or Site Reliability Engineering roles",
          requiredSkills: "CI/CD tools (e.g., Jenkins, CircleCI), GitLab CI), scripting in Bash, Python, or Go, cloud platforms: AWS, Azure, or Google Cloud Platform, Docker and Kubernetes, Infrastructure as Code (IaC): Terraform, Ansible, CloudFormation, Git and version control workflows, monitoring/logging tools (e.g., ELK Stack, Datadog, Prometheus)",
          education: "Bachelor's degree in Computer Science, Engineering, or related field"
        });
        setIsProcessing(false);
        toast({
          title: "Job Description Processed",
          description: "AI has successfully extracted job details from your document.",
        });
      }, 3000);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setExtractedData(null);
    setIsProcessing(false);
  };

  const handleClearData = () => {
    setExtractedData(null);
    toast({
      title: "Data Cleared",
      description: "Extracted data has been cleared.",
    });
  };

  const handleProceedToForm = () => {
    // Navigate to create job form with extracted data
    navigate("/create-job", { state: { extractedData } });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/post-new-job")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Upload Job Description</h1>
          <p className="text-muted-foreground">Upload a PDF or document file to extract job details automatically</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Job Description Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Job Description</h3>
                <p className="text-muted-foreground mb-4">
                  Drag and drop your job description file here, or click to browse
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Label>
                <p className="text-xs text-muted-foreground mt-2">
                  Supports PDF, DOC, DOCX files up to 10MB
                </p>
              </div>
            ) : (
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {isProcessing && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm font-medium">Processing document...</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI is analyzing your job description and extracting key information.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Extracted Data */}
        {extractedData && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Extracted Job Information
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleClearData}>
                    Clear Data
                  </Button>
                  <Button size="sm" onClick={handleProceedToForm}>
                    Create Job
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Job Title</Label>
                <div className="mt-1 p-2 bg-muted/30 rounded">
                  {extractedData.title}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Experience Requirements</Label>
                <div className="mt-1 p-2 bg-muted/30 rounded">
                  {extractedData.experience}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Required Skills</Label>
                <div className="mt-1 p-3 bg-muted/30 rounded">
                  <div className="flex flex-wrap gap-2">
                    {extractedData.requiredSkills.split(', ').map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Education</Label>
                <div className="mt-1 p-2 bg-muted/30 rounded">
                  {extractedData.education}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};