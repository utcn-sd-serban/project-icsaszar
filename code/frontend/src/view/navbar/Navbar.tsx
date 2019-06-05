import * as React from "react";

interface Props {
    username: string | undefined;
    onLogout: () => void
}

export const Navbar: React.FC<Props> =
    (
        {username, onLogout}
    ) => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {
                username &&
                <div>
                    <ul className="navbar-nav">
                        <li>
                            {username}
                        </li>
                        <button onClick={onLogout}>
                            Logout
                        </button>
                    </ul>
                </div>

            }
        </nav>
    );