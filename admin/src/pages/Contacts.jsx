import React, { useState, useEffect } from 'react';
import { Eye, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../api/axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/contacts');
      setContacts(res.data?.data || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/contacts/${id}/status`, { status });
      toast.success('Status updated');
      fetchContacts();
      if (selectedItem && selectedItem._id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await API.delete(`/contacts/${id}`);
        toast.success('Message deleted');
        fetchContacts();
        if (selectedItem && selectedItem._id === id) closeModal();
      } catch (error) {
        toast.error('Failed to delete message');
      }
    }
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    if (item.status === 'new') {
      handleStatusChange(item._id, 'read');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      new: 'bg-primary/10 text-primary',
      read: 'bg-muted/10 text-muted',
      replied: 'bg-success/10 text-success'
    };
    return (
      <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.new}`}>
        {status}
      </span>
    );
  };

  const columns = [
    { header: 'Name', accessor: (row) => <span className={`font-medium ${row.status === 'new' ? 'text-dark' : 'text-muted'}`}>{row.name}</span> },
    { header: 'Email', accessor: 'email' },
    { header: 'Subject', accessor: 'subject' },
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
        <h1 className="text-2xl font-bold text-dark">Messages</h1>
        <p className="text-muted text-sm mt-1">Manage contact inquiries and support messages.</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={contacts}
          searchKey="name"
          actions={actions}
          loading={loading}
          emptyMessage="No messages found."
          pageSize={10}
        />
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title="Message Details" size="md">
        {selectedItem && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-dark">{selectedItem.subject}</h3>
                  <div className="text-sm text-muted mt-1">From: <span className="text-dark font-medium">{selectedItem.name}</span> ({selectedItem.email})</div>
                  {selectedItem.phone && <div className="text-sm text-muted">Phone: <span className="text-dark">{selectedItem.phone}</span></div>}
                  <div className="text-xs text-muted mt-1">{new Date(selectedItem.createdAt).toLocaleString()}</div>
                </div>
                <div>{getStatusBadge(selectedItem.status)}</div>
              </div>
              
              <div className="p-4 bg-background rounded-xl border border-border">
                <p className="text-sm whitespace-pre-wrap">{selectedItem.message}</p>
              </div>

              <div className="pt-2">
                <label className="text-sm font-medium text-dark block mb-2">Update Status</label>
                <div className="flex gap-2">
                  {['new', 'read', 'replied'].map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedItem._id, s)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                        selectedItem.status === s 
                          ? 'bg-primary text-white' 
                          : 'bg-surface border border-border text-muted hover:text-dark hover:border-muted'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
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

export default Contacts;
