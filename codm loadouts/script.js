/* =========================================================
   CODM LOADOUT WEBSITE
========================================================= */


/* =========================================================
   CONSTANTS
========================================================= */

const categories = [
    "SMG",
    "AR",
    "SR",
    "MM",
    "LMG",
    "SG",
    "Pistol"
];

const STORAGE_KEY = "codm_loadouts_v2";


/* =========================================================
   DEFAULT LOADOUTS
========================================================= */

const defaultLoadouts = [

    {
        id: "default-qq9",
        name: "QQ9",
        category: "SMG",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/8/8c/QQ9_CoDM.png",

        description:
            "Fast and aggressive SMG build designed for close-range gunfights.",

        mainBuild:
`Monolithic Suppressor
RTC Recon Tac Long
No Stock
Granulated Grip Tape
45 Round Extended Mag`,

        optic:
`Red Dot Sight`,

        playstyle:
            "Aggressive",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: 1
    },


    {
        id: "default-m4",
        name: "M4",
        category: "AR",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/7/7e/M4_CoDM.png",

        description:
            "Reliable all-around assault rifle build with balanced recoil and range.",

        mainBuild:
`Monolithic Suppressor
OWC Marksman
No Stock
Granulated Grip Tape
60 Round Mag`,

        optic:
`Red Dot Sight`,

        playstyle:
            "Balanced",

        perks:
            "Agile, Toughness, Dead Silence",

        favorite: false,

        createdAt: 2
    },


    {
        id: "default-dlq",
        name: "DL Q33",
        category: "SR",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/7/73/DL_Q33_CoDM.png",

        description:
            "Classic bolt-action sniper designed for accurate long-range eliminations.",

        mainBuild:
`OWC Light Suppressor
MIP Light
YKM Combat Stock
Stippled Grip Tape
Extended Mag A`,

        optic:
`Tactical Scope`,

        playstyle:
            "Long Range",

        perks:
            "Agile, Toughness, Dead Silence",

        favorite: false,

        createdAt: 3
    },


    {
        id: "default-sks",
        name: "SKS",
        category: "MM",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/7/73/SKS_CoDM.png",

        description:
            "Fast semi-automatic marksman rifle for precise mid-to-long range fights.",

        mainBuild:
`Monolithic Suppressor
OWC Marksman
RTC Steady Stock
Granulated Grip Tape
Extended Mag`,

        optic:
`Red Dot Sight`,

        playstyle:
            "Precision",

        perks:
            "Agile, Toughness, Dead Silence",

        favorite: false,

        createdAt: 4
    },


    {
        id: "default-holger",
        name: "Holger 26",
        category: "LMG",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/0/0e/Holger_26_CoDM.png",

        description:
            "High-capacity LMG build focused on sustained fire and lane control.",

        mainBuild:
`Monolithic Suppressor
OWC Marksman
No Stock
Granulated Grip Tape
YKM Combat Stock`,

        optic:
`Red Dot Sight`,

        playstyle:
            "Suppressive",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: 5
    },


    {
        id: "default-krm",
        name: "KRM-262",
        category: "SG",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/3/3d/KRM-262_CoDM.png",

        description:
            "Powerful pump-action shotgun designed for close-quarter combat.",

        mainBuild:
`Marauder Suppressor
RTC Extended Light Barrel
No Stock
Granulated Grip Tape
OWC Laser - Tactical`,

        optic:
`None`,

        playstyle:
            "Close Range",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: 6
    },


    {
        id: "default-mw11",
        name: "MW11",
        category: "Pistol",

        image:
            "https://static.wikia.nocookie.net/callofduty/images/1/1b/MW11_CoDM.png",

        description:
            "Reliable sidearm with a fast handling profile for backup situations.",

        mainBuild:
`OWC Light Suppressor
RTC Steady Stock
OWC Laser - Tactical
Granulated Grip Tape
Extended Mag`,

        optic:
`None`,

        playstyle:
            "Secondary",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: 7
    }

];


/* =========================================================
   STATE
========================================================= */

let loadouts = [];
let favoritesOnly = false;
let deleteTargetId = null;


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loadoutContainer =
    document.getElementById("loadoutContainer");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const sortSelect =
    document.getElementById("sortSelect");

const favoritesFilter =
    document.getElementById("favoritesFilter");

const addLoadoutBtn =
    document.getElementById("addLoadoutBtn");

const emptyAddBtn =
    document.getElementById("emptyAddBtn");


/* MODAL */

const loadoutModal =
    document.getElementById("loadoutModal");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const modalTitle =
    document.getElementById("modalTitle");

const loadoutForm =
    document.getElementById("loadoutForm");


/* FORM */

const editId =
    document.getElementById("editId");

const weaponName =
    document.getElementById("weaponName");

const weaponCategory =
    document.getElementById("weaponCategory");

const weaponImage =
    document.getElementById("weaponImage");

const description =
    document.getElementById("description");

const mainBuild =
    document.getElementById("mainBuild");

const optic =
    document.getElementById("optic");

const playstyle =
    document.getElementById("playstyle");

const perks =
    document.getElementById("perks");


/* DELETE */

const deleteModal =
    document.getElementById("deleteModal");

const cancelDelete =
    document.getElementById("cancelDelete");

const confirmDelete =
    document.getElementById("confirmDelete");


/* IMAGE VIEWER */

const imageViewer =
    document.getElementById("imageViewer");

const imageViewerClose =
    document.getElementById("imageViewerClose");

const viewerImage =
    document.getElementById("viewerImage");

const viewerName =
    document.getElementById("viewerName");


/* TOAST */

const toast =
    document.getElementById("toast");

const toastText =
    document.getElementById("toastText");


/* =========================================================
   LOAD STORAGE
========================================================= */

function loadFromStorage() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (saved) {

            const parsed =
                JSON.parse(saved);

            if (Array.isArray(parsed)) {

                loadouts = parsed;

                return;
            }
        }

    } catch (error) {

        console.error(
            "Could not load saved loadouts:",
            error
        );
    }

    loadouts =
        JSON.parse(
            JSON.stringify(defaultLoadouts)
        );

    saveToStorage();
}


/* =========================================================
   SAVE STORAGE
========================================================= */

function saveToStorage() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(loadouts)
        );

    } catch (error) {

        console.error(
            "Could not save loadouts:",
            error
        );
    }
}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GET FILTERED LOADOUTS
========================================================= */

function getFilteredLoadouts() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    let result =
        loadouts.filter((loadout) => {

            const matchesSearch =
                !search ||
                loadout.name
                    .toLowerCase()
                    .includes(search) ||
                loadout.category
                    .toLowerCase()
                    .includes(search) ||
                loadout.description
                    .toLowerCase()
                    .includes(search);

            const matchesFavorite =
                !favoritesOnly ||
                loadout.favorite === true;

            return (
                matchesSearch &&
                matchesFavorite
            );
        });


    const sort =
        sortSelect.value;


    if (sort === "nameAsc") {

        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    } else if (sort === "nameDesc") {

        result.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    } else if (sort === "newest") {

        result.sort(
            (a, b) =>
                (b.createdAt || 0) -
                (a.createdAt || 0)
        );
    }


    return result;
}


/* =========================================================
   CREATE IMAGE HTML
========================================================= */

function createImageHTML(loadout) {

    const image =
        escapeHTML(loadout.image);

    const name =
        escapeHTML(loadout.name);


    if (!image) {

        return `
            <div class="weapon-image-wrapper">
                <div class="weapon-image placeholder">
                    NO IMAGE
                </div>
            </div>
        `;
    }


    return `
        <div
            class="weapon-image-wrapper"
            data-image="${image}"
            data-name="${name}"
            role="button"
            tabindex="0"
            aria-label="View ${name} image"
        >

            <img
                class="weapon-image"
                src="${image}"
                alt="${name}"
                loading="lazy"
                onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
            >

        </div>
    `;
}


/* =========================================================
   CREATE CARD
========================================================= */

function createCard(loadout) {

    const favoriteClass =
        loadout.favorite
            ? "active"
            : "";


    const mainBuildText =
        escapeHTML(
            loadout.mainBuild || "Not specified"
        );


    const opticText =
        escapeHTML(
            loadout.optic || "None"
        );


    const descriptionText =
        escapeHTML(
            loadout.description || "No description."
        );


    return `
        <article
            class="loadout-card"
            data-id="${escapeHTML(loadout.id)}"
        >

            ${createImageHTML(loadout)}


            <div class="card-body">

                <div class="card-top">

                    <div>

                        <h3 class="weapon-name">
                            ${escapeHTML(loadout.name)}
                        </h3>

                        <span class="weapon-category">
                            ${escapeHTML(loadout.category)}
                        </span>

                    </div>


                    <button
                        class="favorite-btn ${favoriteClass}"
                        data-action="favorite"
                        aria-label="Favorite ${escapeHTML(loadout.name)}"
                    >
                        ★
                    </button>

                </div>


                <p class="card-description">
                    ${descriptionText}
                </p>


                <!-- MAIN BUILD -->

                <div class="build-box">

                    <div class="build-title">
                        <span>◆</span>
                        MAIN BUILD
                    </div>

                    <div class="build-list">
                        ${mainBuildText}
                    </div>

                </div>


                <!-- OPTIC -->

                <div class="build-box">

                    <div class="build-title">
                        <span>◈</span>
                        OPTIC BUILD
                    </div>

                    <div class="build-list">
                        ${opticText}
                    </div>

                </div>


                <!-- EXTRA INFO -->

                <div class="extra-info">

                    <div class="info-item">

                        <span class="info-label">
                            Playstyle
                        </span>

                        <span class="info-value">
                            ${escapeHTML(
                                loadout.playstyle ||
                                "Not specified"
                            )}
                        </span>

                    </div>


                    <div class="info-item">

                        <span class="info-label">
                            Perks
                        </span>

                        <span class="info-value">
                            ${escapeHTML(
                                loadout.perks ||
                                "Not specified"
                            )}
                        </span>

                    </div>

                </div>


                <!-- ACTIONS -->

                <div class="card-actions">

                    <button
                        class="card-action copy"
                        data-action="copy"
                    >
                        COPY
                    </button>

                    <button
                        class="card-action edit"
                        data-action="edit"
                    >
                        EDIT
                    </button>

                    <button
                        class="card-action delete"
                        data-action="delete"
                    >
                        DELETE
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   RENDER
========================================================= */

function renderLoadouts() {

    const filtered =
        getFilteredLoadouts();


    loadoutContainer.innerHTML = "";


    let totalVisible = 0;


    categories.forEach(
        (category, index) => {

            const categoryLoadouts =
                filtered.filter(
                    (loadout) =>
                        loadout.category === category
                );


            if (
                categoryLoadouts.length === 0
            ) {
                return;
            }


            totalVisible +=
                categoryLoadouts.length;


            const section =
                document.createElement("section");

            section.className =
                "weapon-section";

            section.id =
                category;


            section.innerHTML = `

                <div class="weapon-section-header">

                    <div class="section-title-wrap">

                        <span class="section-number">
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <h2>
                            ${getCategoryName(category)}
                        </h2>

                    </div>

                    <span class="section-description">
                        ${categoryLoadouts.length}
                        loadout${categoryLoadouts.length === 1 ? "" : "s"}
                    </span>

                </div>


                <div class="loadout-grid">

                    ${categoryLoadouts
                        .map(createCard)
                        .join("")}

                </div>
            `;


            loadoutContainer.appendChild(section);
        }
    );


    if (totalVisible === 0) {

        emptyState.classList.remove("hidden");

    } else {

        emptyState.classList.add("hidden");
    }


    updateCategoryLinks();
}


/* =========================================================
   CATEGORY NAME
========================================================= */

function getCategoryName(category) {

    const names = {

        SMG: "SUBMACHINE GUNS",

        AR: "ASSAULT RIFLES",

        SR: "SNIPER RIFLES",

        MM: "MARKSMAN RIFLES",

        LMG: "LIGHT MACHINE GUNS",

        SG: "SHOTGUNS",

        Pistol: "PISTOLS"
    };


    return names[category] || category;
}


/* =========================================================
   UPDATE CATEGORY LINKS
========================================================= */

function updateCategoryLinks() {

    document
        .querySelectorAll(
            ".category-nav a"
        )
        .forEach((link) => {

            const category =
                link.dataset.category;

            const exists =
                loadouts.some(
                    (loadout) =>
                        loadout.category === category
                );


            link.style.opacity =
                exists ? "1" : "0.35";
        });
}


/* =========================================================
   OPEN ADD MODAL
========================================================= */

function openAddModal() {

    loadoutForm.reset();

    editId.value = "";

    modalTitle.textContent =
        "Add Loadout";

    weaponCategory.value =
        "SMG";

    loadoutModal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        weaponName.focus();

    }, 100);
}


/* =========================================================
   OPEN EDIT MODAL
========================================================= */

function openEditModal(id) {

    const loadout =
        loadouts.find(
            (item) =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    editId.value =
        loadout.id;

    weaponName.value =
        loadout.name;

    weaponCategory.value =
        loadout.category;

    weaponImage.value =
        loadout.image || "";

    description.value =
        loadout.description || "";

    mainBuild.value =
        loadout.mainBuild || "";

    optic.value =
        loadout.optic || "";

    playstyle.value =
        loadout.playstyle || "";

    perks.value =
        loadout.perks || "";


    modalTitle.textContent =
        "Edit Loadout";


    loadoutModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeLoadoutModal() {

    loadoutModal.classList.remove("show");

    document.body.style.overflow = "";
}


/* =========================================================
   SAVE LOADOUT
========================================================= */

function saveLoadout(event) {

    event.preventDefault();


    const name =
        weaponName.value.trim();


    if (!name) {

        showToast(
            "Enter a weapon name."
        );

        weaponName.focus();

        return;
    }


    const id =
        editId.value.trim();


    const data = {

        name,

        category:
            weaponCategory.value,

        image:
            weaponImage.value.trim(),

        description:
            description.value.trim(),

        mainBuild:
            mainBuild.value.trim(),

        optic:
            optic.value.trim(),

        playstyle:
            playstyle.value.trim(),

        perks:
            perks.value.trim()
    };


    if (id) {

        const index =
            loadouts.findIndex(
                (item) =>
                    item.id === id
            );


        if (index !== -1) {

            loadouts[index] = {

                ...loadouts[index],

                ...data
            };
        }


        showToast(
            "Loadout updated!"
        );

    } else {

        const newLoadout = {

            id:
                "loadout-" +
                Date.now() +
                "-" +
                Math.random()
                    .toString(36)
                    .slice(2, 8),

            ...data,

            favorite: false,

            createdAt: Date.now()
        };


        loadouts.push(newLoadout);


        showToast(
            "Loadout added!"
        );
    }


    saveToStorage();

    closeLoadoutModal();

    renderLoadouts();


    setTimeout(() => {

        const section =
            document.getElementById(
                data.category
            );


        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    }, 100);
}


/* =========================================================
   DELETE
========================================================= */

function openDeleteModal(id) {

    deleteTargetId = id;

    deleteModal.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeDeleteModal() {

    deleteModal.classList.remove("show");

    deleteTargetId = null;

    document.body.style.overflow = "";
}


function deleteLoadout() {

    if (!deleteTargetId) {
        return;
    }


    loadouts =
        loadouts.filter(
            (loadout) =>
                loadout.id !==
                deleteTargetId
        );


    saveToStorage();

    closeDeleteModal();

    renderLoadouts();

    showToast(
        "Loadout deleted."
    );
}


/* =========================================================
   FAVORITE
========================================================= */

function toggleFavorite(id) {

    const loadout =
        loadouts.find(
            (item) =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    loadout.favorite =
        !loadout.favorite;


    saveToStorage();

    renderLoadouts();


    showToast(
        loadout.favorite
            ? "Added to favorites."
            : "Removed from favorites."
    );
}


/* =========================================================
   COPY LOADOUT
========================================================= */

async function copyLoadout(id) {

    const loadout =
        loadouts.find(
            (item) =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    const text = `

${loadout.name} — ${loadout.category}

MAIN BUILD:
${loadout.mainBuild || "None"}

OPTIC:
${loadout.optic || "None"}

PLAYSTYLE:
${loadout.playstyle || "None"}

PERKS:
${loadout.perks || "None"}

`;


    try {

        await navigator.clipboard.writeText(
            text.trim()
        );

        showToast(
            "Loadout copied!"
        );

    } catch (error) {

        const textarea =
            document.createElement("textarea");

        textarea.value =
            text.trim();

        document.body.appendChild(
            textarea
        );

        textarea.select();

        document.execCommand("copy");

        textarea.remove();

        showToast(
            "Loadout copied!"
        );
    }
}


/* =========================================================
   CARD ACTIONS
========================================================= */

loadoutContainer.addEventListener(
    "click",
    function (event) {

        const actionButton =
            event.target.closest(
                "[data-action]"
            );


        if (!actionButton) {
            return;
        }


        const card =
            actionButton.closest(
                ".loadout-card"
            );


        if (!card) {
            return;
        }


        const id =
            card.dataset.id;

        const action =
            actionButton.dataset.action;


        if (action === "favorite") {

            toggleFavorite(id);

        } else if (action === "edit") {

            openEditModal(id);

        } else if (action === "delete") {

            openDeleteModal(id);

        } else if (action === "copy") {

            copyLoadout(id);
        }
    }
);


/* =========================================================
   IMAGE VIEWER
========================================================= */

function openImageViewer(
    image,
    name
) {

    if (!image) {
        return;
    }


    viewerImage.src =
        image;

    viewerImage.alt =
        name || "Weapon image";

    viewerName.textContent =
        name || "";


    imageViewer.classList.add("show");

    document.body.style.overflow = "hidden";
}


function closeImageViewer() {

    imageViewer.classList.remove("show");

    document.body.style.overflow = "";

    setTimeout(() => {

        viewerImage.src = "";

        viewerImage.alt = "";

        viewerName.textContent = "";

    }, 300);
}


/* CLICK IMAGE */

loadoutContainer.addEventListener(
    "click",
    function (event) {

        const imageWrapper =
            event.target.closest(
                ".weapon-image-wrapper[data-image]"
            );


        if (!imageWrapper) {
            return;
        }


        openImageViewer(
            imageWrapper.dataset.image,
            imageWrapper.dataset.name
        );
    }
);


/* IMAGE KEYBOARD */

loadoutContainer.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Enter" &&
            event.key !== " "
        ) {
            return;
        }


        const imageWrapper =
            event.target.closest(
                ".weapon-image-wrapper[data-image]"
            );


        if (!imageWrapper) {
            return;
        }


        event.preventDefault();


        openImageViewer(
            imageWrapper.dataset.image,
            imageWrapper.dataset.name
        );
    }
);


/* CLOSE IMAGE */

imageViewerClose.addEventListener(
    "click",
    closeImageViewer
);


/* CLICK OUTSIDE IMAGE */

imageViewer.addEventListener(
    "click",
    function (event) {

        if (
            event.target === imageViewer
        ) {

            closeImageViewer();
        }
    }
);


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener(
    "input",
    function () {

        renderLoadouts();
    }
);


/* =========================================================
   SORT
========================================================= */

sortSelect.addEventListener(
    "change",
    function () {

        renderLoadouts();
    }
);


/* =========================================================
   FAVORITES FILTER
========================================================= */

favoritesFilter.addEventListener(
    "click",
    function () {

        favoritesOnly =
            !favoritesOnly;


        favoritesFilter.classList.toggle(
            "active",
            favoritesOnly
        );


        renderLoadouts();
    }
);


/* =========================================================
   ADD BUTTONS
========================================================= */

addLoadoutBtn.addEventListener(
    "click",
    openAddModal
);


emptyAddBtn.addEventListener(
    "click",
    openAddModal
);


/* =========================================================
   MODAL BUTTONS
========================================================= */

closeModal.addEventListener(
    "click",
    closeLoadoutModal
);

cancelModal.addEventListener(
    "click",
    closeLoadoutModal
);

loadoutForm.addEventListener(
    "submit",
    saveLoadout
);


/* =========================================================
   DELETE BUTTONS
========================================================= */

cancelDelete.addEventListener(
    "click",
    closeDeleteModal
);

confirmDelete.addEventListener(
    "click",
    deleteLoadout
);


/* =========================================================
   CLOSE MODALS WITH OUTSIDE CLICK
========================================================= */

loadoutModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === loadoutModal
        ) {

            closeLoadoutModal();
        }
    }
);


deleteModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === deleteModal
        ) {

            closeDeleteModal();
        }
    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }


        if (
            imageViewer.classList.contains(
                "show"
            )
        ) {

            closeImageViewer();

            return;
        }


        if (
            loadoutModal.classList.contains(
                "show"
            )
        ) {

            closeLoadoutModal();

            return;
        }


        if (
            deleteModal.classList.contains(
                "show"
            )
        ) {

            closeDeleteModal();
        }
    }
);


/* =========================================================
   SMOOTH CATEGORY SCROLL
========================================================= */

document
    .querySelectorAll(
        ".category-nav a, .nav-links a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerOffset =
                    window.innerWidth <= 700
                        ? 190
                        : window.innerWidth <= 1000
                            ? 205
                            : 160;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"
                });


                document
                    .querySelectorAll(
                        ".category-nav a"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "active"
                        );
                    });


                const categoryLink =
                    document.querySelector(
                        `.category-nav a[href="${targetId}"]`
                    );


                if (categoryLink) {

                    categoryLink.classList.add(
                        "active"
                    );
                }
            }
        );
    });


/* =========================================================
   ACTIVE CATEGORY WHILE SCROLLING
========================================================= */

const sectionObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    const id =
                        entry.target.id;


                    document
                        .querySelectorAll(
                            ".category-nav a"
                        )
                        .forEach((link) => {

                            link.classList.toggle(
                                "active",
                                link.dataset.category === id
                            );
                        });
                }
            );
        },
        {
            rootMargin:
                "-30% 0px -60% 0px"
        }
    );


function observeSections() {

    document
        .querySelectorAll(
            ".weapon-section"
        )
        .forEach((section) => {

            sectionObserver.observe(
                section
            );
        });
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;


function showToast(message) {

    toastText.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);
}


/* =========================================================
   RE-OBSERVE AFTER RENDER
========================================================= */

const originalRender =
    renderLoadouts;


/*
    Wrap render function so the
    IntersectionObserver gets updated
    whenever sections are recreated.
*/

renderLoadouts = function () {

    originalRender();

    observeSections();
};


/* =========================================================
   INITIALIZE
========================================================= */

loadFromStorage();

renderLoadouts();

observeSections();


/* =========================================================
   DEFAULT ACTIVE CATEGORY
========================================================= */

setTimeout(() => {

    const firstCategory =
        document.querySelector(
            '.category-nav a[data-category="SMG"]'
        );


    if (firstCategory) {

        firstCategory.classList.add(
            "active"
        );
    }

}, 100);
