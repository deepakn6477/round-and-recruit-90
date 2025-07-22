import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ResumeList } from "./components/ResumeList";
import { CandidateDetails } from "./components/CandidateDetails";
import { JobManagement } from "./components/JobManagement";
import { PostNewJob } from "./components/PostNewJob";
import { UploadJD } from "./components/UploadJD";
import { CreateJob } from "./components/CreateJob";
import { JobSummary } from "./components/JobSummary";
import { Dashboard } from "./components/Dashboard";
import { UserProfilePage } from "./components/UserProfilePage";
import { ResumeUploadPage } from "./components/ResumeUploadPage";
import { JobLandingPage } from "./components/JobLandingPage";
import { OrganizationPage } from "./components/OrganizationPage";
import { LocationPage } from "./components/LocationPage";
import { BusinessUnitPage } from "./components/BusinessUnitPage";
import { DivisionPage } from "./components/DivisionPage";
import { DepartmentPage } from "./components/DepartmentPage";
import { RolesPage } from "./components/RolesPage";
import { EmployeeMasterPage } from "./components/EmployeeMasterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AdminSidebar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin" element={<div className="p-6"><h1 className="text-2xl font-bold">Admin Module</h1><p>Select a sub-module from the sidebar</p></div>} />
                <Route path="/admin/organization" element={<OrganizationPage />} />
                <Route path="/admin/location" element={<LocationPage />} />
                <Route path="/admin/business-unit" element={<BusinessUnitPage />} />
                <Route path="/admin/division" element={<DivisionPage />} />
                <Route path="/admin/department" element={<DepartmentPage />} />
                <Route path="/admin/roles" element={<RolesPage />} />
                <Route path="/admin/employee-master" element={<EmployeeMasterPage />} />
                <Route path="/resume-upload" element={<ResumeUploadPage />} />
                <Route path="/resume-list" element={<ResumeList />} />
                <Route path="/job-management" element={<JobLandingPage />} />
                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/job-details/:jobId" element={<JobManagement />} />
                <Route path="/job-summary/:jobId" element={<JobSummary />} />
                <Route path="/post-new-job" element={<PostNewJob />} />
                <Route path="/upload-jd" element={<UploadJD />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/candidate-details/:resumeId" element={<CandidateDetails />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;