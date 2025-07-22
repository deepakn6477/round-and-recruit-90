import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MapPin, Building, Clock, DollarSign, ChevronDown, ChevronUp, Filter } from "lucide-react";

// Mock job data
const mockJobs = [
  {
    id: "ARCOLAB_4567",
    title: "Azure - Senior Associate",
    department: "IT & Information Security",
    location: "Bengaluru",
    employmentType: "Full Time, Permanent",
    experience: "2-5 years",
    salary: { min: 500000, max: 750000, currency: "INR" },
    status: "Active",
    applicants: 245,
    datePosted: "2024-01-15",
    description: "Design and develop integration workflows using Azure Logic Apps, Azure Functions, Service Bus, and Event Grid.",
    requirements: ["Azure certification", "5+ years experience", "Strong problem-solving skills"],
    benefits: ["Health insurance", "Flexible hours", "Remote work options"],
    jobSource: "Arcolab",
    openPositions: 3
  },
  {
    id: "STELLIS_2847",
    title: "Senior Executive - Formulation Development",
    department: "Pharmaceutical & Life Sciences",
    location: "Mumbai",
    employmentType: "Full Time, Permanent",
    experience: "3-7 years",
    salary: { min: 600000, max: 900000, currency: "INR" },
    status: "Active",
    applicants: 189,
    datePosted: "2024-01-10",
    description: "Lead formulation development projects for pharmaceutical products and ensure compliance with regulatory standards.",
    requirements: ["Pharmaceutical background", "Experience in R&D", "Regulatory knowledge"],
    benefits: ["Medical coverage", "Annual bonus", "Career advancement"],
    jobSource: "Stellis",
    openPositions: 2
  },
  {
    id: "STRIDES_9102",
    title: "Assistant Manager - Operations",
    department: "Operations",
    location: "Chennai",
    employmentType: "Full Time, Permanent",
    experience: "2-4 years",
    salary: { min: 400000, max: 650000, currency: "INR" },
    status: "Active",
    applicants: 132,
    datePosted: "2024-01-12",
    description: "Manage day-to-day operations and coordinate with various departments to ensure smooth workflow.",
    requirements: ["Operations experience", "Leadership skills", "Process improvement knowledge"],
    benefits: ["Performance bonus", "Training programs", "Work-life balance"],
    jobSource: "Strides",
    openPositions: 1
  },
  {
    id: "MANUAL_5634",
    title: "Software Engineer - Frontend",
    department: "Technology",
    location: "Pune",
    employmentType: "Full Time, Permanent",
    experience: "1-3 years",
    salary: { min: 350000, max: 600000, currency: "INR" },
    status: "Active",
    applicants: 89,
    datePosted: "2024-01-08",
    description: "Develop responsive web applications using React, TypeScript, and modern frontend technologies.",
    requirements: ["React expertise", "TypeScript knowledge", "UI/UX understanding"],
    benefits: ["Learning opportunities", "Modern workspace", "Team outings"],
    jobSource: "Manual",
    openPositions: 5
  },
  {
    id: "ARCOLAB_7832",
    title: "Data Scientist - ML Engineering",
    department: "IT & Information Security",
    location: "Hyderabad",
    employmentType: "Full Time, Permanent",
    experience: "3-6 years",
    salary: { min: 800000, max: 1200000, currency: "INR" },
    status: "Active",
    applicants: 156,
    datePosted: "2024-01-20",
    description: "Build and deploy machine learning models for predictive analytics and automation.",
    requirements: ["Python/R expertise", "ML frameworks", "Statistical analysis"],
    benefits: ["Stock options", "Research budget", "Conference allowance"],
    jobSource: "Arcolab",
    openPositions: 2
  },
  {
    id: "STELLIS_4591",
    title: "Quality Assurance Manager",
    department: "Quality Assurance",
    location: "Goa",
    employmentType: "Full Time, Permanent",
    experience: "5-8 years",
    salary: { min: 700000, max: 1000000, currency: "INR" },
    status: "Active",
    applicants: 203,
    datePosted: "2024-01-18",
    description: "Lead quality assurance initiatives and ensure compliance with pharmaceutical standards.",
    requirements: ["QA certification", "Pharma experience", "Regulatory knowledge"],
    benefits: ["Health insurance", "Performance bonus", "Training programs"],
    jobSource: "Stellis",
    openPositions: 1
  },
  {
    id: "STRIDES_6734",
    title: "Business Analyst - Finance",
    department: "Finance",
    location: "Delhi",
    employmentType: "Full Time, Permanent",
    experience: "2-4 years",
    salary: { min: 550000, max: 800000, currency: "INR" },
    status: "Active",
    applicants: 178,
    datePosted: "2024-01-16",
    description: "Analyze financial data and provide insights for strategic business decisions.",
    requirements: ["Finance background", "Excel/SQL skills", "Analytical thinking"],
    benefits: ["Flexible hours", "Professional development", "Team events"],
    jobSource: "Strides",
    openPositions: 3
  },
  {
    id: "MANUAL_8945",
    title: "UI/UX Designer",
    department: "Design",
    location: "Bangalore",
    employmentType: "Full Time, Permanent",
    experience: "2-5 years",
    salary: { min: 450000, max: 750000, currency: "INR" },
    status: "Active",
    applicants: 267,
    datePosted: "2024-01-14",
    description: "Create intuitive user interfaces and engaging user experiences for web and mobile applications.",
    requirements: ["Design tools proficiency", "User research", "Prototyping skills"],
    benefits: ["Creative workspace", "Design tools budget", "Flexible schedule"],
    jobSource: "Manual",
    openPositions: 2
  },
  {
    id: "ARCOLAB_3421",
    title: "DevOps Engineer - Cloud Infrastructure",
    department: "IT & Information Security",
    location: "Chennai",
    employmentType: "Full Time, Permanent",
    experience: "3-7 years",
    salary: { min: 900000, max: 1400000, currency: "INR" },
    status: "Active",
    applicants: 134,
    datePosted: "2024-01-19",
    description: "Design and maintain cloud infrastructure using Azure, AWS, and container technologies.",
    requirements: ["Cloud certifications", "Container orchestration", "CI/CD pipelines"],
    benefits: ["Remote work", "Certification reimbursement", "Tech allowance"],
    jobSource: "Arcolab",
    openPositions: 4
  },
  {
    id: "STELLIS_1267",
    title: "Clinical Research Associate",
    department: "Research & Development",
    location: "Mumbai",
    employmentType: "Full Time, Permanent",
    experience: "1-3 years",
    salary: { min: 400000, max: 650000, currency: "INR" },
    status: "Active",
    applicants: 198,
    datePosted: "2024-01-17",
    description: "Conduct clinical trials and ensure compliance with regulatory requirements and protocols.",
    requirements: ["Life sciences degree", "Clinical research knowledge", "Attention to detail"],
    benefits: ["Medical coverage", "Research opportunities", "Career growth"],
    jobSource: "Stellis",
    openPositions: 3
  },
  {
    id: "STRIDES_5478",
    title: "Product Manager - Digital Health",
    department: "Product Management",
    location: "Pune",
    employmentType: "Full Time, Permanent",
    experience: "4-8 years",
    salary: { min: 1200000, max: 1800000, currency: "INR" },
    status: "Active",
    applicants: 89,
    datePosted: "2024-01-21",
    description: "Lead product strategy and development for digital health platforms and solutions.",
    requirements: ["Product management experience", "Healthcare domain", "Agile methodologies"],
    benefits: ["Stock options", "Health benefits", "Learning budget"],
    jobSource: "Strides",
    openPositions: 1
  },
  {
    id: "MANUAL_7823",
    title: "Sales Manager - Enterprise",
    department: "Sales",
    location: "Gurgaon",
    employmentType: "Full Time, Permanent",
    experience: "5-10 years",
    salary: { min: 800000, max: 1300000, currency: "INR" },
    status: "Active",
    applicants: 145,
    datePosted: "2024-01-13",
    description: "Drive enterprise sales and build relationships with key clients in the healthcare sector.",
    requirements: ["Sales experience", "Healthcare industry", "Client relationship management"],
    benefits: ["Commission structure", "Travel allowance", "Performance rewards"],
    jobSource: "Manual",
    openPositions: 2
  },
  {
    id: "ARCOLAB_9156",
    title: "Cybersecurity Analyst",
    department: "IT & Information Security",
    location: "Noida",
    employmentType: "Full Time, Permanent",
    experience: "2-5 years",
    salary: { min: 600000, max: 900000, currency: "INR" },
    status: "Active",
    applicants: 167,
    datePosted: "2024-01-22",
    description: "Monitor and protect organizational systems from cybersecurity threats and vulnerabilities.",
    requirements: ["Security certifications", "Threat analysis", "Incident response"],
    benefits: ["Security training", "Certification support", "On-call allowance"],
    jobSource: "Arcolab",
    openPositions: 3
  },
  {
    id: "STELLIS_2983",
    title: "Regulatory Affairs Specialist",
    department: "Regulatory Affairs",
    location: "Ahmedabad",
    employmentType: "Full Time, Permanent",
    experience: "3-6 years",
    salary: { min: 650000, max: 950000, currency: "INR" },
    status: "Active",
    applicants: 112,
    datePosted: "2024-01-11",
    description: "Ensure regulatory compliance for pharmaceutical products and submissions to health authorities.",
    requirements: ["Regulatory experience", "Pharma knowledge", "Documentation skills"],
    benefits: ["Regulatory training", "Professional development", "Health coverage"],
    jobSource: "Stellis",
    openPositions: 2
  }
];

export const JobLandingPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All Departments");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [experienceFilter, setExperienceFilter] = useState("All Experience");
  const [jobSourceFilter, setJobSourceFilter] = useState("All Sources");
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);


  const filterJobs = (jobs: typeof mockJobs) => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = departmentFilter === "All Departments" || job.department === departmentFilter;
      const matchesLocation = locationFilter === "All Locations" || job.location === locationFilter;
      const matchesExperience = experienceFilter === "All Experience" || job.experience === experienceFilter;
      const matchesJobSource = jobSourceFilter === "All Sources" || job.jobSource === jobSourceFilter;
      
      return matchesSearch && matchesDepartment && matchesLocation && matchesExperience && matchesJobSource;
    });
  };

  const activeJobs = filterJobs(mockJobs.filter(job => job.status === "Active"));
  const inactiveJobs = filterJobs(mockJobs.filter(job => job.status === "Inactive"));
  
  const departments = ["All Departments", ...Array.from(new Set(mockJobs.map(job => job.department)))];
  const locations = ["All Locations", ...Array.from(new Set(mockJobs.map(job => job.location)))];
  const experiences = ["All Experience", ...Array.from(new Set(mockJobs.map(job => job.experience)))];
  const jobSources = ["All Sources", "Arcolab", "Stellis", "Strides", "Manual"];

  const handleJobClick = (jobId: string) => {
    navigate(`/job-details/${jobId}`);
  };

  const handlePostNewJob = () => {
    navigate("/post-new-job");
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)} LPA`;
      }
      return `${amount.toLocaleString()}`;
    };
    return `${formatAmount(salary.min)} - ${formatAmount(salary.max)}`;
  };

  const handlePlusClick = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const renderJobCard = (job: typeof mockJobs[0]) => (
    <Card 
      key={job.id} 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => handleJobClick(job.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight">{job.title}</CardTitle>
            <div className="text-sm text-muted-foreground">Job ID: {job.id}</div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{job.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={job.status === "Active" ? "default" : "secondary"}>
              {job.status}
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => handlePlusClick(e, job.id)}
            >
              {expandedJobId === job.id ? <ChevronUp className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {expandedJobId === job.id && (
        <CardContent className="pt-0 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Department:</span>
              <p className="text-muted-foreground">{job.department}</p>
            </div>
            <div>
              <span className="font-medium">Experience:</span>
              <p className="text-muted-foreground">{job.experience}</p>
            </div>
            <div>
              <span className="font-medium">Employment Type:</span>
              <p className="text-muted-foreground">{job.employmentType}</p>
            </div>
            <div>
              <span className="font-medium">Open Positions:</span>
              <p className="text-muted-foreground">{job.openPositions} positions</p>
            </div>
            <div>
              <span className="font-medium">Salary Range:</span>
              <p className="text-muted-foreground">{formatSalary(job.salary)}</p>
            </div>
            <div>
              <span className="font-medium">Applicants:</span>
              <p className="text-muted-foreground">{job.applicants} applied</p>
            </div>
            <div className="col-span-2">
              <span className="font-medium">Description:</span>
              <p className="text-muted-foreground mt-1">{job.description}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Job Management</h1>
          <p className="text-muted-foreground">Manage all your job postings and applications</p>
        </div>
        <Button onClick={handlePostNewJob} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post New Job
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept} className="text-sm">
                    {dept.length > 20 ? `${dept.substring(0, 20)}...` : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <MapPin className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <Clock className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {experiences.map((exp) => (
                  <SelectItem key={exp} value={exp} className="text-sm">
                    {exp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <Select value={jobSourceFilter} onValueChange={setJobSourceFilter}>
              <SelectTrigger>
                <Building className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Jobs from" />
              </SelectTrigger>
              <SelectContent>
                {jobSources.map((source) => (
                  <SelectItem key={source} value={source}>{source}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{mockJobs.length}</div>
            <div className="text-sm text-muted-foreground">Total Jobs</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Jobs ({activeJobs.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Jobs ({inactiveJobs.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="max-h-[600px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeJobs.map((job) => renderJobCard(job))}
            </div>
          </div>
          {activeJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No active jobs found matching your criteria</div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveJobs.map((job) => renderJobCard(job))}
          </div>
          {inactiveJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No inactive jobs found matching your criteria</div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};