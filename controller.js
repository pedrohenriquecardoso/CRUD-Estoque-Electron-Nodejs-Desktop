import Estoque from "./estoque.js"
export default class Controller {
    constructor() {
        this.estoque = new Estoque
        this.idProdutoAlterar = -1

    }
    aoClicarNoIconeMostrarAdd() {
        var form = document.getElementById("mostrarAdd");
        form.style.display = "block";

    }
    aoClicarMostrarBuscarProdutoVenda() {
        var form = document.getElementById("buscarProdutoVenda");
        form.style.display = "block";

    }
    aoClicarMostrarOrcamento() {
        var form = document.getElementById("orcamentoProdutoVenda");
        form.style.display = "block";


    }
    aoClicarFecharAbaAdd() {
        var form = document.getElementById("mostrarAdd");
        form.style.display = "none";

    }
    aoClicarFecharMostrarOrcamento() {
        var form = document.getElementById("orcamentoProdutoVenda");
        form.style.display = "none";


    }
    aoClicarFecharMostrarBuscarProdutoVenda() {
        var form = document.getElementById("buscarProdutoVenda");
        form.style.display = "none";

    }
    aoClicarAdicionarProduto() {
        let nomeProduto = document.getElementById("nomeProduto").value
        let detalheProduto = document.getElementById("detalheProduto").value
        let precoProduto = document.getElementById("precoProduto").value
        let quantidadeProduto = document.getElementById("quantidadeProduto").value
        let produto = { nome: nomeProduto, detalhe: detalheProduto, preco: precoProduto, quantidade: quantidadeProduto }
        if (this.idProdutoAlterar != -1) produto.id = this.idProdutoAlterar
        this.estoque.addProduto(produto)
        alert("Cadastrado com Sucesso")
        window.location.reload()
        this.idProdutoAlterar = -1


    }
    aoClicarBuscar() {
        let textoBusca = document.getElementById("buscarProduto").value
        let filtro = document.getElementById("filtro").value
        if (textoBusca != "") {
            if (filtro != "") {
                if (filtro == "nome") {
                    this.buscarPorNome(textoBusca)
                }
            } else {
                this.exibirListaBusca("Selecione um filtro")
            }
        }
        this.limparForm()
        this.aoClicarBuscarMostrarResultado()
    }
    aoClicarBuscarVender() {
        let textoBusca = document.getElementById("buscarProdutoVender").value
        let filtro = document.getElementById("filtroVender").value
        if (textoBusca != "") {
            if (filtro != "") {
                if (filtro == "nome") {
                    this.buscarPorNomeVender(textoBusca)
                }
            } else {
                this.exibirListaBuscaVender("Selecione um filtro")
            }
        }
        this.limparFormVender()
    }
    aoClicarBuscarMostrarResultado() {
        var form = document.getElementById("listaBusca");
        form.style.display = "block";


    }
    aoClicarNoIconeExcluir(idProduto) {

        if (confirm("Deseja excluir?")) {
            this.estoque.excluir(idProduto)
            window.location.reload()
        }
    } 
    aoClicarNoIconeEditar(idProduto) {
        let produto = this.estoque.buscarProdutoPorId(idProduto)
        this.preencherForm(produto)
        this.idProdutoAlterar = idProduto
        this.aoClicarNoIconeMostrarAdd()
    } 
    aoClicarNoIconeVender() {
        let idProd = document.getElementById("inputVenderId").value
        let quantidadeVenda = document.getElementById("inputVenderQuantidade").value
        let desconto = document.getElementById("inputVenderDesconto").value
        let juros = document.getElementById("inputVenderJuros").value
        let porcentagem = 0
        let precoVenda = 0
        for (let i = 0; i < arrEstoque.length; i++) {
            if (idProd == arrEstoque[i].id) {
                if (desconto != "" && juros != "") {
                    alert("Impossivel dar desconto e juros para a mesma venda")

                }
                else if (desconto != "" && juros == "") {
                    porcentagem = (arrEstoque[i].preco * (desconto / 100))
                    precoVenda = (arrEstoque[i].preco - porcentagem)
                    /* valorEstoque = (valorEstoque - (quantidadeVenda * arrEstoque[i].preco)) */
                    lucroTotal = (lucroTotal + (quantidadeVenda * precoVenda))
                    arrEstoque[i].quantidade = arrEstoque[i].quantidade - quantidadeVenda
                    localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))
                    localStorage.setItem("valorEstoque", JSON.stringify(valorEstoque))
                    localStorage.setItem("lucroTotal", JSON.stringify(lucroTotal))
                } else if (juros != "" && desconto == "") {
                    porcentagem = (arrEstoque[i].preco * (juros / 100))
                    precoVenda = (parseFloat(arrEstoque[i].preco) + parseFloat(porcentagem))
                    /* valorEstoque = (valorEstoque - (quantidadeVenda * arrEstoque[i].preco)) */
                    lucroTotal = (lucroTotal + (quantidadeVenda * precoVenda))
                    arrEstoque[i].quantidade = arrEstoque[i].quantidade - quantidadeVenda
                    localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))
                    localStorage.setItem("valorEstoque", JSON.stringify(valorEstoque))
                    localStorage.setItem("lucroTotal", JSON.stringify(lucroTotal))

                } else if (juros == "" && desconto == "") {
                    /* valorEstoque = (valorEstoque - (quantidadeVenda * arrEstoque[i].preco)) */
                    lucroTotal = (lucroTotal + (quantidadeVenda * arrEstoque[i].preco))
                    arrEstoque[i].quantidade = arrEstoque[i].quantidade - quantidadeVenda
                    localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))
                    localStorage.setItem("valorEstoque", JSON.stringify(valorEstoque))
                    localStorage.setItem("lucroTotal", JSON.stringify(lucroTotal))
                }
            }
        }
        window.location.reload()
    }
    limparFormOrcamento(){
        document.getElementById("filtroBuscarOrcamento").value = "nada"
        document.getElementById("quantOrcamento").value = ""
        document.getElementById("descontoOrcamento").value = ""
        document.getElementById("jurosOrcamento").value = ""
        document.getElementById("precoOrcamento").value = ""
    }
    aoClicarGerarOrçamento() {
        window.location= "verOrcamento.html" 
    }
    aoClicarLocationEstoque(){
        window.location= "estoque.html"
    }
    aoClicarAddProdutoOrcamento(){
        let nomeProd = document.getElementById("filtroBuscarOrcamento").value
        let quantidadeProd = document.getElementById("quantOrcamento").value
        let descontoProd = document.getElementById("descontoOrcamento").value
        let jurosProd = document.getElementById("jurosOrcamento").value
        let precoProd = document.getElementById("precoOrcamento").value
        
        let produtosOrcamento = { nome: nomeProd, quantidade: quantidadeProd, desconto: descontoProd, juros: jurosProd, preco: precoProd}
        orcamento.push(produtosOrcamento)
        localStorage.setItem("orcamento", JSON.stringify(orcamento))
        alert("Produto adicionado ao novo Orçamento")
        this.limparFormOrcamento()
        
    }
    domOrcamento(){
        let orcamento = JSON.parse(localStorage.getItem("orcamento"))
        let divEstoque = document.querySelector("#produtosOrcamento")
        orcamento.forEach((element) => {
            divEstoque.innerHTML += 
                `
                    <tbody>
                        <td>${element.nome}</td>
                        <td>${element.quantidade}</td>
                        <td>${element.desconto}%</td>
                        <td>${element.juros}%</td>
                        <td>R$ ${element.preco}</td>
                    </tbody> 
                ` 
        });

    }
    zerarOrcamento(){
        let orcamento = []
        localStorage.setItem("orcamento", JSON.stringify(orcamento))
        window.location.reload()

    }
    data() {

        var data = new Date();

        var dia = data.getDate();           
        var dia_sem = data.getDay();            
        var mes = data.getMonth();          
        var ano2 = data.getYear();           
        var ano4 = data.getFullYear();       
        var hora = data.getHours();          
        var min = data.getMinutes();        
        var seg = data.getSeconds();        
        var mseg = data.getMilliseconds();   
        var tz = data.getTimezoneOffset(); 

        
        var str_data = dia + '/' + (mes + 1) + '/' + ano4;

        return (str_data)
    }
    domData(){
        let data = this.data()
        let div = document.getElementById("data")
        div.innerHTML = `Data: ${data}`
    }


    domOrcamentoNome() {
        let arrEstoque = JSON.parse(localStorage.getItem("arrEstoque"))
        let divEstoque = document.querySelector("#filtroBuscarOrcamento")
        arrEstoque.forEach((element) => {
            divEstoque.innerHTML += `<option value="${element.nome}">${element.nome}/${element.detalhe}/${element.preco}</option>`
        })
    }

    buscarPorNome(nome) {
        let arrEstoque = this.estoque.buscarProdutoPorNome(nome)
        this.ListaBusca(arrEstoque)
    }
    buscarPorNomeVender(nome) {
        let arrEstoque = this.estoque.buscarProdutoPorNome(nome)
        this.ListaBuscaVender(arrEstoque)
    }
    domListaEstoque() {
        let arrEstoque = JSON.parse(localStorage.getItem("arrEstoque"))
        let divEstoque = document.querySelector("#arrEstoqueDom")
        arrEstoque.forEach((element) => {
            divEstoque.innerHTML +=
                `
               <tbody>
                  <td>${element.id} - ${element.nome}</td>
                  <td>${element.detalhe}</td>
                  <td>${element.preco}</td>
                  <td>${element.quantidade}</td>
                  <td><img width="10" src="img/alterar.png" onclick="controller.aoClicarNoIconeEditar(${element.id})"></td> 
                  <td><img width="10" src="img/trash.png" onclick="controller.aoClicarNoIconeExcluir(${element.id})"></td>            
               </tbody>
               `
        })

    }
    ListaBusca(arrEstoque) {

        if (arrEstoque.length == 0) {
            this.exibirListaBusca("Nenhum produto cadastrado")
        } else {
            let div = ""
            for (let i = 0; i < arrEstoque.length; i++) {
                div += `
                       <div>
                       ${arrEstoque[i].id}/${arrEstoque[i].nome}
                         <img width="10" src="img/trash.png" onclick="controller.aoClicarNoIconeExcluir(${arrEstoque.id})">  
                         <img width="10" src="img/alterar.png" onclick="controller.aoClicarNoIconeEditar(${arrEstoque.id})">
                       </div>
                       `
            }
            this.exibirListaBusca(div)
        }

    }
    ListaBuscaVender(arrEstoque) {
        if (arrEstoque.length == 0) {
            this.exibirListaBuscaVender("Nenhum produto cadastrado")
        } else {
            let div = ""
            for (let i = 0; i < arrEstoque.length; i++) {
                div +=

                    `
                       <div class="col-md-3">
                       <div class="card text-center my-1 mx-1 bg-dark">
                            <div class="card-body bg-dark">
                                <h5 class="card-title text-white">${arrEstoque[i].id}/${arrEstoque[i].nome}</h5>
                                <p class="card-text text-white">Preço: ${arrEstoque[i].preco}</p>
                            </div>
                            <ul class="list-group list-group-flush bg-dark">
                                <li class="list-group-item bg-dark text-white">Em estoque: ${arrEstoque[i].quantidade}</li>
                                <input type="number" placeholder="Quantidade/Venda" id="inputVenderQuantidade">
                                <input type="number" placeholder="Desconto" id="inputVenderDesconto">
                                <input type="number" placeholder="Juros" id="inputVenderJuros">
                                <input type="number" placeholder="Id do Produto" id="inputVenderId">
                            </ul>
                            <div class="card-body bg-dark">
                            <img width="40" src="img/compra.png" onclick="controller.aoClicarNoIconeVender()">
                            </div>
               
                        </div>
                    </div>
                        
                       `
            }
            this.exibirListaBuscaVender(div)
        }

    }
    limparForm() {
        document.getElementById("nomeProduto").value = ""
        document.getElementById("detalheProduto").value = ""
        document.getElementById("precoProduto").value = ""
        document.getElementById("quantidadeProduto").value = ""
        document.getElementById("buscarProduto").value = ""
        document.getElementById("filtro").value = "nada"
    }
    limparFormVender() {
        document.getElementById("buscarProdutoVender").value = ""
    }
    preencherForm(produto) {
        document.getElementById("nomeProduto").value = produto.nome
        document.getElementById("detalheProduto").value = produto.detalhe
        document.getElementById("precoProduto").value = produto.preco
        document.getElementById("quantidadeProduto").value = produto.quantidade

    }
    exibirListaBusca(conteudo) {
        let divResultadoBusca = document.getElementById("listaBusca")
        divResultadoBusca.innerHTML = conteudo
    }
    exibirListaBuscaVender(conteudo) {
        let divResultadoBusca = document.getElementById("listaBuscaVender")
        divResultadoBusca.innerHTML = conteudo
    }
    mostrarValorEstoque() {
        let div = document.getElementById("valorEstoqueDiv")
        div.innerHTML =
            `
                <div clas="col-dm-3">
                   <div class="card text-center">
                       <div class="card-body">
                           <h5>R$ ${valorEstoque}</h5>
                       </div>
                   </div>
                </div>
        
                `
    }
    mostrarLucroTotal() {
        let div = document.getElementById("faturamentoDiv")
        div.innerHTML =
            `
                <div clas="col-dm-3">
                   <div class="card text-center">
                       <div class="card-body">
                           <h5>R$ ${lucroTotal}</h5>
                       </div>
                   </div>
                </div>
        
                `

    }
    valorEstoque(){
        for (let i = 0; i < arrEstoque.length; i++){
            valorEstoque = parseFloat(valorEstoque) + (parseFloat(arrEstoque[i].preco) * parseFloat(arrEstoque[i].quantidade)) 
        }
        return(valorEstoque)
    }
    

}