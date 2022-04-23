import { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Theme,
  makeStyles,
} from '@mui/material';
import COLORS from '@/colors';

const AddItemButton = ({
  label,
  handleClick,
}: {
  label: string;
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: 'fit-content',
        whiteSpace: 'nowrap',
        color: COLORS.buttonText,
        backgroundColor: COLORS.buttonColor,
        fontSize: '1.4em',
        '&:hover': {
          backgroundColor: COLORS.inventoryBackground,
        },
      }}
      disableElevation
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

const MenuList = ({
  anchorEl,
  handleClose,
  addItemList,
  open,
  handleChange,
}: {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  addItemList: string[][];
  open: boolean;
  handleChange: (item: string) => void;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ height: '75vh' }}
      PaperProps={{
        style: {
          color: 'white',
          backgroundColor: 'black',
        },
      }}
    >
      {addItemList.map((itemList) => {
        return (
          <div key={itemList[0]}>
            <MenuItem
              disabled
              sx={{
                fontSize: '1.4em',
                fontStyle: 'italic',
                color: 'white',
              }}
            >
              {itemList[0]}
            </MenuItem>
            {itemList.slice(1).map((item) => {
              return (
                <MenuItem
                  key={item}
                  value={item}
                  sx={{
                    fontSize: '1.4em',
                    '&:hover': { backgroundColor: 'gray' },
                  }}
                  onClick={() => handleChange(item)}
                >
                  {item}
                </MenuItem>
              );
            })}
          </div>
        );
      })}
    </Menu>
  );
};

export const AddItemDropDown = ({
  label,
  addItemList,
  handleChange,
}: {
  label: string;
  addItemList: string[][];
  handleChange: (item: string) => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.inventoryBackground,
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        right: '0',
        margin: '20px',
      }}
    >
      <AddItemButton label={label} handleClick={handleClick} />
      <MenuList
        addItemList={addItemList}
        open={open}
        handleChange={handleChange}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </Box>
  );
};
