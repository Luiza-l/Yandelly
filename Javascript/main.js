var numeroWhatsApp = "5511967853094";
var chaveCarrinho = "yandelly-itens-carrinho";
var carrinho = JSON.parse(localStorage.getItem(chaveCarrinho) || "[]");

if (!Array.isArray(carrinho)) {
    carrinho = [];
}

function consultarWhatsApp(nomeProduto) {
    var mensagem = "Olá! Vim pelo site da Yandelly e gostaria de saber mais sobre " + nomeProduto + ".";
    var link = "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem);
    window.open(link, "_blank");
}

function salvarCarrinho() {
    localStorage.setItem(chaveCarrinho, JSON.stringify(carrinho));
}

function atualizarContadorCarrinho() {
    var quantidadeTotal = 0;
    var contador = document.getElementById("contador-carrinho");

    for (var i = 0; i < carrinho.length; i++) {
        quantidadeTotal += carrinho[i].quantidade;
    }

    if (contador) {
        contador.textContent = quantidadeTotal;
    }
}

function adicionarAoCarrinho(nome, preco, imagem) {
    var encontrado = false;

    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nome === nome) {
            carrinho[i].quantidade++;
            encontrado = true;
        }
    }

    if (!encontrado) {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    desenharCarrinho();
    abrirCarrinho();
}

function desenharCarrinho() {
    var lista = document.getElementById("itens-carrinho");
    var total = 0;

    atualizarContadorCarrinho();

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    }

    for (var i = 0; i < carrinho.length; i++) {
        var item = carrinho[i];
        total += item.preco * item.quantidade;

        lista.innerHTML += '<article class="item-carrinho">' +
            '<img src="' + item.imagem + '" alt="' + item.nome + '">' +
            '<div><h3>' + item.nome + '</h3>' +
            '<p>' + formatarMoeda(item.preco) + '</p>' +
            '<div class="controles-quantidade">' +
            '<button type="button" onclick="alterarQuantidade(' + i + ', -1)" aria-label="Diminuir quantidade">-</button>' +
            '<span>' + item.quantidade + '</span>' +
            '<button type="button" onclick="alterarQuantidade(' + i + ', 1)" aria-label="Aumentar quantidade">+</button>' +
            '</div></div>' +
            '<button class="remover-item" type="button" onclick="removerDoCarrinho(' + i + ')" aria-label="Remover ' + item.nome + '">' +
            '<i class="fa-solid fa-trash" aria-hidden="true"></i></button>' +
            '</article>';
    }

    document.getElementById("total-carrinho").textContent = formatarMoeda(total);
}

function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function alterarQuantidade(indice, valor) {
    carrinho[indice].quantidade += valor;

    if (carrinho[indice].quantidade <= 0) {
        carrinho.splice(indice, 1);
    }

    salvarCarrinho();
    desenharCarrinho();
}

function removerDoCarrinho(indice) {
    carrinho.splice(indice, 1);
    salvarCarrinho();
    desenharCarrinho();
}

function abrirCarrinho() {
    var painel = document.getElementById("painel-carrinho");
    var fundo = document.getElementById("fundo-carrinho");

    if (painel && fundo) {
        painel.hidden = false;
        fundo.hidden = false;
    }
}

function fecharCarrinho() {
    document.getElementById("painel-carrinho").hidden = true;
    document.getElementById("fundo-carrinho").hidden = true;
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        return;
    }

    var mensagem = "Olá! Gostaria de fazer este pedido:\n";
    var total = 0;

    for (var i = 0; i < carrinho.length; i++) {
        mensagem += carrinho[i].quantidade + "x " + carrinho[i].nome + "\n";
        total += carrinho[i].preco * carrinho[i].quantidade;
    }

    mensagem += "Total: " + formatarMoeda(total);
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem), "_blank");
}

desenharCarrinho();
