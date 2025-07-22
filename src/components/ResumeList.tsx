import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, Download, Search } from "lucide-react";

// Mock data for resumes
const mockResumes = [
  {
    id: "RSM118820",
    name: "Sivasankaran S",
    email: "sivasankaran773@gmail.com",
    mobile: "+91 6370892921",
    status: "HIRED",
    location: "Chennai",
    experience: "5-7 years"
  },
  {
    id: "RSM118819",
    name: "Saguntaj Manj",
    email: "manju2041599@gmail.com", 
    mobile: "+91 7739635241",
    status: "HIRED", 
    location: "Mumbai",
    experience: "3-5 years"
  },
  {
    id: "RSM118818",
    name: "GOWTHAMI A",
    email: "gowthami456@gmail.com",
    mobile: "+91 9025856241",
    status: "HIRED",
    location: "Bangalore",
    experience: "2-4 years"
  },
  {
    id: "RSM118817",
    name: "Dhivakaran P",
    email: "dhivakarannmut@gmail.com",
    mobile: "+91 9944442461",
    status: "OFFERED",
    location: "Chennai",
    experience: "4-6 years"
  },
  {
    id: "RSM118816",
    name: "Kishore R",
    email: "kishore@example.com",
    mobile: "+91 9043393051",
    status: "INTERVIEW STAGE",
    location: "Hyderabad",
    experience: "6-8 years"
  }
];

const statusColors = {
  "HIRED": "bg-green-100 text-green-800",
  "OFFERED": "bg-blue-100 text-blue-800", 
  "INTERVIEW STAGE": "bg-yellow-100 text-yellow-800",
  "REJECTED": "bg-red-100 text-red-800",
  "ON HOLD": "bg-orange-100 text-orange-800"
};

export const ResumeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [experienceFrom, setExperienceFrom] = useState("");
  const [experienceTo, setExperienceTo] = useState("");
  const [location, setLocation] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");

  const handleEdit = (resumeId: string) => {
    navigate(`/candidate-details/${resumeId}`);
  };

  const filteredResumes = mockResumes.filter(resume => {
    return resume.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           resume.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           resume.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resume List</h1>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Input
          placeholder="Experience From"
          value={experienceFrom}
          onChange={(e) => setExperienceFrom(e.target.value)}
        />
        <Input
          placeholder="Experience To"
          value={experienceTo}
          onChange={(e) => setExperienceTo(e.target.value)}
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Select value={uploadedBy} onValueChange={setUploadedBy}>
          <SelectTrigger>
            <SelectValue placeholder="Uploaded By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="hr">HR</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">CLEAR FIELDS</Button>
      </div>

      {/* Status Summary */}
      <div className="flex flex-wrap gap-4">
        <Badge variant="outline">ALL - 118545</Badge>
        <Badge variant="outline" className="text-green-600">HIRED - 1967</Badge>
        <Badge variant="outline" className="text-blue-600">OFFERED - 0</Badge>
        <Badge variant="outline" className="text-yellow-600">INTERVIEW STAGE - 01</Badge>
        <Badge variant="outline" className="text-orange-600">ON HOLD - 01</Badge>
        <Badge variant="outline" className="text-red-600">REJECTED - 0</Badge>
        <Badge variant="outline" className="text-gray-600">DECLINED - 0</Badge>
        <Badge variant="outline" className="text-gray-800">BLACKLISTED - 0</Badge>
      </div>

      {/* Resume Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">S.No</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resume ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile No</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Educational</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Current Company</TableHead>
              <TableHead>Industry Type</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Skills</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Preferred Location</TableHead>
              <TableHead>Notice</TableHead>
              <TableHead>L CTC</TableHead>
              <TableHead>E CTC</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResumes.map((resume, index) => (
              <TableRow key={resume.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(resume.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{resume.id}</TableCell>
                <TableCell>{resume.name}</TableCell>
                <TableCell>{resume.email}</TableCell>
                <TableCell>{resume.mobile}</TableCell>
                <TableCell>
                  <Badge className={statusColors[resume.status as keyof typeof statusColors]}>
                    {resume.status}
                  </Badge>
                </TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>{resume.experience}</TableCell>
                <TableCell>
                  <Button variant="link" className="text-green-600 p-0">VIEW</Button>
                </TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>{resume.location}</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
                <TableCell>N/A</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};