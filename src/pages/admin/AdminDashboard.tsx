
import React, { useEffect, useState } from 'react';
import { getJobListings, getApplications, getStudents } from '../../services/dataService';
import { Card } from '../../components/ui/card';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  
  useEffect(() => {
    const jobs = getJobListings();
    const active = jobs.filter(job => job.status === 'active').length;
    const students = getStudents();
    const applications = getApplications();
    
    setTotalJobs(jobs.length);
    setActiveJobs(active);
    setTotalStudents(students.length);
    setTotalApplications(applications.length);
  }, []);

  const statsCards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <LineChart className="h-8 w-8 text-primary" />,
      change: '+12%',
      changeType: 'positive',
    },
    {
      title: 'Active Jobs',
      value: activeJobs,
      icon: <BarChart className="h-8 w-8 text-primary" />,
      change: '+5%',
      changeType: 'positive',
    },
    {
      title: 'Total Applications',
      value: totalApplications,
      icon: <PieChart className="h-8 w-8 text-primary" />,
      change: '+18%',
      changeType: 'positive',
    },
    {
      title: 'Total Job Listings',
      value: totalJobs,
      icon: <BarChart className="h-8 w-8 text-primary" />,
      change: '+7%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Overview of placement portal statistics and activities.
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
            <span 
              className={`stats-card-badge ${
                card.changeType === 'positive' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {card.change}
            </span>
          </Card>
        ))}
      </div>
      
    </div>
  );
};

export default AdminDashboard;