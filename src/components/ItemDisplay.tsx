import { Box } from '@mui/material';
import { Item } from '@/types/account';

export const ItemDisplay = ({ items = [] }: { items?: Item[] }) => {
  return (
    <>
      {items.map((item) => {
        return <Box key={item.id}>{item.name}</Box>;
      })}
    </>
  );
};
