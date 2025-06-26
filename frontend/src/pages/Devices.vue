<template>
  <div class="devices-container">
    <h1>Dispositivos Conectados</h1>
    
    <!-- Lista de Dispositivos -->
    <div v-if="devices.length > 0" class="device-list">
      <div v-for="device in devices" :key="device.id" class="device-card">
        <h3>{{ device.name }}</h3>
        <p>Status: {{ device.isOn ? 'Ligado' : 'Desligado' }}</p>
        <p>Temperatura: {{ device.temperature }}°C</p>
        
        <!-- Botões de Controle -->
        <button @click="toggleDevice(device.id)">
          {{ device.isOn ? 'Desligar' : 'Ligar' }}
        </button>
        <input 
          type="range" 
          v-model="device.temperature" 
          min="16" 
          max="30" 
          @change="updateTemperature(device.id, device.temperature)"
        />
      </div>
    </div>

    <div v-else class="no-devices">
      Nenhum dispositivo conectado.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
    };
  },
  mounted() {
    this.fetchDevices();
  },
  methods: {
    async fetchDevices() {
      try {
        const response = await fetch('http://localhost:3000/api/devices');
        this.devices = await response.json();
      } catch (error) {
        console.error("Erro ao buscar dispositivos:", error);
      }
    },
    async toggleDevice(deviceId) {
      await fetch(`http://localhost:3000/api/devices/${deviceId}/toggle`, {
        method: 'POST',
      });
      this.fetchDevices();
    },
    async updateTemperature(deviceId, temperature) {
      await fetch(`http://localhost:3000/api/devices/${deviceId}/temperature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ temperature }),
      });
    },
  },
};
</script>

<style scoped>
.device-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 0;
  width: 300px;
}
 
.layout {
  height: 100vh;
  display: flex;
  justify-content: end;
}

.main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
}

</style>