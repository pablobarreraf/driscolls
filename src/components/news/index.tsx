import React, { useEffect, useState } from 'react';
import { News } from '@/typings/news';
import { getNews } from '../..//repo/news/getNews';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../language/switcher';

const NewsList = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<News[]>([]);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      toast.error("Couldn't load users, try again later");
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <LanguageSwitcher />
      <Link to="/" className="text-left text-blue-500 hover:underline ml-4 pt-4">
        &lt; {t('backToHome')}
      </Link>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {news.map((newItem: News, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  <Link to={`/news/${newItem.tag}`}>
                    {newItem.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  <Link to={`/news/${newItem.tag}`}>
                    {newItem.description}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NewsList;
