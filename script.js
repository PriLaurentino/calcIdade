// Algoritmo

// CALCULAR IDADE
// 1. Pegar os valores
// 2. Calcular a Idade
//    a. Com base no ano
//    b. Com mês (EXTRA)
//    c. Com dia (EXTRA)
// 3. Gerar a faixa etária
//       Resultado            Faixa
//       0 à 12                Criança
//      13 à 17                Adolescente
//      18 à 65                Adulto
//      Acima de 65            Idoso
//
//
// 4. Organizar o objeto pessoa para salvar na lista
// 5. Cadastrar a pessoa na lista
// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
// 8. Botão para limpar os registros

//Função principal
function calcularIdade(event) {
    // Previne que a tela se recarregue quando a função for executada
   // event.preventDefault(); 
    //console.log("Funcionante!!!"); comentado após teste OK

    // Executa a função pegarValores
    let dataUsuario = pegarValores();
    console.log(dataUsuario);
    // Executa a função calcular e salva seu retorno na variavel imc
    let idade = calculo(dataUsuario.ano);

     // Executa a função classificarImc passando como atributo o valor que esta na variavel imc e salva seu retorno na variavel classificacaoImc
     let classificacaoIdade = classificarIdade(idade); 

     // Executa a função organizarDados passando os atributos: dadosUsuario, imc e classificacaoImc, e salva seu retorno na variavel usuarioAtualizado
    let dadosUsuarioAtualizado = organizar(dataUsuario, idade, classificacaoIdade);

     // Executa a função cadastrarUsuario passando como parametro o dadosUsuarioAtualizado
     cadastrarUsuario(dadosUsuarioAtualizado);

    
}

// Passo 1 - Pegar valor
function pegarValores() {

// Obtém os valores que foram digitados em cada elemento identificados pelo ID
   let nomeRecebido = document.getElementById("nome").value.trim(); // trim - apaga os possiveis espaços em branco no inicio e fim da string
   
   let diaRecebido = parseInt(document.getElementById("dia-nascimento").value);
   let mesRecebido = parseInt(document.getElementById("mes-nascimento").value);
   let anoRecebido = parseInt(document.getElementById("ano-nascimento").value);

// Cria um objeto salvando os valores obtidos nos atributos
   let usuario = {
      nome: nomeRecebido,
      dia: diaRecebido,
      mes: mesRecebido,
      ano: anoRecebido
}
  console.log(usuario);
// Retorna o objeto dadosUsuario
  return usuario;
}
//Passo 2. Calcular a Idade
//    a. Com base no ano
//    b. Com mês (EXTRA)
//    c. Com dia (EXTRA)  

function calculo(anoNascimento) {
// Faz o calculo para encontrar a idade

const dataAtual = new Date ();
const anoAtual = dataAtual.getFullYear();

let idade = anoAtual - anoNascimento

console.log(idade);
return idade;
}

//Passo 3. classificar a faixa etária
function classificarIdade(idade) {
//       Resultado            Faixa
//      0 à 12                Criança
//      13 à 17                Adolescente
//      18 à 65                Adulto
//     Acima de 65            Idoso */
 
// Avalia o valor que esta dentro da variavel imc e retorna um valor diferente para cada intervalo
if(idade < 13){
    return "Chriaunça";

}else if(idade < 18){
    return "Flourescent Adolescent";

}else if (idade < 66) {
    return "Pagador de boleto";

}else{
    return "Diz que é a melhor idade";
    }
}

//Passo 4. Organizar informações
function organizar(usuario, valorIdade, classificarIdade) {
  
// Obtém a data e hora atual padrão pt-BR já formatada
let dataHoraAtual = Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now());

// Cria um novo objeto passando os atributos do objeto anterior e acrescenta novos atributos
let dadosUsuarioAtualizado = {
    ...usuario,
    //nascimento: ano,
    idade: valorIdade,
    classificacao: classificarIdade,
    dataCadastro: dataHoraAtual


}

console.log(dadosUsuarioAtualizado);

 // Retorna o objeto criado
 return dadosUsuarioAtualizado;

}

//Passo 5 - Salvar
function cadastrarUsuario(cadastroUsuario) {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    //if (localStorage.getItem("usuariosCadastrados") == true) {
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Acrescenta o usuario recebido a lista
    listaUsuarios.push(cadastroUsuario)

    // Salva o item "usuariosCadastrados" no localStorage com o conteudo do array convertido para string
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}


// Passo 6 - Ler lista
function carregarUsuarios() {
    // Cria um array vazio
    let listaUsuarios = [];

    // Verifica se existe o item "usuariosCadastrados" no localStorage
    if (localStorage.getItem("usuariosCadastrados")) {
        // Caso o item exista ele converte e salva no array criado
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }

    // Verifica se o tamanho do array é igual a zero
    if (listaUsuarios.length == 0) {
        // Se o tamanho do array for igual a zero,
        // Obtém o elemento html (tabela) pelo ID
        let tabela = document.getElementById("corpo-tabela");

        //Cria uma linha na tabela com a mensagem "Nenhum usuario cadastrado!""
        tabela.innerHTML = `<tr class="linha-mensagem">
        <td colspan="6">Nenhum usuario cadastrado!</td>
    </tr>`

    }else{
        // Se o tamanho do array for diferente de zero, ou seja tem algum item dentro do array
        // Executa a função montarTabela
        montarTabela(listaUsuarios);
    }
}

// Adiciona o evento a janela/navegador que executa a função carregarUsuarios quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => carregarUsuarios());


// Passo 7 - Montar tabela
function montarTabela(listaDeCadastrados) {
    // Obtém o elemento html (tabela) pelo ID
    let tabela = document.getElementById("corpo-tabela");

    // Cria uma variavel vazia
    let template = '';

    console.log(listaDeCadastrados);

    // Obtém cada item dentro do array listaDeCadastrados
    listaDeCadastrados.forEach(pessoa => {
        // Cria uma linha de tabela mesclando tag html e valor dos atributos do objeto que esta dentro do array
        // E adiciona um bloco de codigo igual o a baixo dentro da variavel template para cada elemento do array
        template += `<tr>
        <td data-cell="nome">${pessoa.nome}</td>
        <td data-cell="nascimento">${pessoa.dia}/${pessoa.mes}/${pessoa.ano}</td>
        <td data-cell="idade">${pessoa.idade}</td>
        <td data-cell="classificação faixa etária">${pessoa.classificacao}</td>
        <td data-cell="data de cadastro">${pessoa.dataCadastro}</td>
    </tr>`
    });

    // Adiciona o conteudo que esta dentro da variavel template ao elemento tabela
    tabela.innerHTML = template;
}


// Passo 8 - Limpar local storage
    function deletarRegistros() {
    // Remove o item "usuariosCadastrados" do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a pagina
    window.location.reload();

}