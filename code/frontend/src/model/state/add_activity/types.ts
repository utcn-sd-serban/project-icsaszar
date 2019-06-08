export const SET_SELECTED_ADD_ACTIVITY_FIELD = "[ADD ACTIVITY] SET SELECTED FIELD";
export const SET_ACTIVITY_NAME = "[ADD ACTIVITY] SET NAME";

export interface AddActivityState {
    selectedOrganizerId: number;
    selectedCategoryId: number;
    activityName: string;
}

export type AddActivitySelectedField = keyof Pick<AddActivityState, "selectedCategoryId" | "selectedOrganizerId" >

export interface SetSelectedAddActivityFieldAction {
    type: typeof SET_SELECTED_ADD_ACTIVITY_FIELD
    payload: {
        field: AddActivitySelectedField
        value: number
    }
}

export interface SetActivityNameAction {
    type: typeof SET_ACTIVITY_NAME
    payload: {
        value: string
    }
}

export type AddActivityActions = SetSelectedAddActivityFieldAction | SetActivityNameAction;