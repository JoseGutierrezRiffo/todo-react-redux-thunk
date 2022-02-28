const initialstate = {
  todos: [],
  isLoading: false,
  error: null,
};

const entity = "TODOS";
export const setFetching = `${entity}/SET_FETCHING`;
export const setFetched = `${entity}/SET_FETCHED`;
export const setError = `${entity}/SET_ERROR`;

export const setTodos = `${entity}/SET_TODOS`;
export const createTodo = `${entity}/CREATE_TODO`;
export const updateTodo = `${entity}/UPDATE_TODO`;
export const deleteTodo = `${entity}/DELETE_TODO`;

export const addTodoActionCreator = (data) => ({
  type: createTodo,
  payload: data,
});

const updateTodos = (todos, editedTodo) =>
  todos.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo));

const todoReducers = (state = initialstate, action) => {
  switch (action.type) {
    case setFetching:
      return {
        ...state,
        isLoading: true,
      };
    case setFetched:
      return {
        ...state,
        isLoading: false,
      };
    case setError:
      return {
        ...state,
        error: action.payload,
      };

    case setTodos:
      return {
        ...state,
        todos: action.payload,
      };

    case createTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case updateTodo:
      return {
        ...state,
        todos: updateTodos(state.todos, action.payload),
      };

    case deleteTodo:
      return {
        ...state,
        todos: state.todos.filter((todo) => {
          return todo.id !== action.payload.id;
        }),
      };
    default:
      return state;
  }
};

export default todoReducers;
