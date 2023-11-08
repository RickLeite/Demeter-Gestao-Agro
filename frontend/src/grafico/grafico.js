document.addEventListener("DOMContentLoaded", function () {
    const graficoCanvas = document.getElementById("grafico");

    // Suponha que você tenha um array "produtos" com os dados dos produtos
    // Exemplo:
    const labels = produtos.map((produto) => produto.nome);
    const valores = produtos.map((produto) => produto.quantidade * produto.valorUnitario);

    if (labels.length === 0 || valores.length === 0) {
        graficoCanvas.style.display = "none";
    } else {
        graficoCanvas.style.display = "block";

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "Valor Total por Produto",
                    data: valores,
                    backgroundColor: "rgba(75, 192, 192, 0.5)",
                    borderColor: "rgb(75, 192, 192)",
                    borderWidth: 2,
                },
            ],
        };

        const config = {
            type: "bar",
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        };

        new Chart(graficoCanvas, config);
    }
});
