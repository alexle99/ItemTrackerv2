import { Box, Button, Dialog, DialogTitle } from '@mui/material';
import COLORS from '@/colors';

export const UserInputDialog = ({
  open,
  onClose,
  titleText,
  onSubmit,
}: {
  open: boolean;
  titleText: string;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const handleYes = () => {
    onSubmit();
    onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ style: { backgroundColor: 'black' } }}
    >
      <DialogTitle sx={{ color: 'white' }}>Enter {titleText}</DialogTitle>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{
            width: '10rem',
            backgroundColor: COLORS.buttonColor,
            color: COLORS.buttonText,
          }}
          onClick={handleYes}
        >
          Submit
        </Button>
        <Button
          sx={{ width: '10rem', color: COLORS.buttonText }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};
