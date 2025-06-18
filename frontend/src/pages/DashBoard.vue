<template>
  <div>
    <h2>Dashboard</h2>
    <canvas id="grafico"></canvas>
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
        }
      });
    });
  }
}
</script>