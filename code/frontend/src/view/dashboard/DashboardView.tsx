import React from 'react';
import {UserRole} from "../../model/objects/user/User";

interface Props {
    username: string,
    firstName: string,
    lastName: string,
    role: UserRole
}

export const DashboardView: React.FC<Props> =
    ({
         username,
         firstName,
         lastName,
         role,
         children
     }) => (

        <div>
            <h1>
                {`Welcome ${firstName} ${lastName}`}
            </h1>
            {children}
        </div>
    );