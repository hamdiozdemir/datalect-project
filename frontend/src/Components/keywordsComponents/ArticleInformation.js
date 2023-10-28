import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import LinkIcon from '@mui/icons-material/Link';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// Language
import { useTranslation } from 'react-i18next';



import AddSaved from "./AddSaved";
import useFetch2 from "../useFetch2";
import useFetch from "../useFetch"

const ArticleInformation = ({ data }) => {

    const {t, i18n} = useTranslation();

    const [currentKeyword, setCurrentKeyword] = useState(false);
    const location = useLocation();
    const isFav = true;

    const [savedArticles, setSavedArticles] = useState([]);




    const openLinkInNewTab = (link) => {
        window.open(link, "_blank");
      };
    useEffect(() => {
        const queryParameters = new URLSearchParams(location.search)
        const newKeyword = queryParameters.get('keyword');
        
        if (newKeyword) {
            setCurrentKeyword(newKeyword.toLocaleLowerCase());
        }

        console.log(newKeyword.toLowerCase());
        const url = 'http://localhost:8000/' + newKeyword.toLowerCase();
            fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Convert the response to JSON
            })
            .then(data => {
            setSavedArticles(data); // Set the data to your state
            console.log(data); // Log the data here
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });

        

    }, [location]);

    return (
        <Container>

            <Typography 
            variant="h3" 
            component="h4"
            align="center"
            sx={{
                color:"#2236E1"
            }}
            >
                {currentKeyword}
            </Typography>

            
            {data && 
            
            data.map((item, index) => (
                
            
                <div key={index} className="text-small">

                    <h2 className="text-align-center">  </h2>
                    <h4 className="text-align-center"> {item.date} </h4>
                    <div>
                        {item.contents.map((content, contentIndex) => (

                            <Box
                            className="flex-row-nowrap"
                            sx={{
                                background: '#B0BCA7',
                                boxSizing: 'border-box',
                                m: 1,
                                p: 2
                            }}
                            >
                                <Box
                                className="flex-column-container"
                                key={contentIndex}
                                sx={{
                                    width: '80%',
                                }}
                                >
                                    <h5 className="article-title" onClick={() => openLinkInNewTab(content.link)}><LinkIcon /> {content.title} 
                                    
                                    </h5>
                                    <div>{content.authors}</div>
                                    <div>{content.id}</div>
    

                                    {content.abstract}
                                    

                                </Box>

                                {
                                    savedArticles.includes(content.id) &&
                                    <AddSaved isFav={true} />

                                }
                                {
                                    !savedArticles.includes(content.id) &&
                                    <AddSaved isFav={false} />

                                }


                            </Box>


                                

                            
                        ))}
                        

                    </div>
                </div>

            

            
            ))
            }

        </Container>





    );
}
 
export default ArticleInformation;