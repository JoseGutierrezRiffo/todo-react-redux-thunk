import endpoint from "../services";
import {
  createTodo,
  deleteTodo,
  setError,
  setFetched,
  setFetching,
  setTodos,
  updateTodo,
} from "../reducers/todoReducers";

export const createTodoAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: setFetching,
    });
    //
    const data = await endpoint.postData(payload);
    dispatch({
      type: createTodo,
      payload: {
        ...data,
      },
    });
  } catch (err) {
    //
    dispatch({
      type: setError,
      payload: "Ha ocurrido un problema",
    });
  } finally {
    //
    dispatch({
      type: setFetched,
    });
  }
};

export const listTodoAction = () => async (dispatch) => {
  try {
    dispatch({
      type: setFetching,
    });
    //
    const data = await endpoint.getData();
    dispatch({ type: setTodos, payload: data });
  } catch (err) {
    //
    dispatch({
      type: setError,
      payload: "Ha ocurrido un problema",
    });
  } finally {
    //
    dispatch({
      type: setFetched,
    });
  }
};

export const updateTodoAction = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: setFetching,
    });
    //
    const data = await endpoint.editData(payload.id, payload);
    dispatch({ type: updateTodo, payload: data });
  } catch (err) {
    //
    dispatch({
      type: setError,
      payload: "Ha ocurrido un problema",
    });
  } finally {
    //
    dispatch({
      type: setFetched,
    });
  }
};

export const deleteTodoAction = (id) => async (dispatch) => {
  try {
    dispatch({
      type: setFetching,
    });
    //
    const data = await endpoint.deleteData(id);
    dispatch({ type: deleteTodo, payload: data });
  } catch (err) {
    //
    dispatch({
      type: setError,
      payload: "Ha ocurrido un problema",
    });
  } finally {
    //
    dispatch({
      type: setFetched,
    });
  }
};
