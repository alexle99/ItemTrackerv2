import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  Grid,
  InputBase,
  Tooltip,
  Typography,
} from '@mui/material';
import COLORS from '@/colors';
import { Category, Item } from '@/types/account';
import { Header } from './Header';

const InventoryHeader = () => {
  return (
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
  );
};

const ItemBlock = ({
  item,
  handleClick,
  highlighted,
  removeItem,
}: {
  item: Item;
  handleClick: (item: Item) => void;
  highlighted: boolean;
  removeItem: (item: Item) => void;
}) => {
  return (
    <Grid item sx={{ padding: '.25rem', minWidth: '1rem' }}>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: highlighted ? COLORS.buttonColor : COLORS.itemButton,
          '&:hover': {
            backgroundColor: highlighted
              ? COLORS.itemButton
              : COLORS.itemDefaultHover,
          },
          border: '1px lightblue solid',
          borderRadius: '.5rem',
          paddingRight: '.5rem',
        }}
      >
        <Button
          disableRipple
          sx={{
            display: 'inline-block',
            justifyContent: 'left',
            padding: '0',
            paddingLeft: '.5rem',
            paddingRight: '.5rem',
            color: 'white',
            fontSize: '1.2rem',
            minWidth: '0',
            minHeight: '0',
            maxWidth: '50vw',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          onClick={() => handleClick(item)}
        >
          {item.name}
        </Button>
        <CloseIcon
          fontSize="medium"
          sx={{
            alignSelf: 'center',
            color: 'gray',
            margin: '0',
            '&:hover': { color: 'red' },
          }}
          onClick={() => removeItem(item)}
        />
      </Box>
    </Grid>
  );
};

const AddCategory = ({
  handleAddCategory,
}: {
  handleAddCategory: (value: string) => void;
}) => {
  return (
    <Box
      sx={{
        border: '1px white solid',
        marginTop: '1rem',
        marginLeft: '.5rem',
        marginRight: '.5rem',
        borderRadius: '1rem',
      }}
    >
      <InputBase
        sx={{ flex: '1' }}
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
  );
};

const AddItem = ({
  handleAddItem,
  categoryName,
}: {
  handleAddItem: (value: string) => void;
  categoryName: string;
}) => {
  const placeholder = 'Add Item to ' + categoryName;
  return (
    <InputBase
      sx={{ width: '20rem', border: '1px white solid' }}
      placeholder={placeholder}
      inputProps={{ style: { color: 'white', padding: '1rem' } }}
      onKeyPress={(e) => {
        if (e.key === 'Enter' && (e.target as HTMLInputElement).value) {
          e.preventDefault();
          handleAddItem((e.target as HTMLInputElement).value);
          (e.target as HTMLInputElement).value = '';
        }
      }}
    />
  );
};

const RemoveCategoryIcon = ({
  category,
  onRemoveCategory,
}: {
  category: Category;
  onRemoveCategory: (category: Category) => void;
}) => {
  const toolTipTitle = 'Remove Category ' + category.name;

  return (
    <Tooltip
      title={toolTipTitle}
      placement="top"
      enterDelay={0}
      sx={{ color: 'pink' }}
    >
      <CloseIcon
        fontSize="medium"
        sx={{
          alignSelf: 'center',
          marginRight: '.7rem',
          color: 'gray',
          '&:hover': { color: 'red' },
        }}
        onClick={() => onRemoveCategory(category)}
      />
    </Tooltip>
  );
};

const CategoryHeader = ({
  category,
  handleAddItemToCategory,
  onRemoveCategory,
}: {
  category: Category;
  handleAddItemToCategory: (value: string) => void;
  onRemoveCategory: (category: Category) => void;
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px white solid',
        borderTopLeftRadius: '1rem',
        borderTopRightRadius: '1rem',
        alignItems: 'center',
        backgroundColor: COLORS.categoryHeaderBackground,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: COLORS.headerColor,
          marginLeft: '1rem',
        }}
      >
        {category.name}
      </Typography>
      <AddItem
        handleAddItem={handleAddItemToCategory}
        categoryName={category.name}
      />
      <RemoveCategoryIcon
        category={category}
        onRemoveCategory={onRemoveCategory}
      />
    </Box>
  );
};

const ItemDisplay = ({
  category,
  itemClick,
  removeItemFromCategory,
}: {
  category: Category;
  itemClick: (item: Item) => void;
  removeItemFromCategory: (item: Item, category: Category) => void;
}) => {
  const removeItem = (item: Item) => {
    removeItemFromCategory(item, category);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: '1rem',
        marginBottom: '1rem',
        marginTop: '.5rem',
      }}
    >
      {category.items.map((item) => {
        return (
          <ItemBlock
            key={item.id}
            item={item}
            handleClick={itemClick}
            highlighted={item.exists}
            removeItem={removeItem}
          />
        );
      })}
    </Box>
  );
};

const CategoryDisplay = ({
  category,
  handleItemClick,
  addItemToCategory,
  onRemoveCategory,
  removeItemFromCategory,
}: {
  category: Category;
  handleItemClick: (item: Item, category: Category) => void;
  addItemToCategory: (value: string, category: Category) => void;
  onRemoveCategory: (category: Category) => void;
  removeItemFromCategory: (item: Item, category: Category) => void;
}) => {
  const handleItemClickForCategory = (item: Item) => {
    handleItemClick(item, category);
  };

  const handleAddItemToCategory = (value: string) => {
    addItemToCategory(value, category);
  };

  return (
    <Box
      sx={{
        border: '1px white solid',
        borderRadius: '1rem',
        width: '100%',
        marginTop: '1rem',
        marginRight: '.5rem',
      }}
    >
      <CategoryHeader
        category={category}
        handleAddItemToCategory={handleAddItemToCategory}
        onRemoveCategory={onRemoveCategory}
      />
      <ItemDisplay
        category={category}
        itemClick={handleItemClickForCategory}
        removeItemFromCategory={removeItemFromCategory}
      />
    </Box>
  );
};

export const Inventory = ({
  categories,
  handleItemClick,
  handleAddCategory,
  addItemToCategory,
  onRemoveCategory,
  removeItemFromCategory,
}: {
  categories: Category[];
  handleItemClick: (item: Item, category: Category) => void;
  handleAddCategory: (value: string) => void;
  addItemToCategory: (value: string, category: Category) => void;
  onRemoveCategory: (category: Category) => void;
  removeItemFromCategory: (item: Item, category: Category) => void;
}) => {
  return (
    <Box
      className="Inventory"
      sx={{
        backgroundColor: COLORS.inventoryBackground,
        marginBottom: '1rem',
        height: '100%',
        maxWidth: '100vw',
      }}
    >
      <InventoryHeader />
      <Grid container sx={{ paddingLeft: '.5rem' }}>
        {categories.map((category) => {
          return (
            <CategoryDisplay
              key={category.id}
              category={category}
              handleItemClick={handleItemClick}
              addItemToCategory={addItemToCategory}
              onRemoveCategory={onRemoveCategory}
              removeItemFromCategory={removeItemFromCategory}
            />
          );
        })}
      </Grid>
      <AddCategory handleAddCategory={handleAddCategory} />
    </Box>
  );
};
