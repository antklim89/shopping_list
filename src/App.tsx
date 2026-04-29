import { useEffect } from 'react';

import { ActionsPanel } from '@/components/actions/actions-panel';
import { Header } from '@/components/layout/header';
import { List } from '@/components/list/list';
import { listLoad } from '@/lib/store';
import { loadListFromUrl } from '@/lib/utils';
import { ListPanel } from './components/list/list-panel';

function App() {
  const list = loadListFromUrl();

  useEffect(() => {
    if (list != null) listLoad(list.id, list.list);
  }, [list]);

  return (
    <>
      <Header />
      <main className="container flex flex-col gap-2">
        <div className="flex flex-col gap-2 rounded-default border border-primary-border p-2 shadow shadow-black">
          <ActionsPanel />
          <ListPanel />
        </div>
        <List />
      </main>
    </>
  );
}

export default App;
