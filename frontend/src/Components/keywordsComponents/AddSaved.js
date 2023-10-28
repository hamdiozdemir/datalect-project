import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Container, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
// Language
import { useTranslation } from 'react-i18next';




const AddSaved = ({ isFav }) => {

    const {t, i18n} = useTranslation();


    return (
        <Box
        className="flex-column-container"
        sx={{
            width: '15%',
            color: 'success',
            ml: 'auto',
            rowGap: 2,
        }}
        >
            <div className='text-align-center'> 
                {!isFav && 
                    <IconButton aria-label="add-to" color='primary'>
                        <FavoriteBorderIcon color="secondary" fontSize="large" 
                        />
                    </IconButton>
                }
                {!isFav && <div>Save</div>}


                {isFav && 

                    <IconButton aria-label="add-to" color='primary'>
                        <FavoriteIcon color="success" fontSize="large" 
                         />
                    </IconButton>
                
                
                }

                {isFav && <div>SAVED</div>}


            </div>

        </Box>

    );
}
 
export default AddSaved;