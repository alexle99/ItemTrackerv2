import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, InputBase } from '@mui/material';
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
    <Box sx={{ border: '1px white solid' }}>
      <InputBase
        sx={{ ml: '1rem', flex: '1' }}
        placeholder="Add Account"
        inputProps={{ style: { color: 'white', padding: '1rem' } }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
            e.preventDefault();
            handleSubmit((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = '';
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
  onRemove,
}: {
  account: Account;
  onSelect: (account: Account) => void;
  selected: boolean;
  onRemove: (id: string) => void;
}) => {
  return (
    <Box
      sx={{
        backgroundColor: selected
          ? COLORS.buttonColor
          : COLORS.accountSidebarBackground,
        '&:hover': {
          backgroundColor: COLORS.accountSelected,
        },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        height: '3rem',
      }}
    >
      <Button
        sx={{
          fontSize: '1.5em',
          width: '100%',
          color: 'white',
          backgroundColor: 'transparent',
          paddingRight: '1rem',
        }}
        disableRipple
        onClick={() => onSelect(account)}
      >
        {account.userName}
      </Button>

      <CloseIcon
        fontSize="medium"
        sx={{
          alignSelf: 'center',
          marginRight: '.7rem',
          color: 'gray',
          '&:hover': { color: 'red' },
        }}
        onClick={() => onRemove(account.id)}
      />
    </Box>
  );
};

export const AccountSidebar = ({
  accounts,
  onSelect,
  currentSelected,
  onAddAccount,
  onRemove,
}: {
  accounts: Account[];
  onSelect: (account: Account) => void;
  currentSelected: Account | undefined;
  onAddAccount: (value: string) => void;
  onRemove: (id: string) => void;
}) => {
  return (
    <Box sx={{ backgroundColor: COLORS.accountSidebarBackground }}>
      <Header label="Accounts" color={COLORS.accountSidebarBackground} />
      <Box sx={{ paddingTop: '1.5rem' }}>
        {accounts.map((account) => {
          return (
            <AccountBlock
              key={account.id}
              account={account}
              onSelect={onSelect}
              selected={currentSelected === account}
              onRemove={onRemove}
            />
          );
        })}
        <AddAccountBlock onAddAccount={onAddAccount} />
      </Box>
    </Box>
  );
};
