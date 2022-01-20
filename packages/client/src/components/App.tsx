import React, { useCallback, useEffect } from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import { Switch, Route, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { MemberData } from '@artfair/common';
import Home from './Home';
import Game from './Game';
import Lobby from './Lobby';
import socket from '../services/socket';
import { useRoomContext } from './RoomContextProvider';
import BackgroundImage from '../assets/snowflakes.jpg';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'repeat',
    backgroundSize: '100rem',
  },
});

export type AppProps = BoxProps;

const App: React.FC<AppProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const { state, dispatch } = useRoomContext();
  const history = useHistory();

  const handleUserJoin = useCallback(
    (memberData: MemberData) => {
      dispatch({
        type: 'user-join',
        memberData,
      });
    },
    [dispatch],
  );

  const handleUserLeave = useCallback(
    (username: string) => {
      dispatch({ type: 'user-leave', username });
    },
    [dispatch],
  );

  useEffect(() => {
    socket.on('user_join', handleUserJoin);
    socket.on('user_leave', handleUserLeave);

    return () => {
      socket.off('user_join', handleUserJoin);
      socket.off('user_leave', handleUserLeave);
    };
  }, [handleUserJoin, handleUserLeave]);

  useEffect(() => {
    // Redirect users who are not in a room
    if (!state.userData.roomname) {
      history.push('/home');
    }
  }, [history, state.userData.roomname]);

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Box>
  );
};

export default App;
