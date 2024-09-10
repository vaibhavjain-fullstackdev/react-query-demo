import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToDo } from "../types/todo";
import { createToDO } from "./api";

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation(
        {
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

                if(error) {
                    console.log("error", error);
                } else {
                    await queryClient.invalidateQueries({ queryKey: ["todos"]});
                }
            }
        }
    );
}