import { User } from '@/typings/user';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { upsertUser } from '../../../repo/users/upsertUser';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

type UserCreationModalProps = {
  user: User | null;
  isOpen: boolean;
  onRequestClose: () => void;
  onUserCreate?: (user: User) => void;
};

const UserUpsertModal = ({
  user,
  isOpen,
  onRequestClose,
  onUserCreate,
}: UserCreationModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const initialNewUser: User = {
    name: '',
    last_name: '',
    username: '',
    age: '',
  };
  const [formUser, setFormUser] = useState<User>(user || initialNewUser);

  useEffect(() => {
    setFormUser(user || initialNewUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formUser.name || !formUser.last_name || !formUser.username || !formUser.age) {
      toast.error("All fields are required.");
      return;
    }
    try {
      await upsertUser(formUser);
      if (formUser?.id) {
        navigate(`/users/${formUser.username}`);
      } else {
        if (onUserCreate) {
          onUserCreate(formUser);
        }
      }
      onRequestClose();
      setFormUser(initialNewUser);
    } catch (error) {
      if (typeof error === 'string') {
        toast.error(error);
      } else {
        toast.error('An error occurred while saving the user. Please try again later.');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create User"
      className="w-11/12 max-w-lg mx-auto p-4 rounded-lg bg-white shadow-lg"
    >
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">{t('user')}</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('name')}</label>
            <input
              type="text"
              value={formUser?.name}
              onChange={(e) => setFormUser({ ...formUser, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('lastName')}</label>
            <input
              type="text"
              value={formUser?.last_name}
              onChange={(e) => setFormUser({ ...formUser, last_name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('username')}</label>
            <input
              type="text"
              value={formUser?.username}
              onChange={(e) => setFormUser({ ...formUser, username: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{t('age')}</label>
            <input
              type="number"
              value={formUser?.age}
              onChange={(e) => setFormUser({ ...formUser, age: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            onClick={onRequestClose}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 mr-3"
          >
            {t('close')}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            {t('save')}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UserUpsertModal;