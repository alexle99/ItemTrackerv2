import { Box, Button } from '@mui/material';
import COLORS from '@/colors';

const StateButton = ({
  label,
  handleFunction,
  savedState,
}: {
  label: string;
  handleFunction: () => void;
  savedState?: boolean;
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: 'auto',
        color: COLORS.buttonText,
        backgroundColor: savedState ? '#1a1a1a' : COLORS.buttonColor,
        fontSize: '1.4em',
        marginLeft: '20px',
      }}
      onClick={() => {
        handleFunction();
      }}
      disabled={savedState}
    >
      {label}
    </Button>
  );
};

export const SaveState = ({
  savedState,
  toggleSaveDialog,
  toggleLoadDialog,
}: {
  savedState: boolean;
  toggleSaveDialog: () => void;
  toggleLoadDialog: () => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        space: '6px',
        marginRight: '10px',
      }}
    >
      <StateButton
        label={savedState ? 'saved!' : 'save'}
        handleFunction={toggleSaveDialog}
        savedState={savedState}
      />
      <StateButton label="load" handleFunction={toggleLoadDialog} />
    </Box>
  );
};
