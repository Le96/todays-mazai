import { Animation } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis, BarSeries, Chart, Title, ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { getLeaderboard } from './api';

export default function LeaderboardGraph() {
  const [leaderboard, setLeaderboard] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    getLeaderboard().then((response) => setLeaderboard(response.data));
  }, [loaded]);

  return leaderboard && (
    <Paper variant="outlined" sx={{ flexGrow: 1 }}>
      <Chart data={leaderboard} rotated>
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries argumentField="key" color="green" valueField="value" />
        <Title text="Top Mazaists" />
        <Animation />
      </Chart>
    </Paper>
  );
}
