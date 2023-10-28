import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ResponsiveAppBar from './Components/ResponsiveAppBar';
import Create from './pages/Create';
import Home from './Components/Home';
import Projects from './Components/Projects';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Activate from './pages/Activate';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import Bulletins from './pages/BulletinList';
import BulletinDetail from './pages/BulletinDetail';
import MyKeywords from './pages/MyKeywords';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Styles/theme';
import store from './redux/store';
import { Provider } from 'react-redux';


function App() {

  const {isLoggedIn, userId, userName, userEmail } = useSelector(state => state.globalVariables);

  return (


      <ThemeProvider theme={theme} >
        <CssBaseline />

        <Router>
          <div className="App">
            <ResponsiveAppBar />

              <div className="content">
                <Switch>
                  <Route exact path="/" component={Home} />

                  <Route exact path="/bulletins" component={Bulletins} />

                  <Route exact path="/bulletins/:id" component={BulletinDetail} />

                  <Route exact path="/keywords" component={MyKeywords} />
    
                  <Route exact path="/keywords/:keywordID/:dateID" component={MyKeywords} />

                  <Route exact path="/create" component={Create} />

                  <Route exact path="/projects" component={Projects} />
    
                  <Route exact path="/login" component={Login} />

                  <Route exact path="/signup" component={SignUp} />

                  <Route exact path="/reset-password" component={ResetPassword} />
                  <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm} />
                  <Route exact path="/activate/:uid/:token" component={Activate} />

                </Switch>
                
              </div>

              
          </div>
        </Router>

      </ThemeProvider>

  );
}

export default App;
