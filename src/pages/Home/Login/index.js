import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../../store/AuthProvider';
import authenticateUser from '../../../api/authenticateUser';
import { SET_AUTH_TOKEN } from '../../../store/AuthProvider/actions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await authenticateUser(username, password);
      const { token } = data;

      authDispatch({ type: SET_AUTH_TOKEN, payload: token });

      history.push('/dashboard');
    } catch (error) {
      console.log('Error from authenticateUser');
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>
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
          Submit
        </Button>
      </form>
    </section>
  );
};

export default Login;
