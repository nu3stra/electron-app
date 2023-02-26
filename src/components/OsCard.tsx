import React, { useState, useEffect } from 'react';
import { OsInfo } from '../types/OsInfo';

function OsCard() {
  const [osInfo, setOsInfo] = useState<OsInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getOsInfo')
      .then((info) => {
        return setOsInfo(info);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!osInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Operating System</h2>
      <div>Platform: {osInfo.platform}</div>
      <div>Release: {osInfo.release}</div>
      <div>Architecture: {osInfo.arch}</div>
    </div>
  );
}

export default OsCard;
