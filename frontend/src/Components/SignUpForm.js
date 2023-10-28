import * as React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import SignUpObserver from './SignUpObserver';
import countries from './countries';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// Language
import { useTranslation } from 'react-i18next';


const SignUpForm = () => {
    const {t, i18n} = useTranslation();
    const url = 'http://localhost:8000/users';
    const history = useHistory();

    const [eyeObserve, setEyeObserve] = useState('align-center');
    const [isPasswordLength, setIsPasswordLength] = useState(false);
    const [isMatch, setIsMatch] = useState(false);
    const [isDataValid, setIsDataValid] = useState(false);

    const [data, setData] = useState({
        nameSurname: '',
        email: '',
        password: '',
        rePassoword: '',
        country: '',
        degree: '',
        title: '',
        agreement: false
    })

    
    const handlePasswordMatch = (e) => {
        if (e.target.value === data.password) {
            setIsMatch(true);
        } else {
            setIsMatch(false);
        }
    };
    
    const checkPasswordLength = () => {
        if (data.password.length >= 8) {
            setIsPasswordLength(true);
        } else {
            setIsPasswordLength(false);
        }
    };
    
    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };
    

    // Checks the input are OK 
    useEffect(() => {
        if (data.nameSurname && isValidEmail && isPasswordLength && isMatch && data.agreement) {
            setIsDataValid(true);
        } else{
            setIsDataValid(false);
        }
    },
    [data.agreement, data.nameSurname, isMatch, isPasswordLength]
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        // DEBUG
        console.log(data);

        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                history.push("/login?success=true");
            }
        }).catch(err =>{
            console.log(err.message)
        })

    };
    
    return (
        <Box
        component="form"
        sx={{
           m: 1, width: 700, maxWidth: '90%' , display: 'flex', flexDirection:'column', rowGap: 2,
        }}
        noValidate
        autoComplete="off"
        >
            <SignUpObserver eyeObserve={eyeObserve} />

            <Box
            sx={{
                display: 'flex', gap: 1, justifyContent:'center', flexWrap: 'wrap'
            }}
            >
                <TextField 
                sx={{
                    minWidth: 250,
                }}
                required
                id="name" 
                label={t('name')}
                placeholder={t('name')}
                variant="outlined"
                onFocus={() => setEyeObserve('align-end')}
                onBlur={() => setEyeObserve('align-center')}
                value={ data.nameSurname }
                onChange={(e) => setData({...data, nameSurname: e.target.value}) }
                {...(data.nameSurname ? {focused: true}: {} )}
                {...(data.nameSurname ? {color: "success"}: {} )}
                />

                <TextField 
                sx={{
                    minWidth: 250,
                }}
                required
                id="email" 
                label={t('email')}
                variant="outlined"
                placeholder='example@examle.com' 
                type='email'
                onFocus={() => setEyeObserve('align-end')}
                onBlur={() => setEyeObserve('align-center')}
                value={ data.email }
                onChange={(e) => setData({...data, email: e.target.value}) }
                {...(isValidEmail(data.email) ? {color: "success"}: {} )}
                {...(isValidEmail(data.email) ? {focused: true}: {} )}
                
                />
            </Box>

            <Box
            sx={{
                display:'flex', columnGap: 1, justifyContent:'center', flexWrap: 'wrap'
            }}
            >
                <TextField 
                sx={{
                    minWidth: 250,
                }}
                required
                id="password" 
                label={t('password')}
                variant="outlined"
                placeholder='***********' 
                type='password'
                onFocus={() => setEyeObserve('align-start')}
                onBlur={() => setEyeObserve('align-center')}
                value={ data.password }
                onChange={(e) => setData({...data, password: e.target.value}) }
                onKeyUp={checkPasswordLength}
                helperText="Parola en az 8 karakter olmalıdır."
                {...(!isPasswordLength ? {error: true}: {} )}
                {...(isPasswordLength ? {focused: true}: {} )}
                {...(isPasswordLength ? {color: "success"}: {} )}
                         
                />
                <TextField 
                sx={{
                    minWidth: 250,
                }}
                required
                id="re-password" 
                label={t('passwordAgain')}
                variant="outlined"
                placeholder='***********' 
                type='password'
                onFocus={() => setEyeObserve('align-center justify-end')}
                
                onBlur={() => setEyeObserve('align-center')}
                value={ data.rePassoword }
                onChange={(e) => setData({...data, rePassoword: e.target.value}) }
                onKeyUp={handlePasswordMatch}
                helperText={t('passwordNotMatching')}
                {...(!isMatch ? {error: true}: {} )}
                {...(isMatch ? {focused: true}: {} )}
                {...(isMatch ? {color: "success"}: {} )}
                         
                />




            </Box>

            <Box
            sx={{
                display:'flex', columnGap: 1, justifyContent:'center', flexWrap: 'wrap'
            }}
            >
                <FormControl sx={{  minWidth: 250 }}
                {...(data.degree ? {focused: true}: {} )}
                {...(data.degree ? {color: "success"}: {} )}
                >
                    <InputLabel id="demo-simple-select-helper-label">Öğrenim</InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="degree-select"
                    value={data.degree}
                    label={t('education')}
                    onChange={(e) => setData({...data, degree: e.target.value}) }
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={t('highSchool')}>{t('highSchool')}</MenuItem>
                    <MenuItem value={t('bachelor')}>{t('bachelor')}</MenuItem>
                    <MenuItem value={t('master')}>{t('master')}</MenuItem>
                    <MenuItem value={t('phd')}>{t('phd')}</MenuItem>
                    </Select>
                    <FormHelperText> {t('optional')} </FormHelperText>
                </FormControl>

                <FormControl sx={{ minWidth: 250 }}
                {...(data.title ? {focused: true}: {} )}
                {...(data.title ? {color: "success"}: {} )}
                >
                    <InputLabel id="demo-simple-select-helper-label">
                        {t('title')}
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-helper-label"
                    id="title-select"
                    value={data.title}
                    label="Ünvan"
                    onChange={(e) => setData({...data, title: e.target.value}) }
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={t('student')}>{t('student')}</MenuItem>
                    <MenuItem value={t("expert")}>{t("expert")}</MenuItem>
                    <MenuItem value={t('doctorate')}>{t('doctorate')}</MenuItem>
                    <MenuItem value={t('assocProf')}>{t('assocProf')}.</MenuItem>
                    <MenuItem value={t('proffesor')}>{t('proffesor')}</MenuItem>
                    </Select>
                    <FormHelperText> {t('optional')} </FormHelperText>
                </FormControl>




            </Box>

            <Box
                sx={{
                    display:'flex', columnGap: 1, justifyContent:'center', flexWrap: 'wrap'
                }}
            >
                <Autocomplete 
                // disablePortal
                autoHighlight
                id="country-select"
                options={countries.map(country => country.name)}
                sx={{width: 250}}
                value={ data.country }
                onChange={(e, newValue) => setData({...data, country: newValue})}
                renderInput={
                    (params) => 
                        <TextField {...params} 
                        label={t('country')}
                    />  }
                />

            </Box>


            <Box
            sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'
            }}
            >
                <FormGroup>
                    <FormControlLabel

                    control={<Checkbox  
                        checked={data.agreement}  
                        onChange={(e) => setData( {...data, agreement: e.target.checked} )}
                        />} 
                    label={t('termAccept')} />
                </FormGroup>

                {!isDataValid && 
                <Button id='register-button' variant="contained" startIcon={<SaveIcon />} disabled sx={{
                    textTransform: 'capitalize'
                }} >
                    {t('register')}
                </Button>}
                {isDataValid && 
                <Button id='register-button' variant="contained" startIcon={<SaveIcon sx={{
                    textTransform: 'capitalize'
                }} />} 
                onClick={handleSubmit}>
                    {t('register')}
                </Button>}

            </Box>
                
        </Box>

    );
}
 
export default SignUpForm;