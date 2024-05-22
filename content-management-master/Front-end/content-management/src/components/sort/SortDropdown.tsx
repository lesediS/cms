import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import './SortDropdown.css';

const SortDropdown = ({ onSort }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState('Sort by course name');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    setSelectedItem(value);
    setAnchorEl(null);
    if (onSort) {
      onSort(value); // Call the onSort callback with the selected sorting option
    }
  };

  return (
    <div className="sort-dropdown mb-1 mr-1 d-flex flex-wrap align-items-center">
      <Button
        className="sort-btn"
        id="sortingdropdown"
        variant="outlined"
        endIcon={<KeyboardArrowDown className="arrow" />}
        onClick={handleClick}
        aria-controls="sort-menu"
        aria-haspopup="true"
        aria-label="Sorting drop-down menu"
      >
        {selectedItem}
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose(selectedItem)} // Pass selectedItem to handleClose
        MenuListProps={{
          'aria-labelledby': 'sortingdropdown',
        }}
      >
        <MenuItem
          onClick={() => handleClose('Sort by course name')}
          data-filter="sort"
          data-pref="title"
          data-value="fullname"
          className="menu-item"
        >
          Sort by course name
        </MenuItem>
        <MenuItem
          onClick={() => handleClose('Sort by last accessed')}
          data-filter="sort"
          data-pref="lastaccessed"
          data-value="ul.timeaccess desc"
          className="menu-item"
        >
          Sort by last accessed
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortDropdown;
