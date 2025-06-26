const express = require('express');
const app = express();
app.use(express.json());

// Mock de dispositivos subsittuir por comunicação com o ESP32)
let devices = [
  { id: 1, name: "Ar-Condicionado Sala", isOn: false, temperature: 22 },
];

// Rota para listar dispositivos
app.get('/api/devices', (req, res) => {
  res.json(devices);
});

// Rota para ligar/desligar
app.post('/api/devices/:id/toggle', (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (device) {
    device.isOn = !device.isOn;
    // Aqui envia o comando para o ESP32  via MQTt
    // mqttClient.publish('esp32/control', `toggle:${device.id}`);
    res.json(device);
  } else {
    res.status(404).send("Dispositivo não encontrado");
  }
});

// Rota para atualizar temperatura
app.post('/api/devices/:id/temperature', (req, res) => {
  const device = devices.find(d => d.id === parseInt(req.params.id));
  if (device) {
    device.temperature = req.body.temperature;
    // Envia comando para o ESP32
    // mqttClient.publish('esp32/control', `temp:${device.id}:${req.body.temperature}`);
    res.json(device);
  } else {
    res.status(404).send("Dispositivo não encontrado");
  }
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));