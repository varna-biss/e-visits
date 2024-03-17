
const select = document.querySelector('select');
const allLang = ['bg', 'en', 'ru'];


select.addEventListener('change', changeURLLanguage);

// select перенаправит на url с указанием языка
function changeURLLanguage() {
    let lang = select.value;
    location.href = window.location.pathname + '#' + lang;
    location.reload();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    
    if (!allLang.includes(hash)) {
        location.href = window.location.pathname + '#bg';
        location.reload();
    }
    select.value = hash;
    document.querySelector('title').innerHTML = langArr['header-title'][hash];
    document.querySelector('.lng-header-title').innerHTML = langArr['header-title'][hash];
    document.querySelector('.lng-form-title').innerHTML = langArr['form-title'][hash];
    for (let key in langArr) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = langArr[key][hash];
        }

    }
}

changeLanguage();
