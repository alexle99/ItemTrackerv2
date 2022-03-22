import { useState } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';

const MenuList = ({
  anchorEl,
  handleClose,
  addItemList,
  open,
  handleChange,
}: {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  addItemList: string[];
  open: boolean;
  handleChange: (item: string) => void;
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      {addItemList.map((addItem) => {
        return (
          <MenuItem
            key={addItem}
            value={addItem}
            sx={{ fontSize: '1.4em' }}
            onClick={() => handleChange(addItem)}
          >
            {addItem}
          </MenuItem>
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
  addItemList: string[];
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
        color: 'white',
        border: '2px pink solid',
        width: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Button
        sx={{
          width: 'fit-content',
          whiteSpace: 'nowrap',
          backgroundColor: '#383838',
          fontSize: '1.4em',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        {label}
      </Button>
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
