import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/plots';
import { CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Clear';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { MemoryInfo } from '../../types/MemoryInfo';

function MemoryCard(props: any) {
  const { t } = useTranslation();
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getMemoryInfo')
      .then((info: MemoryInfo) => {
        return setMemoryInfo(info);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  const chartData = [
    {
      type: 'Used',
      value: memoryInfo?.heapUsed,
    },
    {
      type: 'Free',
      value: memoryInfo?.heapFree,
    },
  ];

  function handleDelete() {
    props?.deleteCard('MemoryCard');
  }

  const config: PieConfig = {
    appendPadding: 10,
    data: chartData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  if (!memoryInfo) {
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
          title={t('memory_card.title')}
        />
        <Pie {...config} />
      </CardContent>
    </Card>
  );
}

export default MemoryCard;
