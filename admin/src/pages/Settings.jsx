import React, { useState } from 'react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { Lock } from 'lucide-react';

const Settings = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error('New passwords do not match');
    }
    if (formData.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    try {
      setLoading(true);
      await API.put('/auth/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      toast.success('Password updated successfully');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-dark">Settings</h1>
        <p className="text-muted text-sm mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Lock size={20} />
            </div>
            <h2 className="text-lg font-semibold text-dark">Change Password</h2>
          </div>
          <p className="text-sm text-muted">Update your password to keep your account secure.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Current Password</label>
            <input
              type="password"
              required
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Confirm New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
