import { useSelector, useDispatch } from 'react-redux';
// Language
import { useTranslation } from 'react-i18next';

const Home = () => {

    const {isLoggedIn, userId, userName, userEmail } = useSelector(state => state.globalVariables);
    const dispatch = useDispatch();
    const userPayload = {
        userId: 5,
        userName: 'Begüm',
        userEmail: 'begum@datalect.com'
    };

    const {t, i18n} = useTranslation();
 


    return (
        <div className='main-home-container'>
            <h2> {t('homepage')} </h2>


        </div>
        
    );
}
 
export default Home;