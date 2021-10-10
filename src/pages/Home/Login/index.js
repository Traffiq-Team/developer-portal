import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../../store/AuthProvider';
import authenticateUser from '../../../api/authenticateUser';
import {
  SET_AUTHENTICATED,
  SET_USERNAME,
} from '../../../store/AuthProvider/actions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import checkAuthentication from '../../../api/checkAuthentication';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  useEffect(() => {
    const _checkAuthentication = async () => {
      try {
        const { username } = await checkAuthentication();

        authDispatch({ type: SET_AUTHENTICATED, payload: true });
        authDispatch({ type: SET_USERNAME, payload: username });

        history.push('/dashboard');
      } catch (error) {
        authDispatch({ type: SET_AUTHENTICATED, payload: false });
      }
    };

    _checkAuthentication();
  }, [authDispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await authenticateUser(username, password);

      authDispatch({ type: SET_AUTHENTICATED, payload: true });

      history.push('/dashboard');
    } catch (error) {
      console.log('Error from authenticateUser');
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Log in</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Username"
          label="Username"
          value={username}
          onChange={(value) => setUsername(value)}
          fullWidth
        />
        <Input
          type="password"
          placeholder="Password"
          label="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          fullWidth
        />
        <Button type="submit" fullWidth>
          Log in
        </Button>
      </form>
      <Link to="/home/signup" className={styles.link}>
        New here? Sign up today!
      </Link>
    </section>
  );
};

export default Login;
