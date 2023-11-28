import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {setError} from "./errorSlice";
import {$api, $authApi} from "../../common/axios";
import {AppDispatch} from "../store";
import {
    ILevel,
    IQuestion,
    ISubtitle,
    ITopic,
    IUserAnsweredQuestion
} from "../../models/models";

interface competenceState {
    levels: ILevel[]
    topics: ITopic[]
    subtitles: ISubtitle[]
    questions: IQuestion[]
    userAnsweredQuestion: IUserAnsweredQuestion[]
}

const initialState: competenceState = {
    levels: [],
    topics: [],
    subtitles: [],
    questions: [],
    userAnsweredQuestion: []
};

export const levelApi = (title: string, background: string, color: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await $authApi.post('/level/', {title, background, color})
            if (response.status === 200) {
                await dispatch(getLevels())
                alert('Вы успешно добавили')
            }
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
                alert(e.message)
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}
export const getLevels = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $api.get(`/level`)
            dispatch(setLevels(data))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const deleteLevel = (id:string, name:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.delete(`/level/${id}`)
            alert(`уровень "${name}" удалена`)
            dispatch(getLevels())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const updateLevel = (id: string, title: string) => {
    console.log(id, title)
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.put(`/level/`, {id, title})
            dispatch(getLevels())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const topicApi = (topic: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await $authApi.post('/topic/', {topic})
            if (response.status === 200) {
                await dispatch(getTopics())
                alert('Вы успешно добавили')
            }
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
                alert(e.message)
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const getTopics = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $api.get(`/topic`)
            dispatch(setTopics(data))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const deleteTopic = (id:string, name:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.delete(`/topic/${id}`)
            alert(`Тема "${name}" удалена`)
            dispatch(getTopics())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}
export const updateTopic = (id: string, title: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.put(`/topic/`, {id, title})
            dispatch(getTopics())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const subtitleApi = (subtitle: string, topicId: string, levelId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await $authApi.post('/subtitle/', {subtitle, topicId, levelId})
            if (response.status === 200) {
                await dispatch(getLevels())
                await dispatch(getTopics())
                await dispatch(getSubtitles())
                alert('Вы успешно добавили')
            }
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
                alert(e.message)
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const getSubtitles = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $api.get(`/subtitle`)
            dispatch(setSubtitles(data))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}
export const deleteSubtitle = (id:string, name:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.delete(`/subtitle/${id}`)
            alert(`подтема "${name}" удалена`)
            dispatch(getSubtitles())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const updateSubtitle = (id: string, title: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.put(`/subtitle/`, {id, title})
            dispatch(getSubtitles())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const questionApi = (question: string, subtitleId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const response =
              await $authApi.post('/question/',
                {question, subtitleId})
            if (response.status === 200) {
                await dispatch(getQuestions())
                alert('Вы успешно добавили')
            }
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
                alert(e.message)
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const getQuestions = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $api.get(`/question`)
            dispatch(setQuestions(data))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const deleteQuestion = (id:string, name:string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $authApi.delete(`/question/${id}`)
            alert(`вопрос "${name}" удалена`)
            dispatch(getSubtitles())
            dispatch(getQuestions())
            console.log(data)
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const updateQuestion = (id: string, title: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.put(`/question/`, {id, title})
            dispatch(getQuestions())
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

export const getUserAnsweredQuestion = (id: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            const {data} = await $api.get(`/answer/user/${id}`)
            dispatch(setUserAnsweredQuestion(data))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}
export const putUserAnsweredQuestion = (status: boolean, questionId: string, userId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await $authApi.put(`/answer/`, {status, userId, questionId})
            dispatch(getUserAnsweredQuestion(userId))
        } catch (e) {
            if (e instanceof Error) {
                dispatch(setError(e.message));
            } else {
                dispatch(setError('An unknown error occurred.'));
            }
        }
    }
}

const competenceSlice = createSlice({
        name: 'competenceSlice',
        initialState,
        reducers:
            {
                setLevels: (state, action: PayloadAction<ILevel[]>) => {
                    state.levels = action.payload
                },
                setTopics: (state, action: PayloadAction<ITopic[]>) => {
                    state.topics = action.payload
                },
                setSubtitles: (state, action: PayloadAction<ISubtitle[]>) => {
                    state.subtitles = action.payload
                },
                setQuestions: (state, action: PayloadAction<IQuestion[]>) => {
                    state.questions = action.payload
                },
                setUserAnsweredQuestion: (state, action: PayloadAction<IUserAnsweredQuestion[]>) => {
                    state.userAnsweredQuestion = action.payload
                },
            },
    }
);

export const {
    setLevels,
    setTopics,
    setSubtitles,
    setQuestions,
    setUserAnsweredQuestion,
} = competenceSlice.actions;

export default competenceSlice.reducer;
