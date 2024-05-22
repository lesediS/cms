import React, { useState } from 'react';
import Unit from '../admin/addUnit/Unit';
import { CssBaseline, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NavBar from '../navbar/NavBar';

const drawerWidth = 250;

const mainStyles = {
  display: 'flex', // Ensure the main container is a flex container
  flexGrow: 1,
  padding: '10px',
  transition: 'margin 0.5s',
  
};


const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
};


export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <>
      
      <div>
      <NavBar />
      <div style={{ ...mainStyles, marginLeft: open ? 0 : `-${drawerWidth}px`}}>
        <div style={drawerStyles}>
          <div>
            <IconButton onClick={handleDrawerClose} style={{ marginLeft: '-19rem',  marginTop: '-3rem'}}>
              <CloseIcon titleAccess='close course index'/>
            </IconButton>
          </div>
          <ul>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <li key={text} style={{ padding: '10px' }}>
                {text}
              </li>
            ))}
          </ul>
          
        </div>
        <main style={{ flexGrow: 1, paddingLeft: '10px'}}>
          <div >
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start" // Use 'start' for left alignment
                onClick={handleDrawerOpen}
                style={{ display: open ? 'none' : 'block', marginLeft: '-60px' , marginTop: '-2rem'}}
              >
                <MenuIcon titleAccess='open course index'/>
              </IconButton>
            </div>
          </div>
          <Unit />
        </main>
      </div>
      </div>
      
    </>
  );
}
