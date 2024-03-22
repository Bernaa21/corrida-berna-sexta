var button = document.getElementById('botaocorrida');
var tamanhopista = document.getElementById('pista').offsetWidth;
var isStopped = true;
var saldo = 100.00;

function corrida() {
    var inputValue = Number(document.getElementById("inputaposta").value);
    
    if (inputValue < 5) {
        alert("A aposta deve ser pelo menos 5 conto"); // verifica valor minimo
        return;
    }

    if (inputValue > saldo) {
        alert("Você não pode apostar mais do que tem na conta.");
        return;
    }

    var competidorSelecionado = document.getElementById('competidorSelecionado').value;
    var competidores = document.querySelectorAll('.competidor');
    var posicoes = {}; 
    var vencedor = null;

    isStopped = !isStopped;
    button.innerHTML = isStopped ? 'Começar' : 'Parar';

    if (!isStopped) {
        var Interval = setInterval(() => {
            competidores.forEach(competidor => {
                if (competidor.offsetLeft < tamanhopista - 76) { 
                    let velocidade = Math.random() * 10; 
                    competidor.style.left = (competidor.offsetLeft + velocidade) + 'px';
                    posicoes[competidor.id] = competidor.offsetLeft; 
                } else {
                    if (vencedor === null || posicoes[competidor.id] > posicoes[vencedor]) {
                        vencedor = competidor.id; 
                    }
                }
            });

            if (vencedor !== null) {
                clearInterval(Interval);
                alert("O vencedor é: " + vencedor);
                atualizarSaldo(vencedor, competidorSelecionado, inputValue);
                resetarPosicoes();
            }
        }, 50);
    }
}

function mudarbotao() {
    isStopped = !isStopped;
    button.innerHTML = isStopped ? 'Começar' : 'Recomeçar';
}

function resetarPosicoes() {
    var competidores = document.querySelectorAll('.competidor');
    competidores.forEach(competidor => {
        competidor.style.left = '0px';
    });
}

function atualizarSaldo(vencedor, competidorSelecionado, inputValue) {
    saldo -= inputValue;

    if (vencedor === competidorSelecionado) {
        saldo += inputValue * 3; // O valor apostado é adicionado em dobro ao saldo
        alert("Você ganhou! A aposta foi adicionada em dobro para sua conta. Saldo atual: R$" + saldo.toFixed(2));
    } else {
        alert("Você perdeu. Saldo atual: R$" + saldo.toFixed(2));
    }

    if (saldo < 0) {
        saldo = 0; // O saldo nunca fica negativo
    }

    document.getElementById('saldo').innerHTML = 'R$' + saldo.toFixed(2);
}