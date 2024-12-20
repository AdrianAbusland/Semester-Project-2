export function generateNavbar() {
    const navbarItems = [
        { name: "Home", link: "/", iconSolid: "fa-solid fa-gavel" },
        { name: "Profile", link: "/profile/", iconSolid: "fa-solid fa-user" },
        { name: "Create Listing", link: "/post/create/", iconSolid: "fa-solid fa-plus" }
    ];

    const navbar = document.getElementById("navbar");
    if (!navbar) {
        console.error("Navbar element not found!");
        return;
    }

    const navContainer = document.createElement("nav");
    navContainer.className = "navContainer p-4 text-black flex justify-between items-center max-w-screen-lg mx-auto";

    const logo = document.createElement("img");
    logo.src = "/image/logo-big.png";
    logo.alt = "Logo";
    logo.className = "logo w-24 md:w-40 h-auto";
    navContainer.appendChild(logo);

    const navItemsContainer = document.createElement("div");
    navItemsContainer.className = "flex gap-8 items-center"; 

    navbarItems.forEach(item => {
        const navLink = document.createElement("a");
        navLink.href = item.link;
        navLink.className = "flex flex-col items-center md:flex-row md:gap-2 md:text-base"; 

        const isActive = 
            (item.link === "/" && window.location.pathname === "/") || 
            (item.link !== "/" && window.location.pathname.startsWith(item.link)); 


        const icon = document.createElement("i");
        icon.className = item.iconSolid;
        icon.style.color = isActive ? "#3B82F6" : "#8D99AE"; 
        icon.classList.add("text-2xl", "transition-colors", "duration-300", "md:hidden");

        const text = document.createElement("span");
        text.textContent = item.name;
        text.className = "hidden md:inline-block text-lg font-medium transition-colors duration-300";
        text.style.color = isActive ? "#3B82F6" : "#8D99AE";

        navLink.addEventListener("mouseenter", () => {
            icon.style.color = "#1D4ED8";
            text.style.color = "#1D4ED8";
        });
        navLink.addEventListener("mouseleave", () => {
            if (!isActive) {
                icon.style.color = "#8D99AE";
                text.style.color = "#8D99AE";
            }
            if (isActive) {
                icon.style.color = "#3B82F6";
                text.style.color = "#3B82F6";
            }
        });

        navLink.appendChild(icon);
        navLink.appendChild(text);
        navItemsContainer.appendChild(navLink);
    });

    navContainer.appendChild(navItemsContainer);

    const authContainer = document.createElement("div");
    authContainer.className = "authContainer";

    const authButton = document.createElement("button");
    authButton.className = "authButton bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md";

    const isLoggedIn = Boolean(localStorage.getItem("token"));
    authButton.textContent = isLoggedIn ? "Logout" : "Login";
    authButton.addEventListener("click", () => {
        if (isLoggedIn) {
            localStorage.removeItem("token");
            window.location.href = "/";
        } else {
            window.location.href = "/auth/login/";
        }
    });

    document.addEventListener("click", (event) => {
        const logoutButton = event.target.closest("#logoutBtn");
        if (logoutButton) {
            onLogout();
        }
    });

    authContainer.appendChild(authButton);
    navContainer.appendChild(authContainer);


    navbar.appendChild(navContainer);
}
