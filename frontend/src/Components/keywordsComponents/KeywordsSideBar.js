import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import { useState } from 'react';
import { useTranslation } from "react-i18next";
import AddKeyword from './AddKeyword';
import useFetch from '../useFetch';
import { useHistory } from 'react-router-dom';



const KeywordsSideBar = () => {
    const { t } = useTranslation();


    const url = "http://localhost:8000/myKeywords";
    const { data, isPending, error } = useFetch(url);
    const [openTabs, setOpenTabs] = useState([]);

    const toggleTab = (tabIndex) => {
      const updatedTabs = [...openTabs];
      updatedTabs[tabIndex] = !updatedTabs[tabIndex];
      setOpenTabs(updatedTabs);
    };

    const tabs = data ? data.map((keyword, keywordId) => ({
        text: keyword.name.toUpperCase(),
        keywordId: keyword.id,
        nestedList: keyword.dates.map((date, dateId) => ({
          text: date.date,
          dateId: date.id,
          icon: <CalendarMonthIcon />
        }))
      })) : [];


    const leng = tabs.length;

    const history = useHistory();

    const handleFilter = (keyword, keywordID, dateID) => {
        history.push(`/keywords/${keywordID}/${dateID}?keyword=${keyword}`);
    }


    return (
        <List
        className='side-menu'
        sx={{ width: '100%',  bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t('keywords')}
          </ListSubheader>
        }
      >
        {tabs.map((tab, index) => (
          <div key={tab.keywordId}>
            <ListItemButton onClick={() => toggleTab(tab.keywordId)}>

              <ListItemText primary={tab.text} />
              {openTabs[tab.keywordId] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {tab.nestedList && (
              <Collapse in={openTabs[tab.keywordId]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {tab.nestedList.map((nestedTab, nestedIndex) => (
                    <ListItemButton key={nestedTab.dateId} sx={{ pl: 4 }} onClick={() => handleFilter(tab.text, tab.keywordId, nestedTab.dateId)}>
                      <ListItemIcon>
                        {nestedTab.icon}
                      </ListItemIcon>
                      <ListItemText primary={nestedTab.text} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}

      </List>
    );
}
 
export default KeywordsSideBar;