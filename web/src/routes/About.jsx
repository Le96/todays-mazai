import {
  Box, Divider, Typography,
} from '@mui/material';
import React from 'react';

export default function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ my: 1 }}>
        <Typography noWrap variant="h3">
          About
        </Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ my: 1 }}>
        <Typography variant="h4">
          #TodaysMazai is one of the competitions that uses Twitter hashtags.
        </Typography>
        <Typography variant="h5">
          Post a picture of a drink that you think is an energy drink
          on Twitter with the #TodaysMazai hashtag.
        </Typography>
      </Box>
      <Box sx={{ my: 1 }}>
        <Typography variant="h4">
          #TodaysMazaiはTwitterのハッシュタグを用いて行う競技の一つです。
        </Typography>
        <Typography variant="h5">
          あなたがエナジードリンクだと思った飲み物の写真を、
          #TodaysMazaiのハッシュタグを添えてTwitterに投稿しましょう。
        </Typography>
      </Box>
    </Box>
  );
}
