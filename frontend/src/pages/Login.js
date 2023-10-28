// MUI
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';

// Language
import { useTranslation } from 'react-i18next';
// Natives
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from "../actions/types";

const Login = ({ login }) => {
    const {t, i18n} = useTranslation();

    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const { email, password } = data;
    const [incorrectInfo, setIncorrectInfo] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        login(email, password);

        // is the user authenticated, if yes redirect to home page


    };

    return (
        <div>

            <h2>Let's LOGIN</h2>

            <div className="flex-center">
                <Box
                    component="form"
                    sx={{
                        m:1,
                        width: 400,
                        maxWidth: '90%',
                        minWidth: 280,
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 2
                    }}
                    // noValidate
                    autoComplete="off"
                    >
                        <TextField
                        required
                        id="email"
                        type="email"
                        label={t('email')}
                        placeholder="example@example.com"
                        variant="outlined"
                        value={data.email}
                        onChange={(e) => {setData({...data, email: e.target.value})}}
                        {...incorrectInfo && {error: true}}
                        {...incorrectInfo && {focused: true}}

                        />

                        <TextField 
                        required
                        id="password"
                        label={t('password')}
                        variant="outlined"
                        type="password"
                        placeholder='***********'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                        {...incorrectInfo && {error: true}}
                        {...incorrectInfo && {focused: true}}
                        />

                        <Button
                        variant="contained"
                        startIcon = { <CheckIcon /> }
                        onClick={handleSubmit}
                        sx={{
                            textTransform:'capitalize'
                        }}
                        >
                            {t('login')}
                            
                        </Button>
                </Box>
            </div>
            
            <div className="text-align-center mt-2">
                {t('dontHaveAccount')} - <Link to="/signup"> {t('signUp')} </Link>
            </div>
            <div className="text-align-center mt-2">
                {t('forgotPassword')} - <Link to="/reset-password"> {t('resetPassword')} </Link>
            </div>






        </div>
    );
};

const mapStateToProps = state => ({
    // is authenticated?
});
 
export default connect(null, { login })(Login);