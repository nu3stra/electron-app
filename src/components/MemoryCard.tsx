import React, { useState, useEffect } from 'react';
import { Pie, PieConfig } from '@ant-design/plots';
import { MemoryInfo } from '../types/MemoryInfo';

function MemoryCard() {
  const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null);
  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getMemoryInfo')
      .then((info) => {
        return setMemoryInfo(info);
      })
      .catch((error) => console.log(error));
  }, []);

  const chartData = [
    {
      type: 'Used',
      value: memoryInfo?.heapUsed,
    },
    {
      type: 'Total',
      value: memoryInfo?.heapTotal,
    },
  ];

  if (!memoryInfo) {
    return <div>Loading...</div>;
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

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Pie {...config} />;
}

export default MemoryCard;
