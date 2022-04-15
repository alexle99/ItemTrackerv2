import { Box, Typography } from '@mui/material';
import COLORS from '@/colors';

export const Header = ({ label, color }: { label: string; color: string }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '2rem',
        width: '100%',
        backgroundColor: color,
        borderBottom: `2px #161616 solid`,
      }}
    >
      <Typography
        variant="h4"
        sx={{ color: COLORS.headerColor, position: 'relative' }}
      >
        {label}
      </Typography>
    </Box>
  );
};
