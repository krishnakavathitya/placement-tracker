
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getApplications, getJobListing, getStudents } from '../../services/dataService';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Application } from '../../types';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Settings,
  Zap,
} from 'lucide-react';

const AdminApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applications: Application[] = getApplications();
  const application = applications.find((app) => app.id === id);

  if (!application) {
    return <div className="p-6 text-center">Application not found.</div>;
  }

  const {
    studentName,
    studentId,
    jobRole,
    companyName,
    resume,
    address,
    skills = [],
    status,
    appliedAt,
  } = application;

  const students = getStudents();
  const student = students.find((s) => s.id === studentId);

  const getStatusBadgeStyles = (status: string) => {
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
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Application Details</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 rounded-md">
                <AvatarFallback className="text-2xl rounded-md">
                  {studentName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-grow space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{studentName}</h2>
                  <Badge variant="outline" className={getStatusBadgeStyles(status)}>
                    {status}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground">{jobRole} at {companyName}</p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Applied: {new Date(appliedAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{student?.email || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Contact</p>
                    <p className="text-sm text-muted-foreground">{student?.contactNumber || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{address || 'N/A'}</p>
                  </div>
                </div>
              </div>



              {/* <div className="pt-4">
                <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  Skills
                </h3>
                {skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1 text-sm"
                      >
                        <Zap className="h-3 w-3 text-yellow-500" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No skills provided.</p>
                )}
              </div>

              <div className="pt-4">
                <h4 className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <p className="font-medium">Resume</p>
                </h4>
                {resume ? (
                  <a
                    href={resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Resume
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">No resume uploaded.</p>
                )}
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApplicationDetail;
