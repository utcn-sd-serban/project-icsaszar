import {
    ADD_NEW_TEACHER,
    AddNewTeacher,
    RECEIVE_TEACHERS,
    ReceiveTeachersAction,
    REQUEST_TEACHERS,
    RequestTeachersAction
} from "./types";
import {Teacher} from "../../objects/user/Teacher";
import {ThunkResult} from "../store";
import DataRestClient from "../../../rest/DataRestClient";

export function doReceiveTeachers(teachers: Teacher[]): ReceiveTeachersAction {
    return {
        type: RECEIVE_TEACHERS,
        payload:{
            data: teachers
        }
    }
}

export function doRequestTeachers(): RequestTeachersAction {
    return {
        type: REQUEST_TEACHERS
    }
}

export function doAddTeacher(newTeacher: Teacher): AddNewTeacher {
    return {
        type: ADD_NEW_TEACHER,
        payload: {
            newTeacher: newTeacher
        }
    }
}

export function fetchTeacherData(): ThunkResult<Promise<void>> {
    return async function(dispatch) {
        dispatch(doRequestTeachers);
        let response = await DataRestClient.fetchTeacherData();
        if(response.status === "failed" || response.status === "error"){
            throw Error("Fetch teacher data failed")
        }
        let data: Teacher[] = await response.data.json();
        dispatch(doReceiveTeachers(data))
    }
}