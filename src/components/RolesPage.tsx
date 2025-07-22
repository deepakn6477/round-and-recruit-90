import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Role {
  id: number;
  role: string;
  member: number;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

const mockRoles: Role[] = [
  {
    id: 1,
    role: "QA",
    member: 2,
    createdBy: "pranit way",
    createdOn: "07-Jul-2023",
    updatedBy: "swarna latha",
    updatedOn: "05-Mar-2025"
  },
  {
    id: 2,
    role: "Recruiter",
    member: 16,
    createdBy: "swarna latha",
    createdOn: "11-Dec-2024",
    updatedBy: "swarna latha",
    updatedOn: "05-Mar-2025"
  },
  {
    id: 3,
    role: "Admin",
    member: 18,
    createdBy: "",
    createdOn: "",
    updatedBy: "swarna latha",
    updatedOn: "31-Jan-2025"
  }
];

export function RolesPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [newRole, setNewRole] = useState("");

  const filteredRoles = roles.filter(role =>
    role.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newRole) {
      const newRoleObj: Role = {
        id: roles.length + 1,
        role: newRole,
        member: 0,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
        updatedBy: "Current User",
        updatedOn: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, newRoleObj]);
      setNewRole("");
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleViewMembers = () => {
    if (selectedRole) {
      // Navigate to view members for selected role
      console.log(`Viewing members for role: ${selectedRole}`);
    }
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
            <h1 className="text-2xl font-bold">Admin/Roles</h1>
            <p className="text-muted-foreground">Manage role details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* Select Role For View Member */}
      <Card>
        <CardHeader>
          <CardTitle>Select Role For View Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium">Select Role *</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.role}>
                      {role.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleViewMembers}
              className="bg-green-600 hover:bg-green-700"
              disabled={!selectedRole}
            >
              VIEW MEMBERS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* New Role Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Role Name *</label>
              <Input
                placeholder="Enter role name"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              />
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
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
          />
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          NEW ROLE
        </Button>
      </div>

      {/* Roles Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Role</TableHead>
              <TableHead className="text-white font-medium">Member</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role, index) => (
              <TableRow key={role.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{role.role}</TableCell>
                <TableCell>{role.member}</TableCell>
                <TableCell>{role.createdBy}</TableCell>
                <TableCell>{role.createdOn}</TableCell>
                <TableCell>{role.updatedBy}</TableCell>
                <TableCell>{role.updatedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(role.id)}
                  >
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Footer */}
      <div className="flex justify-between items-center bg-green-600 text-white p-4 rounded">
        <span>Rows per page: 25</span>
        <span>1 - {filteredRoles.length} of {filteredRoles.length}</span>
      </div>
    </div>
  );
}