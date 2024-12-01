let chart; // Variable global para la gráfica

function calculateRecovery() {
  // Obtener los valores ingresados por el usuario
  const investment = parseFloat(document.getElementById('investment').value);
  const years = parseInt(document.getElementById('years').value);

  // Validar los campos
  if (isNaN(investment) || isNaN(years) || investment <= 0 || years <= 0) {
    document.getElementById('output').innerText = "Por favor, ingresa valores válidos.";
    return;
  }

  // Calcular la recuperación anual uniforme
  const annualRecovery = investment / years; // Monto recuperado cada año
  const labels = []; // Años
  const data = [];   // Cantidad restante por recuperar
  let remainingAmount = investment;

  for (let year = 1; year <= years; year++) {
    labels.push(`Año ${year}`);
    data.push(remainingAmount.toFixed(2)); // Guardar el monto restante con 2 decimales
    remainingAmount -= annualRecovery; // Reducir la cantidad restante

    // Evitar números negativos al final
    if (remainingAmount < 0) remainingAmount = 0;
  }

  // Mostrar el resultado final
  document.getElementById('output').innerText = `Se recuperará $${annualRecovery.toFixed(2)} cada año durante ${years} años.`;

  // Crear o actualizar la gráfica
  updateChart(labels, data);
}

function updateChart(labels, data) {
  const ctx = document.getElementById('recoveryChart').getContext('2d');

  // Destruir la gráfica anterior si ya existe
  if (chart) {
    chart.destroy();
  }

  // Crear una nueva gráfica
  chart = new Chart(ctx, {
    type: 'line', // Tipo de gráfica
    data: {
      labels: labels, // Años
      datasets: [{
        label: 'Dinero Restante por Recuperar ($)',
        data: data, // Monto restante
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return `$${tooltipItem.raw}`;
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Años'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Monto Restante ($)'
          },
          beginAtZero: true
        }
      }
    }
  });
}
