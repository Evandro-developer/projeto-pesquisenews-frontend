class ThirdPartyApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "/v2";
  }

  async _genericFetch(endpoint, queryParams = {}) {
    try {
      // Constrói a URL manualmente para o endpoint
      const fullPath = `${this.baseUrl}/${endpoint}`;

      // Converte queryParams para uma string de consulta
      const queryString = new URLSearchParams(queryParams).toString();

      // Cria a URL final com a string de consulta
      const finalURL = queryString ? `${fullPath}?${queryString}` : fullPath;

      const response = await fetch(finalURL, {
        method: "GET",
        headers: {
          "X-Api-Key": this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro na solicitação GET para ${endpoint}:`, error);
      throw error;
    }
  }

  fetchEverything(queryParams = {}) {
    // Busca data para os últimos 7 dias e a data atual
    const toDate = new Date().toISOString().split("T")[0];
    const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
      .toISOString()
      .split("T")[0];

    // Mescla queryParams com os parâmetros padrão
    const finalParams = {
      ...queryParams,
      from: fromDate,
      to: toDate,
      pageSize: 100,
    };

    return this._genericFetch("everything", finalParams);
  }

  fetchTopHeadlines(queryParams = {}) {
    return this._genericFetch("top-headlines", queryParams);
  }

  fetchSources(queryParams = {}) {
    return this._genericFetch("top-headlines/sources", queryParams);
  }
}

const api = new ThirdPartyApi("540e7e315a9b4724a114bc87e010244f");

export default api;
