import { createSlice } from '@reduxjs/toolkit';
import i18n from 'src/i18n';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    currentLanguage: 'en',
  },
  reducers: {
    switchLanguage: (state, action) => {
      state.currentLanguage = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { switchLanguage } = languageSlice.actions;

export default languageSlice.reducer;