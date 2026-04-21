import { CopyLink } from './copy-link';
import { ListItemCreate } from './list-item-create';
import { LoadFromFile } from './load-from-file';
import { SaveToFile } from './save-to-file';
import { SelectAll } from './select-all';
import { ShareList } from './share-list';

export function ActionsPanel() {
  return (
    <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
      <ListItemCreate />
      <SelectAll />
      <SaveToFile />
      <LoadFromFile />
      <ShareList />
      <CopyLink />
    </div>
  );
}
