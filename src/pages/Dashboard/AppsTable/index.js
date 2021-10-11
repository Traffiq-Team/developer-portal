import React, { useState, useMemo, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Table,
  IconButton,
  EditIcon,
  TrashIcon,
  EmptyState,
  CleanIcon,
  SearchIcon,
  Dialog,
  Spinner,
  Tooltip,
  Position,
} from 'evergreen-ui';
import Fuse from 'fuse.js';
import getAllAppConfigurations from '../../../api/getAllAppConfigurations';
import deleteAppConfiguration from '../../../api/deleteAppConfiguration';
import styles from './styles.module.css';

const fuseOptions = {
  keys: ['appName'],
};

const AppsTable = () => {
  const [apps, setApps] = useState([]);
  const [focusedAppName, setFocusedAppName] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const fuse = new Fuse(apps, fuseOptions);

  const populateAppConfigurations = async () => {
    setIsLoading(true);

    try {
      const apps = await getAllAppConfigurations();
      setApps(apps);
    } catch (error) {
      console.error('error from populateAppConfigurations', error);
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

  const handleDeleteClick = async () => {
    setIsDeleting(true);

    try {
      await deleteAppConfiguration(focusedAppName);
      setFocusedAppName('');
    } catch (error) {
      console.error('error from handleDeleteClick', error);
    } finally {
      setIsDeleting(false);

      // Fetch the app configurations again after making changes
      populateAppConfigurations();
    }
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
    return filteredApps.map(({ appName, config }) => (
      <Table.Row key={appName}>
        <Table.TextCell>{appName}</Table.TextCell>
        <Table.TextCell>{config?.url}</Table.TextCell>
        <Table.TextCell isNumber>{config?.targetLatency}</Table.TextCell>
        <Table.Cell justifyContent="flex-end">
          <span className={styles.actions}>
            <Tooltip position={Position.TOP} showDelay={500} content="Edit app">
              <IconButton
                icon={EditIcon}
                onClick={() => handleEditClick(appName)}
                appearance="minimal"
              />
            </Tooltip>
            <Tooltip
              position={Position.TOP}
              showDelay={500}
              content="Delete app"
            >
              <IconButton
                icon={TrashIcon}
                onClick={() => setFocusedAppName(appName)}
                appearance="minimal"
                intent="danger"
              />
            </Tooltip>
          </span>
        </Table.Cell>
      </Table.Row>
    ));
  };

  return (
    <Fragment>
      <Table>
        <Table.Head>
          <Table.SearchHeaderCell
            placeholder="Search for App name"
            onChange={(value) => setSearchValue(value)}
          />
          <Table.TextHeaderCell>URL</Table.TextHeaderCell>
          <Table.TextHeaderCell>
            Target Latency (in milliseconds)
          </Table.TextHeaderCell>
          <Table.HeaderCell justifyContent="flex-end">Actions</Table.HeaderCell>
        </Table.Head>
        <Table.Body maxHeight={384}>{renderTableBody()}</Table.Body>
      </Table>
      <Dialog
        isShown={!!focusedAppName}
        intent="danger"
        confirmLabel="Delete"
        title="Delete app"
        onConfirm={handleDeleteClick}
        onCloseComplete={() => setFocusedAppName('')}
        isConfirmLoading={isDeleting}
        preventBodyScrolling
      >
        Are you sure you want to delete <strong>{focusedAppName}</strong>?
      </Dialog>
    </Fragment>
  );
};

export default AppsTable;
