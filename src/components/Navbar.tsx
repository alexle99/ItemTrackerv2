import '@fontsource/roboto/300.css';
import { AppBar, Box, Button, Typography } from '@mui/material';
import COLORS from '@/colors';
import { SaveState } from './SaveState';

const LoadTemplate = ({ onLoadTemplate }: { onLoadTemplate: () => void }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: 'auto',
        color: COLORS.buttonText,
        backgroundColor: COLORS.buttonColor,
        fontSize: '1.4em',
        marginLeft: '20px',
      }}
      onClick={onLoadTemplate}
    >
      load template
    </Button>
  );
};

export const Navbar = ({
  savedState,
  toggleDialog,
  loadTemplate,
}: {
  savedState: boolean;
  toggleDialog: (arg0: string) => void;
  loadTemplate: () => void;
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
        color: COLORS.primaryText,
        padding: '.5%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            alignSelf: 'center',
            paddingLeft: '.5rem',
            width: 'fitContent',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
      </Box>
      <LoadTemplate onLoadTemplate={loadTemplate} />
      <SaveState savedState={savedState} handleClick={toggleDialog} />
    </AppBar>
  );
};
