document.addEventListener("DOMContentLoaded", () => {
    const backBtn = document.getElementById("backBtn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.history.back();
        });
    }
    
    start_session();
    go_data();
});

function start_session(){
    const data_button = document.getElementById("startSessionBtn");
    data_button.addEventListener("click", () =>{
        window.location.href = "pre_sessions.html"
    })
}

function go_data(){
    const data_button = document.getElementById("dataBtn");
    data_button.addEventListener("click", () =>{
        window.location.href = "data_menu.html"
    })
}
