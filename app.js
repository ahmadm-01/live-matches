// app.js for football-data.org

const apiURL = 'https://api.football-data.org/v4/matches?status=LIVE';

async function loadScores() {
  try {
    const res = await fetch(apiURL, {
      headers: { 'X-Auth-Token': '2aff68b382c14cd4a5b7b05d97773183' }
    });
    const data = await res.json();
    const matches = data && data.matches ? data.matches : [];
    const container = document.getElementById('matches');
    if (!matches.length) {
      container.innerHTML = '<p>No live soccer matches right now.</p>';
      return;
    }
    container.innerHTML = matches.map(m => `
      <div class="match">
        <span>${m.minute !== undefined ? m.minute : '-' }'</span>
        <span>${m.homeTeam.name} vs ${m.awayTeam.name}</span>
        <span>${m.score.fullTime.home !== null ? m.score.fullTime.home : 0}-${m.score.fullTime.away !== null ? m.score.fullTime.away : 0}</span>
      </div>
    `).join('');
  } catch (e) {
    document.getElementById('matches').innerHTML = '<p>Error loading scores.</p>';
  }
}

loadScores();
setInterval(loadScores, 30000);

