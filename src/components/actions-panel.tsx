import { ListCreate } from './list-create';
import { LoadFromFile } from './load-from-file';
import { RemoveList } from './remove-list';
import { SaveToFile } from './save-to-file';
import { SelectAll } from './select-all';
import { ShareList } from './share-list';


export function ActionsPanel() {
  return (
    <div className="bg-white flex justify-end border p-1 border-slate-400 shadow-lg">
      <ListCreate />
      <SelectAll />
      <SaveToFile />
      <LoadFromFile />
      <ShareList />
      <RemoveList />
    </div>
  );
}
