
export const authEndpoint = "https://accounts.spotify.com/authorize";

export const clientId = "cd4ecb2e44224d8681f2b18f34dc30fc";
export const redirectUri = "http://localhost:3000/redirect";
export const scopes = [
    "user-top-read",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
];

export const authUrl = `${authEndpoint}` +
                        `?client_id=${clientId}` +
                        `&redirect_uri=${redirectUri}` +
                        `&scope=${scopes.join("%20")}` +
                        `&response_type=token` +
                        `&show_dialog=true`;