import { Box, Button, Grid, InputBase, Typography } from '@mui/material';
import COLORS from '@/colors';
import { Category, Item } from '@/types/account';
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
          fontSize: '1.3em',
          backgroundColor: highlighted ? COLORS.buttonColor : COLORS.itemButton,
          '&:hover': {
            backgroundColor: highlighted
              ? COLORS.itemButton
              : COLORS.itemDefaultHover,
          },
          border: '1px lightblue solid',
          borderRadius: '.5rem',
        }}
        onClick={() => handleClick(item)}
      >
        {item.name}
      </Button>
    </Grid>
  );
};

const CategoriesDisplay = ({
  category,
  handleItemClick,
}: {
  category: Category;
  handleItemClick: (item: Item, category: Category) => void;
}) => {
  const handleItemClickForCategory = (item: Item) => {
    handleItemClick(item, category);
  };

  return (
    <Box sx={{ border: '1px white solid', width: '100%' }}>
      <Typography
        variant="h4"
        sx={{
          color: COLORS.headerColor,
          paddingTop: '1rem',
          paddingLeft: '1rem',
        }}
      >
        {category.name}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: '1rem',
        }}
      >
        {category.items.map((item) => {
          return (
            <ItemBlock
              key={item.id}
              item={item}
              handleClick={handleItemClickForCategory}
              highlighted={item.exists}
            />
          );
        })}
      </Box>
    </Box>
  );
};

const AddCategory = ({
  handleAddCategory,
}: {
  handleAddCategory: (value: string) => void;
}) => {
  return (
    <Box>
      <Box sx={{ border: '1px white solid' }}>
        <InputBase
          sx={{ ml: '1rem', flex: '1' }}
          placeholder="Add Category"
          inputProps={{ style: { color: 'white', padding: '1rem' } }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
              e.preventDefault();
              handleAddCategory((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
      </Box>
    </Box>
  );
};

export const ItemDisplay = ({
  categories,
  handleItemClick,
  handleAddCategory,
}: {
  categories: Category[];
  handleItemClick: (item: Item, category: Category) => void;
  handleAddCategory: (value: string) => void;
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
        {categories.map((category) => {
          return (
            <CategoriesDisplay
              key={category.id}
              category={category}
              handleItemClick={handleItemClick}
            />
          );
        })}
      </Grid>
      <AddCategory handleAddCategory={handleAddCategory} />
    </Box>
  );
};
