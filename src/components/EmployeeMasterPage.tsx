import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  name: string;
  employeeId: string;
  role: string;
  email: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
  isActive: boolean;
}

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: "Manjesh Anantram Nayak",
    employeeId: "3703795",
    role: "Recruiter",
    email: "Manjesh.Nayak@arcolab.com",
    createdBy: "Adarsh U",
    createdOn: "09-Jul-2025",
    updatedBy: "",
    updatedOn: "",
    isActive: true
  },
  {
    id: 2,
    name: "Adarsh U",
    employeeId: "180169",
    role: "Admin",
    email: "Adarsh.U@arcolab.com",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "swarna latha",
    updatedOn: "12-Jun-2025",
    isActive: true
  },
  {
    id: 3,
    name: "EMAIL INTEGRATION",
    employeeId: "NEWEMAIL",
    role: "Admin",
    email: "swarmalatha.ki@neviton.com",
    createdBy: "swarna latha",
    createdOn: "14-May-2025",
    updatedBy: "",
    updatedOn: "",
    isActive: true
  },
  {
    id: 4,
    name: "DB STRIDES",
    employeeId: "NEWDBSTR",
    role: "Admin",
    email: "strides@gmail.com",
    createdBy: "swarna latha",
    createdOn: "23-Dec-2024",
    updatedBy: "",
    updatedOn: "",
    isActive: true
  },
  {
    id: 5,
    name: "DB ARCOLAB",
    employeeId: "NEWDBAR",
    role: "Admin",
    email: "arcolab@gmail.com",
    createdBy: "swarna latha",
    createdOn: "23-Dec-2024",
    updatedBy: "",
    updatedOn: "",
    isActive: true
  },
  {
    id: 6,
    name: "DB STELLIS",
    employeeId: "NEWDBSTL",
    role: "Admin",
    email: "stellis@gmail.com",
    createdBy: "swarna latha",
    createdOn: "23-Dec-2024",
    updatedBy: "",
    updatedOn: "",
    isActive: true
  },
  {
    id: 7,
    name: "Silvaster Antony",
    employeeId: "40001949",
    role: "Recruiter",
    email: "silvaster.antony@arcolab.com",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "swarna latha",
    updatedOn: "11-Dec-2024",
    isActive: true
  },
  {
    id: 8,
    name: "Sivashankar Mohanty",
    employeeId: "180561",
    role: "Recruiter",
    email: "Sivashankar.Mohanty@arcolab.com",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "swarna latha",
    updatedOn: "11-Dec-2024",
    isActive: true
  },
  {
    id: 9,
    name: "Anupama KV",
    employeeId: "180557",
    role: "Recruiter",
    email: "Anupama.KV@arcolab.com",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "swarna latha",
    updatedOn: "11-Dec-2024",
    isActive: true
  },
  {
    id: 10,
    name: "Nikhila Dalapati",
    employeeId: "180519",
    role: "Recruiter",
    email: "nikhila.d@arcolab.com",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "Srinivas Makala",
    updatedOn: "11-Dec-2024",
    isActive: true
  }
];

export function EmployeeMasterPage() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [isCreating, setIsCreating] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    role: "",
    email: ""
  });

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Active" ? emp.isActive : !emp.isActive;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    if (newEmployee.name && newEmployee.employeeId && newEmployee.role && newEmployee.email) {
      const newEmp: Employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        employeeId: newEmployee.employeeId,
        role: newEmployee.role,
        email: newEmployee.email,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
        updatedBy: "",
        updatedOn: "",
        isActive: true
      };
      setEmployees([...employees, newEmp]);
      setNewEmployee({
        name: "",
        employeeId: "",
        role: "",
        email: ""
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const toggleEmployeeStatus = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    ));
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
            <h1 className="text-2xl font-bold">Admin/Employee Master</h1>
            <p className="text-muted-foreground">Manage employee details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD
          </Button>
          <Button 
            onClick={() => setIsCreating(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            NEW EMPLOYEE
          </Button>
        </div>
      </div>

      {/* New Employee Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Employee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Name *</label>
                <Input
                  placeholder="Employee name"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Employee ID *</label>
                <Input
                  placeholder="Employee ID"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee({ ...newEmployee, employeeId: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Role *</label>
                <Select value={newEmployee.role} onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Recruiter">Recruiter</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input
                  type="email"
                  placeholder="Employee email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
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
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employees Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Name</TableHead>
              <TableHead className="text-white font-medium">Employee ID</TableHead>
              <TableHead className="text-white font-medium">Role</TableHead>
              <TableHead className="text-white font-medium">Email</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Active/Inactive</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee, index) => (
              <TableRow key={employee.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.createdBy}</TableCell>
                <TableCell>{employee.createdOn}</TableCell>
                <TableCell>{employee.updatedBy}</TableCell>
                <TableCell>{employee.updatedOn}</TableCell>
                <TableCell>
                  <Switch 
                    checked={employee.isActive}
                    onCheckedChange={() => toggleEmployeeStatus(employee.id)}
                  />
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
        <span>1 - 25 of 26</span>
        <Button variant="ghost" className="text-white hover:bg-green-700">
          Next &gt;
        </Button>
      </div>
    </div>
  );
}