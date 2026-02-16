
import React, { useEffect, useState } from 'react';
import { getStudents } from '../../services/dataService';
import { Student } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Search } from 'lucide-react';

const AdminStudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const studentsList = getStudents();
    setStudents(studentsList);
  }, []);

  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.contactNumber.includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Registered Students</h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          View and manage student information
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or contact..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-lg border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Student</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
              <TableHead className="hidden md:table-cell min-w-[120px]">Contact</TableHead>
              <TableHead className="text-right min-w-[100px]">Applied Jobs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarFallback>
                          {student.firstName[0]}{student.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium text-sm sm:text-base">
                        {student.firstName} {student.lastName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm sm:text-base">{student.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">{student.contactNumber}</TableCell>
                  <TableCell className="text-right text-sm sm:text-base">{student.appliedJobs}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-sm sm:text-base">
                  No students found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminStudentsList;
