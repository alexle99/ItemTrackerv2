import { Box, Button, Grid, Typography } from '@mui/material';
import COLORS from '@/colors';
import { Item } from '@/types/account';
import { Header } from './Header';

const ItemBlock = ({
  item,
  handleClick,
  highlighted,
}: {
  item: Item;
  handleClick: (item: Item) => void;
  highlighted: boolean;
}) => {
  return (
    <Grid item sx={{ paddingTop: '.5rem', paddingRight: '.5rem' }}>
      <Button
        sx={{
          color: 'white',
          fontSize: '1.5em',
          backgroundColor: highlighted
            ? COLORS.buttonColor
            : COLORS.itemButtonColor,
          '&:hover': {
            backgroundColor: highlighted
              ? COLORS.inventoryBackground
              : COLORS.inventoryItemDefaultHover,
          },
        }}
        variant="outlined"
        onClick={() => handleClick(item)}
      >
        {item.name}
      </Button>
    </Grid>
  );
};

const ItemList = ({
  itemList,
  handleClick,
  inventory,
}: {
  itemList: Item[];
  handleClick: (item: Item) => void;
  inventory?: Item[];
}) => {
  const onlyItems = itemList.slice(1);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: COLORS.headerColor,
          paddingTop: '1rem',
          paddingLeft: '1rem',
        }}
      >
        {itemList[0].name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: '1rem',
        }}
      >
        {onlyItems.map((item) => {
          let highlighted = false;
          {
            inventory?.map((inv) => {
              if (inv.name === item.name) {
                highlighted = true;
              }
            });
          }
          return (
            <ItemBlock
              key={item.id}
              item={item}
              handleClick={handleClick}
              highlighted={highlighted}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const ItemDisplay = ({
  inventory,
  allItems,
  handleClick,
}: {
  inventory?: Item[];
  allItems: Item[][];
  handleClick: (item: Item) => void;
}) => {
  return (
    <Box
      className="Inventory"
      sx={{
        backgroundColor: COLORS.inventoryBackground,
        paddingBottom: '2rem',
      }}
    >
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
            }}
          >
            <Header label="Inventory" color={COLORS.inventoryBackground} />
          </Box>
        </Box>
      </Box>
      <Grid container sx={{ paddingLeft: '.5rem' }}>
        {allItems.map((itemList) => {
          return (
            <ItemList
              key={itemList[0].id}
              itemList={itemList}
              handleClick={handleClick}
              inventory={inventory}
            />
          );
        })}
      </Grid>
    </Box>
  );
};
