import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Division {
  id: number;
  division: string;
  divisionCode: string;
  businessUnit: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
}

const mockDivisions: Division[] = [
  {
    id: 1,
    division: "Arcolab Bangalore",
    divisionCode: "ARBA",
    businessUnit: "Arcolab",
    createdBy: "Michael Khundrakpam S",
    createdOn: "10-Jul-2023",
    updatedBy: "Michael Khundrakpam S",
    updatedOn: "10-Jul-2023"
  },
  {
    id: 2,
    division: "Arcolab Chennai",
    divisionCode: "ARCH",
    businessUnit: "Arcolab",
    createdBy: "Bharath Kumar P",
    createdOn: "10-Jul-2023",
    updatedBy: "Michael Khundrakpam S",
    updatedOn: "10-Jul-2023"
  },
  {
    id: 3,
    division: "IT",
    divisionCode: "IT-001",
    businessUnit: "Arcolab",
    createdBy: "pranit way",
    createdOn: "07-Jul-2023",
    updatedBy: "Michael Khundrakpam S",
    updatedOn: "10-Jul-2023"
  }
];

export function DivisionPage() {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState<Division[]>(mockDivisions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newDivision, setNewDivision] = useState({
    division: "",
    divisionCode: "",
    businessUnit: ""
  });

  const filteredDivisions = divisions.filter(div =>
    div.division.toLowerCase().includes(searchTerm.toLowerCase()) ||
    div.divisionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    div.businessUnit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newDivision.division && newDivision.divisionCode && newDivision.businessUnit) {
      const newDiv: Division = {
        id: divisions.length + 1,
        division: newDivision.division,
        divisionCode: newDivision.divisionCode,
        businessUnit: newDivision.businessUnit,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
        updatedBy: "Current User",
        updatedOn: new Date().toISOString().split('T')[0]
      };
      setDivisions([...divisions, newDiv]);
      setNewDivision({
        division: "",
        divisionCode: "",
        businessUnit: ""
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setDivisions(divisions.filter(div => div.id !== id));
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
            <h1 className="text-2xl font-bold">Admin/Division</h1>
            <p className="text-muted-foreground">Manage division details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* New Division Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Division</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Division *</label>
                <Input
                  placeholder="Division name"
                  value={newDivision.division}
                  onChange={(e) => setNewDivision({ ...newDivision, division: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Division Code *</label>
                <Input
                  placeholder="Division code"
                  value={newDivision.divisionCode}
                  onChange={(e) => setNewDivision({ ...newDivision, divisionCode: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Business Unit *</label>
                <Select value={newDivision.businessUnit} onValueChange={(value) => setNewDivision({ ...newDivision, businessUnit: value })}>
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
            placeholder="Search divisions..."
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
          New Division
        </Button>
      </div>

      {/* Divisions Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Division</TableHead>
              <TableHead className="text-white font-medium">Division Code</TableHead>
              <TableHead className="text-white font-medium">Business Unit</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDivisions.map((division, index) => (
              <TableRow key={division.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{division.division}</TableCell>
                <TableCell>{division.divisionCode}</TableCell>
                <TableCell>{division.businessUnit}</TableCell>
                <TableCell>{division.createdBy}</TableCell>
                <TableCell>{division.createdOn}</TableCell>
                <TableCell>{division.updatedBy}</TableCell>
                <TableCell>{division.updatedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(division.id)}
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
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="bg-white text-black px-2 py-1 rounded">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <span>1 - {filteredDivisions.length} of {filteredDivisions.length}</span>
      </div>
    </div>
  );
}