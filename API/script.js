async function fetchAPI(url, options = {}) {
  try {
    const defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (mergedOptions.body) {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
    }

    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la requête API:', error);
    throw error;
  }
}

document.getElementById('fetchButton').addEventListener('click', async function() {
  const apiUrl = 'https://api.meteo-concept.com/api/ephemeride/0?token=b1deb2c6e4bca1e9f7bdb23dc2d635dcba9bdc144026461f537c6c00a7a7c5f0';
  
  try {
    const data = await fetchAPI(apiUrl);
    console.log(data);  // Pour voir la structure des données

    const resultDiv = document.getElementById('result');
    
    if (data && data.city && data.ephemeride) {
      resultDiv.innerHTML = `
        <h2>Temps à ${data.city.name}</h2>
        <p>Lever du soleil: ${data.ephemeride.sunrise}</p>
        <p>Coucher du soleil: ${data.ephemeride.sunset}</p>
        <p>Durée du jour: ${data.ephemeride.duration_day}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p>Données du temps non disponibles</p>`;
    }
  } catch (error) {
    console.error(error);
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Erreur : ${error.message}</p>`;
  }
});