
/*
* Element de la page principale
*/
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const close = document.querySelector('.close');
const tanksModal = document.querySelector('.tanksModal')
const submit = document.querySelector('#Form');
/*
* Element de la modale
*/
let firstname = document.querySelector('#first');
let lastname = document.querySelector('#last');
let email = document.querySelector('#email');
let birthdate = document.querySelector('#birthdate');
let quantity = document.querySelector('#quantity');
let locationValue = document.querySelectorAll('#location input');
let locationDiv = document.querySelector('#location');
let CGU = document.querySelector('#CGU');
let newsletter = document.querySelector('#newsletter');
/*
* Regex configuration
*/
const regEmail = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
const regGen = new RegExp(/^.{2,}$/);
const regNumber = new RegExp(/^[0-9]+$/);
const regbirthdate = new RegExp(/\d{4}-\d{2}-\d{2}/);
//Variable qui gere la selection des villes
let city = "";
//initialise-les écoutes des events
checkValue();


function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
close.addEventListener('click',closeModal);
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal
function closeModal() {
  modalbg.style.display = "none";
}
//Gere les event d'ecoute des champs par Oninput et OnSubmit
//puis verifie la case des conditions
function change(input,regex,msg) {
  input.oninput = (e) =>{
    e.preventDefault();
    InputValidate(input,regex,msg);
  }

  submit.addEventListener('submit', (e)=>{
    e.preventDefault();
    InputValidate(input,regex,msg);
  })

  CGU.onchange = ()=>{
    if(CGU.checked === false) {
      CGU.parentElement.setAttribute('data-error-visible', true);
      CGU.parentElement.setAttribute('data-error', "Veuillez accepter les Conditions d'utilisation");
      CGU.parentElement.setAttribute('data-valid',false);
    }else {
      CGU.parentElement.setAttribute('data-error-visible',false);
      CGU.parentElement.setAttribute('data-valid',true);
    }
  }
}

// function qui regroupe toutes les ecoutes
function checkValue() {
  change(firstname,regGen,'Veuillez entrer 2 caractères ou plus pour le champ du prénom');
  change(lastname,regGen,'Veuillez entrer 2 caractères ou plus pour le champ du nom');
  change(email,regEmail,'Veuillez entrer un email valide pour ce champ.');
  change(birthdate,regbirthdate,'Vous devez entrer votre date de naissance.');
  change(quantity,regNumber,'Vous devez entrer un nombre dans ce champ.');
}

//function qui permet la verification des champs
//a = Dom Element
//b = regex
// c = mesages
function InputValidate(a, b ,c) {
  let checkValidValue = b.test(a.value); // test de confirmitée des regex
  //verifie si le champ est vide Ou non
  if(a.value.length <=0) {
    a.parentElement.setAttribute('data-error-visible',true);
    a.parentElement.setAttribute('data-valid-visible',false);
    a.parentElement.setAttribute('data-error','Veuillez remplir ces champs!');
    a.parentElement.setAttribute('data-valid',false);
    return false;
  }
  // realise le test est assigne un message d'erreur ou de validation
  if (checkValidValue) {

    a.parentElement.setAttribute('data-error-visible',false);
    a.parentElement.setAttribute('data-valid-visible',true);
    a.parentElement.setAttribute('data-valid',true);
  } else {
    a.parentElement.setAttribute('data-error-visible',true);
    a.parentElement.setAttribute('data-error',c);
    a.parentElement.setAttribute('data-valid',false);
  }
}
//fonction submit qui envois les donner du formulaire
function validate() {
  // boucle qui gere le choix des villes
  locationValue.forEach((el)=>{
    let verify = document.querySelector(`#${el.id}`);
    verify.onchange = ()=>{
      locationDiv.setAttribute('data-error-visible',false);
      locationDiv.setAttribute('data-valid',true);
    }
    return verify.checked ? city = verify : city
  })
  if(city == ""){
    locationDiv.setAttribute('data-error-visible',true);
    locationDiv.setAttribute('data-error',"Veuillez choisir une ville");
    locationDiv.setAttribute('data-valid',false);
  }else {
    locationDiv.setAttribute('data-error-visible',false);
    locationDiv.setAttribute('data-valid',true);
  }
  //condition qui verifie que tous les champs sont conforme
  if( checkValidity(firstname.parentElement) === "true" &&
      checkValidity(lastname.parentElement) === "true"  &&
      checkValidity(email.parentElement) === "true"  &&
      checkValidity(birthdate.parentElement) === "true"  &&
      checkValidity(quantity.parentElement) === "true"  &&
      checkValidity(CGU.parentElement) === "true"  &&
      checkValidity(locationDiv) === "true"
  ) {
    // objet qui permet l'envoie vers un fetch
    let UserData =  {
      firstname : firstname.value,
      lastname : lastname.value,
      email : email.value,
      birthdate: birthdate.value,
      quantity : quantity.value,
      locationValue : city.value,
      CGU : CGU.checked,
      newsletter : newsletter.checked,
    }

    console.log("Formulaire: ",UserData);
    //reset du fomulaire fermeture de la modale des formulaires ouverture de la modale de remerciement
    submit.reset();
    closeModal();
    OpenTanksModal();
  } else  {
    //sinon envoie une erreur
    console.log('erreur')
    return false
  }


}

//fonction qui verifie la confiormité des champs return True ou false
function checkValidity(a) {
  if( a.getAttribute('data-valid')=== null) return false;
  return a.getAttribute('data-valid');
}

//ouvre la modale de remerciement
function OpenTanksModal() {
  tanksModal.style.display = "block";
}
//Ferme la modale de remerciement est relaod la page
function closeTanksModal() {
  tanksModal.style.display = "none";
  location.reload();
}