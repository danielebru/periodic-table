
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



const elementos = document.querySelectorAll('.element');
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