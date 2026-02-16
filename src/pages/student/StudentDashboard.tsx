
import React, { useEffect, useState } from 'react';
import { getJobListings, getStudentApplications } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/ui/card';
import { Briefcase, CheckCircle, Building2, ArrowRight,XCircle} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [companies, setCompanies] = useState(0);
  const [rejectionJobs, setRejectionJobs] = useState(0);
  
  useEffect(() => {
    if (user?.id) {
      const jobs = getJobListings();
      const active = jobs.filter(job => job.status === 'active').length;
      
      // Get unique companies
      const uniqueCompanies = new Set(jobs.map(job => job.companyName));
      
      // Get student applications
      const applications = getStudentApplications(user.id);

      const rejected = applications.filter(app => app.status === 'rejected').length;
      
      // setTotalJobs(jobs.length);
      setActiveJobs(active);
      setAppliedJobs(applications.length);
      setCompanies(uniqueCompanies.size);
      setRejectionJobs(applications.length);
      setRejectionJobs(rejected);
    }
  }, [user?.id]);

  const statsCards = [
    {
      title: 'Total Companies',
      value: companies,
      icon: <Building2 className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Active Jobs',
      value: activeJobs,
      icon: <Briefcase className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Applied Jobs',
      value: appliedJobs,
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Total Rejection',
      value: rejectionJobs,
      icon: <XCircle className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Welcome, {user?.firstName}</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Here's an overview of your job application activities.
        </p>
      </div>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, i) => (
          <Card key={i} className="stats-card">
            <div className="flex items-center justify-between">
              <p className="stats-card-title">{card.title}</p>
              {card.icon}
            </div>
            <p className="stats-card-value">{card.value}</p>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium">Recent Applications</h3>
            <Button 
              variant="ghost" 
              className="h-8 px-2 text-xs sm:text-sm"
              onClick={() => navigate('/student/applications')}
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          {appliedJobs > 0 ? (
            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                You have applied to {appliedJobs} jobs. Check your application status.
              </p>
            </div>
          ) : (
            <div className="rounded-lg border p-3 sm:p-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                You haven't applied to any jobs yet. Browse available opportunities.
              </p>
              <Button 
                className="mt-4 w-full sm:w-auto"
                onClick={() => navigate('/student/jobs')}
              >
                Explore Jobs
              </Button>
            </div>
          )}
        </Card>
        
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium">Profile Completion</h3>
            <Button 
              variant="ghost" 
              className="h-8 px-2 text-xs sm:text-sm"
              onClick={() => navigate('/student/profile')}
            >
              Update Profile
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="rounded-lg border p-3 sm:p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-medium">Profile Strength</span>
              <span className="text-xs sm:text-sm font-medium">100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground mt-4">
              Complete your profile to improve your chances of getting hired.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
