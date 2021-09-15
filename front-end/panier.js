
let data = sessionStorage.getItem('selectionProduit');
let tableaujs = JSON.parse(data);
if ((data === null) || (tableaujs.length === 0)) {
  // bouton invisible
  let formulaire = document.getElementById('formulaire');
  formulaire.style.display = 'none';
  let contenu = document.getElementById('contenu');
  contenu.innerHTML = ` le panier est vide ! retounez vers<a href ='index.html'> cliquez ici </a>   `;
} else {
  // bouton visible
  let block;
  let pagraphe;
  let image;
  let button;
  for (i = 0; i < tableaujs.length; i++) {
    id = tableaujs[i].id;
    nom = tableaujs[i].name;
    prix = tableaujs[i].price;
    imageUrl = tableaujs[i].imageUrl;
    couleur = tableaujs[i].couleur;
    block = document.createElement('div');
    block.classList.add('block');
    paragraphe = document.createElement('p');
    paragraphe.innerHTML = `ref produit: ` + id;
    button = document.createElement('button');
    button.setAttribute('id', i);
    button.innerHTML = `&times`;
    button.style.border = 'none';
    button.style.marginLeft = '35px'
    paragraphe.appendChild(button)
    block.appendChild(paragraphe);

    paragraphe = document.createElement('p');
    paragraphe.innerHTML = 'name :' + nom;
    block.appendChild(paragraphe);

    paragraphe = document.createElement('p');
    paragraphe.innerHTML = 'price :' + prix + '$';
    block.appendChild(paragraphe);

    paragraphe = document.createElement('p');
    image = document.createElement('img');
    image.setAttribute('src', imageUrl);
    image.setAttribute('alt', 'nounours');
    paragraphe.appendChild(image);
    block.appendChild(paragraphe);

    paragraphe = document.createElement('p');
    paragraphe.innerHTML = `colors :` + couleur;
    block.appendChild(paragraphe);


    document.getElementById("contenu").appendChild(block);
    let numero = document.getElementById(i).getAttribute('id')

    button.addEventListener("click", function () {

      let suprime = tableaujs.splice(numero, 1)

      let tableaujson = JSON.stringify(tableaujs);

      sessionStorage.setItem('selectionProduit', tableaujson)
      document.location.reload();


    })
  }

  document.getElementById("bouton").addEventListener("click", function (e) {
    // faire les teste

    e.preventDefault();
    let inputNom = document.getElementById('inputNom');
    if (/[a-zA-Z]/.test(inputNom.value)) {
      localStorage.setItem("nom", document.getElementById("inputNom").value);
    } else {

      document.getElementById('inputNom').value = '';
      document.getElementById('inputNom').placeholder = 'indiquez votre nom';
    }
    let inputPrenom = document.getElementById('inputPrenom');
    if (/[a-zA-Z]/.test(inputPrenom.value)) {
      localStorage.setItem("prenom", document.getElementById("inputPrenom").value);
    } else {
      document.getElementById('inputPrenom').value = '';
      document.getElementById('inputPrenom').placeholder = 'indiquez votre prenom';
    }
    let inputEmail4 = document.getElementById('inputEmail4');
    if (/[@]/.test(inputEmail4.value)) {
      localStorage.setItem("mail", document.getElementById("inputEmail4").value);
    } else {
      document.getElementById('inputEmail4').value = '';
      document.getElementById('inputEmail4').placeholder = 'indiquez votre adresse mail';
    }

    let inputAddress = document.getElementById("inputAddress");
    if (/[a-zA-Z0-9]/.test(inputAddress.value)) {
      localStorage.setItem("adresse", document.getElementById("inputAddress").value);
    } else {
      document.getElementById('inputAddress').value = '';
      document.getElementById('inputAddress').placeholder = 'indiquez votre adresse';
    }

    let inputVille = document.getElementById("inputAddress");
    if (/[a-zA-Z]/.test(inputVille4.value)) {
      localStorage.setItem("ville", document.getElementById("inputVille4").value);
    } else {
      document.getElementById('inputVille4').value = '';
      document.getElementById('inputVille4').placeholder = 'indiquez votre ville';
    }




    if ((localStorage.getItem('prenom') && (localStorage.getItem('nom')) && (localStorage.getItem('mail')) && (localStorage.getItem('adresse') && (localStorage.getItem('ville')) !== null))) {
      document.getElementById("manque").innerHTML = 'valide';
      document.getElementById("manque").style.textAlign = 'center';
      let contact = {
        firstName: localStorage.getItem('nom'),
        lastName: localStorage.getItem('prenom'),
        email: localStorage.getItem('mail'),
        address: localStorage.getItem('adresse'),
        city: localStorage.getItem('ville'),

      }
      let panier = sessionStorage.getItem('selectionProduit');
      let products = JSON.parse(panier);
      let productsId = [];
      for (let i = 0; i < products.length; i++) {
        productsId.push(products[i].id);

      }
      products = productsId;
      let data = { contact, products };
      fetch("http://localhost:3000/api/teddies/order", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),

      })

        .then((response) => response.json())
        .then((data) => {
          alert('le numero de commande :' + data.orderId);
         
            sessionStorage.clear();
        })
        .catch((error) => { console.log(error) });

    } else {
      document.getElementById("manque").innerHTML = 'remplissez tous les champs';
      document.getElementById("manque").style.textAlign = 'center';
      alert("La commande n'est pas prise en compte verifiez que vous avez bien remplie les champs ");
    };
   

  });
};




if (localStorage.getItem('nom') !== null) {
  document.getElementById('inputNom').value = localStorage.getItem('nom');
};

if (localStorage.getItem('prenom') !== null) {
  document.getElementById('inputPrenom').value = localStorage.getItem('prenom');
};

if (localStorage.getItem('mail') !== null) {
  document.getElementById('inputEmail4').value = localStorage.getItem('mail');
};
if (localStorage.getItem('adresse') !== null) {
  document.getElementById('inputAddress').value = localStorage.getItem('adresse');
};

if (localStorage.getItem('ville') !== null) {
  document.getElementById('inputVille4').value = localStorage.getItem('ville');
};