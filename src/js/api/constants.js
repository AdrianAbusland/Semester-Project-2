export const API_KEY = "8634634d-7964-488d-9c66-a8d578c24ad1"

export const API_BASE = "https://v2.api.noroff.dev"

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`

export const API_AUCTION = `${API_BASE}/auction`

export const API_AUCTION_LISTINGS = `${API_AUCTION}/listings`

export const API_AUCTION_PROFILES = `${API_AUCTION}/profiles`

export function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const dateString = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const timeString = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return `${dateString} kl ${timeString}`;
}