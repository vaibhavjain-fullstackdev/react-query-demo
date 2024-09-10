import { useTodo, useTodosIds } from "../services/queries";
// import { useIsFetching } from "@tanstack/react-query";

const ToDos = () => {
  const todosIdsQuery = useTodosIds();
  const todoQueries = useTodo(todosIdsQuery.data);
  //   const isFetching = useIsFetching();

  //   if(todosIdsQuery.isPending) {
  //     return <span> Loading... </span>
  //   }

  //   if(todosIdsQuery.isError) {
  //     return <span> Error! </span>
  //   }

  return (
    <>
      {/* <p> Query Function : { todosIdsQuery.fetchStatus } </p>
    <p> Query Status : { todosIdsQuery.status }</p>
    <p> Global isFetching : { isFetching } </p> */}
      {/* {todosIdsQuery.data?.map((id) => (
        <div key={id}> id : {id} </div>
      ))} */}

      <ul>
        {todoQueries.map(({ data }) => (
          <li key={data?.id}>
            <div> ID : { data?.id } </div>
            <span>
                <strong> Title: </strong> { data?.title }, { " " }
                <strong> Description: </strong> {data?.description} 
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDos;
