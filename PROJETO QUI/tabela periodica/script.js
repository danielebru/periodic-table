
const grupos = {
    'nao-metais': [ 'C', 'N', 'O', 'P', 'S', 'Se' ],
    'metais-alcalinos': ['Li', 'Na', 'K', 'Rb', 'Cs', 'Fr'],
    'metais-alcalino-terrosos': ['Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra'],
    'gases-nobres': ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn', 'Og'],
    'halogênios': ['F', 'Cl', 'Br', 'I', 'At', 'Ts'],
    
    'semimetais': ['B', 'Si', 'Ge', 'As', 'Sb', 'Bi','Te','Po'],
    'metaistransição': [
        'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Y', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Ts', 'Og'
    ],
    'lantanídeos': ['La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu'],
    'actinídeos': ['Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr'],
    'metais-repre': ['Al','Ga','In','Sn','Tl','Pb','Bi','Nh', 'Fl', 'Mc', 'Lv'],};


//Não estava conseguindo clicar em alguns elementos porque nem todos seguiam as mesmas classes então adicionei aqui
const elementos = document.querySelectorAll('.element, .lutecio, .hid, .helio, .litio, .boro, .sodio, .potassio, .cesio, .francio, .torio, .cerio, .oga, .criptonio, .rubidio, .aluminio');
elementos.forEach(element => {
    const symbol = element.querySelector('.symbol').textContent; // Captura o símbolo químico


    for (const [grupo, simbolos] of Object.entries(grupos)) {
        if (simbolos.includes(symbol)) {
            element.classList.add(grupo);
            break; 
        }
    }
});



 
 function arrastarleg() {
    const legenda = document.getElementById('legenda');
    let offsetX, offsetY;

  
    legenda.addEventListener('mousedown', function(e) {
    
        offsetX = e.clientX - legenda.getBoundingClientRect().left;
        offsetY = e.clientY - legenda.getBoundingClientRect().top;

        
        function moveLegend(e) {
            legenda.style.left = (e.clientX - offsetX) + 'px';
            legenda.style.top = (e.clientY - offsetY) + 'px';
        }

        
        function stopMoving() {
            document.removeEventListener('mousemove', moveLegend);
            document.removeEventListener('mouseup', stopMoving);
        }
        document.addEventListener('mousemove', moveLegend);
        document.addEventListener('mouseup', stopMoving);
    });
}
arrastarleg();

//Implemtação da lógica da API

const API_KEY = '86909b9d-aaef-4c89-9246-67837a0bb5d5'; //Deixando a chave visível pelo teste
const API_URL = 'https://api.apiverve.com/v1/periodictable';

//Pegar imagem da Wiki
async function fetchThumbnail(wikipediaLink) {
    try {
        const pageTitle = wikipediaLink.split('/').pop(); 

        const wikipediaAPI = `https://en.wikipedia.org/w/api.php?action=query&titles=${pageTitle}&prop=pageimages&format=json&origin=*&pithumbsize=300`;

        const response = await fetch(wikipediaAPI);
        if (!response.ok) {
            throw new Error('Erro ao buscar a thumbnail da Wikipedia.');
        }

        const data = await response.json();
        const pages = data.query.pages;

 
        const pageKey = Object.keys(pages)[0];
        if (pages[pageKey].thumbnail) {
            return pages[pageKey].thumbnail.source; 
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Erro ao obter thumbnail:', error.message);
        return null;
    }
}

function showPopup(data) {
    const wikipediaLink = data.source;

    fetchThumbnail(wikipediaLink).then((thumbnail) => {
        const popup = document.createElement('div');
        popup.className = 'popup';

        popup.innerHTML = `
            <div class="popup-content">
                <h2>${data.name} (${data.symbol})</h2>
                ${thumbnail ? `<img src="${thumbnail}" alt="${data.name} thumbnail" class="popup-thumbnail" />` : ''}
                <p><strong>Número atômico:</strong> ${data.number}</p>
                <p><strong>Massa atômica:</strong> ${data.atomic_mass}</p>
                <p><strong>Categoria:</strong> ${data.category}</p>
                <p><strong>Descoberto por:</strong> ${data.discovered_by}</p>
                <p><strong>Resumo:</strong> ${data.summary}</p>
                <a href="${wikipediaLink}" target="_blank">Mais informações</a>
                <button class="close-popup">Fechar</button>
            </div>
        `;

        document.body.appendChild(popup);

        popup.querySelector('.close-popup').addEventListener('click', () => {
            popup.remove();
        });
    });
}

// Vai pegar as informaçõs da API de acordo com o elemento clicado, no caso expresso em symbol
elementos.forEach(element => {
    const symbol = element.querySelector('.symbol').textContent;

    element.addEventListener('click', async () => {
        //console.log("Foi clicado")
        try {
            const response = await fetch(`${API_URL}?symbol=${symbol}`, {
                headers: { 'x-api-key': API_KEY }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter informações do elemento.');
            }

            const result = await response.json();

            if (result.status === 'ok' && result.data) {
                showPopup(result.data);
            } else {
                alert('Informações não disponíveis para este elemento.');
            }
        } catch (error) {
            alert('Erro ao obter informações: ' + error.message);
        }
    });
});