// Verifica se já existem produtos armazenados no localStorage, se não, cria uma chave 'produtos-selecionados' com um array vazio
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Função que cria um produto (um artigo) na interface
function criarProduto(produto) {
    const article = document.createElement('article');  // Cria o elemento <article> para representar o produto

    // Cria o título do produto (<h3>) e define seu texto
    const title = document.createElement('h3');
    title.textContent = produto.title;
    article.append(title);  // Adiciona o título ao artigo

    // Cria a imagem do produto (<img>) e define a URL da imagem
    const image = document.createElement('img');
    image.src = produto.image;
    article.append(image);  // Adiciona a imagem ao artigo

    // Cria o preço do produto (<h4>) e define o texto (com o preço seguido de "€")
    const price = document.createElement('h4');
    price.textContent = produto.price + " €";
    article.append(price);  // Adiciona o preço ao artigo

    // Cria a descrição do produto (<p>) e define o texto
    const description = document.createElement('p');
    description.textContent = produto.description;
    article.append(description);  // Adiciona a descrição ao artigo

    // Cria o botão de adicionar ao cesto e define o texto
    const button = document.createElement('button');
    button.textContent = "+ Adicionar ao Cesto";
    article.append(button);  // Adiciona o botão ao artigo

    // Adiciona um event listener ao botão para adicionar o produto ao localStorage e atualizar o cesto
    button.addEventListener("click", () => {
        // Recupera a lista de produtos do localStorage
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));        
        lista.push(produto);  // Adiciona o produto à lista
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));  // Atualiza o localStorage com a lista de produtos
        atualizaCesto();  // Atualiza a exibição do cesto
    });

    return article;  // Retorna o artigo criado
}

// Função para carregar os produtos na página
function carregarProdutos(produtos) {
    produtos.forEach(produto => {
        const section = document.getElementById("produtos");  // Obtém a seção onde os produtos serão exibidos
        section.append(criarProduto(produto));  // Cria e adiciona cada produto à seção
    });
}

// Função para criar um produto no cesto (removendo o produto do cesto também)
function criarProdutoCesto(produto) {
    const article = document.createElement('article');  // Cria um artigo para representar o produto no cesto

    // Cria o título do produto e define seu texto
    const title = document.createElement('h3');
    title.textContent = produto.title;
    article.append(title);

    // Cria a imagem do produto e define a URL da imagem
    const image = document.createElement('img');
    image.src = produto.image;
    article.append(image);

    // Cria o preço do produto e define o texto (com o preço seguido de "€")
    const price = document.createElement('h4');
    price.textContent = produto.price + " €";
    article.append(price);

    // Cria o botão de remover do cesto e define o texto
    const button = document.createElement('button');
    button.textContent = "- Remover do Cesto";
    article.append(button);  // Adiciona o botão ao artigo

    // Adiciona um event listener ao botão para remover o produto do cesto
    button.addEventListener("click", () => {
        // Recupera a lista de produtos do localStorage
        const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));
        // Encontra o índice do produto na lista
        const indice = lista.findIndex(item => item.id === produto.id);
        // Remove o produto da lista utilizando o índice
        lista.splice(indice, 1);
        localStorage.setItem('produtos-selecionados', JSON.stringify(lista));  // Atualiza o localStorage
        // Remove o artigo da seção do cesto
        const section = document.getElementById("cesto");
        section.removeChild(article);  // Remove o produto visualmente
        atualizaCesto();  // Atualiza o cesto e o custo total
    });

    return article;  // Retorna o artigo criado
}

// Função para atualizar o cesto na interface
function atualizaCesto() {
    const section = document.getElementById("cesto");  // Obtém a seção do cesto
    section.innerHTML = "";  // Limpa o conteúdo do cesto

    let somaTotal = 0;  // Inicializa a soma total
    const lista = JSON.parse(localStorage.getItem('produtos-selecionados'));  // Recupera a lista de produtos do localStorage

    // Para cada produto no cesto, cria o artigo e adiciona ao cesto
    lista.forEach(produto => {
        section.append(criarProdutoCesto(produto));  // Cria e adiciona o produto no cesto
        somaTotal += produto.price;  // Soma o preço do produto ao total
    });

    // Atualiza o custo total exibido na página
    document.getElementById("custoTotal").textContent = somaTotal.toFixed(2) + " €";  // Exibe o total com 2 casas decimais
}

// Adiciona um event listener que executa a função quando a página estiver completamente carregada
addEventListener("DOMContentLoaded", () => {
    carregarProdutos(produtos);  // Carrega os produtos na página
    atualizaCesto();  // Atualiza o cesto com os produtos armazenados
});
