import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BusinessUnit {
  id: number;
  businessUnit: string;
  organization: string;
  location: string;
  createdBy: string;
  createdOn: string;
  updatedBy?: string;
  updatedOn?: string;
}

const mockBusinessUnits: BusinessUnit[] = [
  {
    id: 1,
    businessUnit: "Arcolab",
    organization: "Arcolab",
    location: "Bangalore",
    createdBy: "pranit way",
    createdOn: "07-Jul-2023",
    updatedBy: "",
    updatedOn: ""
  }
];

export function BusinessUnitPage() {
  const navigate = useNavigate();
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>(mockBusinessUnits);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newBusinessUnit, setNewBusinessUnit] = useState({
    businessUnit: "",
    location: "",
    organization: ""
  });

  const filteredBusinessUnits = businessUnits.filter(bu =>
    bu.businessUnit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bu.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bu.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newBusinessUnit.businessUnit && newBusinessUnit.location && newBusinessUnit.organization) {
      const newBU: BusinessUnit = {
        id: businessUnits.length + 1,
        businessUnit: newBusinessUnit.businessUnit,
        organization: newBusinessUnit.organization,
        location: newBusinessUnit.location,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
      };
      setBusinessUnits([...businessUnits, newBU]);
      setNewBusinessUnit({
        businessUnit: "",
        location: "",
        organization: ""
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setBusinessUnits(businessUnits.filter(bu => bu.id !== id));
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
            <h1 className="text-2xl font-bold">Admin/Business Unit</h1>
            <p className="text-muted-foreground">Manage business unit details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* New Business Unit Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Business Unit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Business Unit *</label>
                <Input
                  placeholder="Business unit name"
                  value={newBusinessUnit.businessUnit}
                  onChange={(e) => setNewBusinessUnit({ ...newBusinessUnit, businessUnit: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location *</label>
                <Select value={newBusinessUnit.location} onValueChange={(value) => setNewBusinessUnit({ ...newBusinessUnit, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                    <SelectItem value="Chennai">Chennai</SelectItem>
                    <SelectItem value="Mumbai">Mumbai</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Organization *</label>
                <Select value={newBusinessUnit.organization} onValueChange={(value) => setNewBusinessUnit({ ...newBusinessUnit, organization: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
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
            placeholder="Search business units..."
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
          New Business Unit
        </Button>
      </div>

      {/* Business Units Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Business Unit</TableHead>
              <TableHead className="text-white font-medium">Organization</TableHead>
              <TableHead className="text-white font-medium">Location</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinessUnits.map((businessUnit, index) => (
              <TableRow key={businessUnit.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{businessUnit.businessUnit}</TableCell>
                <TableCell>{businessUnit.organization}</TableCell>
                <TableCell>{businessUnit.location}</TableCell>
                <TableCell>{businessUnit.createdBy}</TableCell>
                <TableCell>{businessUnit.createdOn}</TableCell>
                <TableCell>{businessUnit.updatedBy}</TableCell>
                <TableCell>{businessUnit.updatedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(businessUnit.id)}
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
          <span>1 - {filteredBusinessUnits.length} of {filteredBusinessUnits.length}</span>
        </div>
      </div>
    </div>
  );
}