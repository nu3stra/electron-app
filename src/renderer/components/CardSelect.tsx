import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line no-unused-vars
function CardSelect(props: any) {
  const [selectCard, setSelectCard] = useState('');
  const { t } = useTranslation();
  function handleSelectCard(event: SelectChangeEvent) {
    setSelectCard(event.target.value);
    props?.addCard(event.target.value);
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="select-card-autowidth">
        {t('cards.add_new_card')}
      </InputLabel>
      <Select
        onChange={handleSelectCard}
        color="primary"
        id="select-card-autowidth"
        value={selectCard}
        label={t('cards.add_new_card')}
        autoWidth
      >
        <MenuItem value="OsCard">{t('cards.os_card')}</MenuItem>
        <MenuItem value="HostCard">{t('cards.host_card')}</MenuItem>
        <MenuItem value="MemoryCard">{t('cards.memory_card')}</MenuItem>
        <MenuItem value="RemoteCard">{t('cards.remote_card')}</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CardSelect;
