import { ActionType } from "../action-types";
import { Action } from "../actions";
import produce from "immer";
import { Cell } from "../cell";

export interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;
      case ActionType.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((id) => id !== action.payload);
        return state;
      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          content: "",
          id: randomId(),
          type: action.payload.type,
        };

        state.data[cell.id] = cell;
        const index = state.order.findIndex((id) => id === action.payload.id);

        if (index < 0) {
          state.order.unshift(cell.id);
          return state;
        } else {
          state.order.splice(index + 1, 0, cell.id);
          return state;
        }

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const idx = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === "up" ? idx - 1 : idx + 1;
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[idx] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;
        return state;
      default:
        return state;
    }
  }
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
