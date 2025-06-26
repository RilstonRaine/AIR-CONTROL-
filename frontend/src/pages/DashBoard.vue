<template>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <div class="chart-container">
      <canvas id="grafico"></canvas>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

export default {
  name: 'Dashboard',
  setup() {
    onMounted(() => {
      const ctx = document.getElementById('grafico');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr'],
          datasets: [
            {
              label: 'Temperatura',
              data: [22, 24, 20, 23],
              borderColor: 'blue',
              borderWidth: 2,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false // opcional: ajuda a manter o gráfico proporcional
        }
      });
    });
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 20px 40px;
  margin-left: 220px;
  font-size: 0.9rem;
  transform: scale(0.96);
  transform-origin: top left;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.chart-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-top: 20px;
  height: 600px; 
}
</style>
