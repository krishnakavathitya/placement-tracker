
// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { getJobListing, createApplication } from '../../services/dataService';
// // import { useAuth } from '../../context/AuthContext';
// // import { JobListing } from '../../types';
// // import { Button } from '../../components/ui/button';
// // import { Card, CardContent } from '../../components/ui/card';
// // import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
// // import { Badge } from '../../components/ui/badge';
// // import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
// // import { toast } from 'sonner';

// // const StudentJobDetail: React.FC = () => {
// //   const { jobId } = useParams<{ jobId: string }>();
// //   const { user } = useAuth();
// //   const [job, setJob] = useState<JobListing | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [hasApplied, setHasApplied] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (jobId) {
// //       const jobData = getJobListing(jobId);
// //       setJob(jobData);
// //     }
// //     setLoading(false);
// //     checkIfApplied();
// //   }, [jobId]);

// //   const checkIfApplied = () => {
// //     if (!jobId || !user?.id) return;
    
// //     const applications = JSON.parse(localStorage.getItem('applications') || '[]');
// //     const applied = applications.some(
// //       (app: any) => app.studentId === user.id && app.jobId === jobId
// //     );
    
// //     setHasApplied(applied);
// //   };

// //   const handleApply = () => {
// //     if (!job || !user?.id) return;
    
// //     const result = createApplication(user.id, job.id);
    
// //     if (result) {
// //       setHasApplied(true);
// //       toast.success('Application submitted successfully');
// //     } else {
// //       toast.error('You have already applied to this job');
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //     });
// //   };

// //   if (loading) {
// //     return <div className="flex items-center justify-center h-[400px]">Loading...</div>;
// //   }

// //   if (!job) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-[400px]">
// //         <h2 className="text-2xl font-bold">Job not found</h2>
// //         <p className="text-muted-foreground mb-4">The job listing you're looking for doesn't exist.</p>
// //         <Button onClick={() => navigate('/student/jobs')}>Back to Job Listings</Button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center gap-2">
// //         <Button 
// //           variant="ghost" 
// //           size="icon" 
// //           onClick={() => navigate('/student/jobs')}
// //           className="h-8 w-8"
// //         >
// //           <ArrowLeft className="h-4 w-4" />
// //         </Button>
// //         <h1 className="text-3xl font-bold tracking-tight">Job Details</h1>
// //       </div>
      
// //       <Card>
// //         <CardContent className="p-6">
// //           <div className="flex flex-col md:flex-row gap-6">
// //             <div className="flex-shrink-0">
// //               <Avatar className="h-24 w-24 rounded-md">
// //                 <AvatarImage src={job.companyLogo} alt={job.companyName} />
// //                 <AvatarFallback className="text-2xl rounded-md">
// //                   {job.companyName.substring(0, 2).toUpperCase()}
// //                 </AvatarFallback>
// //               </Avatar>
// //             </div>
            
// //             <div className="flex-grow space-y-4">
// //               <div className="space-y-2">
// //                 <h2 className="text-2xl font-bold">{job.jobRole}</h2>
// //                 <p className="text-xl text-muted-foreground">{job.companyName}</p>
// //               </div>
              
// //               <div className="flex flex-wrap gap-4">
// //                 <div className="flex items-center gap-2 text-sm">
// //                   <Calendar className="h-4 w-4 text-muted-foreground" />
// //                   <span>Posted: {formatDate(job.createdAt)}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2 text-sm">
// //                   <Briefcase className="h-4 w-4 text-muted-foreground" />
// //                   <span>CTC: {job.ctcAmount}</span>
// //                 </div>
// //               </div>
              
// //               <div className="grid gap-4 sm:grid-cols-2">
// //                 <div className="flex items-start gap-2">
// //                   <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                   <div>
// //                     <p className="font-medium">Email</p>
// //                     <p className="text-sm text-muted-foreground">{job.companyEmail}</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start gap-2">
// //                   <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                   <div>
// //                     <p className="font-medium">Contact</p>
// //                     <p className="text-sm text-muted-foreground">{job.contactNumber}</p>
// //                   </div>
// //                 </div>
                
// //                 <div className="flex items-start gap-2 sm:col-span-2">
// //                   <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                   <div>
// //                     <p className="font-medium">Address</p>
// //                     <p className="text-sm text-muted-foreground">{job.companyAddress}</p>
// //                   </div>
// //                 </div>
// //               </div>
              
// //               <div className="pt-4">
// //                 <h3 className="text-lg font-medium mb-2">Required Skills</h3>
// //                 <div className="flex flex-wrap gap-2">
// //                   {job.technology.split(',').map((tech, index) => (
// //                     <Badge key={index} variant="secondary">
// //                       {tech.trim()}
// //                     </Badge>
// //                   ))}
// //                 </div>
// //               </div>
              
// //               <div className="pt-4">
// //                 <h3 className="text-lg font-medium mb-2">Job Description</h3>
// //                 <div className="text-muted-foreground whitespace-pre-line">
// //                   {job.jobDescription}
// //                 </div>
// //               </div>
              
// //               <div className="pt-6">
// //                 <Button 
// //                   className="w-full"
// //                   disabled={hasApplied}
// //                   onClick={handleApply}
// //                 >
// //                   {hasApplied ? 'Already Applied' : 'Apply Now'}
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default StudentJobDetail;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobListing, createApplication } from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { JobListing } from '../../types';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '../../components/ui/dialog';

const StudentJobDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [job, setJob] = useState<JobListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    cpi: '',
    cgpa: '',
    tenth: '',
    twelfth: '',
    semester: '',
    skills:'',
    address:'',
    image: null as File | null,
    resume: null as File | null,
  });

  useEffect(() => {
    if (jobId) {
      const jobData = getJobListing(jobId);
      setJob(jobData);
    }
    setLoading(false);
    checkIfApplied();
  }, [jobId]);

  const checkIfApplied = () => {
    if (!jobId || !user?.id) return;
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    const applied = applications.some(
      (app: any) => app.studentId === user.id && app.jobId === jobId
    );
    setHasApplied(applied);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmitApplication = () => {
    const { fullName, cpi, cgpa, tenth, twelfth, semester, image, resume } = formData;

    if (!fullName || !cpi || !cgpa || !tenth || !twelfth || !semester || !image || !resume) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!job || !user?.id) return;

    const result = createApplication(user.id, job.id);
    if (result) {
      setHasApplied(true);
      setShowDialog(false);
      toast.success('Application submitted successfully');
    } else {
      toast.error('You have already applied to this job');
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
        <Button onClick={() => navigate('/student/jobs')}>Back to Job Listings</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/student/jobs')}
          className="h-8 w-8"
        >
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
                <h2 className="text-2xl font-bold">{job.jobRole}</h2>
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
                    <p className="text-sm text-muted-foreground">{job.contactNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{job.companyAddress}</p>
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
                <div className="text-muted-foreground whitespace-pre-line">
                  {job.jobDescription}
                </div>
              </div>

              <div className="pt-6">
                {hasApplied ? (
                  <Button disabled className="w-full">
                    Already Applied
                  </Button>
                ) : (
                  <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full">Apply Now</Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Apply for {job.companyName}</DialogTitle>
                      </DialogHeader>

                      <div className="grid gap-4 pt-2">
                        <Input name="fullName" placeholder="Full Name"  value={formData.fullName} onChange={handleFormChange} required />
                        <Input name="cpi" placeholder="CPI"  value={formData.cpi} onChange={handleFormChange} required />
                        <Input name="cgpa" placeholder="CGPA"  value={formData.cgpa} onChange={handleFormChange} required />
                        <Input name="tenth" placeholder="10th Percentage"  value={formData.tenth}  onChange={handleFormChange} required />
                        <Input name="twelfth" placeholder="12th Percentage"  value={formData.twelfth} onChange={handleFormChange} required />
                        <Input name="semester" placeholder="Current Semester"  value={formData.semester}  onChange={handleFormChange} required />
                        
                        <Input
                          name="skill"
                          placeholder="Skills (e.g., React, Java, SQL)"
                          value={formData.skills}
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
                          <input type="file" name="image" accept="image/*" onChange={handleFormChange}
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer" required />
                          <Input type="text" readOnly placeholder="Upload Image"
                            value={formData.image ? formData.image.name : ''}
                            className="cursor-pointer" />
                        </div>

                        <div className="relative">
                          <input type="file" name="resume" accept=".pdf" onChange={handleFormChange}
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer" required />
                          <Input type="text" readOnly placeholder="Upload Resume"
                            value={formData.resume ? formData.resume.name : ''}
                            className="cursor-pointer" />
                        </div>
                      </div>

                      <DialogFooter className="pt-4">
                        <Button variant="ghost" onClick={() => setShowDialog(false)} className="border border-gray-300">Close</Button>
                        <Button onClick={handleSubmitApplication}>Submit Application</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentJobDetail;
