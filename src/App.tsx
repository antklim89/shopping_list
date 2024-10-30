import { useEffect } from 'react';
import './index.css';
import { ActionsPanel } from '@/components/actions/actions-panel';
import { List } from '@/components/feature/list';
import { Header } from '@/components/layout/header';
import { useStore } from '@/lib/store';
import { loadListFromUrl } from '@/lib/utils';


function App() {
  const listLoad = useStore(state => state.listLoad);
  const list = loadListFromUrl();

  useEffect(() => {
    if (list != null) listLoad(list.id, list.list);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
