import { useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';

const FilterButtons = ({ uniqueFields }) => {

    const history = useHistory();

    const handleFilter = (param) => {
        history.push(`?param=${param}`);
    }

    return (
        <div className="button-container">

            <Button
                color="success"
                variant="outlined"
                onClick={() => handleFilter("All")}
                >
                Hepsi

            </Button>

        {uniqueFields && 
        uniqueFields.map((field) => (

            <Button
            key={field}
            size="small"
            variant="outlined"
            onClick={() => handleFilter(field)}
            >
            {field}

            </Button>
        ))}


        </div>
    );
}
 
export default FilterButtons;