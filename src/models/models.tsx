import {ChangeEvent} from "react";

export type TChangeEvent = ChangeEvent<HTMLSelectElement>
export interface ILevel {
    _id: string
    title: string
    description: string
    color: string
    background: string
}
export interface ITopic {
    _id: string
    topic: string
}
export interface ISubtitle {
    _id: string
    subtitle: string
    topicId: string
    levelId: string
}
export interface IQuestion {
    _id: string;
    question: string;
    subtitleId: string;
}
export interface IUserAnsweredQuestion {
    _id: string;
    status: boolean;
    questionId: string;
    userId: string;
}
export interface IUser {
    _id: string
    name: string
}

export interface IUserOne {
    _id: string
    name: string
    email: string
    role: string
}
export interface IAdminForm {
    name: string
    email: string
    password: string
    role: string
}
export interface ILevelForm {
    title: string
    background: string
    color: string
}
export interface ISubtitleForm {
    subtitle: string
    subtitleTopicId: string
    subtitleLevelId: string
}
export interface IQuestionForm {
    question: string
    questionTopicId: string
    questionLevelId: string
    questionSubtitleId: string
}

export interface IUserId {
    _id: string
    name: string
    email: string
    role: string
}







