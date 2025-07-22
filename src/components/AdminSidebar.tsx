import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import areteLogo from "@/assets/arete-logo.svg";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  LayoutDashboard,
  Users,
  FileUp,
  FileText,
  Briefcase,
  User,
  ChevronDown,
  Building,
  MapPin,
  UserCog,
  Settings,
  Menu,
} from "lucide-react";

const adminSubItems = [
  { title: "Organization", url: "/admin/organization", icon: Building },
  { title: "Location", url: "/admin/location", icon: MapPin },
  { title: "Business Unit", url: "/admin/business-unit", icon: Building },
  { title: "Division", url: "/admin/division", icon: Settings },
  { title: "Department", url: "/admin/department", icon: Building },
  { title: "Roles", url: "/admin/roles", icon: UserCog },
  { title: "Employee Master", url: "/admin/employee-master", icon: Users },
];

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Admin", url: "/admin", icon: Users, hasSubItems: true, subItems: adminSubItems },
  { title: "Resume Upload", url: "/resume-upload", icon: FileUp },
  { title: "Resume List", url: "/resume-list", icon: FileText },
  { title: "Job Management", url: "/job-management", icon: Briefcase },
  { title: "User Profile", url: "/user-profile", icon: User },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [openGroups, setOpenGroups] = useState<string[]>(["admin"]);
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isGroupActive = (subItems: typeof adminSubItems) => 
    subItems.some(item => isActive(item.url));

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50";

  const toggleGroup = (groupName: string) => {
    setOpenGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  return (
    <Sidebar className={collapsed ? "w-14" : "w-60"} collapsible="icon">
      {/* Logo and Brand */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="flex-shrink-0">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
          <img src={areteLogo} alt="Arete" className="w-8 h-8 flex-shrink-0" />
          {!collapsed && <span className="font-bold text-lg">Arete</span>}
        </div>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.hasSubItems ? (
                    <Collapsible
                      open={openGroups.includes("admin")}
                      onOpenChange={() => toggleGroup("admin")}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton 
                          className={`w-full justify-between ${isGroupActive(item.subItems || []) ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/50"}`}
                        >
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            {!collapsed && <span>{item.title}</span>}
                          </div>
                          {!collapsed && <ChevronDown className="h-4 w-4" />}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenu className="ml-4">
                          {item.subItems?.map((subItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton asChild>
                                <NavLink to={subItem.url} className={getNavCls}>
                                  <subItem.icon className="mr-2 h-4 w-4" />
                                  {!collapsed && <span>{subItem.title}</span>}
                                </NavLink>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}