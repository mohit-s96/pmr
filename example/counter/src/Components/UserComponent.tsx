/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { fetchOnLoad } from '../pmr/actions';
import AddUser from './AddUser';
import Users from './Users';
import { ConnectHoc } from 'pmrjs';
import { useStore } from '../pmr/store';
import { StoreState } from '../pmr/interfaces';

const UserComponent = () => {
  const [count] = useStore(UserComponent);
  React.useEffect(() => {
    fetchOnLoad();
  }, []);
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          maxWidth: '1080px',
          margin: '0 auto',
          flexWrap: 'wrap',
        }}
      >
        {count && (count as any).loading ? (
          'Loading'
        ) : count && (count as any).users && (count as any).users.length ? (
          <Users data={(count as any).users} />
        ) : (
          'no data'
        )}
      </div>
      <AddUser />
    </div>
  );
};

const mapState = (state: StoreState) => ({
  users: state.users,
  loading: state.loading,
});

export default ConnectHoc(UserComponent, mapState as any);
