import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Building, Clock, DollarSign, Users, Eye, Edit, BarChart3, Filter, X, Search, ChevronDown } from "lucide-react";
import { JobData } from "./JobManagement";
import { useNavigate } from "react-router-dom";

interface JobDetailsProps {
  jobData: JobData;
  onUpdateJobData: (jobData: JobData) => void;
}

// Mock resume data for the job
const mockResumes = [
  {
    id: "RSM118820",
    name: "Sivasankaran S",
    email: "sivasankaran773@gmail.com",
    mobile: "+91 6370892921",
    status: "HIRED",
    location: "Chennai",
    experience: "5-8 years",
    score: 85,
    matchSkills: "Azure, Logic Apps, JavaScript",
    resumeDetails: "Senior Developer with Azure expertise"
  },
  {
    id: "RSM118819",
    name: "Saguntaj Manj",
    email: "manju2041599@gmail.com", 
    mobile: "+91 7739635241",
    status: "OFFERED", 
    location: "Mumbai",
    experience: "2-5 years",
    score: 78,
    matchSkills: "React, Node.js, MongoDB",
    resumeDetails: "Full Stack Developer"
  },
  {
    id: "RSM118818",
    name: "GOWTHAMI A",
    email: "gowthami456@gmail.com",
    mobile: "+91 9025856241",
    status: "INTERVIEW STAGE",
    location: "Bengaluru",
    experience: "2-5 years",
    score: 92,
    matchSkills: "Python, Django, PostgreSQL",
    resumeDetails: "Backend Developer with Python expertise"
  },
  {
    id: "RSM118821",
    name: "Rajesh Kumar",
    email: "rajesh.k@gmail.com",
    mobile: "+91 9876543210",
    status: "REJECTED",
    location: "Delhi",
    experience: "0-2 years",
    score: 45,
    matchSkills: "Java, Spring Boot, MySQL",
    resumeDetails: "Junior Java Developer"
  },
  {
    id: "RSM118822",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    mobile: "+91 8765432109",
    status: "ON HOLD",
    location: "Hyderabad",
    experience: "8+ years",
    score: 88,
    matchSkills: "Angular, TypeScript, Node.js",
    resumeDetails: "Senior Frontend Architect"
  }
];

const statusColors = {
  "HIRED": "bg-green-100 text-green-800",
  "OFFERED": "bg-blue-100 text-blue-800", 
  "INTERVIEW STAGE": "bg-yellow-100 text-yellow-800",
  "REJECTED": "bg-red-100 text-red-800",
  "ON HOLD": "bg-orange-100 text-orange-800"
};

export function JobDetails({ jobData, onUpdateJobData }: JobDetailsProps) {
  const navigate = useNavigate();
  
  // Filter states
  const [filters, setFilters] = useState({
    status: [] as string[],
    score: [] as string[],
    matchSkills: "",
    experience: [] as string[],
    location: [] as string[]
  });
  
  // Available filter options
  const statusOptions = ["HIRED", "OFFERED", "INTERVIEW STAGE", "REJECTED", "ON HOLD"];
  const scoreRanges = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90", "90-100"];
  const experienceOptions = ["0-2 years", "2-5 years", "5-8 years", "8+ years"];
  const locationOptions = ["Bengaluru", "Mumbai", "Chennai", "Delhi", "Hyderabad"];
  
  // Filter the resumes based on active filters
  const filteredResumes = mockResumes.filter(resume => {
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(resume.status)) {
      return false;
    }
    
    // Score filter
    if (filters.score.length > 0) {
      const matchesScore = filters.score.some(range => {
        const [min, max] = range.split('-').map(Number);
        return resume.score >= min && resume.score <= max;
      });
      if (!matchesScore) return false;
    }
    
    // Match skills filter (text search)
    if (filters.matchSkills && !resume.matchSkills.toLowerCase().includes(filters.matchSkills.toLowerCase())) {
      return false;
    }
    
    // Experience filter
    if (filters.experience.length > 0 && !filters.experience.includes(resume.experience)) {
      return false;
    }
    
    // Location filter
    if (filters.location.length > 0 && !filters.location.includes(resume.location)) {
      return false;
    }
    
    return true;
  });
  
  const updateFilter = (filterType: keyof typeof filters, value: string | string[]) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const toggleMultiSelectFilter = (filterType: 'status' | 'score' | 'experience' | 'location', value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value) 
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [filterType]: newValues
      };
    });
  };
  
  const clearAllFilters = () => {
    setFilters({
      status: [],
      score: [],
      matchSkills: "",
      experience: [],
      location: []
    });
  };
  
  const hasActiveFilters = filters.status.length > 0 || filters.score.length > 0 || 
    filters.matchSkills !== "" || filters.experience.length > 0 || filters.location.length > 0;
  
  const handleInputChange = (field: keyof JobData, value: any) => {
    onUpdateJobData({
      ...jobData,
      [field]: value
    });
  };

  const handleResumeClick = (resumeId: string) => {
    navigate(`/candidate-details/${resumeId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Update Job Data</h2>
          <p className="text-muted-foreground">Configure job details and requirements</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate(`/job-summary/${jobData.id}`)}
          >
            <BarChart3 className="h-4 w-4" />
            Job Summary
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            View Job ID
          </Button>
        </div>
      </div>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Sources</CardTitle>
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

      {/* Job Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="job-title">Job Title *</Label>
              <Input
                id="job-title"
                value={jobData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter job title"
              />
            </div>

            <div>
              <Label htmlFor="employment-type">Employment Type *</Label>
              <Select value={jobData.employmentType} onValueChange={(value) => handleInputChange('employmentType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment type" />
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
              <Label htmlFor="department">Department</Label>
              <Select value={jobData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IT & Information Security">IT & Information Security</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Select value={jobData.location} onValueChange={(value) => handleInputChange('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bengaluru">Bengaluru</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Experience & Compensation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="experience">Experience Required</Label>
              <Select value={jobData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-2 years">0-2 years</SelectItem>
                  <SelectItem value="2-5 years">2-5 years</SelectItem>
                  <SelectItem value="5-8 years">5-8 years</SelectItem>
                  <SelectItem value="8+ years">8+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-salary">Min Salary</Label>
                <Input
                  id="min-salary"
                  type="number"
                  value={jobData.salary.min}
                  onChange={(e) => handleInputChange('salary', { ...jobData.salary, min: parseInt(e.target.value) })}
                  placeholder="500000"
                />
              </div>
              <div>
                <Label htmlFor="max-salary">Max Salary</Label>
                <Input
                  id="max-salary"
                  type="number"
                  value={jobData.salary.max}
                  onChange={(e) => handleInputChange('salary', { ...jobData.salary, max: parseInt(e.target.value) })}
                  placeholder="750000"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="hide-salary" />
              <Label htmlFor="hide-salary">Hide Salary Details from candidates</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="diversity" defaultChecked />
              <Label htmlFor="diversity" className="text-sm">
                Hire Women candidates for this role and promote diversity in workplace
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Qualifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Qualifications & Skills
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="course-type">Course Type</Label>
              <Select>
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
              <Label htmlFor="qualification">Qualification</Label>
              <Input
                id="qualification"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                placeholder="e.g., Software Engineering"
              />
            </div>
          </div>

          <div>
            <Label>Selected Qualifications</Label>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                B.Tech B.E. - Computers
                <button className="ml-1 text-xs">×</button>
              </Badge>
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Add Key Skills</Label>
            <div className="flex gap-2">
              <Input
                id="skills"
                placeholder="e.g., Azure, Logic Apps"
                className="flex-1"
              />
              <Button variant="outline">Add Skill</Button>
            </div>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                Azure
                <button className="ml-1 text-xs">×</button>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={jobData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter detailed job description..."
            className="min-h-[200px]"
          />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Design and develop integration workflows using Azure Logic Apps, Azure Functions, Service Bus, and Event Grid</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Integrate diverse on-premises and cloud systems (e.g., ERP, CRM, Databases, APIs)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Build and maintain connectors, custom APIs, and triggers for scalable solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">Optimize and troubleshoot existing Logic Apps workflows for performance and reliability</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" disabled className="opacity-50">
              Publish
            </Button>
            <Button variant="outline">
              Unpublish
            </Button>
            <Button variant="outline" disabled className="opacity-50">
              Save
            </Button>
            <Button variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resume List Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Candidate Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Filter className="h-5 w-5" />
                Filters
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="ml-auto"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {filters.status.length > 0 ? (
                          <span>{filters.status.length} selected</span>
                        ) : (
                          <span className="text-muted-foreground">Select status</span>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-4 space-y-2">
                        {statusOptions.map(status => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.status.includes(status)}
                              onCheckedChange={() => toggleMultiSelectFilter('status', status)}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm cursor-pointer">
                              {status}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Score Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Score Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {filters.score.length > 0 ? (
                          <span>{filters.score.length} selected</span>
                        ) : (
                          <span className="text-muted-foreground">Select score range</span>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-4 space-y-2 max-h-48 overflow-y-auto">
                        {scoreRanges.map(range => (
                          <div key={range} className="flex items-center space-x-2">
                            <Checkbox
                              id={`score-${range}`}
                              checked={filters.score.includes(range)}
                              onCheckedChange={() => toggleMultiSelectFilter('score', range)}
                            />
                            <Label htmlFor={`score-${range}`} className="text-sm cursor-pointer">
                              {range}%
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Match Skills Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Match Skills</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search skills..."
                      value={filters.matchSkills}
                      onChange={(e) => updateFilter('matchSkills', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Experience</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {filters.experience.length > 0 ? (
                          <span>{filters.experience.length} selected</span>
                        ) : (
                          <span className="text-muted-foreground">Select experience</span>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-4 space-y-2">
                        {experienceOptions.map(exp => (
                          <div key={exp} className="flex items-center space-x-2">
                            <Checkbox
                              id={`exp-${exp}`}
                              checked={filters.experience.includes(exp)}
                              onCheckedChange={() => toggleMultiSelectFilter('experience', exp)}
                            />
                            <Label htmlFor={`exp-${exp}`} className="text-sm cursor-pointer">
                              {exp}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Location</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between text-left font-normal"
                      >
                        {filters.location.length > 0 ? (
                          <span>{filters.location.length} selected</span>
                        ) : (
                          <span className="text-muted-foreground">Select location</span>
                        )}
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0" align="start">
                      <div className="p-4 space-y-2">
                        {locationOptions.map(location => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox
                              id={`loc-${location}`}
                              checked={filters.location.includes(location)}
                              onCheckedChange={() => toggleMultiSelectFilter('location', location)}
                            />
                            <Label htmlFor={`loc-${location}`} className="text-sm cursor-pointer">
                              {location}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Active Filter Tags */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    {filters.status.map(status => (
                      <Badge key={status} variant="secondary" className="flex items-center gap-1">
                        Status: {status}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleMultiSelectFilter('status', status)}
                        />
                      </Badge>
                    ))}
                    {filters.score.map(score => (
                      <Badge key={score} variant="secondary" className="flex items-center gap-1">
                        Score: {score}%
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleMultiSelectFilter('score', score)}
                        />
                      </Badge>
                    ))}
                    {filters.matchSkills && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Skills: {filters.matchSkills}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => updateFilter('matchSkills', "")}
                        />
                      </Badge>
                    )}
                    {filters.experience.map(exp => (
                      <Badge key={exp} variant="secondary" className="flex items-center gap-1">
                        Experience: {exp}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleMultiSelectFilter('experience', exp)}
                        />
                      </Badge>
                    ))}
                    {filters.location.map(loc => (
                      <Badge key={loc} variant="secondary" className="flex items-center gap-1">
                        Location: {loc}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => toggleMultiSelectFilter('location', loc)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">S.No</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resume ID</TableHead>
                  <TableHead>Resume Details & Summary</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Match Skills</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResumes.map((resume, index) => (
                  <TableRow key={resume.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResumeClick(resume.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{resume.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{resume.name}</div>
                        <div className="text-sm text-muted-foreground">{resume.resumeDetails}</div>
                      </div>
                    </TableCell>
                    <TableCell>{resume.email}</TableCell>
                    <TableCell>{resume.mobile}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[resume.status as keyof typeof statusColors]}>
                        {resume.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                          {resume.score}
                        </div>
                        <span className="text-sm">%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="text-sm">{resume.matchSkills}</div>
                      </div>
                    </TableCell>
                    <TableCell>{resume.experience}</TableCell>
                    <TableCell>{resume.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}