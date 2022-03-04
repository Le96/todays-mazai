import React from 'react';
import PropTypes from 'prop-types';

import {
  Avatar, Box, Card, CardContent, CardHeader, CardMedia, Link,
} from '@mui/material';

import { parseTimestamp, parseTweetText } from './utils';

export default function TweetCard(props) {
  const {
    darkMode, author, tweet, medium,
  } = props;

  const backgroundFilter = (
    darkMode
      ? 'rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)'
      : 'rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)'
  );

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundClip: 'padding-box',
        backgroundImage: `linear-gradient(${backgroundFilter}), url('${medium.url}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        height: '75vh',
      }}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt={tweet.author_name.substring(0, 1)}
            src={author.profile_image_url}
          />
        )}
        subheader={(
          <Link
            color="inherit"
            href={`https://twitter.com/intent/user?user_id=${author.id}`}
            underline="hover"
          >
            {`@${tweet.author_username}`}
          </Link>
        )}
        title={tweet.author_name}
      />
      <CardContent>{parseTweetText(tweet.text)}</CardContent>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <CardMedia
          alt="#TodaysMazai Image"
          component="img"
          id={`image_${tweet.id}`}
          image={medium.url}
          sx={{
            alignSelf: 'center', justifySelf: 'center', minHeight: '100%', minWidth: '100%',
          }}
        />
      </Box>
      <CardContent>
        <Link
          color="inherit"
          href={`https://twitter.com/twitter/status/${tweet.id}`}
          underline="hover"
          variant="subtitle2"
        >
          {parseTimestamp(tweet.created_at)}
        </Link>
      </CardContent>
    </Card>
  );
}

TweetCard.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  author: PropTypes.shape({
    profile_image_url: PropTypes.string,
    id: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  tweet: PropTypes.shape({
    author_name: PropTypes.string,
    author_username: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  medium: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};
