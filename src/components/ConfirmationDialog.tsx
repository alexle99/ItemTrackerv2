import { Button, Dialog, DialogTitle } from '@mui/material';

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
      <Button onClick={handleYes}>Yes</Button>
      <Button onClick={onClose}>No</Button>
    </Dialog>
  );
};
