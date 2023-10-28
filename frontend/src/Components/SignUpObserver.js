const SignUpObserver = ({ eyeObserve }) => {
    
    return (
    <div className='observer flex-center'>
        <div className={"eye " + eyeObserve}>
            <div className="inside-eye"></div>

        </div>
        <div className={"eye " + eyeObserve}>
            <div className="inside-eye"></div>

        </div>
    </div>
    );
}
 
export default SignUpObserver;