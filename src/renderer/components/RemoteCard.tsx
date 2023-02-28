import React, { useState, useEffect } from 'react';
import { RemoteInfo } from '../../types/RemoteInfo';

function RemoteCard() {
  const [remoteInfo, setRemoteInfo] = useState<RemoteInfo | null>(null);

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke('getRemoteInfo')
      .then((info: RemoteInfo) => {
        return setRemoteInfo(info);
      })
      .catch((error: Error) => console.log(error));
  }, []);

  return (
    <div>
      {remoteInfo?.isRemote
        ? 'Launched via remote desktop'
        : `Current display: ${remoteInfo?.remoteDisplay}`}
    </div>
  );
}

export default RemoteCard;
