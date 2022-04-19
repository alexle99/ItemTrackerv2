import { Box, Button } from '@mui/material';
import COLORS from '@/colors';

const StateButton = ({
  label,
  handleClick,
  savedState,
}: {
  label: string;
  handleClick: (arg0: string) => void;
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
        handleClick(label);
      }}
      disabled={savedState}
    >
      {label}
    </Button>
  );
};

export const SaveState = ({
  savedState,
  handleClick,
}: {
  savedState: boolean;
  handleClick: (arg0: string) => void;
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
        handleClick={handleClick}
        savedState={savedState}
      />
      <StateButton label="load" handleClick={handleClick} />
    </Box>
  );
};
