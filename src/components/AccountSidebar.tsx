import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Account } from '@/types/account';
import { Header } from './Header';

const AccountBlock = ({
  account,
  onSelect,
}: {
  account: Account;
  onSelect: (account: Account) => void;
}) => {
  return (
    <Box>
      <Button
        sx={{ fontSize: '1.5em', width: '100%', color: 'white' }}
        onClick={() => onSelect(account)}
      >
        {account.userName}
      </Button>
      <Divider sx={{ color: 'white' }} />
    </Box>
  );
};

export const AccountSidebar = ({
  accounts,
  onSelect,
}: {
  accounts: Account[];
  onSelect: (account: Account) => void;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        border: '1px white solid',
      }}
    >
      <Header label="Accounts" />
      <List>
        {accounts.map((account) => {
          return (
            <AccountBlock
              key={account.id}
              account={account}
              onSelect={onSelect}
            />
          );
        })}
      </List>
    </Box>
  );
};
