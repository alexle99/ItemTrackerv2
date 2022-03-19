import { Box, Button } from '@mui/material';

const StateButton = ({
  label,
  handleFunction,
}: {
  label: string;
  handleFunction: () => void;
}) => {
  return (
    <Button
      sx={{
        width: '30%',
        color: 'white',
        backgroundColor: 'black',
        border: '2px white solid',
        fontSize: '1.2em',
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
}: {
  handleSave: () => void;
  handleLoad: () => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <StateButton label="save" handleFunction={handleSave} />
      <StateButton label="load" handleFunction={handleLoad} />
    </Box>
  );
};
