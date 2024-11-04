import { defineStore } from "pinia";
import { useAlertStore } from "./alert.store";

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_URL;

export const useBannerStore = defineStore( 'banner', {
  state: () => ({
    lista: [],
    emFoco: null,
    paginacao: {
      links: [],
      current_page: null,
      last_page: null,
      per_page: 20,
      total: null,
    },
    chamadasPendentes:{
      lista: false,
      emFoco: false,
    },
    error: null
  }),

  actions: {
    async buscarTudo(params = {}){
      this.chamadasPendentes.lista = true;
      this.error = null;

      try{
        const request = await this.requestS.get(
          `${baseUrl}/banner`, {
          ...params, 
          page: params.page || this.paginacao.current_page || 1,
          per_page: this.paginacao.per_page,
        });

        this.lista = request.banners.data
        this.paginacao.current_page = request.banners.current_page;
        this.paginacao.last_page = request.banners.last_page;
        this.paginacao.per_page = request.banners.per_page;
        this.paginacao.total = request.banners.total;
        this.paginacao.links = request.banners.links;
      } catch (error){
        this.error = error
      }

      this.chamadasPendentes.lista = false
    },

    async mudarPagina(page) {
      this.chamadasPendentes.lista = true;
      this.erro = null;
      try {
        this.paginacao.current_page = page;
        this.buscarTudo();
      } catch (erro) {
        this.erro = erro;
      }
      this.chamadasPendentes.lista = false;
    },

    async buscarItem( id = 0){
      this.chamadasPendentes.emFoco = true

      try{
        const request = await this.requestS.get(
          `${baseUrl}/banner/${id}`
        )
        this.emFoco = request.banner

      } catch (erro){
        this.erro = erro
      }
    },

    async excluirItem(id = 0){
      this.chamadasPendentes.lista = true

      try{
        await this.requestS.delete(
          `${baseUrl}/banner/${id}`
        )
        this.chamadasPendentes.lista = false
        return true

      } catch(erro){
        this.erro = erro
        this.chamadasPendentes.lista = false;
        return false;
      }
    },

    async salvarItem(params = {}, id = null) {
      this.chamadasPendentes.emFoco = true;
      this.erro = null;
      try {
        if (id) {
          await this.requestS.put(
            `${baseUrl}/banner/${id}`, params
          );
        } else {
          await this.requestS.post(
            `${baseUrl}/banner`, params
          );
        }

        this.chamadasPendentes.emFoco = false;
        return true;
      } catch (erro) {
        this.erro = erro;
        this.chamadasPendentes.emFoco = false;
        return false;
      }
    },
  },
});