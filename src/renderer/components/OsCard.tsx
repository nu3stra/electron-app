import React, { useState, useEffect } from 'react';
import { CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { OsInfo } from '../../types/OsInfo';

function OsCard(props: any) {
  const { t } = useTranslation();
  const [osInfo, setOsInfo] = useState<OsInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getOsInfo')
      .then((info: OsInfo) => {
        return setOsInfo(info);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  if (!osInfo) {
    return <div>Loading...</div>;
  }

  function handleDelete() {
    props?.deleteCard('OsCard');
  }

  return (
    <Card sx={{ display: 'flex' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        <CardHeader
          action={
            <IconButton onClick={handleDelete} aria-label="delete" size="small">
              <DeleteIcon fontSize="small" />
            </IconButton>
          }
          title={t('os_card.title')}
        />
        <Typography component="div" variant="h5">
          {t('os_card.platform')}: {osInfo.platform}
        </Typography>
        <Typography component="div" variant="h5">
          {t('os_card.release')}: {osInfo.release}
        </Typography>
        <Typography component="div" variant="h5">
          {t('os_card.arch')}: {osInfo.arch}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default OsCard;
