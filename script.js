document.addEventListener("DOMContentLoaded", function () {
    fetch("disorders.json")
        .then(response => response.json())
        .then(data => {
            const disorderList = document.getElementById("disorder-list");

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

            // Attach event listener to dynamically created buttons
            document.querySelectorAll(".view-btn").forEach(button => {
                button.addEventListener("click", function () {
                    openModal(this.getAttribute("data-id"));
                });
            });
        })
        .catch(error => console.error("Error loading JSON:", error));
});

// Function to display the disorder's criteria in a modal
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
                document.getElementById("modal-title").textContent = disorder.name;
                document.getElementById("modal-criteria").innerHTML = disorder.criteria
                    .map(item => `<li>${item}</li>`)
                    .join("");

                // Show modal
                document.getElementById("modal-container").style.display = "flex";
            }
        })
        .catch(error => console.error("Error loading disorder details:", error));
}

// Function to close the modal
document.getElementById("close-modal").addEventListener("click", function () {
    document.getElementById("modal-container").style.display = "none";
});
