
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { toast } from 'sonner';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
}

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        contactNumber: user.contactNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real application, this would update the user profile in the backend
    // For this example, we'll simulate a successful update
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }, 500);
  };

  const getInitials = () => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName[0]}${profileData.lastName[0]}`.toUpperCase();
    }
    if (profileData.email && profileData.email.length > 0) {
      return profileData.email[0].toUpperCase();
    }
    return 'U'; // Default fallback if no data is available
  };

  return (
    <div className="space-y-1 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and update your personal information
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card>
          <CardContent className="p-6 flex flex-col items-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarFallback className="text-4xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-muted-foreground">{profileData.email}</p>
            <div className="w-full mt-6 pt-6 border-t">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">{profileData.contactNumber}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Update your personal details
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  disabled
                />
                <p className="text-sm text-muted-foreground">
                  Your email cannot be changed
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={profileData.contactNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
