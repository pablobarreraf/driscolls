import { User } from '@/typings/user';
import { toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { deleteUser } from '../../../repo/users/deleteUser';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

Modal.setAppElement('#root');

type UserCreationModalProps = {
  user: User | null;
  isOpen: boolean;
  onRequestClose: () => void;
  onUserCreate?: (user: User) => void;
};

const UserDeleteModal = ({
  user,
  isOpen,
  onRequestClose,
  onUserCreate,
}: UserCreationModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formUser, setFormUser] = useState<User | null>(user);

  useEffect(() => {
    setFormUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteUser(formUser);
      toast.success("User deleted successfully.");
      navigate(`/users`);
    } catch (error) {
      toast.error("Something happened trying to save the user, try again later.");
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
        <h2 className="text-2xl font-bold text-center mb-4">{t('sureToDelete')} @{user?.username}?</h2>
        <form>
          <button
            onClick={onRequestClose}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 mr-3"
          >
            No
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            {t('yes')}
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UserDeleteModal;