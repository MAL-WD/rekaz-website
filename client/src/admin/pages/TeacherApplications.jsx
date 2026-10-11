import React, { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const TeacherApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get('/teacher-applications');
      setApplications(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/teacher-applications/${id}/status`, { status });
      toast.success('Status updated');
      fetchApplications();
      if (selectedItem && selectedItem._id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await API.delete(`/teacher-applications/${id}`);
        toast.success('Application deleted');
        fetchApplications();
        if (selectedItem && selectedItem._id === id) closeModal();
      } catch (error) {
        toast.error('Failed to delete application');
      }
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-warning/10 text-warning',
      reviewed: 'bg-secondary/10 text-secondary',
      interview: 'bg-primary/10 text-primary',
      accepted: 'bg-success/10 text-success',
      rejected: 'bg-error/10 text-error'
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { header: 'Ref Number', accessor: (row) => <span className="font-mono text-sm">{row.referenceNumber}</span> },
    { header: 'Full Name', accessor: (row) => <span className="font-medium text-dark">{row.fullName}</span> },
    { header: 'Specialty', accessor: 'subjectSpecialty' },
    { header: 'Experience', accessor: 'yearsExperience' },
    { header: 'Status', accessor: (row) => getStatusBadge(row.status) },
    { header: 'Date', accessor: (row) => new Date(row.createdAt).toLocaleDateString() }
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button onClick={() => openModal(row)} className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
        <Eye size={18} />
      </button>
      <button onClick={() => handleDelete(row._id)} className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark">Teacher Applications</h1>
        <p className="text-muted text-sm mt-1">Review applications from aspiring instructors.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={applications}
          searchKey="fullName"
          actions={actions}
          loading={loading}
          emptyMessage="No applications found."
          pageSize={10}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title="Application Details" size="xl">
        {selectedItem && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-background rounded-xl border border-border">
              <div>
                <div className="text-sm text-muted">Reference Number</div>
                <div className="font-mono font-medium text-lg">{selectedItem.referenceNumber}</div>
              </div>
              <div>
                <div className="text-sm text-muted mb-1">Status</div>
                <div className="flex gap-2">
                  <select 
                    value={selectedItem.status}
                    onChange={(e) => handleStatusChange(selectedItem._id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-surface text-sm font-medium focus:outline-none focus:border-primary"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-dark border-b border-border pb-2">Personal Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3"><span className="text-muted">Full Name:</span> <span className="col-span-2 font-medium">{selectedItem.fullName}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Birth Date:</span> <span className="col-span-2">{selectedItem.birthDate ? new Date(selectedItem.birthDate).toLocaleDateString() : 'N/A'}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Phone:</span> <span className="col-span-2">{selectedItem.phone}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Email:</span> <span className="col-span-2">{selectedItem.email || 'N/A'}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Location:</span> <span className="col-span-2">{selectedItem.wilaya} - {selectedItem.city}</span></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-dark border-b border-border pb-2">Professional Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-3"><span className="text-muted">Specialty:</span> <span className="col-span-2 font-medium">{selectedItem.subjectSpecialty}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Education:</span> <span className="col-span-2 capitalize">{selectedItem.educationLevel}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Experience:</span> <span className="col-span-2">{selectedItem.yearsExperience} Years</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Levels:</span> <span className="col-span-2">{selectedItem.targetLevels?.join(', ') || 'N/A'}</span></div>
                  <div className="grid grid-cols-3"><span className="text-muted">Availability:</span> <span className="col-span-2 capitalize">{selectedItem.availability || 'N/A'}</span></div>
                </div>
              </div>

              {selectedItem.motivation && (
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-semibold text-dark border-b border-border pb-2">Motivation</h3>
                  <p className="text-sm p-3 bg-background rounded-lg border border-border whitespace-pre-wrap">{selectedItem.motivation}</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-4 border-t border-border">
              <button onClick={closeModal} className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm">Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeacherApplications;
