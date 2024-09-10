import { useQueries, useQuery } from "@tanstack/react-query";
import { getToDo, getToDosIds } from "./api";

export const useTodosIds = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getToDosIds,
    refetchOnWindowFocus: false,
  });
};

export const useTodo = (ids: (number | undefined)[] | undefined) => {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["todo", id],
        queryFn: () => getToDo(id!),
      };
    }),
  });
};
