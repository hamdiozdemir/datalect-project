import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom/cjs/react-router-dom";


const ArticleThumbSmall = ({ data }) => {
    


    const history = useHistory();
    const handleNavigation = (id) => {
        history.push(`/bulletins/${id}`);
    };


    return (
        <div className="home-popular-container">

            {data.map((articleData) => (

            <Box 
            className="article-thumb-small"
            onClick={() => handleNavigation(articleData.id)}
            key={articleData.id}
            >
                
            <img className="temp-img" src={articleData.imageUrl} alt="" />

                <div className="article-thumb-content">
                    <div className="bold"> { articleData.field } </div>
                    <div className="date-field"> { articleData.month } </div>
                    <div className="article-title"> { articleData.title } </div>

                </div>



            </Box>
            ))},


        </div>


    )
};
 
export default ArticleThumbSmall;