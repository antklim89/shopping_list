import { CopyLink } from './copy-link';
import { CreateListItem } from './create-list-item';
import { LoadFromFile } from './load-from-file';
import { SaveToFile } from './save-to-file';
import { SelectAll } from './select-all';
import { ShareList } from './share-list';

export function ActionsPanel() {
  return (
    <div className="grid grid-cols-3 gap-1 lg:grid-cols-6">
      <CreateListItem />
      <SelectAll />
      <SaveToFile />
      <LoadFromFile />
      <ShareList />
      <CopyLink />
    </div>
  );
}
