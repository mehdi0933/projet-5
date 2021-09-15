const urlData = new URL(document.location);
let urlSearchParams = urlData.searchParams
let ref_produit = urlSearchParams.get('ref_produit');

fetch(`http://localhost:3000/api/teddies/${ref_produit}`)
   .then(response => response.json())
   .then(function (data) {
      let paragrphe;


      if (data.name === undefined) {
         document.getElementById("contenu").innerHTML = 'PAGE INCONNUE';
         document.getElementById("contenu").style.marginLeft = '35%';
         document.getElementById("contenu").style.fontSize = '400%';
         document.getElementById("bouton").style.display = "none";
      };

      block = document.createElement('div');
      block.classList.add('block')

      paragraphe = document.createElement('p');
      let image = document.createElement('img');
      image.setAttribute('src', data.imageUrl);
      image.setAttribute('alt', 'nounours');
      paragraphe.appendChild(image);
      block.appendChild(paragraphe);

      paragraphe = document.createElement('p');
      paragraphe.innerHTML = 'name :' + data.name;
      block.appendChild(paragraphe);

      paragraphe = document.createElement('p');
      paragraphe.innerHTML = 'description :' + data.description;
      block.appendChild(paragraphe);

      paragraphe = document.createElement('p');
      paragraphe.innerHTML = 'price :' + data.price + '$';
      block.appendChild(paragraphe);

      let select = document.createElement('select');
      select.setAttribute('id', 'select');
      select.setAttribute('name', 'couleurs');
      let option;
      for (i = 0; i < data.colors.length; i++) {
         option = document.createElement('option');
         option.setAttribute('value', data.colors[i]);
         if (i == 0) {
            option.setAttribute('selected', "");

         }
         option.innerHTML = data.colors[i];
         select.appendChild(option);

      }

      block.appendChild(select)

      document.getElementById("contenu").appendChild(block);

      document.getElementById("bouton").addEventListener("click", function () {
         let listeCouleur = document.getElementById('select');
         let couleur = listeCouleur.value;

         if (sessionStorage.getItem('selectionProduit') === null) {
            //  creer un tableau
            let tableauProduit = [];
            //  ajouter une ligne avec le produit(id nom prix liens photos)
            let ObjectProduit = {
               id: data._id,
               name: data.name,
               price: data.price,
               imageUrl: data.imageUrl,
               couleur: couleur

            };
            tableauProduit.push(ObjectProduit);
            // traduire le tableau en json
            let tableauJson = JSON.stringify(tableauProduit);
            // mettre le json en storege
            sessionStorage.setItem("selectionProduit", tableauJson);
            console.log(sessionStorage.setItem("selectionProduit", tableauJson))
         } else {
            //  recuper ce qui est en storage
            let tableauProduit = sessionStorage.getItem("selectionProduit");
            //   traduire le json recupere en js ( j'aurait un tableau)
            let tableauJs = JSON.parse(tableauProduit);
            //    ajouter une ligne avec le produit(id nom prix liens photos)
            let ObjectProduit = {
               id: data._id,
               name: data.name,
               price: data.price,
               imageUrl: data.imageUrl,
               couleur: couleur

            };
            tableauJs.push(ObjectProduit);
            //  traduire le tableau en json
            let tableauJson = JSON.stringify(tableauJs);
            // mettre le json en storege
            sessionStorage.setItem("selectionProduit", tableauJson);

         }

      });

   });
