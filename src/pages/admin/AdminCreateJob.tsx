
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJobListing } from '../../services/dataService';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent } from '../../components/ui/card';
import { toast } from 'sonner';

const AdminCreateJob: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobRole: '',
    companyName: '',
    companyLogo: '',
    jobDescription: '',
    technology: '',
    companyAddress: '',
    companyEmail: '',
    contactNumber: '',
    ctcAmount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      createJobListing(formData);
      toast.success('Job listing created successfully');
      navigate('/admin/jobs');
    } catch (error) {
      toast.error('Failed to create job listing');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Job Listing</h1>
        <p className="text-muted-foreground">
          Add a new job opportunity for students
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="jobRole">Job Role</Label>
                <Input 
                  id="jobRole" 
                  name="jobRole" 
                  required 
                  value={formData.jobRole}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  required 
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyLogo">Company Logo URL</Label>
                <Input 
                  id="companyLogo" 
                  name="companyLogo" 
                  placeholder="https://example.com/logo.png"
                  value={formData.companyLogo}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="technology">Technologies</Label>
                <Input 
                  id="technology" 
                  name="technology" 
                  placeholder="React, Node.js, MongoDB, etc."
                  value={formData.technology}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input 
                  id="companyEmail" 
                  name="companyEmail" 
                  type="email"
                  required
                  value={formData.companyEmail}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input 
                  id="contactNumber" 
                  name="contactNumber" 
                  required
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ctcAmount">CTC Amount</Label>
                <Input 
                  id="ctcAmount" 
                  name="ctcAmount" 
                  placeholder="$80,000 - $100,000"
                  required
                  value={formData.ctcAmount}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input 
                  id="companyAddress" 
                  name="companyAddress" 
                  required
                  value={formData.companyAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea 
                id="jobDescription" 
                name="jobDescription" 
                rows={5}
                required
                value={formData.jobDescription}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/admin/jobs')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Job Listing'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateJob;
