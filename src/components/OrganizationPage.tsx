import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Organization {
  id: number;
  organization: string;
  code: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

const mockOrganizations: Organization[] = [
  {
    id: 1,
    organization: "Arcolab",
    code: "0001",
    createdBy: "Admin",
    createdOn: "2024-01-15",
    updatedBy: "Admin",
    updatedOn: "2024-01-15"
  }
];

export function OrganizationPage() {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState<Organization[]>(mockOrganizations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newOrg, setNewOrg] = useState({ organization: "", code: "" });

  const filteredOrganizations = organizations.filter(org =>
    org.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    org.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newOrg.organization && newOrg.code) {
      const newOrganization: Organization = {
        id: organizations.length + 1,
        organization: newOrg.organization,
        code: newOrg.code,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
        updatedBy: "Current User",
        updatedOn: new Date().toISOString().split('T')[0]
      };
      setOrganizations([...organizations, newOrganization]);
      setNewOrg({ organization: "", code: "" });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setOrganizations(organizations.filter(org => org.id !== id));
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
            <h1 className="text-2xl font-bold">Admin/Organization</h1>
            <p className="text-muted-foreground">Manage organization details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* New Organization Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Organization *</label>
                <Input
                  placeholder="Organization name"
                  value={newOrg.organization}
                  onChange={(e) => setNewOrg({ ...newOrg, organization: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Code *</label>
                <Input
                  placeholder="Organization code"
                  value={newOrg.code}
                  onChange={(e) => setNewOrg({ ...newOrg, code: e.target.value })}
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search organizations..."
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
          New Organization
        </Button>
      </div>

      {/* Organizations Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Organization</TableHead>
              <TableHead className="text-white font-medium">Code</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrganizations.map((org, index) => (
              <TableRow key={org.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{org.organization}</TableCell>
                <TableCell>{org.code}</TableCell>
                <TableCell>{org.createdBy}</TableCell>
                <TableCell>{org.createdOn}</TableCell>
                <TableCell>{org.updatedBy}</TableCell>
                <TableCell>{org.updatedOn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 text-green-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(org.id)}
                    >
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center bg-green-600 text-white p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="bg-white text-black px-2 py-1 rounded">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <span>1 - {mockOrganizations.length} of {mockOrganizations.length}</span>
        </div>
      </div>
    </div>
  );
}