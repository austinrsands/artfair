import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  makeStyles,
  BoxProps,
} from '@material-ui/core';
import clsx from 'clsx';
import { RoomCreationData, RoomJoinData } from '@artfair/common';
import socket from '../services/socket';
import { useAppContext } from './AppContextProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '15rem',
    gap: '1rem',
  },
});

export type HomeProps = BoxProps;

const Home: React.FC<HomeProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [requestedUsername, setRequestedUsername] = useState('');
  const [requestedRoom, setRequestedRoom] = useState('');
  const [requestedUsernameError, setRequestedUsernameError] = useState('');
  const [requestedRoomError, setRequestedRoomError] = useState('');
  const history = useHistory();
  const { dispatch } = useAppContext();

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRequestedUsernameError('');
    setRequestedUsername(event.target.value.trimLeft());
  };

  const handleRoomInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRequestedRoomError('');
    setRequestedRoom(event.target.value.trimLeft());
  };

  const handleCreateRoomAttempt = () => {
    socket.emit('create_room_attempt', {
      username: requestedUsername,
      room: requestedRoom,
    });
  };

  const handleJoinRoomAttempt = () => {
    socket.emit('join_room_attempt', {
      username: requestedUsername,
      room: requestedRoom,
    });
  };

  const handleTakenRoom = useCallback(() => {
    setRequestedRoomError('This room already exists.');
  }, []);

  const handleNonexistentRoom = useCallback(() => {
    setRequestedRoomError('This room does not exist.');
  }, []);

  const handleTakenUsername = useCallback(() => {
    setRequestedUsernameError('This username is taken.');
  }, []);

  const handleRoomCreated = useCallback(
    (data: RoomCreationData) => {
      dispatch({
        type: 'create-room',
        username: data.username,
        room: data.room,
      });
      history.push('/lobby');
    },
    [dispatch, history],
  );

  const handleRoomJoined = useCallback(
    (data: RoomJoinData) => {
      dispatch({
        type: 'join-room',
        username: data.username,
        room: data.room,
        players: data.players,
      });
      history.push('/lobby');
    },
    [dispatch, history],
  );

  useEffect(() => {
    socket.on('room_taken', handleTakenRoom);
    socket.on('room_does_not_exist', handleNonexistentRoom);
    socket.on('username_taken', handleTakenUsername);
    socket.on('room_created', handleRoomCreated);
    socket.on('room_joined', handleRoomJoined);
  }, [
    handleTakenRoom,
    handleNonexistentRoom,
    handleTakenUsername,
    handleRoomCreated,
    handleRoomJoined,
  ]);

  const textFieldsAreEmpty = requestedUsername.length === 0 || requestedRoom.length === 0;

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <TextField
        label="Username"
        variant="outlined"
        color="primary"
        value={requestedUsername}
        onChange={handleUsernameInputChange}
        spellCheck={false}
        error={requestedUsernameError.length !== 0}
        helperText={requestedUsernameError}
      />
      <TextField
        label="Room"
        color="primary"
        variant="outlined"
        value={requestedRoom}
        onChange={handleRoomInputChange}
        spellCheck={false}
        error={requestedRoomError.length !== 0}
        helperText={requestedRoomError}
      />
      <Button
        onClick={handleCreateRoomAttempt}
        disabled={textFieldsAreEmpty}
        variant="contained"
        color="primary"
        size="large"
      >
        Create Room
      </Button>
      <Button
        onClick={handleJoinRoomAttempt}
        disabled={textFieldsAreEmpty}
        variant="contained"
        color="primary"
        size="large"
      >
        Join Room
      </Button>
    </Box>
  );
};

export default Home;
