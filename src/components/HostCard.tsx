import React, { useEffect, useState } from 'react';
import { HostInfo } from '../types/HostInfo';

function HostCard() {
  const [hostInfo, setHostInfo] = useState<HostInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getHostInfo')
      .then((info) => {
        return setHostInfo(info);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!hostInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Host Info</h2>
      <div>Hostname: {hostInfo.name}</div>
      <div>IP: {hostInfo.address}</div>
    </div>
  );
}

export default HostCard;
