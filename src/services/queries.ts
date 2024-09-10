import { useQuery } from "@tanstack/react-query"
import { getToDosIds } from "./api"

export const useTodosIds = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getToDosIds,
        refetchOnWindowFocus: false,
    })
}