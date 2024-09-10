import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToDo } from "../types/todo";
import { createToDO, updateToDo } from "./api";

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: ToDo) => createToDO(todo),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");

      if (error) {
        console.log("error", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: ToDo) => updateToDo(todo),

    onError: () => {
      console.log("error");
    },

    onSettled: async (_, error, variables) => {
      if (error) {
        console.log("error", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id } ],
        });
      }
    },
  });
};
