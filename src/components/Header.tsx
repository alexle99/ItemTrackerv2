import { Box } from '@mui/material';

export const Header = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        color: 'White',
        display: 'flex',
        justifyContent: 'center',
        fontSize: 25,
        borderBottom: '1px green solid',
      }}
    >
      {label}
    </Box>
  );
};
