async function fetchData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();

    const genderResponseMale = await fetch(`https://pokeapi.co/api/v2/gender/1`);
    const genderMale = await genderResponseMale.json();
    
    const genderResponseFemale = await fetch(`https://pokeapi.co/api/v2/gender/2`);
    const genderFemale = await genderResponseFemale.json();
    
    const genderResponseGenderless = await fetch(`https://pokeapi.co/api/v2/gender/3`);
    const genderGenderless = await genderResponseGenderless.json();

    let gender = "unknown";
    const Male = genderMale.pokemon_species_details.some(p => p.pokemon_species.name === data.name);
    const Female = genderFemale.pokemon_species_details.some(p => p.pokemon_species.name === data.name);
    const Genderless = genderGenderless.pokemon_species_details.some(p => p.pokemon_species.name === data.name);

    if (Male && Female) {
      gender = "Male/Female";
    } else if (Male) {
      gender = "Male";
    } else if (Female) {
      gender = "Female";
    } else if (Genderless) {
      gender = "Genderless";
    }


    const pokeInfo = {
        name: capitalizeFirstLetter(data.name),
        id: data.id,
        type: capitalizeFirstLetter(data.types[0].type.name),
        gender: gender
    }
    

    console.log(data)
    createPoke(pokeInfo);


}
const pokemonNumber = 150;

async function pokeNum() {
    for(let i = 1 ;i<=pokemonNumber;  i++){
        await fetchData(i);
    }
}


function createPoke(pokeInfo) {
    const container = document.querySelector('.pokedex-container')
    const poke = document.createElement('div')

    poke.classList.add('pokemon-container')

    const idImg = (pokeInfo.id).toString().padStart(3,'0');

    poke.innerHTML = `
        <div class="img-container">
                <img src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${idImg}.png">
            </div>
            <h1 class="poke-name">${pokeInfo.name}</h1>
            <p class="id">ID: ${pokeInfo.id}</p>
            <p class="gender">Gender: ${pokeInfo.gender}</p>
            <p class="type">Type: ${pokeInfo.type}</p>
    `;

    container.appendChild(poke);
}

function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }


function findPoke(name) {
    const findValue = document.querySelector('.search-bar').value;

    if(findValue !== name) (
        document.querySelectorAll('.pokemon-container').forEach(poke => {
            poke.style.display = 'none'
        })
    )

}


function findPoke() {
    const findValue = document.querySelector('.search-bar').value.toLowerCase();
    const pokemons = document.querySelectorAll('.pokemon-container');

    pokemons.forEach(poke => {
        const pokeName = poke.querySelector('.poke-name').innerText.toLowerCase();
        if (pokeName.includes(findValue)) {
            poke.style.display = 'flex';
        } else {
            poke.style.display = 'none';
        }
    });
}


function enterFind(e) {
    if(e.key === 'Enter') {
        findPoke();
    }
}


document.querySelector('.search-btn').addEventListener('click',findPoke)
document.querySelector('.search-bar').addEventListener('keydown', enterFind);

pokeNum();