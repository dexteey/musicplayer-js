var musicas = [
    {titulo:'Sweater Weather', artista:'The Neighbourhood', src:'musicas/Sweater Weather.mp3', img:'imagens/The Neighbourhood.jpg'},
    {titulo:'Leal', artista:'Djonga', src:'musicas/Leal.mp3', img:'imagens/Djonga.jpg'},
    {titulo:'Happier Than Ever', artista:'Billie Eilish', src:'musicas/Happier Than Ever.mp3', img:'imagens/Billie Eilish.jpg'}
];

var musica = document.querySelector('audio');
var indexMusica = 0;

var duracaoMusica = document.querySelector('.fim');
var imagem = document.querySelector('img');
var nomeMusica = document.querySelector('.nome h2');
var nomeArtista = document.querySelector('.nome i');

renderizarMusica(indexMusica);

//Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

//Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    var barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration)* 100) + '%';
    var tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    var campoMinutos = Math.floor(segundos / 60);
    var campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos
    }

    return campoMinutos + ':' + campoSegundos;
}

