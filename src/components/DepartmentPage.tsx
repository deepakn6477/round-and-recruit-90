import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Department {
  id: number;
  department: string;
  code: string;
  division: string;
  businessUnit: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

const mockDepartments: Department[] = [
  {
    id: 1,
    department: "IT",
    code: "Arcolab-ba",
    division: "Arcolab Bangalore",
    businessUnit: "Arcolab",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-23",
    updatedBy: "",
    updatedOn: ""
  },
  {
    id: 2,
    department: "HRTA",
    code: "Arcolab-ba",
    division: "Arcolab Bangalore",
    businessUnit: "Arcolab",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-23",
    updatedBy: "Michael Khundrakpam S",
    updatedOn: "10-Jul-23"
  },
  {
    id: 3,
    department: "PMO",
    code: "Arcolab-ba",
    division: "Arcolab Bangalore",
    businessUnit: "Arcolab",
    createdBy: "Bharath Kumar P",
    createdOn: "10-Jul-23",
    updatedBy: "Michael Khundrakpam S",
    updatedOn: "10-Jul-23"
  }
];

export function DepartmentPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    department: "",
    departmentCode: "",
    division: "",
    businessUnit: ""
  });

  const filteredDepartments = departments.filter(dept =>
    dept.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newDepartment.department && newDepartment.departmentCode && newDepartment.division && newDepartment.businessUnit) {
      const newDept: Department = {
        id: departments.length + 1,
        department: newDepartment.department,
        code: newDepartment.departmentCode,
        division: newDepartment.division,
        businessUnit: newDepartment.businessUnit,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
        updatedBy: "Current User",
        updatedOn: new Date().toISOString().split('T')[0]
      };
      setDepartments([...departments, newDept]);
      setNewDepartment({
        department: "",
        departmentCode: "",
        division: "",
        businessUnit: ""
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Admin/Department</h1>
            <p className="text-muted-foreground">Manage department details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* New Department Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Department</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Department *</label>
                <Input
                  placeholder="Department name"
                  value={newDepartment.department}
                  onChange={(e) => setNewDepartment({ ...newDepartment, department: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Department Code *</label>
                <Input
                  placeholder="Department code"
                  value={newDepartment.departmentCode}
                  onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Select Division *</label>
                <Select value={newDepartment.division} onValueChange={(value) => setNewDepartment({ ...newDepartment, division: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arcolab Bangalore">Arcolab Bangalore</SelectItem>
                    <SelectItem value="Arcolab Chennai">Arcolab Chennai</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Business Unit *</label>
                <Select value={newDepartment.businessUnit} onValueChange={(value) => setNewDepartment({ ...newDepartment, businessUnit: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arcolab">Arcolab</SelectItem>
                    <SelectItem value="Stellis">Stellis</SelectItem>
                    <SelectItem value="Strides">Strides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                CANCEL
              </Button>
              <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
                CREATE
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Controls */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Department
        </Button>
      </div>

      {/* Departments Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Department</TableHead>
              <TableHead className="text-white font-medium">Code</TableHead>
              <TableHead className="text-white font-medium">Division</TableHead>
              <TableHead className="text-white font-medium">Business Unit</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department, index) => (
              <TableRow key={department.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{department.department}</TableCell>
                <TableCell>{department.code}</TableCell>
                <TableCell>{department.division}</TableCell>
                <TableCell>{department.businessUnit}</TableCell>
                <TableCell>{department.createdBy}</TableCell>
                <TableCell>{department.createdOn}</TableCell>
                <TableCell>{department.updatedBy}</TableCell>
                <TableCell>{department.updatedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(department.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-60 right-0 flex justify-between items-center bg-green-600 text-white p-4 z-50">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-white text-black px-2 py-1 rounded">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <span>1 - {filteredDepartments.length} of {filteredDepartments.length}</span>
      </div>
    </div>
  );
}