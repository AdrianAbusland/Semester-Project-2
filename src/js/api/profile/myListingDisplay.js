import { formatDate } from "../constants";

export const displayMyListings = (profileData) => {
    const listingsContainer = document.getElementById("listingsContainer");

    if (!profileData || !profileData.listings || profileData.listings.length === 0) {
        const noListingsMessage = document.createElement("p");
        noListingsMessage.innerText = "No Listings to display...";
        noListingsMessage.className = "text-center text-gray-500 mt-6";
        listingsContainer.appendChild(noListingsMessage);
        return;
    }

    const container = document.createElement("div");
    container.className = "listingsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 mx-5";

    const heading = document.createElement("h2");
    heading.innerText = "My Auctions"
    heading.className = "text-2xl font-bold text-primary my-6 ml-5"
    listingsContainer.append(heading)

    profileData.listings.forEach((listing) => {
        const listingCard = document.createElement("div");
        listingCard.className = "flex flex-col winItem bg-dark-100 shadow-md rounded-lg p-4 space-y-4 transform transition duration-300 hover:scale-105";

        const image = document.createElement("img");
        image.className = "listingImage w-full h-48 object-cover rounded-md mb-4";
        image.src = listing.media?.[0]?.url || "/image/placeholder-transparent.png";
        image.alt = listing.media?.[0]?.alt || "Listing image";

        const title = document.createElement("h3");
        title.innerText = listing.title || "No Title";
        title.className = "listingTitle text-secondary font-bold text-lg text-darkSlate mb-2";

        const description = document.createElement("p");
        description.innerText = listing.description || "No Description";
        description.className = "listingDescription text-light text-sm mb-4 line-clamp-2";

        const endsAt = document.createElement("p");
        endsAt.innerText = `Ends At: ${formatDate(listing.endsAt)}`;
        endsAt.className = "text-light mb-4"

        const viewButton = document.createElement("button");
        viewButton.innerText = "View";
        viewButton.className = "viewButton bg-primary hover:bg-secondary text-white py-2 px-4 rounded-lg";

        viewButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${listing.id}`;
            localStorage.setItem("listingId", JSON.stringify(listing.id));
        });

        listingCard.append(image, title, description, endsAt, viewButton);
        container.appendChild(listingCard);
    });

    listingsContainer.appendChild(container);
};