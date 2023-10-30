import React, { useEffect, useState } from 'react';
import { User } from '@/typings/user';
import UserUpsertModal from './upsert';
import { getUsers } from '../..//repo/users/getUsers';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../language/switcher';

const Users = () => {
  const { t } = useTranslation();
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const closeUpsertModal = () => {
    setIsUpsertModalOpen(false);
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Couldn't load users, try again later");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserUpsert = () => {
    toast.success("User created successfully.");
    fetchUsers();
  }

  return (
    <>
      <LanguageSwitcher />
      <Link to="/" className="text-left text-blue-500 hover:underline ml-4 pt-4">
        &lt; {t('backToHome')}
      </Link>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{t('users')}</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => { setIsUpsertModalOpen(true) }}>
              {t('createUser')}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    {t('name')}
                  </th>
                  <th className="px-4 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    {t('lastName')}
                  </th>
                  <th className="px-4 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    {t('username')}
                  </th>
                  <th className="px-4 md:px-6 py-3 border-b-2 border-gray-300 text-left text-xs md:text-sm leading-4 font-medium text-gray-600 uppercase tracking-wider">
                    {t('age')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 md:px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <Link to={`/users/${user.username}`}>
                        {user.name}
                      </Link>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <Link to={`/users/${user.username}`}>
                        {user.last_name}
                      </Link>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <Link to={`/users/${user.username}`}>
                        {user.username}
                      </Link>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                      <Link to={`/users/${user.username}`}>
                        {user.age}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <UserUpsertModal
            user={null}
            isOpen={isUpsertModalOpen}
            onRequestClose={(closeUpsertModal)}
            onUserCreate={handleUserUpsert}
          />
        </div>
      </div>
    </>
  );
}

export default Users;
