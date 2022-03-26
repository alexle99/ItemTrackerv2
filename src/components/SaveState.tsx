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
        fontSize: '1.2em',
        marginLeft: '20px',
      }}
      onClick={() => {
        handleFunction();
      }}
    >
      {label}
    </Button>
  );
};

export const SaveState = ({
  handleSave,
  handleLoad,
  savedState,
}: {
  handleSave: () => void;
  handleLoad: () => void;
  savedState: boolean;
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
        handleFunction={handleSave}
        savedState={savedState}
      />
      <StateButton label="load" handleFunction={handleLoad} />
    </Box>
  );
};
