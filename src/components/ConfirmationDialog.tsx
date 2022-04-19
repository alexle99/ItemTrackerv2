import { Box, Button, Dialog, DialogTitle } from '@mui/material';
import COLORS from '@/colors';

export const ConfirmationDialog = ({
  open,
  onClose,
  titleText,
  onYes,
}: {
  open: boolean;
  titleText: string;
  onClose: () => void;
  onYes: () => void;
}) => {
  const handleYes = () => {
    onYes();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to {titleText}?</DialogTitle>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          sx={{
            width: '10rem',
            backgroundColor: COLORS.buttonColor,
            color: COLORS.buttonText,
          }}
          onClick={handleYes}
        >
          Yes
        </Button>
        <Button
          sx={{ width: '10rem', color: COLORS.buttonText }}
          onClick={onClose}
        >
          No
        </Button>
      </Box>
    </Dialog>
  );
};
