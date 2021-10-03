import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../../store/AppProvider';
import AuthContext from '../../../store/AuthProvider';
import authenticateUser from '../../../api/authenticateUser';
import { SET_AUTH_TOKEN } from '../../../store/AuthProvider/actions';
import { SET_APP_NAME } from '../../../store/AppProvider/actions';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { appDispatch } = useContext(AppContext);

  const { authState, authDispatch } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authenticateUser(username, password);
      const { token, meta } = data;

      authDispatch({ type: SET_AUTH_TOKEN, payload: token });
      appDispatch({ type: SET_APP_NAME, payload: meta?.appName });
    } catch (error) {
      console.log('Error from authenticateUser');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
