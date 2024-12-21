let contenedorMonedas = document.getElementById("contenedorMonedas");

fetch("https://api.coingecko.com/api/v3/search/trending")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    // Iterar sobre las monedas en tendencia
    datos.coins.forEach((coin) => {
        
        console.log(coin)
      // Crear contedor para monedas
      const contenedorCreado = document.createElement("div");
      contenedorCreado.classList.add("moneda");
      contenedorCreado.innerHTML = `
        <h2>${coin.item.name} (${coin.item.symbol})</h2>
        <p>Ranking de mercado: ${coin.item.market_cap_rank}</p>
        <img src="${coin.item.small}" alt="${coin.item.name}" />
      `;
      contenedorMonedas.append(contenedorCreado); // Agregar al contenedor principal
    });
  })
  .catch((error) => {
    console.error("No se pudieron obtener los datos de origen:", error);
  });


