import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Clear';
import { CardHeader, IconButton, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { RemoteInfo } from '../../types/RemoteInfo';

function RemoteCard(props: any) {
  const { t } = useTranslation();
  const [remoteInfo, setRemoteInfo] = useState<RemoteInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getRemoteInfo')
      .then((info: RemoteInfo) => {
        return setRemoteInfo(info);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  function handleDelete() {
    props?.deleteCard('RemoteCard');
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
          title={t('remote_card.title')}
        />
        {remoteInfo?.isRemote ? (
          <Typography component="div" variant="h5">
            {t('remote_card.launch_via_remote')}
          </Typography>
        ) : (
          <Typography component="div" variant="h5">
            {t('remote_card.current_display')}: {remoteInfo?.remoteDisplay}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default RemoteCard;
