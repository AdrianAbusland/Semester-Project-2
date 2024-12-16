import { onBid, showBidders } from "../../ui/listing/bid";
import { formatDate } from "../constants";

const initializeModalListeners = () => {
    const closeModalButton = document.getElementById("closeModal");
    const biddersModal = document.getElementById("biddersModal");

    if (!closeModalButton || !biddersModal) {
        console.error("Modal or close button not found in DOM.");
        return;
    }

    closeModalButton.addEventListener("click", () => {
        biddersModal.classList.add("hidden");
    });

    window.addEventListener("click", (event) => {
        if (event.target === biddersModal) {
            biddersModal.classList.add("hidden");
        }
    });
};

document.addEventListener("DOMContentLoaded", initializeModalListeners);

export const displayListings = (listings) => {
    const listingContainer = document.getElementById("listingContainer");

    if (!listingContainer) {
        console.error("No container with id `listingContainer` found");
        return;
    }

    const isLoggedIn = !!localStorage.getItem("token"); 

    listings.forEach(listing => {
        const container = document.createElement("div");
        container.className = "listingContainer flex flex-col justify-between bg-dark-100 shadow-lg p-5 mb-5 rounded-lg";

        const defaultImageUrl = "/image/placeholder-transparent.png";

        const image = document.createElement("img");
        image.className = "listingImage w-full max-h-48 object-cover rounded-md";

        if (Array.isArray(listing.media) && listing.media.length > 0 && listing.media[0]?.url) {
            const mediaItem = listing.media[0];
            image.src = mediaItem.url;
            image.alt = mediaItem.alt || "Listing image";
        } else {
            image.src = defaultImageUrl;
            image.alt = "Default placeholder image";
        }

        const sellerName = document.createElement("h2");
        sellerName.innerText = listing.seller?.name || "Unknown Seller";
        sellerName.className = "listingName text-primary font-bold mb-2 mt-2";

        const title = document.createElement("h3");
        title.innerText = listing.title;
        title.className = "listingTitle font-medium text-darkSlate mb-2 line-clamp-2";

        const description = document.createElement("p");
        description.innerText = listing.description;
        description.className = "listingDescription text-sm text-gray-200 line-clamp-2 break-all";

        const endsAt = document.createElement("h4");
        endsAt.innerText = `Ends At: ${formatDate(listing.endsAt)}`;
        endsAt.className = "endsAt mt-2";

        const currentBid = document.createElement("p");
        currentBid.className = "currentBid text-lg font-semibold mt-2";
        if (listing.bids && Array.isArray(listing.bids) && listing.bids.length > 0) {
            const highestBid = Math.max(...listing.bids.map(bid => bid.amount));
            currentBid.innerText = `Current Bid: $${highestBid.toFixed(2)}`;
        } else {
            currentBid.innerText = "No Bids Yet";
        }
        
        const separator = document.createElement("div");
        separator.className = "border-t border-gray-300 my-4";

        const bidFormContainer = document.createElement("div");
        bidFormContainer.className = "bidFormContainer";

        const bidForm = document.createElement("form");
        bidForm.className = "bidForm flex flex-col space-y-4";

        const bidInput = document.createElement("input");
        bidInput.name = "bidInput";
        bidInput.type = "number";
        bidInput.placeholder = "Enter your bid";
        bidInput.min = "0";
        bidInput.className = "bidInput text-black p-2 border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary";

        const bidButton = document.createElement("button");
        bidButton.type = "submit";
        bidButton.innerText = "Place Bid";
        bidButton.className = "bidButton bg-primary hover:bg-secondary text-white py-2 px-4 rounded-md";

        bidForm.appendChild(bidInput);
        bidForm.appendChild(bidButton);

        bidForm.addEventListener("submit", async (event) => {
            event.preventDefault(); 

            if (!bidInput.value || bidInput.value <= 0) {
                alert("Please enter a valid bid amount before placing your bid.");
                return;  
            }

            try {
                await onBid(event, listing.id);
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } catch (error) {
                console.error("Failed to place bid:", error);
                alert("There was an issue placing your bid. Please try again.");
            }
        });

        const openModal = document.getElementById("biddersModal");

        const viewButtons = document.createElement("div");
        viewButtons.className = "viewButtons flex flex-row justify-around";

        const viewBiddersButton = document.createElement("button");
        viewBiddersButton.innerText = "View Bidders";
        viewBiddersButton.id = "viewBidsButton";
        viewBiddersButton.className = "viewBiddersButton flex-initial text-white py-2 mt-5 px-4 rounded-md hover:text-primary";

        if (!isLoggedIn) {
            viewBiddersButton.disabled = true;
            viewBiddersButton.title = "You must be logged in to view bidders.";
            viewBiddersButton.classList.add("cursor-not-allowed", "opacity-50");
        } else {
            viewBiddersButton.addEventListener("click", () => {
                console.log("View Bidders button clicked for listing ID:", listing.id);
                openModal.classList.add("flex");
                showBidders(listing.id);
            });
        }

        const viewButton = document.createElement("button");
        viewButton.innerText = "View Listing";
        viewButton.className = "viewButton flex-initial text-white py-2 mt-5 px-4 rounded-md hover:text-primary";

        viewButton.addEventListener('click', () => {
            window.location.href = `/post/?id=${listing.id}`;
            localStorage.setItem("listingId", JSON.stringify(listing.id));
        });

        viewButtons.append(viewBiddersButton, viewButton);
        bidFormContainer.append(bidForm, viewButtons);
        container.append(image, sellerName, title, description, endsAt, currentBid, separator, bidFormContainer);
        listingContainer.appendChild(container);
    });

    initializeModalListeners();
};