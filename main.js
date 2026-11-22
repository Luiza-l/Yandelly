// Número da empresa no formato internacional, apenas com números.
const numeroWhatsApp = "5511967853094";

// Recebe o produto clicado e monta a mensagem para o WhatsApp.
function consultarWhatsApp(nomeProduto) {
    const mensagem = `Olá! Vim pelo site da Yandelly e gostaria de saber mais sobre o produto ${nomeProduto}.`;
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;

    // Abre uma nova aba com a conversa pronta para ser enviada.
    window.open(linkWhatsApp, "_blank");
}
