import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import socket from '../services/socket';
import { useRoomContext } from './RoomContextProvider';

export type StartActivityButtonProps = ButtonProps;

const StartActivityButton: React.FC<StartActivityButtonProps> = (props) => {
  const { state, dispatch } = useRoomContext();

  const startActivity = () => {
    dispatch({ type: 'start-activity', activity: state.room.activity });
    socket.emit('start_activity', state.room.activity);
  };

  return (
    <Button color="primary" variant="contained" onClick={startActivity} {...props}>
      Start Activity
    </Button>
  );
};

export default StartActivityButton;
