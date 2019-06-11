function changePanel (hideId, showId) {
    let hideElement = document.getElementById(hideId);
    let showElement = document.getElementById(showId);
    hideElement.classList.add("hidden")
    showElement.classList.remove("hidden")
    document.querySelector(`[href="#${showId}"]`).classList.add("hidden")
    document.querySelector(`[href="#${hideId}"]`).classList.remove("hidden")
}