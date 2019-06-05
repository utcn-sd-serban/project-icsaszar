import {StudentGroup} from "../../objects/user/Student";
import {AppState} from "../store";

export function getStudentGroupById(state: AppState, id: number): StudentGroup | undefined{
    return state.studentGroupState.groups.find(g => g.id === id)
}