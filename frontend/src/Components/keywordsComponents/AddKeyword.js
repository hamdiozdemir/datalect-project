import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Divider } from '@mui/material';
import { useState } from 'react';
import useFetch from '../useFetch';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const filter = createFilterOptions();

const AddKeyword = () => {
    const {t, i18n} = useTranslation();
    const [value, setValue] = useState(null);
    const url = "http://localhost:8000/currentKeywords";
    const { data, isPending, error } = useFetch(url);

    const currentKeywords = data ? data : [{"id": 1, "name": " "}];


    return (
        <Box
        sx={{
            px: "10px",
            boxSizing: "border-box",

        }}>
            <Autocomplete

                value={value}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                    setValue({
                        name: newValue,
                    });
                    } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                        name: newValue.inputValue,
                    });
                    } else {
                    setValue(newValue);
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                    });
                    }

                    return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={data}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                    return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                    return option.inputValue;
                    }
                    if (option.name) {
                        return option.name
                    }
                    // Regular option
                    return "";
                }}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField                    
                    {...params} label={t('addKeyword')}
                    sx={{
                        maxWidth: "280px"
                    }}
                    />

                )}
                
            />
            <AddCircleIcon />
            <Divider></Divider>

            

        </Box>


    );
}
 
export default AddKeyword;