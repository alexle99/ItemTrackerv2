import { Box, Button } from '@mui/material';

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
      sx={{
        width: '30%',
        color: 'white',
        backgroundColor: savedState ? 'black' : '#383838',
        border: '2px white solid',
        fontSize: '1.2em',
        '&:hover': {
          backgroundColor: 'gray',
        },
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
        flexDirection: 'row',
        justifyContent: 'center',
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
