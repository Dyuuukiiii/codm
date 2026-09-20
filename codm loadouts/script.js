/* =========================================
   CODM LOADOUT SYSTEM
========================================= */


/* =========================================
   VALID CATEGORIES
========================================= */

const categories = [
    "SMG",
    "AR",
    "SR",
    "MM",
    "LMG",
    "SG",
    "Pistol"
];


/* =========================================
   DEFAULT LOADOUTS
========================================= */

const defaultLoadouts = [

    {
        id: 1,

        name: "QQ9",

        category: "SMG",

        image: "",

        description:
            "Fast and aggressive SMG build for close-range fights.",

        main: [
            "Monolithic Suppressor",
            "RTC Recon Tac Long",
            "No Stock",
            "Stippled Grip Tape",
            "45 Round Extended Mag"
        ],

        optic: "Classic Red Dot",

        playstyle: "Aggressive",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 4000
    },


    {
        id: 2,

        name: "M4",

        category: "AR",

        image: "",

        description:
            "Balanced assault rifle build for reliable mid-range combat.",

        main: [
            "Monolithic Suppressor",
            "OWC Marksman",
            "No Stock",
            "Granulated Grip Tape",
            "60 Round Mag"
        ],

        optic: "Red Dot Sight",

        playstyle: "Balanced",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 3000
    },


    {
        id: 3,

        name: "DL Q33",

        category: "SR",

        image: "",

        description:
            "Precision sniper build focused on long-range accuracy.",

        main: [
            "MIP Light",
            "Tactical Suppressor",
            "OWC Skeleton Stock",
            "Stippled Grip Tape",
            "FMJ"
        ],

        optic: "Default Scope",

        playstyle: "Sniper",

        perks:
            "Agile, Toughness, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 2500
    },


    {
        id: 4,

        name: "SKS",

        category: "MM",

        image: "",

        description:
            "Semi-automatic marksman build for accurate mid-to-long range fights.",

        main: [
            "Monolithic Suppressor",
            "MIP Extended Light Barrel",
            "OWC Skeleton Stock",
            "Granulated Grip Tape",
            "Extended Mag"
        ],

        optic: "Tactical Scope",

        playstyle: "Precision",

        perks:
            "Agile, Toughness, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 2000
    },


    {
        id: 5,

        name: "Holger 26",

        category: "LMG",

        image: "",

        description:
            "High-capacity LMG build for sustained fire and lane control.",

        main: [
            "Monolithic Suppressor",
            "OWC Marksman",
            "No Stock",
            "Granulated Grip Tape",
            "100 Round Belt"
        ],

        optic: "Red Dot Sight",

        playstyle: "Support",

        perks:
            "Flak Jacket, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 1500
    },


    {
        id: 6,

        name: "KRM-262",

        category: "SG",

        image: "",

        description:
            "Powerful close-range shotgun build for aggressive pushes.",

        main: [
            "Marauder Suppressor",
            "Extended Barrel",
            "No Stock",
            "Granulated Grip Tape",
            "Tactical Foregrip"
        ],

        optic: "No Optic",

        playstyle: "Rush",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: Date.now() - 1000
    },


    {
        id: 7,

        name: "MW11",

        category: "Pistol",

        image: "",

        description:
            "Fast secondary weapon build for quick swaps and close-range fights.",

        main: [
            "Muzzle Brake",
            "OWC Marksman",
            "Lightweight Trigger",
            "Granulated Grip Tape",
            "Extended Mag"
        ],

        optic: "No Optic",

        playstyle: "Secondary",

        perks:
            "Lightweight, Quick Fix, Dead Silence",

        favorite: false,

        createdAt: Date.now()
    }

];


/* =========================================
   LOCAL STORAGE
========================================= */

const STORAGE_KEY =
    "codm_loadouts_v2";


let loadouts =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    );


/* =========================================
   FIRST TIME SETUP
========================================= */

if (
    !Array.isArray(loadouts)
) {

    loadouts =
        defaultLoadouts;

    saveLoadouts();

}


/* =========================================
   ELEMENTS
========================================= */

const container =
    document.getElementById(
        "loadoutContainer"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const sortSelect =
    document.getElementById(
        "sortSelect"
    );


const modal =
    document.getElementById(
        "modal"
    );


const deleteModal =
    document.getElementById(
        "deleteModal"
    );


const loadoutForm =
    document.getElementById(
        "loadoutForm"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


let deleteTargetId = null;


/* =========================================
   SAVE
========================================= */

function saveLoadouts() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(loadouts)
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   GET FILTERED LOADOUTS
========================================= */

function getFilteredLoadouts() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    let results =
        loadouts.filter(
            loadout => {

                return (
                    loadout.name
                        .toLowerCase()
                        .includes(search)
                );

            }
        );


    const sort =
        sortSelect.value;


    if (sort === "name") {

        results.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    if (sort === "newest") {

        results.sort(
            (a, b) =>
                b.createdAt -
                a.createdAt
        );

    }


    if (sort === "favorites") {

        results.sort(
            (a, b) =>
                Number(b.favorite) -
                Number(a.favorite)
        );

    }


    return results;

}


/* =========================================
   RENDER EVERYTHING
========================================= */

function renderLoadouts() {

    const results =
        getFilteredLoadouts();


    container.innerHTML = "";


    let totalDisplayed = 0;


    categories.forEach(
        (category, index) => {

            const categoryLoadouts =
                results.filter(
                    loadout =>
                        loadout.category ===
                        category
                );


            if (
                categoryLoadouts.length === 0
            ) {

                return;

            }


            totalDisplayed +=
                categoryLoadouts.length;


            const section =
                document.createElement(
                    "section"
                );


            section.className =
                "weapon-section";


            section.id =
                category;


            const number =
                String(index + 1)
                    .padStart(2, "0");


            section.innerHTML = `

                <div class="section-heading">

                    <div class="section-title">

                        <span class="section-number">
                            ${number}
                        </span>

                        <h2>
                            ${category}
                        </h2>

                    </div>

                    <span class="section-description">
                        ${categoryLoadouts.length}
                        LOADOUT${categoryLoadouts.length === 1 ? "" : "S"}
                    </span>

                </div>

                <div class="loadout-grid"></div>

            `;


            const grid =
                section.querySelector(
                    ".loadout-grid"
                );


            categoryLoadouts.forEach(
                (loadout, cardIndex) => {

                    grid.appendChild(
                        createCard(
                            loadout,
                            cardIndex
                        )
                    );

                }
            );


            container.appendChild(
                section
            );

        }
    );


    if (
        totalDisplayed === 0
    ) {

        emptyState.classList.add(
            "show"
        );

    } else {

        emptyState.classList.remove(
            "show"
        );

    }

}


/* =========================================
   CREATE CARD
========================================= */

function createCard(
    loadout,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "loadout-card";


    card.style.animationDelay =
        `${index * 0.05}s`;


    const mainAttachments =
        loadout.main
            .map(
                attachment =>
                    `<li>${escapeHTML(attachment)}</li>`
            )
            .join("");


    const imageHTML =
        loadout.image
            ? `
                <img
                    class="weapon-image"
                    src="${escapeHTML(loadout.image)}"
                    alt="${escapeHTML(loadout.name)}"
                    onerror="this.style.display='none'"
                >
              `
            : `
                <div class="weapon-image placeholder">
                    ${escapeHTML(loadout.name)}
                </div>
              `;


    card.innerHTML = `

        <div class="card-top">

            <span class="weapon-category">
                ${escapeHTML(loadout.category)}
            </span>

            <button
                class="favorite-btn ${
                    loadout.favorite
                        ? "active"
                        : ""
                }"
                data-action="favorite"
                data-id="${loadout.id}"
                title="Favorite"
            >
                ${
                    loadout.favorite
                        ? "★"
                        : "☆"
                }
            </button>

        </div>


        ${imageHTML}


        <h3 class="weapon-name">
            ${escapeHTML(loadout.name)}
        </h3>


        <p class="description">
            ${
                escapeHTML(
                    loadout.description ||
                    "No description added."
                )
            }
        </p>


        <div class="build main-build">

            <div class="build-title">
                MAIN BUILD
            </div>

            <ul class="attachments">

                ${
                    mainAttachments ||
                    "<li>No attachments added</li>"
                }

            </ul>

        </div>


        <div class="build optic-build">

            <div class="build-title">
                OPTIC
            </div>

            <ul class="attachments">

                <li>
                    ${
                        escapeHTML(
                            loadout.optic ||
                            "No optic selected"
                        )
                    }
                </li>

            </ul>

        </div>


        <div class="card-info">

            ${
                loadout.playstyle
                    ? `
                        <span class="info-tag">
                            ${escapeHTML(
                                loadout.playstyle
                            )}
                        </span>
                      `
                    : ""
            }


            ${
                loadout.perks
                    ? `
                        <span class="info-tag">
                            ${escapeHTML(
                                loadout.perks
                            )}
                        </span>
                      `
                    : ""
            }

        </div>


        <div class="card-actions">

            <button
                class="card-action"
                data-action="edit"
                data-id="${loadout.id}"
            >
                EDIT
            </button>


            <button
                class="card-action"
                data-action="copy"
                data-id="${loadout.id}"
            >
                COPY
            </button>


            <button
                class="card-action delete"
                data-action="delete"
                data-id="${loadout.id}"
            >
                ×
            </button>

        </div>

    `;


    return card;

}


/* =========================================
   CARD ACTIONS
========================================= */

container.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.dataset.action;


        const id =
            Number(
                button.dataset.id
            );


        if (
            action === "favorite"
        ) {

            toggleFavorite(id);

        }


        if (
            action === "edit"
        ) {

            openEditModal(id);

        }


        if (
            action === "delete"
        ) {

            openDeleteModal(id);

        }


        if (
            action === "copy"
        ) {

            copyLoadout(id);

        }

    }
);


/* =========================================
   FAVORITE
========================================= */

function toggleFavorite(id) {

    const loadout =
        loadouts.find(
            item =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    loadout.favorite =
        !loadout.favorite;


    saveLoadouts();

    renderLoadouts();

}


/* =========================================
   COPY
========================================= */

function copyLoadout(id) {

    const loadout =
        loadouts.find(
            item =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    const text = `

${loadout.name}

Category:
${loadout.category}

MAIN BUILD:
${loadout.main.join("\n")}

OPTIC:
${loadout.optic}

Playstyle:
${loadout.playstyle}

Perks:
${loadout.perks}

    `.trim();


    navigator.clipboard
        .writeText(text)
        .then(
            () => {

                alert(
                    `${loadout.name} copied!`
                );

            }
        )
        .catch(
            () => {

                alert(
                    "Could not copy loadout."
                );

            }
        );

}


/* =========================================
   ADD MODAL
========================================= */

function openAddModal() {

    loadoutForm.reset();


    document.getElementById(
        "editId"
    ).value = "";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "ADD LOADOUT";


    modal.classList.add(
        "show"
    );

}


/* =========================================
   EDIT MODAL
========================================= */

function openEditModal(id) {

    const loadout =
        loadouts.find(
            item =>
                item.id === id
        );


    if (!loadout) {
        return;
    }


    document.getElementById(
        "editId"
    ).value =
        loadout.id;


    document.getElementById(
        "weaponName"
    ).value =
        loadout.name;


    document.getElementById(
        "weaponCategory"
    ).value =
        loadout.category;


    document.getElementById(
        "weaponImage"
    ).value =
        loadout.image;


    document.getElementById(
        "description"
    ).value =
        loadout.description;


    document.getElementById(
        "mainBuild"
    ).value =
        loadout.main.join(
            "\n"
        );


    document.getElementById(
        "optic"
    ).value =
        loadout.optic;


    document.getElementById(
        "playstyle"
    ).value =
        loadout.playstyle;


    document.getElementById(
        "perks"
    ).value =
        loadout.perks;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "EDIT LOADOUT";


    modal.classList.add(
        "show"
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    modal.classList.remove(
        "show"
    );

}


document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


document
    .getElementById(
        "cancelBtn"
    )
    .addEventListener(
        "click",
        closeModal
    );


/* =========================================
   FORM SUBMIT
========================================= */

loadoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const editId =
            document.getElementById(
                "editId"
            ).value;


        const main =
            document.getElementById(
                "mainBuild"
            ).value
                .split("\n")
                .map(
                    item =>
                        item.trim()
                )
                .filter(
                    item =>
                        item.length > 0
                );


        const data = {

            name:
                document.getElementById(
                    "weaponName"
                ).value.trim(),

            category:
                document.getElementById(
                    "weaponCategory"
                ).value,

            image:
                document.getElementById(
                    "weaponImage"
                ).value.trim(),

            description:
                document.getElementById(
                    "description"
                ).value.trim(),

            main: main,

            optic:
                document.getElementById(
                    "optic"
                ).value.trim(),

            playstyle:
                document.getElementById(
                    "playstyle"
                ).value.trim(),

            perks:
                document.getElementById(
                    "perks"
                ).value.trim()

        };


        /* EDIT */

        if (editId) {

            const index =
                loadouts.findIndex(
                    item =>
                        item.id ===
                        Number(editId)
                );


            if (index !== -1) {

                loadouts[index] = {

                    ...loadouts[index],

                    ...data

                };

            }

        }


        /* ADD */

        else {

            loadouts.push({

                id:
                    Date.now(),

                ...data,

                favorite: false,

                createdAt:
                    Date.now()

            });

        }


        saveLoadouts();

        renderLoadouts();

        closeModal();

    }
);


/* =========================================
   DELETE
========================================= */

function openDeleteModal(id) {

    deleteTargetId = id;

    deleteModal.classList.add(
        "show"
    );

}


function closeDeleteModal() {

    deleteTargetId = null;

    deleteModal.classList.remove(
        "show"
    );

}


document
    .getElementById(
        "cancelDelete"
    )
    .addEventListener(
        "click",
        closeDeleteModal
    );


document
    .getElementById(
        "confirmDelete"
    )
    .addEventListener(
        "click",
        function() {

            if (
                deleteTargetId === null
            ) {
                return;
            }


            loadouts =
                loadouts.filter(
                    item =>
                        item.id !==
                        deleteTargetId
                );


            saveLoadouts();

            renderLoadouts();

            closeDeleteModal();

        }
    );


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderLoadouts
);


/* =========================================
   SORT
========================================= */

sortSelect.addEventListener(
    "change",
    renderLoadouts
);


/* =========================================
   ADD BUTTON
========================================= */

document
    .getElementById(
        "addLoadoutBtn"
    )
    .addEventListener(
        "click",
        openAddModal
    );


/* =========================================
   CLOSE MODALS OUTSIDE
========================================= */

modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeModal();

        }

    }
);


deleteModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === deleteModal
        ) {

            closeDeleteModal();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeModal();

            closeDeleteModal();

        }

    }
);


/* =========================================
   INITIAL LOAD
========================================= */

renderLoadouts();