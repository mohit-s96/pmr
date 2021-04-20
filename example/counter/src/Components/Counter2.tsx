import { ConnectHoc } from 'pmrjs';
import { useStore } from '../pmr/store';
import { subOne } from '../pmr/actions';
import { StoreState } from '../pmr/interfaces';
const Counter2 = () => {
  const [count] = useStore(Counter2);
  return (
    <div style={{ textAlign: 'center', margin: '1rem' }}>
      <span id="count">{count && (count as any).two}</span>
      <br />
      <button id="btn" onClick={subOne}>
        Decrease
      </button>
    </div>
  );
};

const mapState = (state: StoreState) => ({
  two: state.two,
});

export default ConnectHoc(Counter2, mapState as any);
