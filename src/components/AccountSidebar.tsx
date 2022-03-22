import { Box, Button, Divider, List } from '@mui/material';
import { Account } from '@/types/account';
import { Header } from './Header';

const AccountBlock = ({
  account,
  onSelect,
  selected,
}: {
  account: Account;
  onSelect: (account: Account) => void;
  selected: boolean;
}) => {
  return (
    <Box>
      <Button
        sx={{
          fontSize: '1.5em',
          width: '100%',
          color: 'white',
          backgroundColor: selected ? '#383838' : 'black',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
        disableRipple
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
  currentSelected,
}: {
  accounts: Account[];
  onSelect: (account: Account) => void;
  currentSelected: Account | undefined;
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
              selected={currentSelected === account}
            />
          );
        })}
      </List>
    </Box>
  );
};
