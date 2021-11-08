import React, { useCallback, useEffect } from 'react';
import {
  Box,
  BoxProps,
  Button,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import socket from '../services/socket';
import Chat from './Chat';
import ArtistList from './ArtistList';
import RoomName from './RoomName';
import ActivityCarousel from './ActivityCarousel';
import { useAppContext } from './AppContextProvider';

const MAIN_SIZE = 'min(50vw, 78vh)';
const WRAPPED_MAIN_SIZE = 'min(80vw, 50vh)';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
  },
  roomName: {
    maxWidth: '80vw',
  },
  panelContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '1rem',
  },
  wrappedPanelContainer: {
    flexDirection: 'column',
  },
  main: {
    height: MAIN_SIZE,
    width: MAIN_SIZE,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  wrappedMain: {
    height: WRAPPED_MAIN_SIZE,
    width: WRAPPED_MAIN_SIZE,
  },
  artistList: {
    padding: '1rem',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    overflowX: 'auto',
  },
  chat: {
    height: MAIN_SIZE,
    width: '20rem',
    padding: '1rem',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
  },
  wrappedChat: {
    width: WRAPPED_MAIN_SIZE,
    height: '15rem',
  },
  activityContentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    padding: '1rem',
    gap: '1rem',
    overflow: 'auto',
  },
  activityCarousel: {
    flex: 1,
    minHeight: 0,
  },
}));

export type LobbyProps = BoxProps;

const Lobby: React.FC<LobbyProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const shouldWrap = useMediaQuery('(max-aspect-ratio: 1/1)');
  const history = useHistory();
  const { state } = useAppContext();

  const handlePlay = () => {
    socket.emit('start_game');
    history.push('/game');
  };

  const startGame = useCallback(() => {
    history.push('/game');
  }, [history]);

  useEffect(() => {
    socket.on('start_game', startGame);
  }, [startGame]);

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <RoomName className={classes.roomName} />
      <Box
        className={clsx(
          classes.panelContainer,
          shouldWrap && classes.wrappedPanelContainer,
        )}
      >
        <Box className={clsx(classes.main, shouldWrap && classes.wrappedMain)}>
          <ArtistList className={classes.artistList} />
          <Box className={classes.activityContentContainer}>
            <ActivityCarousel className={classes.activityCarousel} />
            {state.isHost && (
              <Button
                color="primary"
                variant="contained"
                onClick={handlePlay}
              >
                Play
              </Button>
            )}
          </Box>
        </Box>
        <Chat
          className={clsx(classes.chat, shouldWrap && classes.wrappedChat)}
        />
      </Box>
    </Box>
  );
};

export default Lobby;
