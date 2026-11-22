const numeroWhatsApp = "5511967853094";

function consultarWhatsApp(nomeProduto) {
    const mensagem = `Olá! Vim pelo site da Yandelly e gostaria de saber mais sobre o produto ${nomeProduto}.`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    window.open(linkWhatsApp, "_blank");
}
