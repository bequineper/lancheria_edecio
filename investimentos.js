const prompt = require("prompt-sync")()
const fs = require("fs")


const nomes = []
const tipos = []
const liquidez = []
const rendimentos = []
const riscos = []
const precos = []


function inclusao() {
    console.log("Inclusão de Investimento")
    console.log("-".repeat(40))

    const nome = prompt("Nome...............: ")
    const tipo = prompt("Tipo de Investimento: ")
    const liq = prompt("Liquidez...........: ")
    const rend = prompt("Rendimento (% a.a)..: ")
    const risco = prompt("Risco..............: ")
    const preco = Number(prompt("Preço da Cota R$...: "))

    nomes.push(nome)
    tipos.push(tipo)
    liquidez.push(liq)
    rendimentos.push(rend)
    riscos.push(risco)
    precos.push(preco)

    console.log("Ok! Investimento cadastrado com sucesso")
}

function listagem() {
    console.log("Lista de Investimentos")
    console.log("-".repeat(85))
    console.log("Nome...............: Tipo...............: Liquidez: Rend.%: Risco: Preço R$")
    console.log("-".repeat(85))

    for (let i = 0; i < nomes.length; i++) {
        console.log(`${nomes[i].padEnd(20)} ${tipos[i].padEnd(20)} ${liquidez[i].padEnd(10)} ${rendimentos[i].padEnd(8)} ${riscos[i].padEnd(8)} ${precos[i].toFixed(2).padStart(8)}`)
    }

    console.log("-".repeat(85))
}


function gravaInvestimentos() {
    const lista = []
    for (let i = 0; i < nomes.length; i++) {
        lista.push(nomes[i]+";"+tipos[i]+";"+liquidez[i]+";"+rendimentos[i]+";"+riscos[i]+";"+precos[i])
    }
    fs.writeFileSync("investimentos.txt", lista.join("\n"))
    console.log("Ok! Lista de investimentos salva com sucesso")
}


function carregaInvestimentos() {
    nomes.length = 0
    tipos.length = 0
    liquidez.length = 0
    rendimentos.length = 0
    riscos.length = 0
    precos.length = 0

    if (fs.existsSync("investimentos.txt")) {
        const lista = fs.readFileSync("investimentos.txt", "utf-8").split("\n")
        for (let i = 0; i < lista.length; i++) {
            const partes = lista[i].split(";")
            if (partes.length === 6) {
                nomes.push(partes[0])
                tipos.push(partes[1])
                liquidez.push(partes[2])
                rendimentos.push(partes[3])
                riscos.push(partes[4])
                precos.push(Number(partes[5]))
            }
        }
    }
}


function paginaWeb() {
    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Investimentos</title>
<style>
body { font-family: Arial; margin: 20px; background: #f4f4f4; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 12px; border: 1px solid #ccc; }
th { background: #ddd; }
tr:hover { background: #f9f9f9; }
</style>
</head>
<body>
<h1>Lista de Investimentos</h1>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Tipo</th>
<th>Liquidez</th>
<th>Rendimento</th>
<th>Risco</th>
<th>Preço R$</th>
</tr>
</thead>
<tbody>`

    for (let i = 0; i < nomes.length; i++) {
        html += `
<tr>
<td>${nomes[i]}</td>
<td>${tipos[i]}</td>
<td>${liquidez[i]}</td>
<td>${rendimentos[i]}</td>
<td>${riscos[i]}</td>
<td>${precos[i].toFixed(2)}</td>
</tr>`
    }

    html += `
</tbody>
</table>
</body>
</html>`

    fs.writeFileSync("investimentos.html", html)
    console.log("Página web gerada com sucesso")
}


function paginaWebTipo() {
    const tipoPesq = prompt("Tipo de Investimento: ")
    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Investimentos - ${tipoPesq}</title>
<style>
body { font-family: Arial; margin: 20px; background: #f4f4f4; }
table { width: 100%; border-collapse: collapse; background: #fff; }
th, td { padding: 12px; border: 1px solid #ccc; }
th { background: #ddd; }
tr:hover { background: #f9f9f9; }
</style>
</head>
<body>
<h1>Investimentos - ${tipoPesq}</h1>
<table>
<thead>
<tr>
<th>Nome</th>
<th>Liquidez</th>
<th>Rendimento</th>
<th>Risco</th>
<th>Preço R$</th>
</tr>
</thead>
<tbody>`

    for (let i = 0; i < nomes.length; i++) {
        if (tipos[i].toLowerCase() === tipoPesq.toLowerCase()) {
            html += `
<tr>
<td>${nomes[i]}</td>
<td>${liquidez[i]}</td>
<td>${rendimentos[i]}</td>
<td>${riscos[i]}</td>
<td>${precos[i].toFixed(2)}</td>
</tr>`
        }
    }

    html += `
</tbody>
</table>
</body>
</html>`

    fs.writeFileSync("investimentos_tipo.html", html)
    console.log("Página web filtrada gerada com sucesso")
}


function pesquisaTipo() {
    const pesq = prompt("Tipo de Investimento: ")
    console.log("-".repeat(40))
    for (let i = 0; i < nomes.length; i++) {
        if (tipos[i].toLowerCase() === pesq.toLowerCase()) {
            console.log(`${nomes[i]} - Preço R$ ${precos[i].toFixed(2)}`)
        }
    }
}


function pesquisaPreco() {
    const min = Number(prompt("Preço mínimo: "))
    const max = Number(prompt("Preço máximo: "))
    console.log("-".repeat(40))
    for (let i = 0; i < nomes.length; i++) {
        if (precos[i] >= min && precos[i] <= max) {
            console.log(`${nomes[i]} - Preço R$ ${precos[i].toFixed(2)}`)
        }
    }
}


function alteracao() {
    const nome = prompt("Nome do investimento: ")
    for (let i = 0; i < nomes.length; i++) {
        if (nomes[i].toLowerCase() === nome.toLowerCase()) {
            const novoPreco = Number(prompt("Novo preço R$: "))
            precos[i] = novoPreco
            console.log("Preço atualizado com sucesso")
            return
        }
    }
    console.log("Investimento não encontrado")
}


function exclusao() {
    const nome = prompt("Nome do investimento a excluir: ")
    for (let i = 0; i < nomes.length; i++) {
        if (nomes[i].toLowerCase() === nome.toLowerCase()) {
            nomes.splice(i, 1)
            tipos.splice(i, 1)
            liquidez.splice(i, 1)
            rendimentos.splice(i, 1)
            riscos.splice(i, 1)
            precos.splice(i, 1)
            console.log("Investimento excluído com sucesso")
            return
        }
    }
    console.log("Investimento não encontrado")
}

carregaInvestimentos()

menuPrincipal:
while (true) {
    console.log("Cadastro de Investimentos")
    console.log("-".repeat(40))
    console.log("1. Inclusão de Investimento")
    console.log("2. Listagem de Investimentos")
    console.log("3. Pesquisa por Tipo")
    console.log("4. Pesquisa por Intervalo de Preço")
    console.log("5. Página Web de Investimentos")
    console.log("6. Página Web por Tipo")
    console.log("7. Alterar Investimento")
    console.log("8. Excluir Investimento")
    console.log("9. Finalizar")
    const opcao = Number(prompt("Opção: "))

    switch (opcao) {
        case 1: inclusao(); break
        case 2: listagem(); break
        case 3: pesquisaTipo(); break
        case 4: pesquisaPreco(); break
        case 5: paginaWeb(); break
        case 6: paginaWebTipo(); break
        case 7: alteracao(); break
        case 8: exclusao(); break
        default: break menuPrincipal
    }
}

gravaInvestimentos()
console.log("-".repeat(40))
console.log("Fim do Programa...")
