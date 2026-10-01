import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', subject: '', subjectAr: '', bio: '', bioAr: '', image: '', qualifications: '', experience: '', isActive: true, order: 0
  });

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await API.get('/teachers');
      setTeachers(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openModal = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        ...teacher,
        qualifications: Array.isArray(teacher.qualifications) ? teacher.qualifications.join(', ') : teacher.qualifications || ''
      });
    } else {
      setEditingTeacher(null);
      setFormData({ name: '', nameAr: '', subject: '', subjectAr: '', bio: '', bioAr: '', image: '', qualifications: '', experience: '', isActive: true, order: 0 });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTeacher(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...formData, 
        qualifications: formData.qualifications.split(',').map(t => t.trim()).filter(Boolean),
        order: Number(formData.order)
      };
      if (editingTeacher) {
        await API.put(`/teachers/${editingTeacher._id}`, payload);
        toast.success('Teacher updated successfully');
      } else {
        await API.post('/teachers', payload);
        toast.success('Teacher added successfully');
      }
      closeModal();
      fetchTeachers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save teacher');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await API.delete(`/teachers/${id}`);
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        toast.error('Failed to delete teacher');
      }
    }
  };

  const columns = [
    {
      header: 'Teacher',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          {row.image ? (
            <img src={row.image} alt={row.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted">
              <User size={20} />
            </div>
          )}
          <div>
            <div className="font-medium text-dark">{row.name}</div>
            {row.nameAr && <div className="text-xs text-muted" dir="rtl">{row.nameAr}</div>}
          </div>
        </div>
      )
    },
    {
      header: 'Subject',
      accessor: (row) => (
        <div>
          <div className="text-dark">{row.subject}</div>
          {row.subjectAr && <div className="text-xs text-muted" dir="rtl">{row.subjectAr}</div>}
        </div>
      )
    },
    { header: 'Experience', accessor: 'experience' },
    { header: 'Order', accessor: 'order' },
    {
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${row.isActive ? 'bg-success/10 text-success' : 'bg-muted/10 text-muted'}`}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button onClick={() => openModal(row)} className="p-1.5 text-secondary hover:bg-secondary/10 rounded-lg transition-colors">
        <Edit size={18} />
      </button>
      <button onClick={() => handleDelete(row._id)} className="p-1.5 text-error hover:bg-error/10 rounded-lg transition-colors">
        <Trash2 size={18} />
      </button>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Teachers</h1>
          <p className="text-muted text-sm mt-1">Manage instructors and their profiles.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus size={20} />
          Add Teacher
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={teachers}
          searchKey="name"
          actions={actions}
          loading={loading}
          emptyMessage="No teachers found."
          pageSize={10}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={editingTeacher ? 'Edit Teacher' : 'Add Teacher'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Name</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Name (Arabic)</label>
              <input type="text" dir="rtl" value={formData.nameAr} onChange={(e) => setFormData({...formData, nameAr: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Subject</label>
              <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Subject (Arabic)</label>
              <input type="text" dir="rtl" value={formData.subjectAr} onChange={(e) => setFormData({...formData, subjectAr: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Experience</label>
              <input type="text" placeholder="e.g. 5+ Years" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Order</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-dark">Image URL</label>
              <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-dark">Qualifications (comma-separated)</label>
              <input type="text" value={formData.qualifications} onChange={(e) => setFormData({...formData, qualifications: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Bio</label>
            <textarea rows={3} value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Bio (Arabic)</label>
            <textarea rows={3} dir="rtl" value={formData.bioAr} onChange={(e) => setFormData({...formData, bioAr: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>
          
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
            <label htmlFor="isActive" className="text-sm font-medium text-dark">Active</label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button type="button" onClick={closeModal} className="px-4 py-2 text-dark hover:bg-background rounded-xl transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Teachers;
