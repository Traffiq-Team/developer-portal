import React, { useState, Fragment } from 'react';
import { CodeBlock, zenburn } from 'react-code-blocks';
import { Tablist, Tab, EmptyState, WarningSignIcon } from 'evergreen-ui';
import styles from './styles.module.css';

const instructionsText = `# Install via npm
npm install @traffiq/express-auth
`;

const implementationText = `import fs from 'fs';
import express from 'express';
import * as TraffiqAuth from '@traffiq/express-auth';

// or using CommonJS
// const fs = require('fs');
// const express = require('express');
// const TraffiqAuth = require('@traffiq/express-auth');

const app = express();

const traffiqAuth = TraffiqAuth({
  // The name of your app, as shown in your Traffiq dashboard.  
  appName: 'Your App Name',
  // The public key file provided by Traffiq.
  publicKey: fs.readFileSync('path/to/public/key'),
  // Make sure the current user is the same IP as the one that joined the queue.
  enforceIp: false,
  // Make sure the user agent is the same as the one that joined the queue.
  enforceUserAgent: false,
  // Whether or not to disallow JWT reuse. Results in increased memory usage.
  preventKeyReuse: true,
  // The queue URL to redirect to in the case of an invalid or expired token.
  queueUrl: 'http://example.traffiq.live'
});

// This will make all visitors to the root route go through the queue.
app.get('/', traffiqAuth, function rootHandler(req, res) {
  res.end('Hello world!');
});

app.listen(3000);`;

const CodeIntegration = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState(['Node.js', 'Others']);

  const renderContent = () => {
    switch (tabs[selectedIndex]) {
      case 'Node.js':
        return (
          <Fragment>
            <div className={styles.codeSection}>
              <span>Add traffiq as a dependency.</span>
              <CodeBlock
                theme={zenburn}
                language="bash"
                text={instructionsText}
                showLineNumbers={false}
              />
            </div>
            <div className={styles.codeSection}>
              <span>
                You should initialize Traffiq before you use the dependency.
              </span>
              <CodeBlock
                theme={zenburn}
                language="javascript"
                text={implementationText}
              />
            </div>
          </Fragment>
        );
      default:
        return (
          <EmptyState
            background="light"
            title="Coming soon!"
            orientation="vertical"
            icon={<WarningSignIcon color="#EBAC91" />}
            iconBgColor="#F8E3DA"
            description="Other languages will be supported in the future."
          />
        );
    }
  };

  return (
    <section>
      <header className={styles.header}>
        <h2 className={styles.title}>Code Integration</h2>
        <Tablist>
          {tabs.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
              className={styles.tab}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
      </header>
      <div className={styles.content}>{renderContent()}</div>
    </section>
  );
};

export default CodeIntegration;
