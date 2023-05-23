import { useSelector } from 'react-redux'
import { RootState } from '@store/index'

export const useAuth = () => {
    let authenticated:boolean 
    const {isDoctorLogin,isCHWLogin}= useSelector((state:RootState)=>state.shishuCare)
    if (isDoctorLogin && isCHWLogin) {
        authenticated = false
    }
    else{
        authenticated = true
    }
  return { isDoctorLogin, isCHWLogin, authenticated };
}
