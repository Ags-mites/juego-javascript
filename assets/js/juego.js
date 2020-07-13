const celeste = document.getElementById('celeste')
const cyan = document.getElementById('cyan')
const green = document.getElementById('green')
const yellow = document.getElementById('yellow')
const btnEmpezar = document.getElementById('btnEmpezar')

class Juego {
    constructor() {
        this.inicializar()
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
    }
}

function empezarJuego() {
    var juego = new Juego()
}