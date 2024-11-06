import { ListCreate } from './list-create';
import { LoadFromFile } from './load-from-file';
import { RemoveList } from './remove-list';
import { SaveToFile } from './save-to-file';
import { SelectAll } from './select-all';
import { ShareList } from './share-list';


export function ActionsPanel() {
  return (
    <div className="flex justify-end gap-2">
      <ListCreate />
      <SelectAll />
      <SaveToFile />
      <LoadFromFile />
      <ShareList />
      <RemoveList />
    </div>
  );
}
