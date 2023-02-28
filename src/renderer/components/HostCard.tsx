import React, { useEffect, useState } from 'react';
import { CardHeader, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { HostInfo } from '../../types/HostInfo';

function HostCard(props: any) {
  const { t } = useTranslation();
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getHostInfo')
      .then((info: HostInfo) => {
        return setHostInfo(info);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  function handleDelete() {
    props?.deleteCard('HostCard');
  }

  if (!hostInfo) {
    return <div>Loading...</div>;
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
          title={t('host_card.title')}
        />
        <Typography component="div" variant="h5">
          {t('host_card.hostname')}: {hostInfo.name}
        </Typography>
        <Typography component="div" variant="h5">
          {t('host_card.address')}: {hostInfo.address}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HostCard;
