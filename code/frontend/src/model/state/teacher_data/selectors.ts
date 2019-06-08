import {AppState} from "../store";
import {Teacher} from "../../objects/user/Teacher";

export function findTeacherById(state: AppState, id: number): Teacher | undefined{
    return state.teacherState.teachers.find(t => t.id === id)
}