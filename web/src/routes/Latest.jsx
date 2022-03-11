import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import TweetCard from '../components/TweetCard';
import { getMedia, getTweets, getUsers } from '../components/api';

export default function Latest() {
  const [loaded, setLoaded] = useState(false);
  const [media, setMedia] = useState(false);
  const [tweets, setTweets] = useState(false);
  const [users, setUsers] = useState(false);

  const [darkMode] = useOutletContext();

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    Promise.all([
      getMedia().then((response) => setMedia(response.data)),
      getTweets().then((response) => setTweets(response.data)),
      getUsers().then((response) => setUsers(response.data)),
    ]);
  }, [loaded]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 1 }}>
        <Typography variant="h3">
          Latest #TodaysMazai
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ my: 1 }}>
        <Grid container spacing={2}>
          {media && tweets && users
            && tweets.sort((a, b) => (a.created_at < b.created_at ? 1 : -1)).map((tweet) => {
              const author = users.find((user) => user.id === tweet.author_id);
              const medium = media.find((medium_) => medium_.tweet_id === tweet.id);
              return (
                <Grid item key={tweet.id} xs={12} sm={6} md={4} xl={3} sx={{ my: 1 }}>
                  <TweetCard author={author} darkMode={darkMode} tweet={tweet} medium={medium} />
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}
