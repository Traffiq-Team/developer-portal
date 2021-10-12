import React, { useState, useMemo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  IconButton,
  EmptyState,
  CleanIcon,
  SearchIcon,
  Spinner,
  Tooltip,
  Position,
  toaster,
  SettingsIcon,
  PlusIcon,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import getAllAppData from '../../../api/getAllAppData';
import PrimaryButton from '../../../components/PrimaryButton';
import styles from './styles.module.css';

const fuseOptions = {
  keys: ['appName'],
};

const AppsTable = () => {
  const [apps, setApps] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const fuse = new Fuse(apps, fuseOptions);

  const populateAppConfigurations = async () => {
    setIsLoading(true);

    try {
      const apps = await getAllAppData();
      setApps(apps);
    } catch (error) {
      toaster.danger(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    populateAppConfigurations();
  }, []);

  const handleEditClick = (appName) => {
    history.push(`/app/${appName}`);
  };

  const filteredApps = useMemo(
    () =>
      searchValue ? fuse.search(searchValue).map(({ item }) => item) : apps,
    [searchValue, apps],
  );

  const renderTableBody = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner />
        </div>
      );
    }

    // User tried searching for an app but no results show up
    if (searchValue && filteredApps.length === 0) {
      return (
        <EmptyState
          background="light"
          title={`No results for "${searchValue}"`}
          orientation="horizontal"
          icon={<SearchIcon color="#C1C4D6" />}
          iconBgColor="#EDEFF5"
          description="Try searching for something else and you might see it here."
        />
      );
    }

    // User doesn't have any apps at all
    if (filteredApps.length === 0) {
      return (
        <EmptyState
          background="light"
          title="Nothing to see here"
          orientation="horizontal"
          icon={<CleanIcon color="#C1C4D6" />}
          iconBgColor="#EDEFF5"
          description="Start by creating a new app to see some information about it appear here."
        />
      );
    }

    // Render the list of apps
    return filteredApps.map(({ appName, appUrl, queueUrl, config }) => (
      <Table.Row key={appName}>
        <Table.TextCell>{appName}</Table.TextCell>
        <Table.TextCell>{appUrl}</Table.TextCell>
        <Table.TextCell>{queueUrl}</Table.TextCell>
        <Table.TextCell isNumber>{config?.targetLatency}</Table.TextCell>
        <Table.Cell justifyContent="flex-end">
          <span className={styles.actions}>
            <Tooltip position={Position.TOP} showDelay={500} content="Settings">
              <IconButton
                icon={SettingsIcon}
                onClick={() => handleEditClick(appName)}
                appearance="minimal"
              />
            </Tooltip>
          </span>
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>Configured Apps</h2>
        <PrimaryButton
          size="large"
          iconBefore={PlusIcon}
          onClick={() => history.push('/create')}
        >
          Create new app
        </PrimaryButton>
      </header>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            placeholder="Search for App name"
            onChange={(value) => setSearchValue(value)}
          />
          <Table.TextHeaderCell>App URL</Table.TextHeaderCell>
          <Table.TextHeaderCell>Queue URL</Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Target Latency (in milliseconds)
          </Table.TextHeaderCell>
          <Table.HeaderCell justifyContent="flex-end">Actions</Table.HeaderCell>
        </Table.Head>
        <Table.Body maxHeight={384}>{renderTableBody()}</Table.Body>
      </Table>
    </section>
  );
};

export default AppsTable;
