const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");

//UI Objesini Başlatma 

const ui = new UI();

//Storage Objesş Üret 
const  storage = new Storage();

// Tüm Evenetleri Yükleme 

eventlisteners();

function eventlisteners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films)
    });
    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}


function addFilm(e){
    const title = titleElement.value;
    const director =directorElement.value;
    const url = urlElement.value;


    if (title === "" || director === "" || url === "" ){
        //Hata Mesajı 
        ui.displayMessages("Tüm Alanları Doldurun...","danger");
    }
    else{
        //Yeni Film Olusturma
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // Fİlm Ekleme
        storage.addFilmToStorage(newFilm); //Storage Fİlm Ekleme 
        ui.displayMessages("Film Başarı İle Eklendi ;) ","success");

    }

    ui.clearInput(titleElement,urlElement,directorElement);
    e.preventDefault();
}

function deleteFilm(e){

   if(e.target.id === "delete-film"){
       ui.deleteFilmFromUI(e.target);
       storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
       ui.displayMessages("Silme İşlemi başarılı...","success");
   }
}

function clearAllFilms(){

    if(confirm("Eminmisiniz ??")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();

    }
   
}