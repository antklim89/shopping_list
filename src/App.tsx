import { useEffect } from 'react';
import { domAnimation, LazyMotion } from 'motion/react';

import { ActionsPanel } from '@/components/actions/actions-panel';
import { Header } from '@/components/layout/header';
import { List } from '@/components/list/list';
import { listLoad } from '@/lib/store';
import { loadListFromUrl } from '@/lib/utils';
import { ListPanel } from './components/list/list-panel';

function App() {
  useEffect(() => {
    const list = loadListFromUrl();
    if (list != null) listLoad(list.id, list.list);
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <Header />
      <main className="container flex flex-col gap-2">
        <div className="flex flex-col gap-2 rounded-default border border-border bg-secondary p-2 shadow">
          <ActionsPanel />
          <ListPanel />
        </div>
        <List />
      </main>
    </LazyMotion>
  );
}

export default App;
