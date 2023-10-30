import React from 'react';
import { useDispatch } from 'react-redux';
import { switchLanguage } from '../../../store/language';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  return (
    <div className="flex items-center justify-end w-full p-4">
      <button
        className={`${currentLanguage === 'en' ? 'bg-green-400' : ''
          } mr-4`}
        onClick={() => dispatch(switchLanguage('en'))}
      >
        {t('english')}
      </button>
      <button
        className={`${currentLanguage === 'es' ? 'bg-green-400' : ''
          }`}
        onClick={() => dispatch(switchLanguage('es'))}
      >
        {t('spanish')}
      </button>
    </div>
  );
};

export default LanguageSwitcher;