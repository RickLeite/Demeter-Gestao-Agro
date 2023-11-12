const despesas = [];

const formDespesa = document.getElementById('form-despesa');
const listaDespesas = document.getElementById('lista-despesas');
const dataDespesa = document.getElementById('data-despesa');
const valorDespesa = document.getElementById('valor-despesa');
const descricaoDespesa = document.getElementById('descricao-despesa');
const pagoDespesa = document.getElementById('pago-despesa');
const btnNaoPago = document.getElementById('btn-nao-pago');
const btnPago = document.getElementById('btn-pago');
const anexoDespesa = document.getElementById('anexo-despesa');
const btnExcluirDespesa = document.getElementById('btn-excluir-despesa');
const btnGerarCSV = document.getElementById('btn-gerar-csv');
const btnVerDetalhes = document.getElementById('btn-ver-detalhes');

btnPago.addEventListener('click', function() {
    btnPago.classList.add('active');
    btnNaoPago.classList.remove('active');
});

btnNaoPago.addEventListener('click', function() {
    btnNaoPago.classList.add('active');
    btnPago.classList.remove('active');
});

formDespesa.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = dataDespesa.value;
    const valor = parseFloat(valorDespesa.value);
    const descricao = descricaoDespesa.value;
    const pago = btnPago.classList.contains('active');
    let anexo = null;
    if (anexoDespesa.files.length > 0) {
        anexo = anexoDespesa.files[0];
    }
    const novaDespesa = {
        data: data,
        valor: valor,
        descricao: descricao,
        pago: pago,
        anexo: anexo,
    };
    despesas.push(novaDespesa);
    formDespesa.reset();
    atualizarListaDespesas();
    mostrarDetalhesDaDespesa(novaDespesa);
});

listaDespesas.addEventListener('change', function () {
    const selectedIndex = listaDespesas.selectedIndex;
    if (selectedIndex !== -1) {
        const despesaSelecionada = despesas[selectedIndex];
        mostrarDetalhesDaDespesa(despesaSelecionada);
    } else {
        limparDetalhes();
    }
});

btnExcluirDespesa.addEventListener('click', function () {
    const selectedIndex = listaDespesas.selectedIndex;
    if (selectedIndex !== -1) {
        despesas.splice(selectedIndex, 1);
        atualizarListaDespesas();
        limparDetalhes();
    }
});

btnGerarCSV.addEventListener('click', function () {
    gerarCSV(despesas);
});

function mostrarDetalhesDaDespesa(despesa) {
    const detalhesData = document.getElementById('detalhes-data');
    const detalhesValor = document.getElementById('detalhes-valor');
    const detalhesDescricao = document.getElementById('detalhes-descricao');
    const detalhesPago = document.getElementById('detalhes-pago');
    const detalhesAnexo = document.getElementById('detalhes-anexo');

    detalhesData.textContent = despesa.data;
    detalhesValor.textContent = despesa.valor.toFixed(2);
    detalhesDescricao.textContent = despesa.descricao;
    detalhesPago.textContent = despesa.pago ? 'Sim' : 'Não';
    detalhesAnexo.textContent = despesa.anexo ? despesa.anexo.name : 'Nenhum';
}

function limparDetalhes() {
    const detalhesData = document.getElementById('detalhes-data');
    const detalhesValor = document.getElementById('detalhes-valor');
    const detalhesDescricao = document.getElementById('detalhes-descricao');
    const detalhesPago = document.getElementById('detalhes-pago');
    const detalhesAnexo = document.getElementById('detalhes-anexo');

    detalhesData.textContent = '';
    detalhesValor.textContent = '';
    detalhesDescricao.textContent = '';
    detalhesPago.textContent = '';
    detalhesAnexo.textContent = '';
}

function atualizarListaDespesas() {
    listaDespesas.innerHTML = '';

    despesas.forEach((despesa, index) => {
        const option = document.createElement('option');
        option.textContent = `${despesa.descricao} - R$ ${despesa.valor.toFixed(2)} - ${despesa.data}`;
        listaDespesas.add(option);
    });
}

function gerarCSV(despesas) {
    // Implementação da geração de CSV
}
document.getElementById('voltar').addEventListener('click', function() {
    window.history.back();
});