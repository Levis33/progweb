let Regex = /^\\[bcdfghjklmnpqrstvxwyz]+\[{1}([bcdfghjklmnpqrstvxwyz]+\|{1}){1,}[bcdfghjklmnpqrstvxwyz]+]{1}$/;
let time;
let timeRobo;
let arrTimes = ["flamengo", "botafogo", "bangu", "fluminense"]
let matrizJogo = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 ainda nao foi jogada a posicoa, 1 pessoa, 2 robo
let jogaPlayer = true;
let jogaRobo = false;

function verificaEmail() {
  let email = document.getElementById('email').value;
  let verificacao = Regex.test(email);

  console.log(email)

  console.log(verificacao)

  verificacao = true;
  escolherTime();

  if (verificacao) {
    //document.getElementById("error").innerHTML = "";
    document.documentElement.innerHTML = '';
    load_game();

  }
  else {
    document.getElementById("error").innerHTML = "o endereço de email esta incorreto, por favor tente novamente";
  }
}

function load_game() {

  // window.location.replace("load_game.html");

  let NC = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>O clássico</title><link href="css/style.css" rel="stylesheet"><script src="js/script.js"></script></head><body class="background"><div><div class="title"><h1 class="titleStyle">O clássico</h1></div><div><div id="time"><h1 class="textoCenterWhite">X</h1><div id="timeRobo"></div><div class="containerGame"><div class="tile" id="0" onclick=escolheCampo(this.id)></div><div class="tile" id="1" onclick=escolheCampo(this.id)></div><div class="tile" id="2" onclick=escolheCampo(this.id)></div><div class="tile" id="3" onclick=escolheCampo(this.id)></div><div class="tile" id="4" onclick=escolheCampo(this.id)></div><div class="tile" id="5" onclick=escolheCampo(this.id)></div><div class="tile" id="6" onclick=escolheCampo(this.id)></div><div class="tile" id="7" onclick=escolheCampo(this.id)></div><div class="tile" id="8" onclick=escolheCampo(this.id)></div></div><section class="containerGame"></section></body></html>'

  document.open();
  document.write(NC);
  document.close();

  console.log(time, timeRobo);

  let team
  team = document.createElement('img');
  // team.id = 'teamImg';
  // document.getElementById("time").appendChild(team);

  team.setAttribute('src', "images/" + time + ".png");
  team.setAttribute('class', "clubIcon");


  let teamRobo
  teamRobo= document.createElement('img');
  // teamRobo.id = 'teamRoboImg';
  document.getElementById("timeRobo").appendChild(teamImg);
  document.getElementById("timeRobo").innerHTML = "Hello World";

  teamRobo.setAttribute('src', "images/" + timeRobo + ".png");
  teamRobo.setAttribute('class', "clubIcon");


}

function escolherTime() {
  time = document.getElementById('playerTime').value;
  arrTimes = arrTimes.filter(e => e !== 'B');
  timeRobo = arrTimes[Math.floor(Math.random() * 3)];

  console.log(time, timeRobo);
}


function escolheCampo(pos) {

  
  if(jogaPlayer){

    if(matrizJogo[pos] == 0){

      let teamImg
      teamImg= document.createElement('img');
      teamImg.id = pos+'img';
      document.getElementById(pos).appendChild(teamImg);
      teamImg.setAttribute('src', "images/" + time + ".png");
      teamImg.setAttribute('class', "clubIcon");


      jogaRobo = true;
      jogaPlayer = false;
      matrizJogo[pos] = 1;

    }

    else{
      // mensagem de erro posicao ja foi jogada
    }
  }
  else{
    // mensagem de erro nao esta na vez de jogar
  }
  
  verificaVitoria();
  jogaRobo();

}

function jogaRobo(){

  let posJogadaRobo;

  while(jogaRobo){

    posJogadaRobo = Math.floor(Math.random() * 9)

    if(matrizJogo[posJogadaRobo] == 0){

      let teamImg
      teamImg= document.createElement('img');
      teamImg.id = pos+'img';
      document.getElementById(pos).appendChild(teamImg);
      teamImg.setAttribute('src', "images/" + time + ".png");
      teamImg.setAttribute('class', "clubIcon");

      jogaRobo = false;
      jogaPlayer = true;

      matrizJogo[posJogadaRobo] = 2;

    }
  }
  verificaVitoria();
  
}


function verificaVitoria(){


  
}