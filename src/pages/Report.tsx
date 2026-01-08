import { useState } from "react";
import { 
  Search, 
  Download, 
  Calendar, 
  MapPin, 
  Building2, 
  Users, 
  UserCheck, 
  UserX,
  ChevronDown,
  ExternalLink,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type FilterTab = "location" | "organization";

interface Participant {
  id: number;
  name: string;
  city: string;
  zipcode: string;
  agency: string;
  certified: boolean;
}

const mockParticipants: Participant[] = [
  { id: 1, name: "Rose", city: "Albany", zipcode: "12201", agency: "Division of the Budget", certified: true },
  { id: 2, name: "Peter", city: "Cohoes", zipcode: "12047", agency: "Division of the Budget", certified: false },
  { id: 3, name: "Sarah", city: "Troy", zipcode: "12180", agency: "Office of General Services", certified: true },
  { id: 4, name: "Michael", city: "Schenectady", zipcode: "12305", agency: "Department of Health", certified: true },
  { id: 5, name: "Emily", city: "Albany", zipcode: "12203", agency: "Division of Criminal Justice", certified: false },
];

const Report = () => {
  const [filterTab, setFilterTab] = useState<FilterTab>("location");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-foreground">Webinar Demographics</h1>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Filters Section */}
        <section className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-5">Filters</h2>
          
          {/* Primary Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Start Date <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input 
                  type="date" 
                  defaultValue="2026-01-06"
                  className="h-10 pr-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                End Date <span className="text-destructive">*</span>
              </Label>
              <Input 
                type="date" 
                defaultValue="2026-01-08"
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Webinar Type <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="all">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="recorded">Recorded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Program Name <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="program1">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="program1">Program 1</SelectItem>
                  <SelectItem value="program2">Program 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Webinar Title <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="fire-safety">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fire-safety">Fire Safety 2026</SelectItem>
                  <SelectItem value="workplace">Workplace Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">
                Webinar Session <span className="text-destructive">*</span>
              </Label>
              <Select defaultValue="session1">
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="session1">Fire Safety 2026</SelectItem>
                  <SelectItem value="session2">Session 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Demographics Filter */}
          <div className="pt-4 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Demographics Filter</h3>
            <p className="text-sm text-muted-foreground mb-4">Participant's Information</p>
            
            {/* Tab Switcher */}
            <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50 mb-5">
              <button
                onClick={() => setFilterTab("location")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterTab === "location"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MapPin className="h-4 w-4" />
                By Location
              </button>
              <button
                onClick={() => setFilterTab("organization")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filterTab === "organization"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Building2 className="h-4 w-4" />
                By Organization
              </button>
            </div>

            {/* Location Filter Fields */}
            {filterTab === "location" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Select City</Label>
                  <Select defaultValue="albany">
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="albany">Albany</SelectItem>
                      <SelectItem value="troy">Troy</SelectItem>
                      <SelectItem value="schenectady">Schenectady</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Zipcode</Label>
                  <Input 
                    placeholder="e.g., 12201" 
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">Clear city to enter zipcode</p>
                </div>
              </div>
            )}

            {/* Organization Filter Fields */}
            {filterTab === "organization" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Select Organization</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="budget">Division of the Budget</SelectItem>
                      <SelectItem value="health">Department of Health</SelectItem>
                      <SelectItem value="services">Office of General Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Department</Label>
                  <Select>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="operations">Operations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Filter Actions */}
            <div className="flex items-center gap-3">
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Apply Filters
              </Button>
              <Button variant="outline">Clear All</Button>
            </div>
          </div>
        </section>

        {/* Demographic Details Cards */}
        <section className="bg-background rounded-xl border border-border p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-5">Demographic Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Participants */}
            <div className="p-5 rounded-lg border border-border bg-muted/30 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Total Participants
                </span>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-3xl font-bold text-foreground">500</p>
            </div>

            {/* Selected Demography */}
            <div className="p-5 rounded-lg border border-border bg-muted/30 hover:border-primary/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Selected Demography
                </span>
              </div>
              <Button variant="link" className="p-0 h-auto text-primary gap-1">
                View Participant Details
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* Certified Officials */}
            <div className="p-5 rounded-lg border border-border bg-muted/30 hover:border-success/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Certified Officials
                </span>
                <UserCheck className="h-5 w-5 text-success" />
              </div>
              <p className="text-3xl font-bold text-foreground">20</p>
            </div>

            {/* Non-Certified Officials */}
            <div className="p-5 rounded-lg border border-border bg-muted/30 hover:border-warning/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Non-Certified Officials
                </span>
                <UserX className="h-5 w-5 text-warning" />
              </div>
              <p className="text-3xl font-bold text-foreground">80</p>
            </div>
          </div>
        </section>

        {/* Participant Details Table */}
        <section className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-base font-semibold text-foreground">Participant Details</h2>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full sm:w-64 h-9"
                  />
                </div>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary hover:bg-primary">
                  <TableHead className="text-primary-foreground font-medium">
                    <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                      Participant
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </TableHead>
                  <TableHead className="text-primary-foreground font-medium">
                    <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                      City
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </TableHead>
                  <TableHead className="text-primary-foreground font-medium">
                    <button className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                      Zipcode
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </TableHead>
                  <TableHead className="text-primary-foreground font-medium">Municipality/Agency</TableHead>
                  <TableHead className="text-primary-foreground font-medium">Certified?</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockParticipants.map((participant) => (
                  <TableRow key={participant.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium text-foreground">{participant.name}</TableCell>
                    <TableCell className="text-muted-foreground">{participant.city}</TableCell>
                    <TableCell className="text-muted-foreground">{participant.zipcode}</TableCell>
                    <TableCell className="text-muted-foreground">{participant.agency}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={`font-medium ${
                          participant.certified 
                            ? "border-success text-success bg-success/10" 
                            : "border-warning text-warning bg-warning/10"
                        }`}
                      >
                        {participant.certified ? "Certified" : "Non-Certified"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      href="#" 
                      isActive={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">191</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Report;
