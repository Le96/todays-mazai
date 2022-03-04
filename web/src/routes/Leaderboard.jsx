import React from 'react';
import {
  Box, Divider, Grid, Typography,
} from '@mui/material';

import LeaderboardGraph from '../components/LeaderboardGraph';

export default function Leaderboard() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 1 }}>
        <Typography variant="h3">
          Leaderboard
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ my: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
              <LeaderboardGraph />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
