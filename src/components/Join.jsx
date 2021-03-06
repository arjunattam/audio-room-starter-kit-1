import React, { useState } from 'react';
import Input from './Join/Input';
import JoinButton from './Join/JoinButton';
import Avatar from 'boring-avatars';
import Select from './Join/Select';
import getToken from '../utils/getToken';
import { useHMSActions } from '@100mslive/react-sdk';

const Join = () => {
  const hmsActions = useHMSActions();
  const [role, setRole] = useState('speaker');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const joinRoom = () => {
    setIsLoading(true);
    getToken(role)
      .then((token) => {
        setIsLoading(false);
        hmsActions.join({
          userName: username || 'Anonymous',
          authToken: token,
          settings: {
            isAudioMuted: true,
          },
          initEndpoint : process.env.REACT_APP_HMS_INIT_PEER_ENPOINT || undefined
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('Token API Error', error);
      });
  };
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {/* <Avatar size={120} name={username} /> */}
      <img src={"/image.png"} width={128} />
      <Input state={{ username, setUsername }} />
      <Select state={{ role, setRole }} />
      <JoinButton isLoading={isLoading} onClick={joinRoom} />
    </div>
  );
};

export default Join;
