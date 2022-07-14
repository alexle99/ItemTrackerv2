import { Box, Button, TextField } from '@mui/material';
import COLORS from '@/colors';
import { Account } from '@/types/account';
import { Header } from './Header';

const AddAccountBlock = ({
  onAddAccount,
}: {
  onAddAccount: (value: string) => void;
}) => {
  const handleSubmit = (value: string) => {
    onAddAccount(value);
  };
  return (
    <Box>
      <TextField
        label="Add"
        variant="outlined"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit((e.target as HTMLInputElement).value);
          }
        }}
      />
    </Box>
  );
};

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
    <Box
      sx={{
        backgroundColor: COLORS.accountSidebarBackground,
        padding: '.5rem',
        paddingBottom: '0',
      }}
    >
      <Button
        sx={{
          fontSize: '1.5em',
          width: '100%',
          color: 'white',
          backgroundColor: selected
            ? COLORS.accountSelected
            : COLORS.accountButtonColor,
          '&:hover': {
            backgroundColor: COLORS.inventoryBackground,
          },
        }}
        disableRipple
        onClick={() => onSelect(account)}
      >
        {account.userName}
      </Button>
    </Box>
  );
};

export const AccountSidebar = ({
  accounts,
  onSelect,
  currentSelected,
  onAddAccount,
}: {
  accounts: Account[];
  onSelect: (account: Account) => void;
  currentSelected: Account | undefined;
  onAddAccount: (value: string) => void;
}) => {
  return (
    <Box>
      <Header label="Accounts" color={COLORS.accountSidebarBackground} />
      <Box>
        <AddAccountBlock onAddAccount={onAddAccount} />
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
      </Box>
    </Box>
  );
};
