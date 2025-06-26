<template>
  <div class="reports-container">
    <h1>Relatórios</h1>
    <div class="device-selector">
      <label for="device">Dispositivo:</label>
      <select id="device" v-model="selectedDevice" @change="fetchDeviceData">
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.name }}
        </option>
      </select>
    </div>
    <div class="chart-container">
      <h2>Registros de Temperatura</h2>
      <LineChart :chartData="temperatureData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import LineChart from '../components/LineChart.vue';

export default {
  components: { LineChart },
  data() {
    return {
      selectedDevice: null,
      devices: [],
      temperatureData: {
        labels: [],
        datasets: [
          {
            label: 'Temperatura (°C)',
            data: [],
            borderColor: '#42b883',
            tension: 0.1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    };
  },
  async mounted() {
    await this.fetchDevices();
    if (this.devices.length > 0) {
      this.selectedDevice = this.devices[0].id;
      await this.fetchDeviceData();
    }
  },
  methods: {
    async fetchDevices() {
      const response = await fetch('http://localhost:3000/api/devices');
      this.devices = await response.json();
    },
    async fetchDeviceData() {
      // Substituir por chamada do backend
      const mockData = {
        temperature: [22, 23, 24, 23, 22, 21, 20],
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
      };

      this.temperatureData.labels = mockData.labels;
      this.temperatureData.datasets[0].data = mockData.temperature;
    },
  },
};
</script>

<style scoped>
.reports-container {
  padding: 20px 40px;
  margin-left: 220px; /* largura da sidebar */
  font-size: 0.9rem;  /* deixa o texto um pouco menor */
  transform: scale(0.96); /* reduz levemente o zoom */
  transform-origin: top left;
}

.device-selector {
  margin: 10px 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.device-selector label {
  font-weight: 600;
  
}

select {
  
  padding: 6px 10px;
  font-size: 0.85rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 160px;
}

.chart-container {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin-top: 20px;
}



</style>