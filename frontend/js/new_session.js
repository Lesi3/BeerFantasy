document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.history.back();
        });
    }
    
    selectGroup();
});

function selectGroup(){
    fetch("/api/groups/${user_id}")
        .then(response => {
        if (!response.ok) {
                throw new Error("Error al cargar los grupos");
            }
            return response.json();
        })
        .then(groups => {
            const select = document.getElementById("groupSelect");
            select.innerHTML = "";

            groups.forEach(group => {
                const option = document.createElement("option");
                option.value = group.id;
                option.textContent = group.name;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.log("Error")
        })
}
