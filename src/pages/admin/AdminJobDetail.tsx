
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobListing, updateJobListing } from '../../services/dataService';
import { JobListing } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { cn } from '../../lib/utils';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const AdminJobDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    companyAddress: '',
    contactNumber: '',
    jobDescription: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (jobId) {
      const jobData = getJobListing(jobId);
      setJob(jobData);
      if (jobData) {
        setEditData({
          companyAddress: jobData.companyAddress,
          contactNumber: jobData.contactNumber,
          jobDescription: jobData.jobDescription,
        });
      }
    }
    setLoading(false);
  }, [jobId]);

  const toggleJobStatus = () => {
    if (!job) return;
    const newStatus = job.status === 'active' ? 'expired' : 'active';
    const updatedJob = updateJobListing(job.id, { status: newStatus });

    if (updatedJob) {
      setJob(updatedJob);
      toast.success(`Job status updated to ${newStatus}`);
    } else {
      toast.error('Failed to update job status');
    }
  };

  const handleSave = () => {
    if (!job) return;
    const updated = updateJobListing(job.id, {
      companyAddress: editData.companyAddress,
      contactNumber: editData.contactNumber,
      jobDescription: editData.jobDescription,
    });

    if (updated) {
      setJob(updated);
      setIsEditing(false);
      toast.success('Job updated successfully');
    } else {
      toast.error('Failed to update job');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-[400px]">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px]">
        <h2 className="text-2xl font-bold">Job not found</h2>
        <p className="text-muted-foreground mb-4">The job listing you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/admin/jobs')}>Back to Job Listings</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/jobs')} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Job Details</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 rounded-md">
                <AvatarImage src={job.companyLogo} alt={job.companyName} />
                <AvatarFallback className="text-2xl rounded-md">
                  {job.companyName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-grow space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{job.jobRole}</h2>
                  <Badge
                    variant="outline"
                    className={cn(
                      job.status === 'active'
                        ? 'border-green-200 bg-green-100 text-green-800'
                        : 'border-amber-200 bg-amber-100 text-amber-800'
                    )}
                  >
                    {job.status}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground">{job.companyName}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Posted: {formatDate(job.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>CTC: {job.ctcAmount}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{job.companyEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    {isEditing ? (
                      <Input
                        value={editData.contactNumber}
                        onChange={(e) =>
                          setEditData({ ...editData, contactNumber: e.target.value })
                        }
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{job.contactNumber}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="w-full">
                    <p className="font-medium">Address</p>
                    {isEditing ? (
                      <Input
                        value={editData.companyAddress}
                        onChange={(e) =>
                          setEditData({ ...editData, companyAddress: e.target.value })
                        }
                        className="text-sm"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{job.companyAddress}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {job.technology.split(',').map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Job Description</h3>
                {isEditing ? (
                  <Textarea
                    rows={5}
                    value={editData.jobDescription}
                    onChange={(e) =>
                      setEditData({ ...editData, jobDescription: e.target.value })
                    }
                    className="text-sm"
                  />
                ) : (
                  <div className="text-sm text-muted-foreground whitespace-pre-line">
                    {job.jobDescription}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-6">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Close
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                      Edit Job
                    </Button>
                    <Button
                      variant={job.status === 'active' ? 'destructive' : 'default'}
                      onClick={toggleJobStatus}
                    >
                      {job.status === 'active' ? 'Mark as Expired' : 'Activate Job'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminJobDetail;
