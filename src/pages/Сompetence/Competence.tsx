import React, { useEffect, useState } from 'react'
import classes from "./Competence.module.sass"
import { useAppDispatch, useAppSelector } from "../../hook/redux"
import deleteIcon from '../../assets/img/delete.png'
import addIcon from "../../assets/img/add.png"
import addSubtitleIcon from "../../assets/img/addSubtitle.png"
import editIcon from "../../assets/img/edit.png"
import { IQuestionForm, ISubtitleForm, TChangeEvent } from "../../models/models";
import Modal from "../../components/ui/modal/Modal";
import ModalUpdate from "../../components/ui/modalUpdate/ModalUpdate";
import {
  deleteLevel,
  deleteQuestion,
  deleteSubtitle,
  deleteTopic,
  getLevels,
  getQuestions,
  getSubtitles,
  getTopics,
  getUserAnsweredQuestion,
  putUserAnsweredQuestion,
  questionApi,
  subtitleApi,
  updateQuestion,
  updateSubtitle,
  updateTopic
} from "../../redux/slices/competenceSlice"
import { getUsers } from "../../redux/slices/userSlice";

const textRegExp = /^.{2,500}$/
const Competence = () => {
  const dispatch = useAppDispatch()
  const {
    levels,
    topics,
    subtitles,
    questions,
    userAnsweredQuestion,
  } = useAppSelector(state => state.competenceReducer)
  const { users } = useAppSelector(state => state.userReducer)
  const userId = localStorage.getItem('id') || ''
  const userName = localStorage.getItem('name') || ''
  const role = localStorage.getItem('role') || ''
  const questionModalInitialState:IQuestionForm = {
    question: '',
    questionTopicId: '',
    questionLevelId: '',
    questionSubtitleId: '',
  };
  const subtitleModalInitialState:ISubtitleForm = {
    subtitle: '',
    subtitleTopicId: '',
    subtitleLevelId: '',
  };
  const [ questionModal, setQuestionModal ] = useState(questionModalInitialState);
  const [ subtitleModal, setSubtitleModal ] = useState(subtitleModalInitialState);
  const [ selectedUser, setSelectedUser ] = useState('')
  const [ subtitleOrQuestion, setSubtitleOrQuestion ] = useState(true)
  const { questionSubtitleId } = questionModal
  const { subtitleTopicId, subtitleLevelId } = subtitleModal

  const isAdmin:boolean = role === "ADMIN";

  const [ modalActive, setModalActive ] = useState(false)
  const [ modalActiveUpdate, setModalActiveUpdate ] = useState(false)

  const [ modalInput, setModalInput ] = useState('')
  const [ modalUpdateInput, setModalUpdateInput ] = useState('')

  const changeHandler = (event:TChangeEvent) => {
    setSelectedUser(event.target.value)
    dispatch(getUserAnsweredQuestion(event.target.value))
  }
  const handleDelete = (id:string, title:string, type:string) => {
    switch (type) {
      case 'question':
        dispatch(deleteQuestion(id, title));
        dispatch(getSubtitles());
        break;
      case 'subtitle':
        dispatch(deleteSubtitle(id, title));
        dispatch(getSubtitles());
        break;
      case 'level':
        dispatch(deleteLevel(id, title));
        dispatch(getLevels());
        break;
      case 'topic':
        dispatch(deleteTopic(id, title));
        dispatch(getTopics());
        break;
      default:
        alert('Укажите привильный тип')
        break;
    }
  };
  const handleUpdate = (id:string, title:string, type:string) => {
    switch (type) {
      case 'question':
        dispatch(updateQuestion(id, title));
        dispatch(getLevels());
        break;
      case 'subtitle':
        dispatch(updateSubtitle(id, title));
        dispatch(getSubtitles());
        break;
      case 'level':
        // dispatch(updateLevel(id, modalUpdateInput));
        dispatch(getLevels());
        break;
      case 'topic':
        dispatch(updateTopic(id, title));
        dispatch(getTopics());
        break;
      default:
        alert('Укажите привильный тип')
        break;
    }
  };
  const submitLevelUpdateHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    if (!textRegExp.test(modalUpdateInput)) {
      return alert("Ваша подтема должна содержать не менее 2 символов")
    }
    dispatch(subtitleApi(
      modalUpdateInput,
      subtitleTopicId,
      subtitleLevelId,
    ))
    setModalUpdateInput('')
    setModalActiveUpdate(false)
  }
  const submitSubtitleHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    if (!textRegExp.test(modalInput)) {
      return alert("Ваша подтема должна содержать не менее 2 символов")
    }
    dispatch(subtitleApi(
      modalInput,
      subtitleTopicId,
      subtitleLevelId,
    ))
    setModalInput('')
    setModalActive(false)
  }
  const submitQuestionHandler = async(e:React.FormEvent) => {
    e.preventDefault()
    if (!textRegExp.test(modalInput)) {
      return alert("Ваша подтема должна содержать не менее 2 символов")
    }
    dispatch(questionApi(
      modalInput,
      questionSubtitleId
    ))
    setModalInput('')
    setModalActive(false)
  }
  const renderTableHeaders = () => {
    return levels.map((column, index) => {
      return (
        <th
          className={ `${ classes.confluenceTh } ${ classes.stickyHeader }` }
          style={ { background: column.background, color: column.color } }
          key={ index }
        >
          <div className={ classes.level_img }>
            { column.title }
            { isAdmin
              ?
              <img className={ classes.btnIcon_delete }
                   onClick={ () => handleDelete(column._id, column.title, 'level') }
                   src={ deleteIcon }
                   alt="delete"/>
              : ''
            }
          </div>
        </th>
      )
    })
  }

  const renderTableRows = () => {
    return topics.map((topic, rowIndex) => (
      <tr key={ rowIndex }>
        <th
          className={ `${ classes.confluenceTh } ${ classes.stickThLeft }` }
        >
          <div className={ classes.stickyMain }>
            <div className={ classes.stickyLeftHeader }>{ topic.topic }</div>
            { isAdmin ?
              <img className={ classes.btnIcon_delete }
                   onClick={ () => handleDelete(topic._id, topic.topic, 'topic') }
                   src={ deleteIcon }
                   alt="delete"/>
              : ''
            }
          </div>
        </th>
        { levels.map((level) => {
          const filteredSubtitles = subtitles.filter(
            (s) => s.topicId === topic._id && s.levelId === level._id
          );
          return (
            <td
              key={ level._id }
              className={ `${ classes.confluenceTh } ${ classes.td__Width }` }
            >
              { isAdmin ?
                <div className={ classes.addSubtitle }
                     onClick={ () => {
                       setSubtitleModal(
                         {
                           ...subtitleModal,
                           subtitleLevelId: level._id,
                           subtitleTopicId: topic._id,
                         })
                       setSubtitleOrQuestion(true)
                       setModalActive(true)
                     } }
                >
                  <img className={ classes.addSubtitle_img }
                       src={ addSubtitleIcon } alt="addSubtitleIcon"/>
                  <p className={ classes.addSubtitle_title }>Добавить подтему</p>
                </div>
                :
                ''
              }
              <div className={ classes.div__td }>
                { filteredSubtitles.map((subtitle) => {
                  const filteredQuestions = questions.filter((q) => q.subtitleId === subtitle._id);
                  return (
                    <div key={ subtitle._id }>
                      <div className={ classes.div__td_subtitle }>
                        <h5>{ subtitle.subtitle }</h5>
                        {
                          isAdmin ?
                            <>
                              <img className={ classes.btnIcon_add }
                                   onClick={ () => {
                                     setQuestionModal(
                                       {
                                         ...questionModal,
                                         questionSubtitleId: subtitle._id
                                       })
                                     setSubtitleOrQuestion(false)
                                     setModalActive(true)
                                   } }
                                   src={ addIcon }
                                   alt="delete"/>
                              <img className={ classes.btnIcon_delete }
                                   onClick={ () => handleDelete(subtitle._id, subtitle.subtitle, 'subtitle') }
                                   src={ deleteIcon }
                                   alt="delete"/>
                            </>
                            :
                            ''
                        }
                        { isAdmin ? (
                          <button className={ classes.btnAddQuestion }
                                  onClick={ () => {

                                  } }
                          >
                            <img src="" alt=""/>
                          </button>
                        ) : null }
                      </div>
                      <div className={ classes.div__label }>
                        { filteredQuestions.map((question) => {
                          const isCheck:boolean =
                            userAnsweredQuestion.some(
                              (a) =>
                                question._id === a.questionId && a.status === true
                            );
                          return (
                            <label key={ question._id } className={ classes.td_label }
                                   htmlFor={ `checkbox${ question._id }` }>
                              <input
                                className={ classes.checkbox }
                                type="checkbox"
                                id={ `checkbox${ question._id }` }
                                onChange={ () => {
                                  dispatch(putUserAnsweredQuestion(!isCheck, question._id, selectedUser))
                                } }
                                checked={ isCheck }
                                // disabled={!isAdmin}
                              />
                              <span className={ classes.td_label__span }>
                                                                <strong>
                                                                      <div
                                                                        className={ isCheck ? `${ classes.isChecked }` : '' }>
                                                                        { question.question }
                                                                      </div>
                                                                </strong>
                                                            </span>
                              {
                                isAdmin ?
                                  <img className={ classes.btnIcon_delete }
                                       onClick={ () => handleDelete(question._id, question.question, 'question') }
                                       src={ deleteIcon }
                                       alt="delete"/>
                                  :
                                  ''
                              }
                            </label>
                          );
                        }) }
                      </div>
                    </div>
                  );
                }) }
              </div>
            </td>
          );
        }) }
      </tr>
    ))
  }
  useEffect(() => {
    dispatch(getLevels())
    dispatch(getTopics())
    dispatch(getSubtitles())
    dispatch(getQuestions())
    dispatch(getUsers())
    if (!isAdmin) {
      dispatch(getUserAnsweredQuestion(userId))
    }
  }, [ dispatch, isAdmin, userId ])

  return (
    <div className={ classes.table_main }>
      <table className={ classes.table }>
        <thead className={ classes.thead }>
        <tr className={ classes.theadNode }>
          <th className={ `${ classes.confluenceTh } ${ classes.stickyEvery }` }>
            {
              isAdmin ?
                <select
                  id='selected'
                  className={ `${ classes.confluenceTh } ${ classes.stickyEvery }` }
                  defaultValue=''
                  onChange={ changeHandler }
                >
                  <option value='' disabled> Users</option>
                  {
                    users.map((user, index) => {
                      return (
                        <option
                          key={ index }
                          className={ classes.workerOption }
                          value={ user._id }
                        >
                          { user.name }
                        </option>
                      )
                    })
                  }
                </select>
                :
                <p className={ classes.selectedUserId }>
                  { userName }
                </p>
            }
          </th>
          { renderTableHeaders() }
        </tr>
        </thead>
        <tbody className={ classes.tbodyNode }>
        { renderTableRows() }
        </tbody>
      </table>
      <Modal active={ modalActive } setActive={ setModalActive }>
        <div className={ classes.content }>
          <div className={ classes.title }>
            <p className={ classes.p }>Создание { subtitleOrQuestion ? "подтемы" : "вопроса" }</p>
          </div>
          <form
            className={ classes.form }
            onSubmit={ subtitleOrQuestion ? submitSubtitleHandler : submitQuestionHandler }
          >
            <input
              className={ classes.text }
              type="text"
              name="input"
              placeholder="текст"
              value={ modalInput }
              onChange={ e => setModalInput(e.target.value) }
            />
            <button className={ classes.btnModal }
                    type="submit">Добавить
            </button>
          </form>
        </div>
      </Modal>
      <ModalUpdate activeModalUpdate={ modalActiveUpdate } setActiveModalUpdate={ setModalActiveUpdate }>
        <div className={ classes.content }>
          <div className={ classes.title }>
            <p className={ classes.p }>Изменение { subtitleOrQuestion ? "подтемы" : "вопроса" }</p>
          </div>
          <form
            className={ classes.form }
            onSubmit={ submitLevelUpdateHandler }
          >
            <input
              className={ classes.text }
              type="text"
              name="input"
              placeholder="текст"
              value={ modalUpdateInput }
              onChange={ e => setModalUpdateInput(e.target.value) }
            />
            <button className={ classes.btnModal }
                    type="submit">Добавить
            </button>
          </form>
        </div>
      </ModalUpdate>
    </div>
  )
}


export default Competence