import { useState } from "react"
import sendRequest from "../../../core/tools/remote/request"
import { requestMehods } from "../../../core/enums/requestMethods"

const SignupForm = () => {
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        password: "",
    });
    const [error, setError] = useState('');
    const [note, setNote] = useState('');

    const signup = async () => {
        setError('');
        setNote('');
        if (credentials.firstName === '' || credentials.lastName === '' || credentials.username === ''
            || credentials.password === '' || errors.password !== '') {
            setError('Please fill in all the fields.');
            return;
        }
        try {
            const res = await sendRequest(requestMehods.POST, "/auth/register", credentials);
            if (res.status === 201) {
                setNote('Signed up successfully!');
            }
        } catch (e) { setError(e.response.data);}
    }
    
    return (
        <>
            <p className='lg-text bold text-center'>Sign up</p>
            <div className='inputs flex column center gap-10'>
                <input onChange={(e) => { setCredentials({ ...credentials, firstName: e.target.value }) }}
                    className='auth-input border semi-rounded' type='text' placeholder='First Name' />
                
                <input onChange={(e) => { setCredentials({ ...credentials, lastName: e.target.value }) }}
                    className='auth-input border semi-rounded' type='text' placeholder='Last Name' />
                
                <input onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }) }}
                    className='auth-input border semi-rounded' type='text' placeholder='Username' />
                
                <input onChange={(e) => {
                    setCredentials({ ...credentials, password: e.target.value });
                    setErrors({...errors, password: e.target.value.length > 5 ? '' : 'Short password' });}}
                    className='auth-input border semi-rounded' type='password' placeholder='Password' />
                {errors.password !== '' && <p className="primary-text xsm-text self-start mb-10">{errors.password}</p>}

                {error !== '' && <p className="primary-text xsm-text self-start mb-10">{error}</p>}
                {note !== '' && <p className="green-text xsm-text self-start mb-10">{note}</p>}
            </div>
            
            <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={signup}>Sign Up</button>
        </>
    )
}

export default SignupForm