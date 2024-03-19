import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import './styles/app.scss';
import { useContext } from 'react';
import context from './context';

function App() {
  const { modeObj } = useContext(context);
  const { mode } = modeObj;

  return (
    <div className={ `App ${mode}` }>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
