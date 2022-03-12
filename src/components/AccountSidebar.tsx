import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Account } from '@/types/account';

export const AccountSidebar = ({
  accounts,
  onSelect,
}: {
  accounts: Account[];
  onSelect: (id: string) => void;
}) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, backgroundColor: 'black' }}>
      <List>
        {accounts.map(({ id, userName }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton onClick={() => onSelect(id)}>
              <ListItemText
                disableTypography
                primary={userName}
                sx={{ fontSize: '2rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
