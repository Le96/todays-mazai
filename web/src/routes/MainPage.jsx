import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Link, Typography,
} from '@mui/material';

import { getLatestTweet, getTweetMedia, getUser } from '../components/api';
import { parseTimestamp } from '../components/utils';
import LeaderboardGraph from '../components/LeaderboardGraph';

export default function MainPage() {
  const [latestMedia, setLatestMedia] = useState(false);
  const [latestTweet, setLatestTweet] = useState(false);
  const [latestUser, setLatestUser] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    (async () => {
      const newLatestTweet = await getLatestTweet();
      setLatestTweet(newLatestTweet.data);
      const newLatestMedia = await getTweetMedia(newLatestTweet.data.id);
      setLatestMedia(newLatestMedia.data);
      const newLatestUser = await getUser(newLatestTweet.data.author_id);
      setLatestUser(newLatestUser.data);
    })();
  }, [loaded]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 1 }}>
        <Typography variant="h3">
          Main Page
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ my: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Typography variant="h4">
                Latest #TodaysMazai
              </Typography>
            </Box>
            {latestMedia && latestTweet && latestUser && (
              <Card variant="outlined" sx={{ maxHeight: '100%', my: 1 }}>
                <CardHeader
                  avatar={(
                    <Avatar
                      alt={latestTweet.author_name.substring(0, 1)}
                      src={latestUser.profile_image_url}
                    />
                  )}
                  subheader={(
                    <Link
                      color="inherit"
                      href={`https://twitter.com/${latestUser.username}`}
                      underline="hover"
                    >
                      {`@${latestTweet.author_username}`}
                    </Link>
                  )}
                  title={latestTweet.author_name}
                />
                <CardContent>{latestTweet.text}</CardContent>
                <CardMedia alt="#TodaysMazai Image" component="img" image={latestMedia[0].url} sx={{ height: 'auto', width: '100%' }} />
                <CardContent>
                  <Link
                    color="inherit"
                    href={`https://twitter.com/${latestUser.username}/status/${latestTweet.id}`}
                    underline="hover"
                    variant="subtitle2"
                  >
                    {parseTimestamp(latestTweet.created_at)}
                  </Link>
                </CardContent>
              </Card>
            )}
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Typography variant="h4">
                Annual Leaderboard
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <LeaderboardGraph />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
