
function darkMode() {

    const btnToggle = document.querySelector('.btn-toggle');

btnToggle.addEventListener('click', () => {

    const body = document.body;

    if(body.classList.contains('dark')){

        body.classList.replace('dark', 'light')
        btnToggle.innerHTML = "Dark"

    } else if(body.classList.contains('light')){

        body.classList.replace('light', 'dark')
        btnToggle.innerHTML = "Light"

    }

})
}

export default darkMode;