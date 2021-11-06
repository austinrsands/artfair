import React from 'react';
import {
  Avatar,
  Box,
  BoxProps,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    textAlign: 'center',
  },
});

export interface ArtistCardProps extends BoxProps {
  name: string;
}

const ArtistCard: React.FC<ArtistCardProps> = ({
  className,
  name,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.root, className)} {...rest}>
      <Avatar />
      <Typography variant="subtitle1" className={classes.name}>
        {name}
      </Typography>
    </Box>
  );
};

export default ArtistCard;
