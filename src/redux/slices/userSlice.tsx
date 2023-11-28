import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { $api } from "../../common/axios";
import { setError } from "./errorSlice";
import { setUserAnsweredQuestion } from "./competenceSlice";
import { AxiosError } from "axios";
import { links } from "../../links/links";
import { NavigateFunction } from "react-router-dom";
import { IUser } from "../../models/models";

export interface UserIdState {
  users:IUser[]
  admins:IUser[]
  isAuth:boolean;
}

const initialState:UserIdState = {
  users: [],
  admins: [],
  isAuth: false
};

export const registerApi = (name:string, email:string, password:string, role:string, navigate:NavigateFunction, fromPage:string) => {
  return async(dispatch:AppDispatch) => {
    try {
      const response = await $api.post('/user/registration', { name, email, password, role })
      console.log('response', response)
      if (response.status === 200) {
        await dispatch(getUsers())
        await dispatch(getAdmins())
        alert('Вы успешно зарегистрированы')
        fromPage === "signup" ? navigate(links.base) : navigate(links.admin)
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const errorMessage = error.response.data.message;
        dispatch(setError(errorMessage));
        alert(errorMessage);
      } else {
        console.error(error);
      }
    }
  }
}
export const loginApi = (email:string, password:string) => {
  return async(dispatch:AppDispatch) => {
    try {
      const response = await $api.post('/user/login/', { email, password })
      console.log('response', response);
      if (response.status === 200) {
        alert('Вы успешно авторизованы')
        localStorage.setItem('ACCESS_TOKEN', response.data.token)
        localStorage.setItem('id', response.data.userData._id)
        localStorage.setItem('name', response.data.userData.name)
        localStorage.setItem('role', response.data.userData.role)
        dispatch(setIsAuth(true))
        dispatch(setUserAnsweredQuestion([]))
      }
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError(e.message));
        console.log(e)
        alert(e.message)
      } else {
        dispatch(setError('An unknown error occurred.'));

      }
    }
  }
}

export const getUsers = () => {
  return async(dispatch:AppDispatch) => {
    try {
      const { data } = await $api.get(`/user`)
      dispatch(setUsers(data))
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError(e.message));
      } else {
        dispatch(setError('An unknown error occurred.'));
      }
    }
  }
}

export const getAdmins = () => {
  return async(dispatch:AppDispatch) => {
    try {
      const { data } = await $api.get(`/user/admin/ADMIN`)
      dispatch(setAdmins(data))
    } catch (e) {
      if (e instanceof Error) {
        dispatch(setError(e.message));
      } else {
        dispatch(setError('An unknown error occurred.'));
      }
    }
  }
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUsers: (state, action:PayloadAction<IUser[]>) => {
      state.users = action.payload
    },
    setAdmins: (state, action:PayloadAction<IUser[]>) => {
      state.admins = action.payload
    }
  }
})

export const { setIsAuth, setUsers, setAdmins } = userSlice.actions

export default userSlice.reducer