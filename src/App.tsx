import { useEffect } from 'react';

import { ActionsPanel } from '@/components/actions/actions-panel';
import { Header } from '@/components/layout/header';
import { List } from '@/components/list/list';
import { useStore } from '@/lib/store';
import { loadListFromUrl } from '@/lib/utils';

function App() {
  const listLoad = useStore(state => state.listLoad);
  const list = loadListFromUrl();

  useEffect(() => {
    if (list != null) listLoad(list.id, list.list);
  }, [list, listLoad]);

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
