import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import StatsCard from '../components/StatsCard';
import {
  FileText,
  GraduationCap,
  Globe,
  UserPlus,
  Briefcase,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

const Dashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/dashboard')
      .then((res) => setStats(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const statusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-700',
      pending: 'bg-amber-100 text-amber-700',
      read: 'bg-gray-100 text-gray-700',
      replied: 'bg-green-100 text-green-700',
      contacted: 'bg-blue-100 text-blue-700',
      confirmed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-dark">Dashboard</h1>
        <p className="text-sm text-muted mt-1">Welcome back, {admin?.name}. Here's what's happening.</p>
      </div>

      {/* Pending alerts */}
      {stats?.pending && (stats.pending.newContacts > 0 || stats.pending.pendingInscriptions > 0 || stats.pending.pendingTeacherApps > 0) && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-primary flex-shrink-0" />
          <p className="text-sm text-dark">
            You have
            {stats.pending.newContacts > 0 && <span className="font-semibold"> {stats.pending.newContacts} new messages</span>}
            {stats.pending.pendingInscriptions > 0 && <span className="font-semibold">, {stats.pending.pendingInscriptions} pending inscriptions</span>}
            {stats.pending.pendingTeacherApps > 0 && <span className="font-semibold">, {stats.pending.pendingTeacherApps} pending applications</span>}
            {' '}to review.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard icon={FileText} label="Total Articles" value={stats?.counts?.blogs || 0} color="primary" />
        <StatsCard icon={GraduationCap} label="Active Teachers" value={stats?.counts?.teachers || 0} color="secondary" />
        <StatsCard icon={Globe} label="Languages" value={stats?.counts?.languages || 0} color="success" />
        <StatsCard icon={UserPlus} label="Inscriptions" value={stats?.counts?.inscriptions || 0} color="warning" />
        <StatsCard icon={Briefcase} label="Teacher Apps" value={stats?.counts?.teacherApps || 0} color="primary" />
        <StatsCard icon={MessageSquare} label="Messages" value={stats?.counts?.contacts || 0} color="error" />
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <MessageSquare size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">Recent Messages</h3>
          </div>
          <div className="divide-y divide-border">
            {stats?.recentContacts?.length === 0 ? (
              <p className="p-5 text-sm text-muted text-center">No messages yet</p>
            ) : (
              stats?.recentContacts?.map((c) => (
                <div key={c._id} className="px-5 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{c.name}</p>
                    <p className="text-xs text-muted truncate">{c.message?.substring(0, 50)}...</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inscriptions */}
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <UserPlus size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">Recent Inscriptions</h3>
          </div>
          <div className="divide-y divide-border">
            {stats?.recentInscriptions?.length === 0 ? (
              <p className="p-5 text-sm text-muted text-center">No inscriptions yet</p>
            ) : (
              stats?.recentInscriptions?.map((i) => (
                <div key={i._id} className="px-5 py-3 flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-dark truncate">{i.fullName}</p>
                    <p className="text-xs text-muted">{i.programType?.toUpperCase()} — {i.level}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColor(i.status)}`}>
                    {i.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
