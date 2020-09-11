export default class Estoque {
    constructor() {

    }
    addProduto(produto) {
        if (produto.id != undefined) {
            let indice = this.buscarIndicePorId(produto.id)
            if (indice != -1) {
                arrEstoque[indice] = produto
                localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))
            }
        } else {
            produto.id = sequenciaID 
            /* valorEstoque = ((produto.quantidade * produto.preco) + valorEstoque)  */
            arrEstoque.push(produto)
            sequenciaID++
            localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))
            localStorage.setItem("sequenciaIDEstoque", JSON.stringify(sequenciaID))
            localStorage.setItem("valorEstoque", JSON.stringify(valorEstoque))
        }

    }
    buscarIndicePorId(idProduto) {
        let arrEstoque = JSON.parse(localStorage.getItem("arrEstoque"))
        for (let i = 0; i < arrEstoque.length; i++) {
            if (arrEstoque[i].id == idProduto) {
                return i
            }

        }
        return -1

    }
    buscarProdutoPorId(id) {
        for (let i = 0; i < arrEstoque.length; i++) {
            if (arrEstoque[i].id == id) {
                return arrEstoque[i]
            }
        }
        return nulll


    }
    buscarProdutoPorNome(busca) {
        let filtro = arrEstoque.filter(function (f) {
            if (f.nome.toUpperCase() == busca.toUpperCase()) {
                return f
            }
        })
        return filtro

    }

    excluir(id) {
        let arrEstoque = JSON.parse(localStorage.getItem("arrEstoque"))
        let indice = this.buscarIndicePorId(id)
        arrEstoque.splice(indice, 1)
        localStorage.setItem("arrEstoque", JSON.stringify(arrEstoque))

    } 
    TotalEmReais() {
        let arrEstoque = JSON.parse(localStorage.getItem("arrEstoque"))
        var total = 0;
        for (var i = 0; i < arrEstoque.length; i++) {
            total += arrEstoque[i].preco;
        }
        return total
    }
}