import React, { useState } from 'react';
import styles from './styles.module.css';
import Page from '../../components/Page';

const Home = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting', username, password);
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
