import { Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from 'react-i18next';

import useFetch from "../useFetch";
import { useEffect } from "react";
import { useState } from "react";
import ArticleInformation from "./ArticleInformation";
import Typography from "@mui/material/Typography";

const KeywordList = () => {

    const {t, i18n} = useTranslation();
    const { keywordID, dateID } = useParams();
  

    const url = 'http://localhost:8000/keywords';
    const { data, error, isPending } = useFetch(url + keywordID + dateID);

    return (
        <div>
            <Container>
            
              {isPending && <CircularProgress /> }

              
              {data && !error && <ArticleInformation data={data} />}

              {!data &&

              <Typography
              variant="h6"
              component='h5'
              align="center"
              >
                  {t('selectKeywordDate')} 

              </Typography>

              }
            </Container>
        </div>
    );
}
 
export default KeywordList;