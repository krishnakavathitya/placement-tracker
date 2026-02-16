
import { JobListing, Application, Student } from '../types';

// Generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Get all job listings from localStorage
export const getJobListings = (): JobListing[] => {
  const listings = localStorage.getItem('jobListings');
  return listings ? JSON.parse(listings) : [];
};

// Save job listings to localStorage
export const saveJobListings = (listings: JobListing[]) => {
  localStorage.setItem('jobListings', JSON.stringify(listings));
};

// Create a new job listing
export const createJobListing = (jobData: Omit<JobListing, 'id' | 'createdAt' | 'status'>): JobListing => {
  const listings = getJobListings();
  
  const newJob: JobListing = {
    ...jobData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    status: 'active',
  };
  
  listings.push(newJob);
  saveJobListings(listings);
  
  return newJob;
};

// Update a job listing
export const updateJobListing = (jobId: string, updates: Partial<JobListing>): JobListing | null => {
  const listings = getJobListings();
  const index = listings.findIndex((job) => job.id === jobId);
  
  if (index === -1) return null;
  
  listings[index] = { ...listings[index], ...updates };
  saveJobListings(listings);
  
  return listings[index];
};

// Delete a job listing
export const deleteJobListing = (jobId: string): boolean => {
  const listings = getJobListings();
  const filteredListings = listings.filter((job) => job.id !== jobId);
  
  if (filteredListings.length === listings.length) return false;
  
  saveJobListings(filteredListings);
  return true;
};

// Get a specific job listing
export const getJobListing = (jobId: string): JobListing | null => {
  const listings = getJobListings();
  return listings.find((job) => job.id === jobId) || null;
};

// Get all applications from localStorage
export const getApplications = (): Application[] => {
  const applications = localStorage.getItem('applications');
  return applications ? JSON.parse(applications) : [];
};

// Save applications to localStorage
export const saveApplications = (applications: Application[]) => {
  localStorage.setItem('applications', JSON.stringify(applications));
};

// Create a new application
export const createApplication = (studentId: string, jobId: string, address: string): Application | null => {
  const applications = getApplications();
  const job = getJobListing(jobId);
  
  if (!job) return null;
  
  // Check if student has already applied
  const existingApplication = applications.find(
    (app) => app.studentId === studentId && app.jobId === jobId
  );
  
  if (existingApplication) return null;
  
  // Get student details
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  
  if (!student) return null;
  
  const newApplication: Application = {
    id: generateId(),
    studentId,
    jobId,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    studentName: `${student.firstName} ${student.lastName}`,
    jobRole: job.jobRole,
    companyName: job.companyName,
    email: '',
    contact: '',
    resume: '',
    address: address,
    skills: []
  };
  
  applications.push(newApplication);
  saveApplications(applications);
  
  return newApplication;
};

// Update application status
export const updateApplicationStatus = (applicationId: string, status: Application['status']): Application | null => {
  const applications = getApplications();
  const index = applications.findIndex((app) => app.id === applicationId);
  
  if (index === -1) return null;
  
  applications[index] = { ...applications[index], status };
  saveApplications(applications);
  
  return applications[index];
};

// Get applications for a specific student
export const getStudentApplications = (studentId: string): Application[] => {
  const applications = getApplications();
  return applications.filter((app) => app.studentId === studentId);
};

// Get all students from localStorage (based on registered users)
export const getStudents = (): Student[] => {
  const registeredStudents = localStorage.getItem('registeredStudents');
  if (!registeredStudents) return [];
  
  const parsed = JSON.parse(registeredStudents);
  const applications = getApplications();
  
  return Object.values(parsed)
    .filter((data: any) => data.user.role === 'student')
    .map((data: any) => {
      const user = data.user;
      const studentApplications = applications.filter((app) => app.studentId === user.id);
      
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        contactNumber: user.contactNumber || '',
        appliedJobs: studentApplications.length,
      };
    });
};

// Initialize some sample data if none exists
export const initializeSampleData = () => {
  const jobListings = getJobListings();
  
  if (jobListings.length === 0) {
    const sampleJobs = [
      {
        jobRole: 'Frontend Developer',
        companyName: 'TechCorp',
        companyLogo: 'https://placekitten.com/100/100',
        jobDescription: 'Looking for a skilled frontend developer with React experience.',
        technology: 'React, TypeScript, Tailwind CSS',
        companyAddress: '123 Tech Street, Silicon Valley, CA',
        companyEmail: 'careers@techcorp.com',
        contactNumber: '555-123-4567',
        ctcAmount: '$80,000 - $100,000',
      },
      {
        jobRole: 'Backend Developer',
        companyName: 'DataSystems Inc',
        companyLogo: 'https://placekitten.com/101/101',
        jobDescription: 'Backend developer role focusing on building scalable APIs.',
        technology: 'Node.js, Express, MongoDB',
        companyAddress: '456 Data Drive, Boston, MA',
        companyEmail: 'jobs@datasystems.com',
        contactNumber: '555-987-6543',
        ctcAmount: '$90,000 - $110,000',
      },
      {
        jobRole: 'Full Stack Engineer',
        companyName: 'WebWizards',
        companyLogo: 'https://placekitten.com/102/102',
        jobDescription: 'Full stack position for an experienced developer.',
        technology: 'React, Node.js, PostgreSQL',
        companyAddress: '789 Web Way, Portland, OR',
        companyEmail: 'careers@webwizards.com',
        contactNumber: '555-567-8901',
        ctcAmount: '$95,000 - $115,000',
      },
    ];
    
    sampleJobs.forEach((job) => {
      createJobListing(job);
    });
  }
};
