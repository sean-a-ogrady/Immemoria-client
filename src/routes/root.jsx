import { Outlet } from "react-router-dom";
import SiteNavbar from "../components/siteNavbar";
import { useState, useEffect } from "react";

export default function Root() {

    /*******************/
    /* SITE THEME CODE */
    /*******************/

    const [darkMode, setDarkMode] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches);

    // Listen for changes to the system's color scheme
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
        document.documentElement.classList.toggle("dark", window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches)
    })

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.toggle("dark", true);
        }
    }, [])

    function toggleDarkMode() {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle("dark", newDarkMode);
    }

    return (
        <div>
            <SiteNavbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Outlet />
        </div>
    )
}