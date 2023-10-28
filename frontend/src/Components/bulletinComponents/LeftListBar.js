import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import { useHistory } from 'react-router-dom';


export default function LeftListBar({ uniqueFields }) {

  const history = useHistory();

  const handleFilter = (param) => {
      history.push(`?param=${param}`);
  }


 

  return (

      <List
        sx={{ width: '100%', bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >

        <ListItemButton onClick={() => handleFilter('All')}>
            <ListItemIcon>
            <CollectionsBookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Hepsi" />
        </ListItemButton>

        <Divider />

        {uniqueFields && 
        uniqueFields.map((field) => (
          
        <ListItemButton key={field}
        onClick={() => handleFilter(field)}
        >
            <ListItemText primary={field} />
        </ListItemButton>
        
        ))
        }
        <Divider />
      </List>
  );
}