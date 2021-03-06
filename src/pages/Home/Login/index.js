import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toaster } from 'evergreen-ui';
import AuthContext from '../../../store/AuthProvider';
import authenticateUser from '../../../api/authenticateUser';
import {
  SET_AUTHENTICATED,
  SET_USERNAME,
} from '../../../store/AuthProvider/actions';
import Input from '../../../components/Input';
import checkAuthentication from '../../../api/checkAuthentication';
import PrimaryButton from '../../../components/PrimaryButton';
import logo from '../../../assets/traffiq.png';
import getErrorMessageFromFailedRequest from '../../../common/utils/getErrorMessageFromFailedRequest';
import styles from './styles.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    setIsSubmitting(true);

    try {
      await authenticateUser(username, password);

      authDispatch({ type: SET_AUTHENTICATED, payload: true });

      history.push('/dashboard');
    } catch (error) {
      toaster.danger(getErrorMessageFromFailedRequest(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.container}>
      <img src={logo} className={styles.logo} />
      <form className={styles.form}>
        <h1 className={styles.title}>Log in</h1>
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
        <PrimaryButton
          size="large"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        >
          Log in
        </PrimaryButton>
        <Link to="/home/signup" className={styles.link}>
          New here? Create a new account!
        </Link>
      </form>
      <span />
    </section>
  );
};

export default Login;
