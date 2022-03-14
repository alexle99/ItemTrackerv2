import { AppBar, Box, Toolbar } from '@mui/material';

export const Navbar = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <AppBar
        position="static"
        sx={{
          marginBottom: '2%',
          alignItems: 'center',
          backgroundColor: 'black',
          borderBottom: '2px white solid',
        }}
      >
        <Toolbar>
          <Box component="h1" sx={{ fontSize: '3rem' }}>
            Item Tracker
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
