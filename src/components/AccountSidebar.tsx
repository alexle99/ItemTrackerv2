import { Box, Button, Divider } from '@mui/material';
import COLORS from '@/colors';
import { Account } from '@/types/account';
import { Header } from './Header';
import { HeaderDivider } from './HeaderDivider';

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
}: {
  accounts: Account[];
  onSelect: (account: Account) => void;
  currentSelected: Account | undefined;
}) => {
  return (
    <Box>
      <Header label="Accounts" color={COLORS.accountSidebarBackground} />
      <Box>
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
