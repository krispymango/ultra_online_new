import React from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

function CustomListItem({message,icon,onClick}) {
  return (
    <>
          <ListItem disablePadding>
            <ListItemButton onClick={onClick}>
            <div>
            {icon}
            </div>
              <ListItemText primary={message} />
            </ListItemButton>
          </ListItem>
    </>
  )
}

export default CustomListItem