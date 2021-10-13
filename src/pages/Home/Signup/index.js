import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import AuthContext from '../../../store/AuthProvider';
import { SET_AUTHENTICATED } from '../../../store/AuthProvider/actions';
import Input from '../../../components/Input';
import createAccount from '../../../api/createAccount';
import PrimaryButton from '../../../components/PrimaryButton';
import logo from '../../../assets/traffiq.png';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  const { authDispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      toaster.warning('Passwords must match!');
      return;
    }

    setIsSubmitting(true);

    try {
      await createAccount(username, password);
      authDispatch({ type: SET_AUTHENTICATED, payload: true });
      history.push('/dashboard');
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <img src={logo} className={styles.logo} />
      <form className={styles.form}>
        <h1 className={styles.title}>Create an account</h1>
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
        <Input
          type="password"
          placeholder="Password (again)"
          label="Confirm password"
          value={confirmedPassword}
          onChange={(value) => setConfirmedPassword(value)}
          fullWidth
        />
        <PrimaryButton
          size="large"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          Create account
        </PrimaryButton>
        <Link to="/home/login" className={styles.link}>
          Already have an account? Log in here.
        </Link>
      </form>
      <span />
    </section>
  );
};

export default Login;
