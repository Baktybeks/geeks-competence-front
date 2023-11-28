import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../hook/redux";
import classes from "./AdminPage.module.scss";
import { getAdmins, getUsers, registerApi } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { IAdminForm, ILevelForm, TChangeEvent } from "../../models/models";
import {
  getLevels, getQuestions, getSubtitles, getTopics, levelApi, topicApi
} from "../../redux/slices/competenceSlice";

const textRegExp = /^.{2,500}$/
const passwordRegExp = /^.{5,40}$/
const userRegExp = /^.{3,50}$/

function AddingCourses() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    admins,
    users,
  } = useAppSelector(state => state.userReducer)
  const adminFormInitialState:IAdminForm = {
    name: '',
    email: '',
    password: '',
    role: '',
  };
  const levelFormInitialState:ILevelForm = {
    title: '',
    background: '',
    color: ''
  };
  const topicFormInitialState:{ topic:string } = {
    topic: '',
  };

  const [ adminForm, setAdminForm ] = useState(adminFormInitialState);
  const [ levelForm, setLevelForm ] = useState(levelFormInitialState);
  const [ topicForm, setTopicForm ] = useState(topicFormInitialState);

  const { name, email, password, role } = adminForm
  const { title } = levelForm
  const { topic } = topicForm
  const handleSelectChangeRole = (event:TChangeEvent) => {
    setAdminForm({ ...adminForm, role: event.target.value, });
  };
  const submitRegHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    const fromPage = "admin"
    if (!userRegExp.test(name)) {
      return alert("Ваш Username должен содержать не менее 3 символов")
    }
    if (!userRegExp.test(email)) {
      return alert("Ваш Nickname должен содержать не менее 3 символов")
    }
    if (!passwordRegExp.test(password)) {
      return alert("Ваш пароль должен содержать не менее 5 символов")
    }
    if (!role) {
      return alert("Выберите роль")
    }
    dispatch(registerApi(name, email, password, role, navigate, fromPage))
  }

  function getContrastColor(backgroundColor:string) {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  const submitLevelHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    const background = '#' + ('000000' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(-6)
    const color = getContrastColor(background)
    if (!textRegExp.test(title)) {
      return alert("Ваша тема должна содержать не менее 2 символов")
    }
    dispatch(levelApi(title, background, color))
    setLevelForm(levelFormInitialState)
  }

  const submitTopicHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    if (!textRegExp.test(topic)) {
      return alert("Ваш Username должен содержать не менее 2 символов")
    }
    dispatch(topicApi(topic))
    setTopicForm(topicFormInitialState)
  }
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getAdmins())
    dispatch(getLevels())
    dispatch(getTopics())
    dispatch(getSubtitles())
    dispatch(getQuestions())
  }, [ dispatch ])


  return (
    <div className='container'>
      <div className={ classes.headTitle }>
        <p>Пользователи</p>
      </div>
      <div className={ classes.usersBlock }>
        <div className={ classes.content }>
          <div className={ classes.title }>
            <p className={ classes.p }>Регистрация</p>
          </div>
          <form
            className={ classes.form }
            onSubmit={ submitRegHandler }
          >
            <input
              className={ classes.text }
              type="text"
              name="name"
              placeholder="Name"
              value={ name }
              onChange={ e =>
                setAdminForm({ ...adminForm, name: e.target.value }) }
            />
            <input
              className={ classes.text }
              type="email"
              name="email"
              placeholder="Email"
              value={ email }
              onChange={ e =>
                setAdminForm({ ...adminForm, email: e.target.value }) }
            />
            <input
              className={ classes.text }
              type="password"
              name="password"
              placeholder="Password"
              value={ password }
              onChange={ e =>
                setAdminForm({ ...adminForm, password: e.target.value }) }
            />
            <select
              className={ classes.selectRole }
              value={ role }
              onChange={ handleSelectChangeRole }>
              <option value="">Выберите роль</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">user</option>
            </select>
            <button className={ classes.btn }
                    type="submit">Зарегистрироваться
            </button>
          </form>
        </div>
        <div className={ classes.usersList }>
          <div className={ classes.title }>
            <p className={ classes.p }>Зарегистрированные пользователи</p>
          </div>
          <div className={ classes.usersListsContainer }>
            <div className={ classes.adminL }>
              <div className={ classes.title }>
                <p className={ classes.p }>Админы</p>
              </div>
              <ul>
                {
                  admins.map((a, key) =>
                    <li key={ key }>{ a.name }</li>
                  )
                }
              </ul>
            </div>
            <div className={ classes.adminL }>
              <div className={ classes.title }>
                <p className={ classes.p }>Users</p>
              </div>
              <ul>
                {
                  users.map((u, key) =>
                    <li key={ key }>{ u.name }</li>
                  )
                }
              </ul>
            </div>
          </div>

        </div>
      </div>
      <div className={ classes.headTitle }>
        <p>Добавить уровень</p>
      </div>
      <div className={ classes.competenceBlock }>
        <div className={ classes.competenceBlock_level }>
          <div className={ classes.title }>
            <p className={ classes.p }>Добавить уровень</p>
          </div>
          <form
            className={ classes.form }
            onSubmit={ submitLevelHandler }
          >
            <input
              className={ classes.text }
              type="text"
              name="title"
              placeholder="Title"
              value={ title }
              onChange={ e =>
                setLevelForm({ ...levelForm, title: e.target.value }) }
            />
            <button className={ classes.btn }
                    type="submit">Добавить
            </button>
          </form>
        </div>
        <div className={ classes.competenceBlock_topic }>
          <div className={ classes.title }>
            <p className={ classes.p }>Добавить тему</p>
          </div>
          <form
            className={ classes.form }
            onSubmit={ submitTopicHandler }
          >
            <input
              className={ classes.text }
              type="text"
              name="topic"
              placeholder="Topic"
              value={ topic }
              onChange={ e =>
                setTopicForm({ ...levelForm, topic: e.target.value }) }
            />
            <button className={ classes.btn }
                    type="submit">Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddingCourses