import { useEffect } from 'react';
import './index.css';
import { ActionsPanel } from '@/components/actions/actions-panel';
import { Header } from '@/components/layout/header';
import { List } from '@/components/list/list';
import { useStore } from '@/lib/store';
import { loadListFromUrl } from '@/lib/utils';


function App() {
  const listLoad = useStore(state => state.listLoad);
  const listSetCurrentId = useStore(state => state.listSetCurrentId);

  useEffect(() => {
    const list = loadListFromUrl();
    if (list == null) return;

    listLoad(list.id, list.list);
    listSetCurrentId(list.id);
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
