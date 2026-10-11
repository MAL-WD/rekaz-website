import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);
  const [formData, setFormData] = useState({
    name: '', nameAr: '', code: '', description: '', descriptionAr: '', icon: '', isActive: true, order: 0
  });

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const res = await API.get('/languages');
      setLanguages(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch languages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const openModal = (language = null) => {
    if (language) {
      setEditingLanguage(language);
      setFormData(language);
    } else {
      setEditingLanguage(null);
      setFormData({ name: '', nameAr: '', code: '', description: '', descriptionAr: '', icon: '', isActive: true, order: 0 });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingLanguage(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, order: Number(formData.order) };
      if (editingLanguage) {
        await API.put(`/languages/${editingLanguage._id}`, payload);
        toast.success('Language updated successfully');
      } else {
        await API.post('/languages', payload);
        toast.success('Language added successfully');
      }
      closeModal();
      fetchLanguages();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save language');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      try {
        await API.delete(`/languages/${id}`);
        toast.success('Language deleted successfully');
        fetchLanguages();
      } catch (error) {
        toast.error('Failed to delete language');
      }
    }
  };

  const columns = [
    {
      header: 'Language',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-2xl overflow-hidden">
            {row.icon ? (
              row.icon.startsWith('http') ? <img src={row.icon} alt={row.name} className="w-full h-full object-cover" /> : row.icon
            ) : <Globe size={20} className="text-muted" />}
          </div>
          <div>
            <div className="font-medium text-dark">{row.name}</div>
            {row.nameAr && <div className="text-xs text-muted" dir="rtl">{row.nameAr}</div>}
          </div>
        </div>
      )
    },
    { header: 'Code', accessor: (row) => <span className="uppercase text-muted font-medium">{row.code}</span> },
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
          <h1 className="text-2xl font-bold text-dark">Languages</h1>
          <p className="text-muted text-sm mt-1">Manage supported languages and courses.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus size={20} />
          Add Language
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={languages}
          searchKey="name"
          actions={actions}
          loading={loading}
          emptyMessage="No languages found."
          pageSize={10}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={editingLanguage ? 'Edit Language' : 'Add Language'} size="lg">
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
              <label className="text-sm font-medium text-dark">Code</label>
              <input type="text" required placeholder="e.g. en, fr, ar" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors uppercase" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-dark">Icon (URL or Emoji)</label>
              <input type="text" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium text-dark">Order</label>
              <input type="number" value={formData.order} onChange={(e) => setFormData({...formData, order: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Description</label>
            <textarea rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-dark">Description (Arabic)</label>
            <textarea rows={3} dir="rtl" value={formData.descriptionAr} onChange={(e) => setFormData({...formData, descriptionAr: e.target.value})} className="w-full px-3 py-2 rounded-xl border border-border bg-background focus:outline-none focus:border-primary transition-colors resize-none" />
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

export default Languages;
