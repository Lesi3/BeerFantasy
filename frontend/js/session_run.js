document.addEventListener("DOMContentLoaded", () => {
    loadDrinks();
    setDrinks();
});

function loadDrinks() {
    fetch("/api/drinks")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar bebidas");
            }
            return response.json();
        })
        .then(drinks => {
            const select = document.getElementById("drinkSelect");

            // Limpiar por si acaso
            select.innerHTML = "";

            drinks.forEach(drink => {
                const option = document.createElement("option");
                option.value = drink.id;
                option.textContent = drink.name;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function setDrinks(){
    const select = document.getElementById("drinkSelect");
    const tableDrinks = document.getElementById("drinksTableBody");
    const addBtn = document.getElementById("addDrinkBtn");

    addBtn.addEventListener("click", () => {
        const fila = document.createElement("tr");
        const drinkName = document.createElement("td");
        const drinkQuantity = document.createElement("td");
        const drinkPrice = document.createElement("td");
        drinkName = select.textContent;
        drinkQuantity = 1;
        fila.appendChild(drinkName);
        fila.appendChild(drinkQuantity);
        tableDrinks.appendChild(fila);
    });   
}

