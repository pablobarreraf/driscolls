import { User } from '@/typings/user';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../../../repo/users/getUserByUsername';
import { toast } from 'react-toastify';
import UserUpsertModal from '../upsert';
import UserDeleteModal from '../delete';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from 'src/components/language/switcher';

const UserCard = () => {
  const { t } = useTranslation();
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [lookedUp, setLookedup] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeUpsertModal = () => {
    setIsUpsertModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const fetchUser = async () => {
    try {
      const data = await getUserByUsername(username ?? "");
      setUser(data);
      setLookedup(true);
    } catch (error) {
      setLookedup(true);
      toast.error("This username does not exist.");
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (!user) {
    if (!lookedUp) {
      return <div>
        {t('loading')}
      </div>;
    } else {
      return <div>
        {t('userNotExist')}
      </div>;
    }
  }

  return (
    <>
      <LanguageSwitcher />
      <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <Link to="/users" className="text-blue-500 hover:underline">
          &lt; {t('backToUsers')}
        </Link>
        <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-2">
          {user.name} {user.last_name}
        </h2>
        <p className="text-gray-600 mb-2">@{user.username}</p>
        <p className="text-gray-600 mb-4">{t('age')}: {user.age}</p>
        <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 mr-2"
          onClick={() => {
            setSelectedUser(user);
            setIsUpsertModalOpen(true);
          }}
        >
          {t('edit')}
        </button>
        <button className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          onClick={() => {
            setSelectedUser(user);
            setIsDeleteModalOpen(true);
          }}
        >
          {t('delete')}
        </button>
        <UserUpsertModal
          user={selectedUser}
          isOpen={isUpsertModalOpen}
          onRequestClose={(closeUpsertModal)}
        />

        <UserDeleteModal
          user={selectedUser}
          isOpen={isDeleteModalOpen}
          onRequestClose={(closeDeleteModal)}
        />
      </div>
    </>
  );
};

export default UserCard;