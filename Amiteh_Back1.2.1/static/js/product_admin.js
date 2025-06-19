document.addEventListener("DOMContentLoaded", function() {
    const categorySelect = document.getElementById("id_category");

    if (categorySelect) {
        categorySelect.addEventListener("change", function() {
            const categoryId = this.value;
            if (categoryId) {
                // Fetch category parameters via AJAX
                fetch(`/admin/product/get-category-parameters/${categoryId}/`)
                    .then(response => response.json())
                    .then(data => {
                        // Clear any existing parameter fields
                        const parametersContainer = document.getElementById("parameters-container");
                        parametersContainer.innerHTML = "";

                        // Dynamically create input fields for each parameter
                        for (let i = 1; i <= 7; i++) {
                            const paramName = data[`parameter${i}`];
                            if (paramName) {
                                const field = document.createElement("div");
                                field.className = "form-row";
                                field.innerHTML = `
                                    <label>${paramName}:</label>
                                    <input type="text" name="parameter_value${i}" id="id_parameter_value${i}" class="vTextField">
                                `;
                                parametersContainer.appendChild(field);
                            }
                        }
                    })
                    .catch(error => console.error("Error fetching category parameters:", error));
            }
        });
    }
});
