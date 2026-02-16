import React, { useEffect, useState } from 'react';
import { getApplications, updateApplicationStatus } from '../../services/dataService';
import { Application } from '../../types';
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {Select, SelectContent,SelectItem,SelectTrigger, SelectValue,} from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Search, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';

const AdminApplicationsList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const allApplications = getApplications();
    setApplications(allApplications);
  };

  const handleStatusChange = (applicationId: string, status: Application['status']) => {
    const updatedApplication = updateApplicationStatus(applicationId, status);
    if (updatedApplication) {
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ));
      toast.success(`Application status updated to ${status}`);
    }
  };

  const filteredApplications = applications
    .filter(app => {
      // Apply status filter
      if (statusFilter !== 'all') {
        return app.status === statusFilter;
      }
      return true;
    })
    .filter(app => {
      // Apply search filter
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        app.studentName.toLowerCase().includes(searchLower) ||
        app.jobRole.toLowerCase().includes(searchLower) ||
        app.companyName.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeStyles = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'border-yellow-200 bg-yellow-100 text-yellow-800';
      case 'applied':
        return 'border-blue-200 bg-blue-100 text-blue-800';
      case 'selected':
        return 'border-green-200 bg-green-100 text-green-800';
      case 'rejected':
        return 'border-red-200 bg-red-100 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Applications</h1>
        <p className="text-muted-foreground">
          Review and manage student job applications
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students or jobs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Applications</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="selected">Selected</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Job Position</TableHead>
              <TableHead className="hidden md:table-cell">Company</TableHead>
              <TableHead className="hidden md:table-cell">Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.studentName}</TableCell>
                  <TableCell>{app.jobRole}</TableCell>
                  <TableCell className="hidden md:table-cell">{app.companyName}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(app.appliedAt)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={cn(getStatusBadgeStyles(app.status))}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/applications/${app.id}`)}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Select
                        value={app.status}
                        onValueChange={(value) => handleStatusChange(app.id, value as Application['status'])}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="applied">Applied</SelectItem>
                          <SelectItem value="selected">Selected</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminApplicationsList;
