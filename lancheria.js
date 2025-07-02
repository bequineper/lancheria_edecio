const prompt = require("prompt-sync")()
const fs = require("fs") // fs: file system (pacote com métodos para manipular arquivos)

const lanches = []
const categorias = []
const ingredientes = []
const precos = []
const fotos = []

function inclusao() {
    console.log("Inclusão de Cardápio")    
    console.log("-".repeat(40))

    // lê as variáveis
    const lanche       = prompt("Nome do Lanche: ")
    const categoria    = prompt("Categoria.....: ")
    const ingrediente  = prompt("Ingredientes..: ")
    const preco = Number(prompt("Preço R$......: "))
    const foto         = prompt("URL da Foto...: ")

    // acrescenta aos vetores
    lanches.push(lanche)
    categorias.push(categoria)
    ingredientes.push(ingrediente)
    precos.push(preco)
    fotos.push(foto)

    // mensagem
    console.log("Ok! Item cadastrado com sucesso")
}

function listagem() {
    console.log("Lista dos Itens do Cardápio")
    console.log("-".repeat(40))

    console.log("Nome...............: Categoria: Ingredientes...........................: Preço R$")
    console.log("---------------------------------------------------------------------------------")
    
    for (let i = 0; i < lanches.length; i++) {
        console.log(`${lanches[i].padEnd(20)} ${categorias[i].padEnd(10)} ${ingredientes[i].padEnd(40)} ${precos[i].toFixed(2).padStart(8)}`)
    }

    console.log("---------------------------------------------------------------------------------")
}

// função para salvar dados em um arquivo
function gravaProdutos() {
    const produtos = []

    for (let i = 0; i < lanches.length; i++) {
        produtos.push(lanches[i]+";"+categorias[i]+";"+ingredientes[i]+";"+precos[i]+";"+fotos[i])
    }

    // salva os dados em um arquivo de texto
    fs.writeFileSync("produtos.txt", produtos.join("\n"))

    console.log("Ok! Lista de produtos salva com sucesso")
}

// função que carrega a lista de produtos salva no arquivo
function carregaProdutos() {
    if (fs.existsSync("produtos.txt")) {
        // lê os dados e atribui para um vetor, separando por \n
        const produtos = fs.readFileSync("produtos.txt", "utf-8").split("\n")

        // percorre todas as linhas e divide os elementos para os vetores corretos
        for (let i = 0; i < produtos.length; i++) {
            const partes = produtos[i].split(";")

            lanches.push(partes[0])
            categorias.push(partes[1])
            ingredientes.push(partes[2])
            precos.push(Number(partes[3]))
            fotos.push(partes[4])
        }
    }
}

function cardapioWeb() {
    let conteudo = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cardápio: Lancheria Avenida</title>
    <style>
        body { font-family: Arial; margin: 20px; background-color: #f4f4f4;}
        h1 { color: rgb(119, 8, 8)}
        table { width: 100%; border-collapse: collapse; background-color: #fff;
                box-shadow: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ccc;}
        th { background-color: #e0dede; color: #333;}
        img { max-width: 100px; max-height: 120px; border-radius: 4px;}
        tr:hover { background-color: #f9f9f9;}        
    </style>
</head>
<body>
    <h1>Lancheria Avenida: Cardápio Completo</h1>
    <table>
        <thead>
            <tr>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Ingredientes</th>
                <th>Preço R$</th>
                <th>Foto Ilustrativa</th>
            </tr>
        </thead>
        <tbody>`

    for (let i = 0; i < lanches.length; i++) {
        conteudo += `
            <tr><td>${lanches[i]}</td>
                <td>${categorias[i]}</td>
                <td>${ingredientes[i]}</td>
                <td>${precos[i].toFixed(2)}</td>
                <td><img src="${fotos[i]}" alt="Foto do Produto"></td>
            </tr>            
        `
    }

    conteudo +=
    `    
        </tbody>
    </table>    
</body>
</html>`

    fs.writeFileSync("cardapio.html", conteudo)
    console.log("Cardápio gerado com sucesso. Acesse: file:///C:/logica251/manha/lancheria_v2/cardapio.html")

}

// chama a função que carrega a lista de produtos
carregaProdutos()

menuPrincipal:
do {
   console.log("Lancheria Avenida")
   console.log("-".repeat(40))
   console.log("1. Inclusão de Cardápio")
   console.log("2. Listagem do Cardápio")
   console.log("3. Pesquisa por Categoria")
   console.log("4. Pesquisa por Intervalo de Preço")
   console.log("5. Cardápio Web")
   console.log("6. Cardápio Web por Categoria")
   console.log("7. Alterar Preço")
   console.log("8. Excluir Item do Cardápio")
   console.log("9. Finalizar")
   const opcao = Number(prompt("Opção: "))
//    if (opcao == 1) {
//       inclusao()
//    } else if (opcao == 2) {
//       listagem()
//    } ...
    switch (opcao) {
        case 1: {
            inclusao()
            break
        }    
        case 2: {
            listagem()
            break        
        }    
        case 3: {
            pesquisaCategoria()
            break        
        }    
        case 4: {
            pesquisaPreco()
            break        
        }    
        case 5: {
            cardapioWeb()
            break        
        }    
        case 6: {
            cardapioWebCategoria()
            break        
        }    
        case 7: {
            alteracao()
            break        
        }    
        case 8: {
            exclusao()
            break        
        }    
        default: {
            break menuPrincipal           
        }
    }
} while (true)

// Chama a função que grava os produtos em um arquivo
gravaProdutos()    

console.log("-".repeat(40))
console.log("Fim do Programa...")