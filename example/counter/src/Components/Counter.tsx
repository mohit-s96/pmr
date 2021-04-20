import { ConnectHoc } from 'pmrjs';
import { useStore } from '../pmr/store';
import { addOne } from '../pmr/actions';
import { StoreState } from '../pmr/interfaces';
const Counter: React.FunctionComponent = () => {
  const [count] = useStore(Counter);
  return (
    <div style={{ textAlign: 'center', margin: '1rem' }}>
      <span id="count">{count?.one}</span>
      <br />
      <button id="btn" onClick={addOne}>
        Increase
      </button>
    </div>
  );
};

const mapState = (state: StoreState) => ({
  one: state.one,
});

export default ConnectHoc(Counter, mapState as any);
