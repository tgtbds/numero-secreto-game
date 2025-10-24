let numerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = numeroAleatorio();
let numeroTentativas = 0;
consoleNumeroSecreto ();

// Funções

    function exibirTexto ( tag, texto) {
let elemento = document.querySelector (tag);
elemento.innerHTML = texto;

// Fala texto

 if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

    function exibirMsg () {
exibirTexto ( 'h1', 'Jogo do Número Secreto' );
exibirTexto ( 'p', 'Digite um número entre 1 e 10 e clique em "Chutar"' );
}
    function consoleNumeroSecreto() {
    console.log ( 'Número secreto: ' + numeroSecreto );
}
// Fim Funções

exibirMsg ();

    function verificarChute () {
    let chute = parseInt ( document.querySelector ('input').value );
    numeroTentativas ++;
    console.log ( chute == numeroSecreto ? 'acertou' : 'errou' );
    //console.log ('Botão Chutar   clicado');

    if (chute == numeroSecreto) {
        let palavraTentativa = numeroTentativas == 1 ? ' tentativa' : ' tentativas';
        exibirTexto ( 'h1', 'Você acertou! Com ' + numeroTentativas + palavraTentativa + '.' );
        exibirTexto ( 'p', ' O número secreto é ' + numeroSecreto );
         //exibirTexto ( 'p2', ' Parabéns continue jogando' );
         document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if ( chute > numeroSecreto ) {
            exibirTexto ( 'p', ' O número secreto é menor que ' + chute );
        } else {
            exibirTexto ( 'p', ' O número secreto é maior que ' + chute );
        }

        limparCampo ()
    }
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt (Math.random() * numeroMaximo + 1);
    let numeroMaximoTentativas = numerosSorteados.length;
    if (numeroMaximoTentativas == numeroMaximo) {
        numeroMaximoTentativas = [];
    }
    if ( numerosSorteados.includes ( numeroEscolhido ) ) {
        return numeroAleatorio();
    } else {
        numerosSorteados.push ( numeroEscolhido );
        console.log ( numerosSorteados );
        return numeroEscolhido;
    }

}

function limparCampo () {
    chute = document.querySelector ('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = numeroAleatorio();
    numeroTentativas = 0;
    limparCampo ();
    exibirMsg ();
    consoleNumeroSecreto ();
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}