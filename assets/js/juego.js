const purple = document.getElementById('purple')
const cyan = document.getElementById('cyan')
const green = document.getElementById('green')
const yellow = document.getElementById('yellow')
const btnEmpezar = document.getElementById('btnEmpezar')
const Ultimo_Nivel = 10

class Juego {
    constructor() {
        this.inicializar=this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel(),500)
    }

    inicializar() {
        this.siguienteNivel=this.siguienteNivel.bind(this)
        this.elegirColor=this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel=1
        this.colores={
            purple,
            cyan,
            green,
            yellow
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains("hide")){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia(){
        this.secuencia= new Array(Ultimo_Nivel).fill(0).map(n =>Math.floor(Math.random() * 4))
    }

    siguienteNivel(){
        this.subnivel=0
        this.iluminarSecuencia()
        this.agregarEvento()
    }

    transformarNumeroaColor(numero){
        switch(numero){
            case 0:
                return "purple"
            case 1:
                return "cyan"
            case 2:
                return "green"
            case 3:
                return "yellow"
        }
    }

    transformarColoraNumero(color){
        switch(color){
            case "purple":
                return 0
            case "cyan":
                return 1
            case "green":
                return 2
            case "yellow":
                return 3
        }
    }

    iluminarSecuencia(){
        for(let i=0; i<this.nivel;i++){
            const color = this.transformarNumeroaColor(this.secuencia[i])
            setTimeout(()=> this.iluninarColor(color),1000*i)
        }
    }

    iluninarColor(color){
        this.colores[color].classList.add("light")
        setTimeout(() => this.apagarColor(color),350)
    }

    apagarColor(color){
        this.colores[color].classList.remove("light")
    }

    agregarEvento(){
        this.colores.cyan.addEventListener("click",this.elegirColor)
        this.colores.green.addEventListener("click",this.elegirColor)
        this.colores.purple.addEventListener("click",this.elegirColor)
        this.colores.yellow.addEventListener("click",this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.cyan.removeEventListener('click',this.elegirColor)
        this.colores.green.removeEventListener('click',this.elegirColor)
        this.colores.purple.removeEventListener('click',this.elegirColor)
        this.colores.yellow.removeEventListener('click',this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColoraNumero(nombreColor)
        this.iluninarColor(nombreColor)
        if (numeroColor===this.secuencia[this.subnivel]){
            
            this.subnivel++
            if(this.subnivel===this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel===(Ultimo_Nivel+1)){
                    this.ganoJuego();
                }else{
                    setTimeout(this.siguienteNivel,1500)
                }
            }
        }else{
            this.perdioJuego();
        }
    }

    ganoJuego(){
        swal('Gaste','Felicitaciones','success')
        .then(this.inicializar)
    }

    perdioJuego(){
        swal('Perdiste','Intentalo de nuevo :(','error')
        .then(()=>{
            this.eliminarEventosClick()       
            this.inicializar()
        })
    }
}

function empezarJuego() {
    //window para ver el resultado del array
    window.juego = new Juego()
}