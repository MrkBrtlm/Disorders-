document.addEventListener("DOMContentLoaded", function () {
    const disorderList = document.getElementById("disorder-list");
    const modalContainer = document.getElementById("modal-container");
    const modalTitle = document.getElementById("modal-title");
    const modalCriteria = document.getElementById("modal-criteria");
    const closeModalBtn = document.getElementById("close-modal");

    // Load disorders from JSON
    fetch("disorders.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                // Create category header
                const categoryHeader = document.createElement("li");
                categoryHeader.classList.add("category-title");
                categoryHeader.textContent = category.category;
                disorderList.appendChild(categoryHeader);

                // Create disorder list items
                category.disorders.forEach(disorder => {
                    const listItem = document.createElement("li");
                    listItem.className = "flex items-center justify-between border-b p-2";
                    listItem.innerHTML = `
                        <label class="flex items-center">
                            <input type="checkbox" class="mr-2">
                            ${disorder.name}
                        </label>
                        <button class="view-btn bg-blue-500 text-white px-3 py-1 rounded" data-id="${disorder.id}">
                            View Diagnosis Criteria
                        </button>
                    `;
                    disorderList.appendChild(listItem);
                });
            });
        })
        .catch(error => console.error("Error loading JSON:", error));

    // Event delegation for dynamically added buttons
    disorderList.addEventListener("click", function (event) {
        if (event.target.classList.contains("view-btn")) {
            const disorderId = event.target.getAttribute("data-id");
            openModal(disorderId);
        }
    });

    // Function to display disorder criteria in modal
    function openModal(disorderId) {
        fetch("disorders.json")
            .then(response => response.json())
            .then(data => {
                let disorder = null;
                data.forEach(category => {
                    category.disorders.forEach(d => {
                        if (d.id === disorderId) {
                            disorder = d;
                        }
                    });
                });

                if (disorder) {
                    modalTitle.textContent = disorder.name;
                    modalCriteria.innerHTML = disorder.criteria
                        .map(item => `<li>${item}</li>`)
                        .join("");

                    // Show modal
                    modalContainer.style.display = "flex";
                }
            })
            .catch(error => console.error("Error loading disorder details:", error));
    }

    // Close modal when clicking the button
    closeModalBtn.addEventListener("click", function () {
        modalContainer.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    modalContainer.addEventListener("click", function (event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = "none";
        }
    });
});

