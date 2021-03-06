import {
  Box, Divider, Grid, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import LeaderboardGraph from '../components/LeaderboardGraph';
import TweetCard from '../components/TweetCard';
import { getLatestTweet, getTweetMedia, getUser } from '../components/api';

export default function MainPage() {
  const [latestMedia, setLatestMedia] = useState(false);
  const [latestTweet, setLatestTweet] = useState(false);
  const [latestUser, setLatestUser] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [darkMode] = useOutletContext();

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    (async () => {
      const newLatestTweet = await getLatestTweet().then((response) => response.data);
      setLatestTweet(newLatestTweet);
      Promise.all([
        getTweetMedia(newLatestTweet.id).then((response) => setLatestMedia(response.data)),
        getUser(newLatestTweet.author_id).then((response) => setLatestUser(response.data)),
      ]);
    })();
  }, [loaded]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 1 }}>
        <Typography noWrap variant="h3">
          Main Page
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ my: 1 }}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6} lg={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Typography noWrap variant="h4">
                Latest #TodaysMazai
              </Typography>
            </Box>
            {latestMedia && latestTweet && latestUser && (
              <TweetCard
                author={latestUser}
                darkMode={darkMode}
                medium={latestMedia[0]}
                tweet={latestTweet}
              />
            )}
          </Grid>
          <Grid item sm={12} md={6} lg={8}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Typography noWrap variant="h4">
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
