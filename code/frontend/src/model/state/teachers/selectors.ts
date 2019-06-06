import {StudentGroup} from "../../objects/user/Student";
import {AppState} from "../store";
<<<<<<< HEAD
import {Teacher} from "../../objects/user/Teacher";

export function findTeacherById(state: AppState, id: number): Teacher | undefined{
    return state.teacherState.teachers.find(t => t.id === id)
=======

export function getStudentGroupById(state: AppState, id: number): StudentGroup | undefined{
    return state.studentGroupState.groups.find(g => g.id === id)
>>>>>>> a7a15c76daf5bb2356740bf1305efe2e07ad72e6
}