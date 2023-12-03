document.addEventListener("DOMContentLoaded", function () {
    const graficoCanvas = document.getElementById("grafico");
    const voltarButton = document.getElementById("voltar");

    fetch("http://localhost:3000/estoque/all")
        .then(response => response.json())
        .then(data => {
            // Group data by product name
            const groupedData = groupBy(data, 'nomeProduto');

            // Check if there is data to display
            if (Object.keys(groupedData).length === 0) {
                graficoCanvas.style.display = "none";
            } else {
                graficoCanvas.style.display = "block";

                const labels = Object.keys(groupedData);
                const valores = labels.map(label => {
                    const products = groupedData[label];
                    return products.reduce((total, product) => total + product.quantidade * product.preco, 0);
                });

                const chartData = {
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

                const chartConfig = {
                    type: "bar",
                    data: chartData,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                };

                new Chart(graficoCanvas, chartConfig);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        document.getElementById('voltar').addEventListener('click', function() {
            window.history.back();
        });
});


function groupBy(arr, key) {
    return arr.reduce((acc, obj) => {
        const groupKey = obj[key];
        acc[groupKey] = acc[groupKey] || [];
        acc[groupKey].push(obj);
        return acc;
    }, {});
}
