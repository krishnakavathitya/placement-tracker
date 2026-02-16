
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJobListings, updateJobListing } from '../../services/dataService';
import { JobListing } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Search, Plus } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { cn } from '../../lib/utils';
import { toast } from 'sonner';
import { Toast } from '@radix-ui/react-toast';

const AdminJobsList: React.FC = () => {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const jobListings = getJobListings();
    setJobs(jobListings);
  };

  const handleStatusChange = (jobId: string, status: 'active' | 'expired') => {
    updateJobListing(jobId, { status });
    setJobs(jobs.map(job =>
      job.id === jobId ? { ...job, status } : job
    ));
    toast.success(`Job status updated to ${status}`);
  };

  const filteredJobs = jobs
    .filter(job => {
      // Apply status filter
      if (statusFilter !== 'all') {
        return job.status === statusFilter;
      }
      return true;
    })
    .filter(job => {
      // Apply search filter
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        job.jobRole.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.technology.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Manage job listings and opportunities for students
          </p>
        </div>
        <Button onClick={() => navigate('/admin/jobs/create')} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Job
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs or companies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">Company</TableHead>
              <TableHead className="min-w-[120px]">Job Role</TableHead>
              <TableHead className="hidden md:table-cell min-w-[100px]">Technology</TableHead>
              <TableHead className="hidden lg:table-cell min-w-[120px]">Posted Date</TableHead>
              <TableHead className="min-w-[80px]">Status</TableHead>
              <TableHead className="text-right min-w-[180px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarImage src={job.companyLogo} alt={job.companyName} />
                        <AvatarFallback>{job.companyName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-sm sm:text-base">{job.companyName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm sm:text-base">{job.jobRole}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{job.technology}</TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">{formatDate(job.createdAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs',
                        job.status === 'active'
                          ? 'border-green-200 bg-green-100 text-green-800'
                          : 'border-amber-200 bg-amber-100 text-amber-800'
                      )}
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/jobs/${job.id}`)}
                        className="text-xs sm:text-sm"
                      >
                        View
                      </Button>
                      <Select
                        value={job.status}
                        onValueChange={(value) => handleStatusChange(job.id, value as 'active' | 'expired')}
                      >
                        <SelectTrigger className="w-full sm:w-[100px] text-xs sm:text-sm">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-sm sm:text-base">
                  No job listings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsList;
