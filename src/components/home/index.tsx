import { Link } from 'react-router-dom';
import LanguageSwitcher from '../language/switcher';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <LanguageSwitcher />
      <div className="flex justify-center items-center h-screen p-4">
        <Link to="/users" className="w-1/2 p-6 border border-gray-300 rounded-lg mr-4">
          <h2 className="text-2xl font-bold text-center">{t('users')}</h2>
        </Link>
        <Link to="/news" className="w-1/2 p-6 border border-gray-300 rounded-lg ml-4">
          <h2 className="text-2xl font-bold text-center">{t('news')}</h2>
        </Link>
      </div>
    </>
  );
}

export default Home;
