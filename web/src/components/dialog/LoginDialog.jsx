import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Dialog, DialogTitle, IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function LoginDialog(props) {
  const { open, setOpen } = props;

  const handleClick = () => window.alert(
    'Twitter login function is not yet implemented. '
    + 'Please wait a little longer.',
  );

  const handleOpen = () => setOpen(!open);

  return (
    <Dialog onClose={handleOpen} open={open}>
      <Box sx={{ display: 'flex', flexDirection: 'column', mx: 2 }}>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }}>
          <DialogTitle sx={{ flexGrow: 1 }}>Login</DialogTitle>
          <IconButton color="inherit" onClick={handleOpen}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Button
          onClick={handleClick}
          startIcon={<TwitterIcon />}
          variant="contained"
          sx={{ mb: 2 }}
        >
          Login with Twitter
        </Button>
      </Box>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};