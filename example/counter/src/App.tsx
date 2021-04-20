// import image from "./test.png";
import Counter from './Components/Counter';
import Counter2 from './Components/Counter2';
import UserComponent from './Components/UserComponent';
// import TestComp from "./Components/TestComp";

const App = () => {
  // const num = 5;
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Counter and more demos for PMR </h2>
      <Counter />
      <Counter2 />
      <UserComponent />
    </>
  );
};

export default App;
