import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Divider, Menu, MenuItem } from '@mui/material';
import React, { useRef } from 'react';
import './GroupingDropdown.css';

const GroupingDropdown = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedItem, setSelectedItem] = React.useState('All'); // Initial selected item
  const dropdownRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value, event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAnchorEl(null); // Close the menu if clicked outside
    }
    setSelectedItem(value);
    setAnchorEl(null);
  };


  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setAnchorEl(null);
    }
  };

  return (
    <div className="dropdown mb-1 mr-1">
      <Button
        id="groupingdropdown"
        variant="outlined"
        endIcon={<KeyboardArrowDown className="arrow" />}
        onClick={handleClick}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        aria-label="Grouping drop-down menu"
        sx={{
          fontSize: { xs: '12px', md: '13px' },
          height: { xs: '2rem', md: '2.5rem' },
        }}
      >
        {selectedItem}
      </Button>
      <Menu
        id="grouping-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={(event) => handleClose(selectedItem, event)} // Pass the event parameter
        MenuListProps={{
          'aria-labelledby': 'groupingdropdown',
        }}
        sx={{
          '& .menu-item': {
            fontSize: { xs: '12px', md: '14px' },
          },
        }}
      >

        {['All', 'In progress', 'Future', 'Past', 'Starred', 'Removed from view'].map(
          (item, index) => (
            <div key={index}>
              {index === 1 || index === 4 ? <Divider /> : null} {/* Add divider for specific items */}
              <MenuItem
                onClick={() => handleClose(item)} // Pass item as argument
                data-filter="grouping"
                data-value={item.toLowerCase().replace(/\s+/g, '')} // Convert to lowercase and remove spaces
                data-pref={item.toLowerCase().replace(/\s+/g, '')} // Convert to lowercase and remove spaces
                className="menu-item"
              >
                {item}
              </MenuItem>
            </div>
          )
        )}
      </Menu>
    </div>
  );
};

export default GroupingDropdown;
