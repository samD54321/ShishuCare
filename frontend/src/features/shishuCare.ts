import { createSlice } from '@reduxjs/toolkit';
import { LocalStorageItem } from '@auth/auth';
import { ILocalStorageItem } from '@interfaces/index';

const User = LocalStorageItem.getItem();

interface IShishuCare {
  isDoctorLogin: boolean;
  isCHWLogin: boolean;
  user: ILocalStorageItem | {};
}

const initialState: IShishuCare = {
  isDoctorLogin: false,
  isCHWLogin: false,
  user: User ? User : {},
};

const shishuCareSlice = createSlice({
  name: 'shishu_Care',
  initialState,
  reducers: {
    logout: (state) => {
      state.isDoctorLogin = false;
      state.isCHWLogin = false;
    },
    loginDoctor: (state) => {
      state.isDoctorLogin = true;
      state.isCHWLogin = false;
    },
    loginCHW: (state) => {
      state.isCHWLogin = true;
      state.isDoctorLogin = false;
    },
    reset: (state) => {
      state.isCHWLogin = false;
      state.isDoctorLogin = false;
    },
  },
});

export const { logout, loginDoctor, loginCHW, reset } = shishuCareSlice.actions;
export default shishuCareSlice.reducer;
