
let time;
let timeRobo;
let arrTimes = ["flamengo", "botafogo", "bangu", "fluminense"]
let matrizJogo = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // 0 ainda nao foi jogada a posicoa, 1 pessoa, 2 robo
let jogaPlayer = true;
let jogaRobo = false;
let teveGanhador = false;

function verificaEmail() {
  let Regex = /^\\[bcdfghjklmnpqrstvxwyz]+\[{1}([bcdfghjklmnpqrstvxwyz]+\|{1}){1,}[bcdfghjklmnpqrstvxwyz]+]{1}$/;
  let email = document.getElementById('email').value;

  escolherTime();

  if (Regex.test(email)) {
    //document.getElementById("error").innerHTML = "";
    document.documentElement.innerHTML = '';
    load_game();

  }
  else {
    document.getElementById("error").innerHTML = "o endereço de email esta incorreto, por favor tente novamente";
  }
}

function escolherTime() {
  time = document.getElementById('playerTime').value;
  arrTimes = arrTimes.filter(e => e !== time);
  console.log(arrTimes);
  timeRobo = arrTimes[Math.floor(Math.random() * 3)];
}

function load_game() {

  // window.location.replace("load_game.html");

  let NC = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>O clássico</title><link href="css/style.css" rel="stylesheet"><script src=""></script></head><body class="background"><div><div class="title"><h1 class="titleStyle">O clássico</h1></div><div class="escudos" id="times"></div><div class="containerGame"><div class="tile" id="0" onclick=escolheCampo(this.id)></div><div class="tile" id="1" onclick=escolheCampo(this.id)></div><div class="tile" id="2" onclick=escolheCampo(this.id)></div><div class="tile" id="3" onclick=escolheCampo(this.id)></div><div class="tile" id="4" onclick=escolheCampo(this.id)></div><div class="tile" id="5" onclick=escolheCampo(this.id)></div><div class="tile" id="6" onclick=escolheCampo(this.id)></div><div class="tile" id="7" onclick=escolheCampo(this.id)></div><div class="tile" id="8" onclick=escolheCampo(this.id)></div></div><button class="buttonAlign" onclick="voltarPartida()">Voltar</button></body></html>'

  document.open();
  document.write(NC);
  document.close();

  // $('#inicio').empty();

  // const element = document.getElementById("escondido");	// Get element
  // // element.style.visibility = "visible";
  // console.log(time, timeRobo);


  let teamPlayer
  teamPlayer = document.createElement('img');
  document.getElementById("times").appendChild(teamPlayer);
  teamPlayer.setAttribute('src', "images/" + time + ".png");
  teamPlayer.setAttribute('class', "clubIcon");

  // let X;
  // X = document.createElement('h1');
  // document.getElementById("times").appendChild(X);
  // X.setAttribute('class', 'textoCenterWhite');
  // X.setAttribute("id", "X")
  
  // document.getElementById("X").innerHTML = "X";

  let teamRobo
  teamRobo = document.createElement('img');
  document.getElementById("times").appendChild(teamRobo);
  teamRobo.setAttribute('src', "images/" + timeRobo + ".png");
  teamRobo.setAttribute('class', "clubIcon");



}


function escolheCampo(pos) {
  if (jogaPlayer) {

    if (matrizJogo[pos] == 0) {

      let teamImg
      teamImg = document.createElement('img');
      teamImg.id = pos + 'img';
      document.getElementById(pos).appendChild(teamImg);
      teamImg.setAttribute('src', "images/" + time + ".png");
      teamImg.setAttribute('class', "clubIcon");


      jogaRobo = true;
      jogaPlayer = false;
      matrizJogo[pos] = 1;

    }

    else {
      // mensagem de erro posicao ja foi jogada
    }
  }
  else {
    // mensagem de erro nao esta na vez de jogar
  }

  verificaVitoria("pessoa");
  // escolheRobo();
  setTimeout(escolheRobo, 600)

}

function escolheRobo() {

  let posJogadaRobo;

  while (jogaRobo) {

    posJogadaRobo = Math.floor(Math.random() * 9)

    if (matrizJogo[posJogadaRobo] == 0) {

      let teamImg
      teamImg = document.createElement('img');
      teamImg.id = posJogadaRobo + 'img';
      document.getElementById(posJogadaRobo).appendChild(teamImg);
      teamImg.setAttribute('src', "images/" + timeRobo + ".png");
      teamImg.setAttribute('class', "clubIcon");

      jogaRobo = false;
      jogaPlayer = true;

      matrizJogo[posJogadaRobo] = 2;

    }
  }
  verificaVitoria("robo");

}


function verificaVitoria(jogador) {

  let verificaVencedor;
  let vencedor;

  if(jogador == "robo"){
    verificaVencedor = 2;
    vencedor = timeRobo;
  }
  else{
    verificaVencedor = 1;
    vencedor = time;
  }

  // X X X  verificar vertical /  horizontal / diagonal
  // X X X  vitoria vertical = {0, 3, 6}. { 1, 4, 7} {2 , 5. 8}
  // X X X  vitoria horizontal = {0, 1 ,2} { 3, 4 ,5} { 6, 7, 8}
  //        vitoria diagonal { 0 , 4, 8}  {2, 4, 6}

  if((matrizJogo[0] == verificaVencedor && matrizJogo[3] == verificaVencedor && matrizJogo[6] == verificaVencedor) || 
  (matrizJogo[1] == verificaVencedor && matrizJogo[4] == verificaVencedor && matrizJogo[7] == verificaVencedor) || 
  (matrizJogo[2] == verificaVencedor && matrizJogo[5] == verificaVencedor && matrizJogo[8] == verificaVencedor) ||
  (matrizJogo[0] == verificaVencedor && matrizJogo[1] == verificaVencedor && matrizJogo[2] == verificaVencedor) ||
  (matrizJogo[3] == verificaVencedor && matrizJogo[4] == verificaVencedor && matrizJogo[5] == verificaVencedor) ||
  (matrizJogo[6] == verificaVencedor && matrizJogo[7] == verificaVencedor && matrizJogo[8] == verificaVencedor) ||
  (matrizJogo[0] == verificaVencedor && matrizJogo[4] == verificaVencedor && matrizJogo[8] == verificaVencedor) ||
  (matrizJogo[2] == verificaVencedor && matrizJogo[4] == verificaVencedor && matrizJogo[6] == verificaVencedor)){

    //mensasgem jogo acabou
    jogaRobo = false;
    jogaPlayer = false;
    teveGanhador = true;

    alert('O time ' + vencedor + ' venceu o clássico!' );
    
  }

  if (!matrizJogo.includes(0) && !teveGanhador) {
    alert('Houve um empate!');
    jogaRobo = false;
    jogaPlayer = false;
  }
  
}


function voltarPartida(){
  
  let NC = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>O clássico</title><link href="css/style.css" rel="stylesheet"><script src="js/script.js"></script></head><body class="background"><div class="title"><h1 class="titleStyle">O clássico</h1></div><div class="escudos"><img src="images/flamengo.png" class="clubIcon"><img src="images/bangu.png" class="clubIcon"><img src="images/fluminense.png" class="clubIcon"><img src="images/botafogo.png" class="clubIcon"></div><div class="textoCenterWhite"><label for="email">Insira seu endereço de Email</label><br><br><input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="\exemplo[dom1|dom2]"><p id="error"></p><p>Escolha seu time </p><select class="form-select" id="playerTime"><option value="flamengo" selected>Flamengo</option><option value="bangu">Bangu</option><option value="fluminense">Fluminense</option><option value="botafogo">Botafogo</option></select><br><br><button onclick="verificaEmail()">Verificar Email e Jogar</button><div class="escondido" id="escondido"><div id="time"></div><h1 class="textoCenterWhite">X</h1><div id="timeRobo"></div><div class="containerGame"><div class="tile" id="0" onclick=escolheCampo(this.id)></div><div class="tile" id="1" onclick=escolheCampo(this.id)></div><div class="tile" id="2" onclick=escolheCampo(this.id)></div><div class="tile" id="3" onclick=escolheCampo(this.id)></div><div class="tile" id="4" onclick=escolheCampo(this.id)></div><div class="tile" id="5" onclick=escolheCampo(this.id)></div><div class="tile" id="6" onclick=escolheCampo(this.id)></div><div class="tile" id="7" onclick=escolheCampo(this.id)></div><div class="tile" id="8" onclick=escolheCampo(this.id)></div></div></div></div></body></html>'; 
  document.open();
  document.write(NC);
  document.close();


  time = '';
  timeRobo = '';
  arrTimes = ["flamengo", "botafogo", "bangu", "fluminense"]
  matrizJogo = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  jogaPlayer = true;
  jogaRobo = false;
  teveGanhador = false;

}