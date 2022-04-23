import { Box, Typography } from '@mui/material';
import COLORS from '@/colors';
import { HeaderDivider } from './HeaderDivider';

export const Header = ({ label, color }: { label: string; color: string }) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          padding: '2rem',
          width: '100%',
          backgroundColor: color,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: COLORS.headerColor, position: 'relative' }}
        >
          {label}
        </Typography>
      </Box>
      <HeaderDivider />
    </Box>
  );
};
