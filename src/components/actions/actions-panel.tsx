import { ListItemCreate } from './list-item-create';
import { LoadFromFile } from './load-from-file';
import { SaveToFile } from './save-to-file';
import { SelectAll } from './select-all';
import { ShareList } from './share-list';


export function ActionsPanel() {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      <ListItemCreate />
      <SelectAll />
      <SaveToFile />
      <LoadFromFile />
      <ShareList />
    </div>
  );
}
