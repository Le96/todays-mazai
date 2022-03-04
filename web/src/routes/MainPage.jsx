import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';

import { getLatestTweet, getTweetMedia, getUser } from '../components/api';
import LeaderboardGraph from '../components/LeaderboardGraph';
import TweetCard from '../components/TweetCard';

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
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <Typography variant="h4">
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
          <Grid item xs={8}>
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
