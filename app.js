// app.js
const apiURL = 'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all&season=2025';

async function loadScores() {
  try {
    const res = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'YOUR_API_KEY',            // replace with your key
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    const { response } = await res.json();
    const container = document.getElementById('matches');

    if (!response.length) {
      container.innerHTML = '<p>No live soccer matches right now.</p>';
      return;
    }

    container.innerHTML = response.map(m => `
      <div class="match">
        <span>${m.fixture.status.elapsed}'</span>
        <span>${m.teams.home.name} vs ${m.teams.away.name}</span>
        <span>${m.goals.home}–${m.goals.away}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
    document.getElementById('matches').innerHTML = '<p>Error loading scores.</p>';
  }
}

loadScores();
setInterval(loadScores, 30000);
