const fs = require("fs");
function prompt(q){ const buf=Buffer.alloc(1024); fs.writeSync(1,q); const n=fs.readSync(0,buf,0,1024); return buf.toString("utf8",0,n).trim(); }

const nomes = [];
const tipos = [];
const liquidez = [];
const rendimentos = [];
const riscos = [];
const precos = [];

function incluir() {
    console.log('Inclusão de Investimento');
    console.log('-'.repeat(40));

    const nome = prompt('Nome...............: ');
    const tipo = prompt('Tipo de Investimento: ');
    const liq = prompt('Liquidez...........: ');
    const rend = prompt('Rendimento (% a.a)..: ');
    const risco = prompt('Risco..............: ');
    const preco = Number(prompt('Preço da Cota R$...: '));

    nomes.push(nome);
    tipos.push(tipo);
    liquidez.push(liq);
    rendimentos.push(rend);
    riscos.push(risco);
    precos.push(preco);

    console.log('Ok! Investimento cadastrado com sucesso');
}

function listar() {
    console.log('Lista de Investimentos');
    console.log('-'.repeat(75));
    console.log('Nome'.padEnd(20) + 'Tipo'.padEnd(20) + 'Liquidez'.padEnd(10) + 'Rend.%'.padEnd(10) + 'Risco'.padEnd(10) + 'Preço R$');
    console.log('-'.repeat(75));

    for (let i = 0; i < nomes.length; i++) {
        console.log(nomes[i].padEnd(20) + tipos[i].padEnd(20) + liquidez[i].padEnd(10) + rendimentos[i].padEnd(10) + riscos[i].padEnd(10) + precos[i].toFixed(2).padStart(8));
    }
    console.log('-'.repeat(75));
}

function pesquisarTipo() {
    const pesq = prompt('Tipo de Investimento: ');
    console.log('-'.repeat(75));
    for (let i = 0; i < nomes.length; i++) {
        if (tipos[i].toLowerCase() === pesq.toLowerCase()) {
            console.log(`${nomes[i]} - Preço R$ ${precos[i].toFixed(2)}`);
        }
    }
}

function pesquisarPreco() {
    const min = Number(prompt('Preço mínimo: '));
    const max = Number(prompt('Preço máximo: '));
    console.log('-'.repeat(75));
    for (let i = 0; i < nomes.length; i++) {
        if (precos[i] >= min && precos[i] <= max) {
            console.log(`${nomes[i]} - Preço R$ ${precos[i].toFixed(2)}`);
        }
    }
}

function salvarDados() {
    const dados = [];
    for (let i = 0; i < nomes.length; i++) {
        dados.push(`${nomes[i]};${tipos[i]};${liquidez[i]};${rendimentos[i]};${riscos[i]};${precos[i]}`);
    }
    fs.writeFileSync('investimentos.txt', dados.join('\n'));
    console.log('Ok! Lista de investimentos salva com sucesso');
}

function carregarDados() {
    if (fs.existsSync('investimentos.txt')) {
        const dados = fs.readFileSync('investimentos.txt', 'utf8').split('\n');
        for (const linha of dados) {
            const [nome, tipo, liq, rend, risco, preco] = linha.split(';');
            nomes.push(nome);
            tipos.push(tipo);
            liquidez.push(liq);
            rendimentos.push(rend);
            riscos.push(risco);
            precos.push(Number(preco));
        }
    }
}

function paginaWeb() {
    let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Investimentos</title>
<style>
body { font-family: Arial; margin: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border: 1px solid #ccc; }
</style>
</head>
<body>
<h1>Investimentos</h1>
<table>
<thead>
<tr><th>Nome</th><th>Tipo</th><th>Liquidez</th><th>Rendimento</th><th>Risco</th><th>Preço R$</th></tr>
</thead>
<tbody>`;
    for (let i = 0; i < nomes.length; i++) {
        html += `<tr><td>${nomes[i]}</td><td>${tipos[i]}</td><td>${liquidez[i]}</td><td>${rendimentos[i]}</td><td>${riscos[i]}</td><td>${precos[i].toFixed(2)}</td></tr>`;
    }
    html += `</tbody></table></body></html>`;
    fs.writeFileSync('investimentos.html', html);
    console.log('Página web gerada com sucesso');
}

function paginaWebTipo() {
    const pesq = prompt('Tipo de Investimento: ');
    let html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Investimentos - ${pesq}</title>
<style>
body { font-family: Arial; margin: 20px; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border: 1px solid #ccc; }
</style>
</head>
<body>
<h1>Investimentos - ${pesq}</h1>
<table>
<thead>
<tr><th>Nome</th><th>Liquidez</th><th>Rendimento</th><th>Risco</th><th>Preço R$</th></tr>
</thead>
<tbody>`;
    for (let i = 0; i < nomes.length; i++) {
        if (tipos[i].toLowerCase() === pesq.toLowerCase()) {
            html += `<tr><td>${nomes[i]}</td><td>${liquidez[i]}</td><td>${rendimentos[i]}</td><td>${riscos[i]}</td><td>${precos[i].toFixed(2)}</td></tr>`;
        }
    }
    html += `</tbody></table></body></html>`;
    fs.writeFileSync('investimentos_tipo.html', html);
    console.log('Página filtrada gerada com sucesso');
}

function alterarPreco() {
    const nome = prompt('Nome do investimento: ');
    const indice = nomes.findIndex(n => n.toLowerCase() === nome.toLowerCase());
    if (indice >= 0) {
        const novoPreco = Number(prompt('Novo preço da cota R$: '));
        precos[indice] = novoPreco;
        console.log('Preço atualizado com sucesso');
    } else {
        console.log('Investimento não encontrado');
    }
}

function excluir() {
    const nome = prompt('Nome do investimento: ');
    const indice = nomes.findIndex(n => n.toLowerCase() === nome.toLowerCase());
    if (indice >= 0) {
        nomes.splice(indice,1);
        tipos.splice(indice,1);
        liquidez.splice(indice,1);
        rendimentos.splice(indice,1);
        riscos.splice(indice,1);
        precos.splice(indice,1);
        console.log('Investimento excluído com sucesso');
    } else {
        console.log('Investimento não encontrado');
    }
}

carregarDados();

menu:
do {
    console.log('Cadastro de Investimentos');
    console.log('-'.repeat(40));
    console.log('1. Incluir Investimento');
    console.log('2. Listar Investimentos');
    console.log('3. Pesquisar por Tipo');
    console.log('4. Pesquisar por Intervalo de Preço');
    console.log('5. Gerar Página Web de Investimentos');
    console.log('6. Gerar Página Web de Tipo');
    console.log('7. Alterar Preço');
    console.log('8. Excluir Investimento');
    console.log('9. Finalizar');

    const opcao = Number(prompt('Opção: '));
    switch (opcao) {
        case 1: incluir(); break;
        case 2: listar(); break;
        case 3: pesquisarTipo(); break;
        case 4: pesquisarPreco(); break;
        case 5: paginaWeb(); break;
        case 6: paginaWebTipo(); break;
        case 7: alterarPreco(); break;
        case 8: excluir(); break;
        default: break menu;
    }
} while (true);

salvarDados();
console.log('-'.repeat(40));
console.log('Fim do Programa...');
