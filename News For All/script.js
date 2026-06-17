async function fetchNews() {
    const state = document.getElementById('stateSelector').value;
    const container = document.getElementById('newsContainer');
    
    // Targeted query for Top Stories by location
    const rssUrl = `https://news.google.com/rss/search?q=location:${state}+top+stories&hl=en-IN&gl=IN&ceid=IN:en`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

    container.innerHTML = '<p>Fetching top stories by Jovin Joju...</p>';

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        container.innerHTML = ''; 

        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                container.innerHTML += `
                    <a href="${item.link}" target="_blank" class="news-card">
                        <h3>${item.title}</h3>
                        <p class="pub-date">${item.pubDate}</p>
                    </a>
                `;
            });
        } else {
            container.innerHTML = '<p>No top stories found for this location right now.</p>';
        }
    } catch (error) {
        container.innerHTML = '<p>Error: Check your server and internet connection.</p>';
        console.error(error);
    }
}