import './index.css';
import { ActionsPanel } from './components/actions-panel';
import { Header } from './components/header';
import { List } from './components/list';


function App() {
  return (
    <>
      <Header />
      <main className="container">
        <ActionsPanel />
        <List />
      </main>
    </>
  );
}

export default App;
