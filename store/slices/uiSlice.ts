import { DialogState } from "@/types/ui/uiNotification";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DialogState = {
  isOpen: false,
  title: "",
  message: "",
  type: "info",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<Omit<DialogState, "isOpen">>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    closeDialog: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = uiSlice.actions;
export default uiSlice.reducer;
