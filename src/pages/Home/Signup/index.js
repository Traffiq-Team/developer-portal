import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../../store/AuthProvider';
import { SET_AUTHENTICATED } from '../../../store/AuthProvider/actions';
import Input from '../../../components/Input';
import createAccount from '../../../api/createAccount';
import PrimaryButton from '../../../components/PrimaryButton';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createAccount(username, password);
      authDispatch({ type: SET_AUTHENTICATED, payload: true });
      history.push('/dashboard');
    } catch (error) {
      console.log('Error from authenticateUser');
    }
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Create an account</h1>
      <form className={styles.form}>
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
        <PrimaryButton size="large" onClick={handleSubmit}>
          Create account
        </PrimaryButton>
      </form>
      <Link to="/home/login" className={styles.link}>
        Already have an account? Log in here.
      </Link>
    </section>
  );
};

export default Login;
