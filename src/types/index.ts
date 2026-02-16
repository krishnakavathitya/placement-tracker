
export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  contactNumber?: string;
}

export interface JobListing {
  id: string;
  jobRole: string;
  companyName: string;
  companyLogo: string;
  jobDescription: string;
  technology: string;
  companyAddress: string;
  companyEmail: string;
  contactNumber: string;
  ctcAmount: string;
  status: 'active' | 'expired';
  createdAt: string;
}

export interface Application {
  id: string;
  studentId: string;
  jobId: string;
  status: 'pending' | 'applied' | 'selected' | 'rejected';
  appliedAt: string;
  studentName: string;
  jobRole: string;
  companyName: string;
  email: string;
  contact: string;
  resume: string;
  address: string;
  skills: string[];
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  appliedJobs: number;
}


// src/types.ts

// export interface Applications {
//   id: string;
//   studentName: string;
//   jobRole: string;
//   companyName: string;
//   email: string;
//   contact: string;
//   resume: string;
//   address: string;
//   skills: string[];
//   status: 'pending' | 'applied' | 'selected' | 'rejected';
//   appliedAt: string;
// }
