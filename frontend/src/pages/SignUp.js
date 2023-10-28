
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SignUpForm from '../Components/SignUpForm';

const SignUp = () => {
    const url = 'http://localhost:8000/users';
    const history = useHistory();



    return (
        <div className="create">
            <SignUpForm />



        </div>

    );
}
 
export default SignUp;