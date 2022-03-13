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
  onSelect: (accont: Account) => void;
}) => {
  return (
    <Box
      sx={{
        width: '30%',
        backgroundColor: 'black',
        border: '1px white solid',
      }}
    >
      <List>
        {accounts.map((account) => (
          <ListItem key={account.id} disablePadding>
            <ListItemButton onClick={() => onSelect(account)}>
              <ListItemText
                disableTypography
                primary={account.userName}
                sx={{ fontSize: '2rem' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
