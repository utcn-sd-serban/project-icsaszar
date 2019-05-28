import * as React from "react";

interface Props {
    username: string | undefined
}

export const Navbar: React.FC<Props> =
    (
        {username}
    ) => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {
                username &&
                <ul className="navbar-nav">
                    <li>
                        {username}
                    </li>
                </ul>
            }
        </nav>
    );