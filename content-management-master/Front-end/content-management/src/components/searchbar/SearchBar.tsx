import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';

function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('searchInput');
    setSearchQuery(query);
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSearch} className="search-form" style={{ width: '50%' }}>
      <div className="text-field">
        <TextField
          fullWidth
          variant="outlined"
          name="searchInput"
          placeholder="Search..."
          sx={{
            '& .MuiInputBase-root': {
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiInputBase-input': {
              paddingLeft: '10px',
              height: '100%',
            },
            '& .MuiButtonBase-root': {
              padding: '8px',
            },
            '& .MuiSvgIcon-root': {
              fontSize: '25px',
              color: 'rgb(7, 64, 109)',
            },
            '@media (max-width: 600px)': {
              '& .MuiSvgIcon-root': {
                fontSize: '20px',
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </form>
  );
}

export default SearchBar;
