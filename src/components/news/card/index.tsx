import { News } from '@/typings/news';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByTag } from '../../../repo/news/getNewsByTag';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from 'src/components/language/switcher';

const NewsCard = () => {
  const { t } = useTranslation();
  const { tag } = useParams<{ tag: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [lookedUp, setLookedup] = useState<boolean>(false);

  const fetchNew = async () => {
    try {
      const data = await getNewsByTag(tag ?? "");
      setNews(data);
      setLookedup(true);
    } catch (error) {
      setLookedup(true);
      toast.error("This news does not exist.");
    }
  };

  useEffect(() => {
    fetchNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tag]);

  if (!news) {
    if (!lookedUp) {
      return <div>
        {t('loading')}
      </div>;
    } else {
      return <div>
        {t('newsNotExist')}
      </div>;
    }
  }

  return (
    <>
      <LanguageSwitcher />
      <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
        <Link to="/news" className="text-blue-500 hover:underline">
          &lt; {t('backToNews')}
        </Link>
        <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-2">
          {news.title}
        </h2>
        <p className="text-gray-600 mb-4">{news.description}</p>
      </div>
    </>
  );
};

export default NewsCard;