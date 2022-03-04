import React, { useEffect, useState } from 'react';
import { Animation } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis, BarSeries, Chart, Title, ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Paper } from '@mui/material';

import { getLeaderboard } from './api';

export default function LeaderboardGraph() {
  const [leaderboardData, setLeaderboardData] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    setLoaded(true);
    (async () => {
      const newLeaderboardData = await getLeaderboard();
      setLeaderboardData(newLeaderboardData.data);
    })();
  }, [loaded]);

  return (
    <Paper variant="outlined" sx={{ flexGrow: 1 }}>
      {leaderboardData && (
        <Chart data={leaderboardData} rotated>
          <ArgumentAxis />
          <ValueAxis />
          <BarSeries argumentField="key" color="green" valueField="value" />
          <Title text="Top Mazaists" />
          <Animation />
        </Chart>
      )}
    </Paper>
  );
}
