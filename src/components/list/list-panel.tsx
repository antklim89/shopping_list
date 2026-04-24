import { ListDialog } from './list-dialog';
import { ListInput } from './list-input';

export function ListPanel() {
  return (
    <div className="flex gap-4">
      <ListInput />
      <ListDialog />
    </div>
  );
}
