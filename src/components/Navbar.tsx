import '@fontsource/roboto/300.css';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { AppBar, Box, Typography } from '@mui/material';
import COLORS from '@/colors';
import { SaveState } from './SaveState';

export const Navbar = ({
  handleSave,
  handleLoad,
  savedState,
}: {
  handleSave: () => void;
  handleLoad: () => void;
  savedState: boolean;
}) => {
  const label = 'Item Tracker';
  return (
    <AppBar
      position="static"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.navbarBackground,
        padding: '.5%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <ListOutlinedIcon
          sx={{
            alignSelf: 'center',
            height: '50px',
            width: '50px',
            marginLeft: '.5%',
          }}
        />
        <Typography
          variant="h3"
          sx={{
            alignSelf: 'center',
            paddingLeft: '1%',
            width: 'fitContent',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      </Box>
      <SaveState
        handleSave={handleSave}
        handleLoad={handleLoad}
        savedState={savedState}
      />
    </AppBar>
  );
};
