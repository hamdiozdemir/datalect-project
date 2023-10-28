import useFetch from '../Components/useFetch';
import { useHistory, useLocation } from 'react-router-dom';

import ArticleThumbSmall from '../Components/bulletinComponents/ArticleThumbSmall';
import LeftListBar from '../Components/bulletinComponents/LeftListBar';
import FilterButtons from '../Components/bulletinComponents/FilterButtons';
// Left Bar

import { useEffect } from 'react';
import { useState } from 'react';

// Language
import { useTranslation } from 'react-i18next';




const Bulletins = () => {

    const {t, i18n} = useTranslation();
    const url = "http://localhost:8000/bulletins";
    const { data, isPending, error } = useFetch(url);

    const uniqueFields = data ? [...new Set(data.map(bulletin => bulletin.field))] : [];


    const [filteredData, setFilteredData] = useState(data);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const param = searchParams.get('param'); // Retrieve the parameter


    useEffect(() => {
        try {
            if (!param || param === "All") {
                setFilteredData(data);
            } else {
                const filteredData = data.filter(item => item.field === param);
                setFilteredData(filteredData);
            };
        } catch (error) {
            setFilteredData(data);
            console.log(error);
        }
    }, [param, data])


    return (
        <div className="root-container">
            
            <div className="left-list">
                <LeftListBar uniqueFields={uniqueFields} />

            </div>


            <div className="left-list-responsive">

            <FilterButtons uniqueFields={uniqueFields} />



            </div>





                    
            <div className='main-home-container'>

               <h2> {t('bulletins')} </h2>

                <div className="home-articles-container">

                { error && <div>{error}</div> }
                { isPending && <div> {t('loading')} </div>}

                {filteredData && <ArticleThumbSmall data={filteredData} /> }

                </div>

            </div>
        </div>

    );
}
 
export default Bulletins;