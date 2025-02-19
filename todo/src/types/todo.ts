import { TodoStatuses } from "@/enums/statuses";

export type Todo = {
  id: string;
  title: string;
  status: TodoStatuses;
};
