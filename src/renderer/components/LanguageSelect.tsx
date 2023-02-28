import React, { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { getLanguage } from '../../utils/language';

function LanguageSelect() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const savedLanguage = getLanguage();
    setLanguage(savedLanguage);
  }, []);

  function saveLanguage(selectedLanguage: string) {
    if (global.localStorage) {
      global.localStorage.setItem(
        'language',
        JSON.stringify({ selectedLanguage })
      );
    }
  }

  function handleSelectLanguage(event: SelectChangeEvent) {
    saveLanguage(event.target.value);
    setLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="select-card-autowidth">
        {t('langs.select_lang')}
      </InputLabel>
      <Select
        onChange={handleSelectLanguage}
        color="primary"
        id="select-card-autowidth"
        value={language}
        label={t('langs.select_lang')}
        autoWidth
      >
        <MenuItem value="en">{t('langs.english')}</MenuItem>
        <MenuItem value="ru">{t('langs.russian')}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default LanguageSelect;
