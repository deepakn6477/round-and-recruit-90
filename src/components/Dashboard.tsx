import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";

const experienceData = [
  { name: "6", value: 250 },
  { name: "26", value: 400 },
  { name: "36", value: 350 },
  { name: "32", value: 300 },
  { name: "61", value: 450 },
  { name: "76", value: 380 },
  { name: "89", value: 420 },
  { name: "95", value: 390 },
  { name: "12.3", value: 480 },
  { name: "22.9", value: 350 },
  { name: "62", value: 400 },
  { name: "53", value: 380 },
  { name: "13.6", value: 420 },
  { name: "160", value: 450 },
  { name: "5.2017", value: 500 },
];

const genderData = [
  { name: "Unknown", value: 49215, color: "#10b981" },
  { name: "Male", value: 10897, color: "#3b82f6" },
  { name: "Female", value: 2200, color: "#ef4444" },
];

const experienceTypeData = [
  { name: "Others", value: 52155, color: "#10b981" },
  { name: "Fresher", value: 4516, color: "#ef4444" },
  { name: "Experienced", value: 35572, color: "#f59e0b" },
];

const ageGroupData = [
  { name: "18-25", value: 12765, color: "#ef4444" },
  { name: "26-30", value: 15257, color: "#10b981" },
  { name: "31-35", value: 11001, color: "#8b5cf6" },
  { name: "36-40", value: 8537, color: "#3b82f6" },
  { name: "41-45", value: 4473, color: "#f59e0b" },
];

const locationData = [
  { name: "Suraksha gst p ltd Gmod Rd", value: 166, color: "#10b981" },
  { name: "PO I G I BETHANYA NAGAR VALASARAVAKKAM", value: 116, color: "#ef4444" },
  { name: "IMME College", value: 73, color: "#3b82f6" },
  { name: "Symbiosis Institute of Business Management (SIBM)", value: 56, color: "#8b5cf6" },
  { name: "Others", value: 119238, color: "#f59e0b" },
];

const resumeStatusData = [
  { name: "Others", value: 117670, color: "#10b981" },
  { name: "Hired", value: 1375, color: "#ef4444" },
  { name: "Interview Stage", value: 1, color: "#8b5cf6" },
  { name: "On Hold", value: 1, color: "#3b82f6" },
  { name: "Declined", value: 0, color: "#f59e0b" },
  { name: "Offered", value: 0, color: "#06b6d4" },
  { name: "Rejected", value: 0, color: "#84cc16" },
  { name: "Shortlisted", value: 0, color: "#f97316" },
];

const COLORS = ['#10b981', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

export const Dashboard = () => {
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Experience Chart */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={experienceData}>
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={10} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Card Gender */}
        <Card>
          <CardHeader>
            <CardTitle>Card Gender</CardTitle>
            <div className="text-center">
              <div className="text-2xl font-bold">63312</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {genderData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name} {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience Type */}
        <Card>
          <CardHeader>
            <CardTitle>Experience Type</CardTitle>
            <div className="text-center">
              <div className="text-2xl font-bold">119647</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={experienceTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {experienceTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {experienceTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name} {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Age Group */}
        <Card>
          <CardHeader>
            <CardTitle>Age Group</CardTitle>
            <div className="text-center">
              <div className="text-2xl font-bold">52885</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={ageGroupData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {ageGroupData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {ageGroupData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name} {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
            <div className="text-center">
              <div className="text-2xl font-bold">119647</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  fill="#f59e0b"
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2 text-xs">
              {locationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="truncate max-w-[200px]">{item.name}</span>
                  </div>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resume Status */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Status</CardTitle>
            <div className="text-center">
              <div className="text-2xl font-bold">119647</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={resumeStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {resumeStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
              {resumeStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="truncate">{item.name} {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};