import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
    //   primary: {
    //     main: "#CCC"
    //   },
      myPrimary: {
        main: "#f4978e",
        light: "#f8ad9d",
        dark: "#f08080",
        contrastText: "",
      },
      lightColor: {
        main: "#fff",
        light: "#fff",
        dark: "#fff",
      }
    },
    typography: {
        fontFamily : "EB Garamond",
        appBarHeader: {
          fontSize: "1.1rem",
          color: "#fff"
        }
    }
  });

  export default theme;