import { defineStore } from 'pinia';

export const useCepStore = defineStore('Cep', {
  state: () => ({
    lista: [],
    emFoco: null,
    chamadasPendentes: {
      lista: false,
      emFoco: false,
    },
    erro: null,
    location: {
      latitude: null,
      longitude: null,
    },
  }),
  actions: {
    async getCep(cep) {
      this.chamadasPendentes.emFoco = true;
      this.erro = null;
      try {
        const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await request.json();
        this.lista = data;
        this.chamadasPendentes.emFoco = false;

        await this.getCoordinates(data.logradouro, data.localidade, data.uf);
        return true;
      } catch (erro) {
        this.erro = erro;
        this.chamadasPendentes.emFoco = false;
        return false;
      }
    },

    async getCoordinates(logradouro, cidade, estado) {
      try {
        const query = `${logradouro}, ${cidade}, ${estado}, Brasil`;
        const request = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
        const data = await request.json();
        if (data.length > 0) {
          this.location.latitude = data[0].lat;
          this.location.longitude = data[0].lon;
        }
      } catch (erro) {
        console.error('Erro ao obter coordenadas:', erro);
      }
    },
  },
});
