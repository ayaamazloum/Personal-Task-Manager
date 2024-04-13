import { useState } from "react"
import sendRequest from "../../../core/tools/remote/request"
import { requestMehods } from "../../../core/enums/requestMethods"

const LoginForm = ({handleUserLogged}) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState('');

  const login = async () => {
    setError('');
    if (credentials.username === '' || credentials.password === '') {
        setError('Username and password are required.');
        return;
    }
    try {
      const res = await sendRequest(requestMehods.POST, "/auth/login", credentials);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        //handleUserLogged(true);
      }
    } catch (e) {
      setError(e.response.data)
    }
  }
  return (
    <>
      <div className='inputs flex column center gap-10'>
        <p className='lg-text bold text-center'>Log in</p>
        <input onChange={(e) => { setCredentials({ ...credentials, username: e.target.value }); }}
          className='auth-input border semi-rounded' type='text' placeholder='Username' />
        <input onChange={(e) => {
          setCredentials({ ...credentials, password: e.target.value });
          e.target.value.length < 6 ? setError('Short password') : setError('')}}
          className='auth-input border semi-rounded' type='password' placeholder='Password' />
        {error !== '' && <p className="primary-text xsm-text self-start mb-10">{error}</p>}
      </div>
      <p className='light-text text-center xsm-text blue-text link'>Forgotten your password?</p>
      <button className='auth-button secondary-bg white-text bold sm-text rounded' onClick={login}>Log in</button>
    </>
  )
}

export default LoginForm