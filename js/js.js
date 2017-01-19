var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var g = 1.622;
var a = g;
var dt = 0.016683;
var timer=null;
var timerFuel=null;
var fuel=100;

//al cargar por completo la página...
window.onload = function(){
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn();
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeydown = motorOn;
	document.onkeyup = motorOff;
	
	//Empezar a mover nave
	start();
}


	//Explota la nave
	function finalizarjuego(){
	if (v>2){
		document.getElementById("navesin").src="img/explosion.gif";
		document.onkeydown = motorOff ;
		document.getElementById("derrota").style.display="block";
	}
	else{
		document.getElementById("ganar").style.display="block";
		document.onkeydown = motorOff ;
	}



}


//Definición de funciones
function start(){
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	v +=a*dt;
	document.getElementById("velocidad").innerHTML=v.toFixed(2);
	y +=v*dt;
	document.getElementById("altura").innerHTML=(80-y).toFixed(2);

	
	//mover hasta que top sea un 70% de la pantalla
	if (y<=5){
		a=g;
		v=1;
	}

	else if (y<80){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else { 
		document.getElementById("altura").innerHTML=0;
		stop();
		finalizarjuego();
		
	}
}
function motorOn(){
	a=-g;
	document.getElementById("navecon").style.display="block";
	if (timerFuel==null)
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);	
}
function motorOff(){
	a=g;
	document.getElementById("navecon").style.display="none";
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Aquí hay que cambiar el valor del marcador de Fuel...
	fuel-=0.1;
	document.getElementById("fuel").innerHTML=fuel.toFixed(0);

	if(fuel<=0){
		document.onkeydown= motorOff;
		document.getElementById("fuel").innerHTML=0;
		
	}

}
