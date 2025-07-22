import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, DollarSign, Users, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobFormData {
  title: string;
  employmentType: string;
  department: string;
  location: string;
  minExperience: string;
  maxExperience: string;
  minSalary: string;
  maxSalary: string;
  salaryCurrency: string;
  description: string;
  skills: string[];
  qualifications: string[];
  courseType: string;
  qualification: string;
  specialization: string;
  notifyEmail: string;
  organizationName: string;
  website: string;
  hideSalary: boolean;
  promoteWomen: boolean;
}

export const CreateJob = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const extractedData = location.state?.extractedData;

  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    employmentType: "",
    department: "",
    location: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    salaryCurrency: "INR",
    description: "",
    skills: [],
    qualifications: [],
    courseType: "",
    qualification: "",
    specialization: "",
    notifyEmail: "",
    organizationName: "",
    website: "",
    hideSalary: false,
    promoteWomen: false
  });

  const [currentSkill, setCurrentSkill] = useState("");

  useEffect(() => {
    if (extractedData) {
      setFormData(prev => ({
        ...prev,
        title: extractedData.title || "",
        description: extractedData.requiredSkills || "",
        // You can add more mappings here based on the extracted data structure
      }));
    }
  }, [extractedData]);

  const handleInputChange = (field: keyof JobFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title || !formData.employmentType) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save the job data
    toast({
      title: "Job Created Successfully",
      description: "Your job posting has been created and is now live.",
    });

    // Navigate back to job landing page
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/post-new-job");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate("/post-new-job")}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {extractedData ? "Update Job Data" : "Post New Job"}
          </h1>
          <p className="text-muted-foreground">
            {extractedData ? "Review and update the extracted job information" : "Fill in the job details manually"}
          </p>
        </div>
        <Button className="ml-auto">View Job ID</Button>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Select Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Select Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="naukri" defaultChecked />
                <Label htmlFor="naukri">Naukri</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="linkedin" />
                <Label htmlFor="linkedin">LinkedIn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="career" />
                <Label htmlFor="career">Career</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="job-title">Job Title / Designation *</Label>
                <Input
                  id="job-title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>

              <div>
                <Label htmlFor="employment-type">Employment Type *</Label>
                <Select value={formData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Full Time, Permanent" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Time, Permanent">Full Time, Permanent</SelectItem>
                    <SelectItem value="Part Time">Part Time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="department">Functional Area *</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Consulting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pharmaceutical & Life Sciences">Pharmaceutical & Life Sciences</SelectItem>
                    <SelectItem value="IT & Information Security">IT & Information Security</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="work-mode">Work Mode *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Hybrid" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="On-site">On-site</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Experience & Salary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="job-code">Job Code *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Engagement Manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engagement-manager">Engagement Manager</SelectItem>
                    <SelectItem value="senior-manager">Senior Manager</SelectItem>
                    <SelectItem value="associate">Associate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="city">City *</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    value="Bangalore Rural" 
                    readOnly 
                    className="bg-muted"
                  />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="promote-women" 
                  checked={formData.promoteWomen}
                  onCheckedChange={(checked) => handleInputChange('promoteWomen', checked)}
                />
                <Label htmlFor="promote-women" className="text-sm">
                  Hire Women candidates for this role and promote diversity in workplace
                </Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Work Experience *</Label>
                  <Select value={formData.minExperience} onValueChange={(value) => handleInputChange('minExperience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="3" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Max Work Experience *</Label>
                  <Select value={formData.maxExperience} onValueChange={(value) => handleInputChange('maxExperience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7,8,9,10,15,20].map(num => (
                        <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Salary *</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="INR">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INR">₹</SelectItem>
                        <SelectItem value="USD">$</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={formData.minSalary} onValueChange={(value) => handleInputChange('minSalary', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="50000" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50000">50000</SelectItem>
                        <SelectItem value="100000">100000</SelectItem>
                        <SelectItem value="200000">200000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Max Salary *</Label>
                  <Select value={formData.maxSalary} onValueChange={(value) => handleInputChange('maxSalary', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="170000" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100000">100000</SelectItem>
                      <SelectItem value="170000">170000</SelectItem>
                      <SelectItem value="300000">300000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hide-salary" 
                  checked={formData.hideSalary}
                  onCheckedChange={(checked) => handleInputChange('hideSalary', checked)}
                />
                <Label htmlFor="hide-salary">Hide Salary Details from candidates</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills and Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Qualifications & Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Course Type *</Label>
                <Select value={formData.courseType} onValueChange={(value) => handleInputChange('courseType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btech">B.Tech</SelectItem>
                    <SelectItem value="mtech">M.Tech</SelectItem>
                    <SelectItem value="mca">MCA</SelectItem>
                    <SelectItem value="bca">BCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Qualification *</Label>
                <Input
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  placeholder="Computer Science"
                />
              </div>

              <div>
                <Label>Specialization *</Label>
                <Input
                  value={formData.specialization}
                  onChange={(e) => handleInputChange('specialization', e.target.value)}
                  placeholder="Software Engineering"
                />
                <Button variant="outline" size="sm" className="mt-2">
                  Add Qualification
                </Button>
              </div>
            </div>

            <div>
              <Label>Selected Qualifications:</Label>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="flex items-center gap-2">
                  B.Pharma - Pharmacy
                  <X className="w-3 h-3 cursor-pointer" />
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  M.Pharma - Pharmacy
                  <X className="w-3 h-3 cursor-pointer" />
                </Badge>
              </div>
            </div>

            <div>
              <Label>Add Key Skill</Label>
              <div className="flex gap-2">
                <Input
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  placeholder="Enter skill"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} variant="outline">
                  Add Skill
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-2">
                    {skill}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <Button variant="outline" size="sm">B</Button>
              <Button variant="outline" size="sm">I</Button>
              <Button variant="outline" size="sm">U</Button>
              <Button variant="outline" size="sm">≡</Button>
              <Button variant="outline" size="sm">≡</Button>
            </div>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter Description"
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>

        {/* Organization Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Notify Email *</Label>
            <Input
              value={formData.notifyEmail}
              onChange={(e) => handleInputChange('notifyEmail', e.target.value)}
              placeholder="user1.user@gmail.com"
            />
          </div>
          <div>
            <Label>Organization Name *</Label>
            <Select value={formData.organizationName} onValueChange={(value) => handleInputChange('organizationName', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company1">Company 1</SelectItem>
                <SelectItem value="company2">Company 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Website *</Label>
            <Input
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="https://company.com"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Job
          </Button>
        </div>
      </div>
    </div>
  );
};