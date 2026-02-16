
// import React, { useEffect, useState } from 'react';
// import { getJobListings, createApplication } from '../../services/dataService';
// import { useAuth } from '../../context/AuthContext';
// import { JobListing } from '../../types';
// import { Button } from '../../components/ui/button';
// import { Input } from '../../components/ui/input';
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../../components/ui/select';
// import { Card, CardContent, CardFooter } from '../../components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// import { Badge } from '../../components/ui/badge';
// import { Search } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// const StudentJobsList: React.FC = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [jobs, setJobs] = useState<JobListing[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [techFilter, setTechFilter] = useState<string>('all');
//   const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

//   useEffect(() => {
//     loadJobs();
//     // Check which jobs the student has already applied to
//     const applications = JSON.parse(localStorage.getItem('applications') || '[]');
//     const applied = applications
//       .filter((app: any) => app.studentId === user?.id)
//       .map((app: any) => app.jobId);
//     setAppliedJobs(applied);
//   }, [user?.id]);

//   const loadJobs = () => {
//     const jobListings = getJobListings();
//     // Only show active jobs
//     const activeJobs = jobListings.filter(job => job.status === 'active');
//     setJobs(activeJobs);
//   };

//   const handleApply = (jobId: string) => {
//     if (!user?.id) return;

//     const result = createApplication(user.id, jobId);

//     if (result) {
//       setAppliedJobs([...appliedJobs, jobId]);
//       toast.success('Application submitted successfully');
//     } else {
//       toast.error('You have already applied to this job');
//     }
//   };

//   // Extract unique technologies from all jobs
//   const technologies = Array.from(
//     new Set(
//       jobs.flatMap(job => 
//         job.technology.split(',').map(tech => tech.trim())
//       )
//     )
//   ).sort();

//   const filteredJobs = jobs
//     .filter(job => {
//       // Apply tech filter
//       if (techFilter !== 'all') {
//         return job.technology.toLowerCase().includes(techFilter.toLowerCase());
//       }
//       return true;
//     })
//     .filter(job => {
//       // Apply search filter
//       if (!searchTerm) return true;
//       const searchLower = searchTerm.toLowerCase();
//       return (
//         job.jobRole.toLowerCase().includes(searchLower) ||
//         job.companyName.toLowerCase().includes(searchLower) ||
//         job.technology.toLowerCase().includes(searchLower)
//       );
//     })
//     .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Job Listings</h1>
//         <p className="text-muted-foreground">
//           Explore and apply for available job opportunities
//         </p>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search for job roles, companies, or technologies..."
//             className="pl-8"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <Select
//           value={techFilter}
//           onValueChange={setTechFilter}
//         >
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="Filter by technology" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Technologies</SelectItem>
//             {technologies.map((tech) => (
//               <SelectItem key={tech} value={tech}>
//                 {tech}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredJobs.length > 0 ? (
//           filteredJobs.map((job) => (
//             <Card key={job.id} className="flex flex-col job-card overflow-hidden">
//               <CardContent className="p-6 flex-grow">
//                 <div className="flex items-start gap-4">
//                   <Avatar className="h-12 w-12 rounded-md flex-shrink-0">
//                     <AvatarImage src={job.companyLogo} alt={job.companyName} />
//                     <AvatarFallback className="rounded-md">
//                       {job.companyName.substring(0, 2).toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="space-y-1">
//                     <h3 className="font-semibold text-lg leading-tight">{job.jobRole}</h3>
//                     <p className="text-muted-foreground">{job.companyName}</p>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-sm text-muted-foreground">Posted: {formatDate(job.createdAt)}</span>
//                     <Badge variant="outline">{job.ctcAmount}</Badge>
//                   </div>
//                   <p className="text-sm line-clamp-2 text-muted-foreground mb-4">
//                     {job.jobDescription}
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {job.technology.split(',').slice(0, 3).map((tech, index) => (
//                       <Badge key={index} variant="secondary" className="text-xs">
//                         {tech.trim()}
//                       </Badge>
//                     ))}
//                     {job.technology.split(',').length > 3 && (
//                       <Badge variant="secondary" className="text-xs">
//                         +{job.technology.split(',').length - 3} more
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="px-6 py-4 bg-muted/20 border-t flex justify-between">
//                 <Button 
//                   variant="outline" 
//                   onClick={() => navigate(`/student/jobs/${job.id}`)}
//                 >
//                   View Details
//                 </Button>
//                 <Button
//                   disabled={appliedJobs.includes(job.id)}
//                   onClick={() => handleApply(job.id)}
//                 >
//                   {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <div className="col-span-full flex items-center justify-center h-[200px]">
//             <p className="text-muted-foreground">No job listings found matching your criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentJobsList;

import React, { useEffect, useState } from 'react';
import {
  getJobListings,
  createApplication,
} from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { JobListing } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
} from '../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '../../components/ui/dialog';

const StudentJobsList: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [techFilter, setTechFilter] = useState<string>('all');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    cpi: '',
    cgpa: '',
    tenth: '',
    twelfth: '',
    semester: '',
    skill: '',
    address: '',
    image: null as File | null,
    resume: null as File | null,
  });

  useEffect(() => {
    loadJobs();
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const applied = applications
      .filter((app: any) => app.studentId === user?.id)
      .map((app: any) => app.jobId);
    setAppliedJobs(applied);
  }, [user?.id]);

  const loadJobs = () => {
    const jobListings = getJobListings();
    const activeJobs = jobListings.filter((job) => job.status === 'active');
    setJobs(activeJobs);
  };

  const technologies = Array.from(
    new Set(
      jobs.flatMap((job) =>
        job.technology.split(',').map((tech) => tech.trim())
      )
    )
  ).sort();

  const filteredJobs = jobs
    .filter((job) =>
      techFilter === 'all'
        ? true
        : job.technology.toLowerCase().includes(techFilter.toLowerCase())
    )
    .filter((job) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        job.jobRole.toLowerCase().includes(searchLower) ||
        job.companyName.toLowerCase().includes(searchLower) ||
        job.technology.toLowerCase().includes(searchLower)
      );
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitApplication = () => {
    const {
      fullName,
      cpi,
      cgpa,
      tenth,
      twelfth,
      semester,
      skill,
      address,
      image,
      resume,
    } = formData;

    if (
      !fullName ||
      !cpi ||
      !cgpa ||
      !tenth ||
      !twelfth ||
      !semester ||
      !skill ||
      !address ||
      !image ||
      !resume
    ) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!user?.id || !selectedJob) return;

    const result = createApplication(user.id, selectedJob.id, address);

    if (result) {
      setAppliedJobs([...appliedJobs, selectedJob.id]);
      toast.success('Application submitted successfully');
      setSelectedJob(null);
      setFormData({
        fullName: '',
        cpi: '',
        cgpa: '',
        tenth: '',
        twelfth: '',
        semester: '',
        skill: '',
        address: '',
        image: null,
        resume: null,
      });
    } else {
      toast.error('You have already applied to this job');
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Listings</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Explore and apply for available job opportunities
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for job roles, companies, or technologies..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={techFilter} onValueChange={setTechFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technologies</SelectItem>
            {technologies.map((tech) => (
              <SelectItem key={tech} value={tech}>
                {tech}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="flex flex-col overflow-hidden">
              <CardContent className="p-4 sm:p-6 flex-grow">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Avatar className="h-10 w-10 sm:h-12 sm:w-12 rounded-md flex-shrink-0">
                    <AvatarImage src={job.companyLogo} alt={job.companyName} />
                    <AvatarFallback className="rounded-md">
                      {job.companyName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg leading-tight">
                      {job.jobRole}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">{job.companyName}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Posted: {formatDate(job.createdAt)}
                    </span>
                    <Badge variant="outline" className="text-xs">{job.ctcAmount}</Badge>
                  </div>
                  <p className="text-xs sm:text-sm line-clamp-2 text-muted-foreground mb-4">
                    {job.jobDescription}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.technology
                      .split(',')
                      .slice(0, 3)
                      .map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                    {job.technology.split(',').length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.technology.split(',').length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 sm:px-6 py-3 sm:py-4 bg-muted/20 border-t flex flex-col sm:flex-row gap-2 sm:justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(`/student/jobs/${job.id}`)}
                  className="w-full sm:w-auto text-xs sm:text-sm"
                >
                  View Details
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      disabled={appliedJobs.includes(job.id)}
                      onClick={() => setSelectedJob(job)}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      {appliedJobs.includes(job.id) ? 'Applied' : 'Apply Now'}
                    </Button>
                  </DialogTrigger>
                  {selectedJob?.id === job.id && (
                    <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">Apply for {job.companyName}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-3 sm:gap-4 py-4">
                        <Input
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="cpi"
                          placeholder="CPI"
                          value={formData.cpi}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="cgpa"
                          placeholder="CGPA"
                          value={formData.cgpa}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="tenth"
                          placeholder="10th Percentage"
                          value={formData.tenth}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="twelfth"
                          placeholder="12th Percentage"
                          value={formData.twelfth}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="semester"
                          placeholder="Current Semester"
                          value={formData.semester}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="skill"
                          placeholder="Skills (e.g., React, Java, SQL)"
                          value={formData.skill}
                          onChange={handleFormChange}
                          required
                        />
                        <Input
                          name="address"
                          placeholder="Address"
                          value={formData.address}
                          onChange={handleFormChange}
                          required
                        />
                        <div className="relative">
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFormChange}
                            required
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                          />
                          <Input
                            type="text"
                            readOnly
                            placeholder="Upload Image"
                            value={formData.image ? formData.image.name : ''}
                            className="cursor-pointer"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={handleFormChange}
                            required
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                          />
                          <Input
                            type="text"
                            readOnly
                            placeholder="Upload Resume"
                            value={formData.resume ? formData.resume.name : ''}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                      <DialogFooter className="flex flex-col sm:flex-row gap-2">
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedJob(null)}
                          className="border border-gray-300 w-full sm:w-auto"
                        >
                          Close
                        </Button>
                        <Button onClick={handleSubmitApplication} className="w-full sm:w-auto">
                          Submit Application
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center h-[200px]">
            <p className="text-sm sm:text-base text-muted-foreground">
              No job listings found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentJobsList;
