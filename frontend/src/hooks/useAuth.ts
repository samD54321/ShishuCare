import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { useDispatch } from 'react-redux';
import { LocalStorageItem } from '@auth/auth';
import { loginDoctor, loginCHW, reset } from '@features/shishuCare';

export const useAuth = () => {
  const dispatch = useDispatch();

  const user = LocalStorageItem.getItem().role || '';
  if (user) {
    if (user === 'Doctor') {
      dispatch(loginDoctor());
    } else {
      dispatch(loginCHW());
    }
  } else {
    dispatch(reset());
  }
  let authenticated: boolean;
  let isDoctorLogin: boolean=user==="Doctor"
  let isCHWLogin: boolean = user === 'CHW' 
  let isLoading: boolean = true;
  // const { isDoctorLogin, isCHWLogin } = useSelector((state: RootState) => state.shishuCare);
  if (!isDoctorLogin && !isCHWLogin) {
    authenticated = false;
    isLoading = false;
  } else {
    authenticated = true;
    isLoading = false;
  }
  return { isDoctorLogin, isCHWLogin, authenticated, isLoading };
};
