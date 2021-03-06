import React, { useCallback, useEffect, useState } from 'react';
import { Box, BoxProps, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Artist, ChatMessage } from '@artfair/common';
import socket from '../services/socket';
import ChatInput from './ChatInput';
import ChatLine from './ChatLine';
import { useRoomContext } from './RoomContextProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  messageContainer: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  input: {
    marginTop: '1rem',
  },
});

export type ChatProps = BoxProps;

const Chat: React.FC<BoxProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const { state } = useRoomContext();

  const addMessage = useCallback((message: ChatMessage) => {
    // Messages are added to front because elements are rendered in reverse
    setMessages((previous) => [message, ...previous]);
  }, []);

  const handleArtistJoin = useCallback(
    (artist: Artist) => {
      addMessage({ sender: '', content: `${artist.name} joined the room` });
    },
    [addMessage],
  );

  const handleArtistLeave = useCallback(
    (name: string) => {
      addMessage({ sender: '', content: `${name} left the room` });
    },
    [addMessage],
  );

  const handlePromoteHost = useCallback(
    (name: string) => {
      addMessage({ sender: '', content: `${name} was promoted to host` });
    },
    [addMessage],
  );

  const handleKickArtist = useCallback(
    (name: string) => {
      addMessage({ sender: '', content: `${name} was kicked from the room` });
    },
    [addMessage],
  );

  const handleSend = (content: string) => {
    const message: ChatMessage = { sender: state.artist.name, content };
    socket.emit('chat_message', message);
    addMessage(message);
  };

  useEffect(() => {
    socket.on('chat_message', addMessage);
    socket.on('artist_join', handleArtistJoin);
    socket.on('artist_leave', handleArtistLeave);
    socket.on('promote_host', handlePromoteHost);
    socket.on('kick_artist', handleKickArtist);

    return () => {
      socket.off('chat_message', addMessage);
      socket.off('artist_join', handleArtistJoin);
      socket.off('artist_leave', handleArtistLeave);
      socket.off('promote_host', handlePromoteHost);
      socket.off('kick_artist', handleKickArtist);
    };
  }, [addMessage, handleKickArtist, handlePromoteHost, handleArtistJoin, handleArtistLeave]);

  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.messageContainer}>
        {messages.map((message, index) => (
          <ChatLine
            // eslint-disable-next-line react/no-array-index-key
            key={messages.length - index}
            message={message}
          />
        ))}
      </Box>
      <ChatInput className={classes.input} onSend={handleSend} />
    </Box>
  );
};

export default Chat;
