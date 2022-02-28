import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Avatar,
  Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Link, Typography,
} from '@mui/material';

import { getMedia, getTweets, getUsers } from '../components/api';
import { parseTimestamp } from '../components/utils';

export default function Latest() {
  const [loaded, setLoaded] = useState(false);
  const [media, setMedia] = useState(false);
  const [tweets, setTweets] = useState(false);
  const [users, setUsers] = useState(false);

  const [darkMode] = useOutletContext();

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    (async () => {
      const newMedia = await getMedia();
      setMedia(newMedia.data);
      const newTweets = await getTweets();
      setTweets(newTweets.data);
      const newUsers = await getUsers();
      setUsers(newUsers.data);
    })();
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
                  <Card
                    variant="outlined"
                    sx={{
                      backgroundClip: 'padding-box',
                      backgroundImage: `linear-gradient(${darkMode ? 'rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)'}), url('${medium.url}')`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '70vh',
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
                          href={`https://twitter.com/${author.username}`}
                          underline="hover"
                        >
                          {`@${tweet.author_username}`}
                        </Link>
                      )}
                      title={tweet.author_name}
                    />
                    <CardContent>{tweet.text}</CardContent>
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
                        href={`https://twitter.com/${author.username}/status/${tweet.id}`}
                        underline="hover"
                        variant="subtitle2"
                      >
                        {parseTimestamp(tweet.created_at)}
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </Box>
  );
}
