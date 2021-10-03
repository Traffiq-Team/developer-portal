import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Page from '../../components/Page';
import AuthContext from '../../store/AuthProvider';
import { SET_IS_AUTHENTICATED } from '../../store/AuthProvider/actions';
import styles from './styles.module.css';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { authState, authDispatch } = useContext(AuthContext);
  const { isAuthenticated } = authState;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Call endpoint to handle authentication
    authDispatch({ type: SET_IS_AUTHENTICATED, payload: true });
  };

  return (
    <Page>
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
    </Page>
  );
};

export default Home;
