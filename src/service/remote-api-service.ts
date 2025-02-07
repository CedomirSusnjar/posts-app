export const fetchNewsRemoteApi = async () => {
    return await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5466550fed754acc881cffa1c0c6a2bd')
        .then(response => response.json());
};