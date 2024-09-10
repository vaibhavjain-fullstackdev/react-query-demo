import { useTodosIds } from "../services/queries";
import { useIsFetching } from "@tanstack/react-query";

const ToDos = () => {
  const todosIdsQuery = useTodosIds();
  const isFetching = useIsFetching();

//   if(todosIdsQuery.isPending) {
//     return <span> Loading... </span>
//   }

//   if(todosIdsQuery.isError) {
//     return <span> Error! </span>
//   }

  return <div>
    <p> Query Function : { todosIdsQuery.fetchStatus } </p>
    <p> Query Status : { todosIdsQuery.status }</p>
    <p> Global isFetching : { isFetching } </p>
    {todosIdsQuery.data?.map((id) => (
      <div key={id}> {id} </div>
    ))}
  </div>;
};

export default ToDos;
