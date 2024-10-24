import { ListCreate } from './list-create';
import { SelectAll } from './select-all';


export function ActionsPanel() {
  return (
    <div className="bg-white flex justify-end border p-1 border-slate-400 shadow-lg">
      <ListCreate />
      <SelectAll />
    </div>
  );
}
