import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, FileText } from "lucide-react";

export const PostNewJob = () => {
  const navigate = useNavigate();

  const handleUploadJD = () => {
    navigate("/upload-jd");
  };

  const handleCreateManually = () => {
    navigate("/create-job");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Post New Job</h1>
          <p className="text-muted-foreground">Choose how you want to create your job posting</p>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card 
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary"
          onClick={handleUploadJD}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Upload Job Description</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Upload a PDF or document file containing your job description. 
              Our AI will automatically extract and populate all the relevant fields.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm font-medium">Features:</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• AI-powered job description parsing</li>
                <li>• Automatic field population</li>
                <li>• Quick and efficient setup</li>
                <li>• Supports PDF, DOC, DOCX formats</li>
              </ul>
            </div>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Choose This Option
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary"
          onClick={handleCreateManually}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl">Create Manually</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Fill out the job details manually using our comprehensive form. 
              Perfect for when you want full control over every detail.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm font-medium">Features:</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Complete control over job details</li>
                <li>• Step-by-step guided form</li>
                <li>• Custom field options</li>
                <li>• Rich text description editor</li>
              </ul>
            </div>
            <Button className="w-full" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Choose This Option
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <div className="max-w-2xl mx-auto text-center mt-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-2">Need Help Deciding?</h3>
            <p className="text-muted-foreground mb-4">
              If you have an existing job description document, choose the upload option for faster setup. 
              If you're creating a new job from scratch or want to customize every detail, use the manual creation option.
            </p>
            <Button variant="ghost" size="sm">
              Learn More About Job Creation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};