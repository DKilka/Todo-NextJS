import { TodoStatuses } from "@/enums/statuses";
import { NativeSelect } from "@mui/material";

interface SelectStatusProps {
  status: TodoStatuses;
  style?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectStatus = ({ status, style, onChange }: SelectStatusProps) => {
  return (
    <NativeSelect
      className={`ml-2 h-6 ${style}`}
      value={status}
      onChange={onChange}
    >
      <option value={TodoStatuses.TODO}>{TodoStatuses.TODO}</option>
      <option value={TodoStatuses.IN_PROGRESS}>
        {TodoStatuses.IN_PROGRESS}
      </option>
      <option value={TodoStatuses.DONE}>{TodoStatuses.DONE}</option>
    </NativeSelect>
  );
};

export default SelectStatus;
