// Elements du DOM
const divVies = document.querySelector('.vies');
const message = document.getElementById('message');
const formulaire = document.getElementById('inputBox');
const input = document.getElementById('number');
const essayerBtn = document.getElementById('essayerBtn');
const rejouerBtn = document.getElementById('rejouer');
const body = document.getElementsByTagName('body')[0];

// Modèle de coeurs
const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = '<ion-icon name="heart"></ion-icon>';

// Fond
const bgFroid = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
const bgTiede = 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
const bgChaud = 'linear-gradient(to right, #f83600 0%, #f9d423 100%)';
const bgBrulant = 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)';

const bgWin = 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)';
const bgLoose = 'background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898';

// PLAY : 
const play = () => {

    // nombre aléatoire
    const randomNumber = Math.floor(Math.random() * 101);
    const totalVies = 6;
    let vies = totalVies;
    console.log(randomNumber);

    // actualisation à chaque essai - TOUTE LA LOGIQUE
    formulaire.addEventListener('submit', (e) => {
        e.preventDefault();
        const valeurInput = parseInt(input.value);

        if(valeurInput < 0 || valeurInput > 100) return;
        
        if(valeurInput === randomNumber){
            body.style.backgroundImage = bgWin;
            message.textContent = `BRAVO !!! Le nombre était bien ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }

        if(valeurInput !== randomNumber) {
            if(randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3){
                body.style.backgroundImage = bgBrulant;
                message.textContent = "C'est Brûlant !!! 🔥🔥🔥 ";
            } else if (randomNumber < valeurInput + 6 && randomNumber > valeurInput - 6){
                body.style.backgroundImage = bgChaud;
                message.textContent = "C'est Chaud !!! 🔥 ";
            } else if (randomNumber < valeurInput + 11 && randomNumber > valeurInput - 11){
                body.style.backgroundImage = bgTiede;
                message.textContent = "C'est Tiède !!! 😐 ";
            } else {
                body.style.backgroundImage = bgFroid;
                message.textContent = "C'est Froid !!! ❄️ ";
            }
            vies--;
            verifyLoose();
        }

        actualiseCoeurs(vies);
        
    })

    const verifyLoose = () => {
        if(vies === 0){
            body.style.backgroundImage = bgLoose;
            body.style.color = '#990000';
            essayerBtn.setAttribute("disable", "");
            message.textContent = `Vous avez perdu. La réponse était ${randomNumber}`;
            rejouerBtn.style.display = "block";
        }
    }

    const actualiseCoeurs = (vies) => {
        divVies.innerHTML = "";
        let tableauDeVies = [];
        for(let i = 0; i < vies; i++) {
            tableauDeVies.push(coeurPlein);
        }
        for(let i = 0; i < totalVies - vies; i++) {
            tableauDeVies.push(coeurVide);
        }
        tableauDeVies.forEach(coeur => {
            divVies.innerHTML += coeur;
        })
    }
    actualiseCoeurs(vies);

}

play();