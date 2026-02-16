
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contactNumber: string
  ) => Promise<boolean>;
}

// Mock user data
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'Admin.placement@12345';

// Helper function to generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  register: async () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Load registered students from localStorage
  const getRegisteredStudents = (): Record<string, { user: User; password: string }> => {
    const storedStudents = localStorage.getItem('registeredStudents');
    return storedStudents ? JSON.parse(storedStudents) : {};
  };

  const saveRegisteredStudent = (
    email: string,
    userData: { user: User; password: string }
  ) => {
    const students = getRegisteredStudents();
    students[email] = userData;
    localStorage.setItem('registeredStudents', JSON.stringify(students));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Admin login
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser: User = {
        id: 'admin-1',
        email: ADMIN_EMAIL,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
      };
      
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      toast.success('Logged in successfully as Administrator');
      navigate('/admin/dashboard');
      return true;
    }

    // Student login
    const registeredStudents = getRegisteredStudents();
    const studentData = registeredStudents[email];

    if (studentData && studentData.password === password) {
      setUser(studentData.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(studentData.user));
      
      toast.success('Logged in successfully');
      navigate('/student/dashboard');
      return true;
    }

    toast.error('Invalid email or password');
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contactNumber: string
  ): Promise<boolean> => {
    const registeredStudents = getRegisteredStudents();
    
    if (registeredStudents[email]) {
      toast.error('Email already registered');
      return false;
    }

    const newUser: User = {
      id: generateId(),
      email,
      firstName,
      lastName,
      role: 'student',
      contactNumber,
    };

    saveRegisteredStudent(email, { user: newUser, password });
    
    // Initialize empty data structures for the new user
    const applications = JSON.parse(localStorage.getItem('applications') || '[]');
    localStorage.setItem('applications', JSON.stringify(applications));
    
    toast.success('Registration successful');
    return true;
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
