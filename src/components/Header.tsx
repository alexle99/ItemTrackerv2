import { Box } from '@mui/material';

export const Header = ({ label }: { label: string }) => {
  return (
    <Box
      sx={{
        color: 'White',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 25,
        borderBottom: '1px green solid',
        padding: '2rem',
        width: '100%',
      }}
    >
      {label}
    </Box>
  );
};
