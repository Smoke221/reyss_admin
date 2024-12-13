import React, { useState, useEffect } from 'react';
import { getUsers, toggleUserBlock, updateUser } from '../services/api';
import toast from 'react-hot-toast';
import SearchBar from './UsersTab/SearchBar';
import UserTable from './UsersTab/UserTable';
import EditUserModal from './UsersTab/EditUserModal';

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    username: '',
    customerId: '',
    phone: ''
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers(searchTerm);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchUsers = async (search) => {
    console.log(`🪵 → search:`, search)
    try {
      const data = await getUsers(search);
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      await toggleUserBlock(userId, !currentStatus);
      fetchUsers(searchTerm);
      toast.success(`User ${currentStatus ? 'unblocked' : 'blocked'} successfully`);
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      customerId: user.customerId,
      phone: user.phone
    });
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(selectedUser.id, editForm);
      fetchUsers(searchTerm);
      setSelectedUser(null);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  return (
    <div className="p-6">
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <UserTable
        users={users}
        onToggleBlock={handleToggleBlock}
        onEditUser={handleEditUser}
      />

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          editForm={editForm}
          onEditFormChange={setEditForm}
          onClose={() => setSelectedUser(null)}
          onSave={handleUpdateUser}
        />
      )}
    </div>
  );
}
