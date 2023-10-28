import { Box, Container } from "@mui/material";

const BulletinDetail = ({ data }) => {
    return (

        <Container
        sx={{
            pt: 2,
        }}
        >
            <h3> { data.title } </h3>

            <Box
            sx={{
                fontWeight: 'light'
            }}
            >
                { data.month }
            </Box>

            <div>
                {data.body.map((content, index) => 
                
                <div className="text-align-justify" key={index}>
                    {content}
                </div>
                
                )}

                
            </div>


        </Container>

    );
}
 
export default BulletinDetail;