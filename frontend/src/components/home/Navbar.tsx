import React from "react";
function Navbar()
{
    return(
        <div
            style={{"borderStyle": "solid","float": "left"}}>
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/logout">Logout</a>
                        </li>
                    <li>
                        <a href="/StarMap">Star Map</a>
                    </li>
                    <li>
                        <a href="/register">Register</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;