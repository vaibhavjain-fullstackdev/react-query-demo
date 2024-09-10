import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo, useUpdateTodo } from "../services/mutations";
import { useTodo, useTodosIds } from "../services/queries";
import { ToDo } from "../types/todo";
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

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const { register, handleSubmit } = useForm<ToDo>();

  const handleCreateTodoSubmit: SubmitHandler<ToDo> = (todo) => {
    createTodoMutation.mutate(todo);
  };

  const handleMarkAsDoneSubmit = (todo: ToDo | undefined) => {
    if (todo) {
      updateTodoMutation.mutate({ ...todo, checked: true });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <input {...register("title")} type="text" placeholder="Title" />
        <input
          {...register("description")}
          type="text"
          placeholder="Description"
        />
        <button type="submit" disabled={createTodoMutation.isPending}>
          {" "}
          {createTodoMutation.isPending ? "Creating" : "Create Todo"}{" "}
        </button>
      </form>
      <br />
      {/* <p> Query Function : { todosIdsQuery.fetchStatus } </p>
    <p> Query Status : { todosIdsQuery.status }</p>
    <p> Global isFetching : { isFetching } </p> */}
      {/* {todosIdsQuery.data?.map((id) => (
        <div key={id}> id : {id} </div>
      ))} */}

      <ul>
        {todoQueries.map(({ data }) => (
          <li key={data?.id}>
            <div> ID : {data?.id} </div>
            <span>
              <strong> Title: </strong> {data?.title},{" "}
              <strong> Description: </strong> {data?.description}
            </span>{" "}
            &nbsp;
            <button
              onClick={() => handleMarkAsDoneSubmit(data)}
              disabled={data?.checked}
            >
              {" "}
              Mark Done{" "}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ToDos;
