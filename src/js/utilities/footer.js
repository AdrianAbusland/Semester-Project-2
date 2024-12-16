export function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'bg-dark-100 text-light p-4 text-center text-sm w-full bottom-0';

    footer.textContent = '© 2024 All rights reserved.';

    document.body.appendChild(footer);
}

