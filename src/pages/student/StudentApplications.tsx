
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getStudentApplications, getJobListing } from '../../services/dataService';
import { Application, JobListing } from '../../types';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Calendar, ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

const StudentApplications: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Array<Application & { job?: JobListing }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    
    loadApplications();
  }, [user?.id]);

  const loadApplications = () => {
    if (!user?.id) return;
    
    const apps = getStudentApplications(user.id);
    
    // Enrich applications with job details
    const enrichedApps = apps.map(app => {
      const job = getJobListing(app.jobId);
      return { ...app, job };
    });
    
    setApplications(enrichedApps);
    setLoading(false);
  };

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

  if (loading) {
    return <div className="flex items-center justify-center h-[200px]">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your job applications
        </p>
      </div>
      
      {applications.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {applications.map((app) => (
            <Card key={app.id} className="job-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 rounded-md flex-shrink-0">
                        <AvatarImage src={app.job?.companyLogo} alt={app.companyName} />
                        <AvatarFallback className="rounded-md">
                          {app.companyName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg leading-tight">{app.jobRole}</h3>
                        <p className="text-muted-foreground">{app.companyName}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(getStatusBadgeStyles(app.status))}
                    >
                      {app.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Applied on {formatDate(app.appliedAt)}</span>
                  </div>
                  
                  {app.job && (
                    <div className="space-y-2">
                      <p className="text-sm line-clamp-2">{app.job.jobDescription}</p>
                      <div className="flex flex-wrap gap-2">
                        {app.job.technology.split(',').slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/student/jobs/${app.jobId}`)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Job
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
          <p className="text-muted-foreground mb-6">
            You haven't applied to any jobs yet. Browse available opportunities to get started.
          </p>
          <Button onClick={() => navigate('/student/jobs')}>
            Browse Jobs
          </Button>
        </Card>
      )}
    </div>
  );
};

export default StudentApplications;
