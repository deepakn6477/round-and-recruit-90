import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Plus, Edit, Trash2, Search, Download, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Location {
  id: number;
  location: string;
  code: string;
  country: string;
  timezone: string;
  yearStart: string;
  yearEnd: string;
  createdBy: string;
  createdOn: string;
  updatedBy?: string;
  updatedOn?: string;
}

const mockLocations: Location[] = [
  {
    id: 1,
    location: "Bangalore",
    code: "BLR1",
    country: "India",
    timezone: "UTC+05:30",
    yearStart: "01-Apr-23",
    yearEnd: "",
    createdBy: "pranit way",
    createdOn: "07-Jul-2023",
    updatedBy: "Michael Khundrakpam",
    updatedOn: "10-Jul-2023"
  },
  {
    id: 2,
    location: "Chennai",
    code: "Chennai1",
    country: "India", 
    timezone: "UTC+05:30",
    yearStart: "01-Apr-23",
    yearEnd: "",
    createdBy: "Michael Khundrakpam",
    createdOn: "10-Jul-2023",
    updatedBy: "",
    updatedOn: ""
  }
];

export function LocationPage() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newLocation, setNewLocation] = useState({
    location: "",
    locationCode: "",
    country: "",
    timezone: "",
    yearStart: "",
    yearEnd: ""
  });

  const filteredLocations = locations.filter(loc =>
    loc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    if (newLocation.location && newLocation.locationCode && newLocation.country && newLocation.timezone) {
      const newLoc: Location = {
        id: locations.length + 1,
        location: newLocation.location,
        code: newLocation.locationCode,
        country: newLocation.country,
        timezone: newLocation.timezone,
        yearStart: newLocation.yearStart || new Date().toISOString().split('T')[0],
        yearEnd: newLocation.yearEnd,
        createdBy: "Current User",
        createdOn: new Date().toISOString().split('T')[0],
      };
      setLocations([...locations, newLoc]);
      setNewLocation({
        location: "",
        locationCode: "",
        country: "",
        timezone: "",
        yearStart: "",
        yearEnd: ""
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: number) => {
    setLocations(locations.filter(loc => loc.id !== id));
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
            <h1 className="text-2xl font-bold">Admin/Location</h1>
            <p className="text-muted-foreground">Manage location details</p>
          </div>
        </div>
        <Button onClick={() => navigate("/admin")} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          DOWNLOAD
        </Button>
      </div>

      {/* New Location Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Location *</label>
                <Input
                  placeholder="Location name"
                  value={newLocation.location}
                  onChange={(e) => setNewLocation({ ...newLocation, location: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Location Code *</label>
                <Input
                  placeholder="Location code"
                  value={newLocation.locationCode}
                  onChange={(e) => setNewLocation({ ...newLocation, locationCode: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Country *</label>
                <Select value={newLocation.country} onValueChange={(value) => setNewLocation({ ...newLocation, country: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Timezone *</label>
                <Select value={newLocation.timezone} onValueChange={(value) => setNewLocation({ ...newLocation, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC+05:30">UTC+05:30 (IST)</SelectItem>
                    <SelectItem value="UTC-05:00">UTC-05:00 (EST)</SelectItem>
                    <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                    <SelectItem value="UTC+08:00">UTC+08:00 (SGT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Financial Year Start</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={newLocation.yearStart}
                    onChange={(e) => setNewLocation({ ...newLocation, yearStart: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Financial Year End</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={newLocation.yearEnd}
                    onChange={(e) => setNewLocation({ ...newLocation, yearEnd: e.target.value })}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
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
            placeholder="Search locations..."
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
          New Location
        </Button>
      </div>

      {/* Locations Table */}
      <Card>
        <Table>
          <TableHeader className="bg-green-600">
            <TableRow>
              <TableHead className="text-white font-medium">SI</TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
              <TableHead className="text-white font-medium">Location</TableHead>
              <TableHead className="text-white font-medium">Code</TableHead>
              <TableHead className="text-white font-medium">Country</TableHead>
              <TableHead className="text-white font-medium">Time Zone</TableHead>
              <TableHead className="text-white font-medium">Year Start</TableHead>
              <TableHead className="text-white font-medium">Year End</TableHead>
              <TableHead className="text-white font-medium">Created By</TableHead>
              <TableHead className="text-white font-medium">Created On</TableHead>
              <TableHead className="text-white font-medium">Updated By</TableHead>
              <TableHead className="text-white font-medium">Updated On</TableHead>
              <TableHead className="text-white font-medium">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLocations.map((location, index) => (
              <TableRow key={location.id} className="hover:bg-gray-50">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Edit className="w-3 h-3 text-green-600" />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{location.location}</TableCell>
                <TableCell>{location.code}</TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell>{location.timezone}</TableCell>
                <TableCell>{location.yearStart}</TableCell>
                <TableCell>{location.yearEnd}</TableCell>
                <TableCell>{location.createdBy}</TableCell>
                <TableCell>{location.createdOn}</TableCell>
                <TableCell>{location.updatedBy}</TableCell>
                <TableCell>{location.updatedOn}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(location.id)}
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
        <span>1 - {filteredLocations.length} of {filteredLocations.length}</span>
      </div>
    </div>
  );
}