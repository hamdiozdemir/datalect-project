import { Box, Container } from "@mui/material";
// Language
import { useTranslation } from 'react-i18next';
import KeywordsSideBar from "../Components/keywordsComponents/KeywordsSideBar";
import KeywordList from "../Components/keywordsComponents/KeywordList";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useState } from "react";


const MyKeywords = () => {
    const {t, i18n} = useTranslation();

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };

      const list = (anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
        >
            <KeywordsSideBar></KeywordsSideBar>

        </Box>
      );

    
    return (
        <div className="root-container">
            <div className="hide-menu">
            {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                    <Button 
                        onClick={toggleDrawer(anchor, true)}
                        variant="outlined"
                        sx={{
                            mt:1,
                            width: '100%'
                        }}
                        > 
                        <KeyboardDoubleArrowRightIcon />
                        {t('keywords')} 
                    </Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}

                    >
                        {list(anchor)}
                    </Drawer>
                    </React.Fragment>
                ))}

            </div>


            <div className="show-menu">
                <KeywordsSideBar>

                </KeywordsSideBar>
            </div>

            <Container>
                <div className="flex-column-container">
                    
                    {/* <h3 className="text-align-center"> {t('keywords')} </h3> */}
                    <KeywordList></KeywordList>

                </div>

            </Container>


        </div>
    );
}
 
export default MyKeywords;