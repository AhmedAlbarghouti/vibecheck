'server only'

type SpotifyTokenResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
  
  type SpotifyCurrentlyPlayingResponse = {
    item: {
        album: {
			name: string;
            images: {
            url: string;
            }[];
        };
        artists: {
            name: string;
        }[];
        name: string;
        };
        is_playing: boolean;
  };
  
  export const getSpotifyAccessToken = async (): Promise<string | null> => {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
  
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token || '');
  
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    };
  
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: headers,
        body: params,
        next:{ revalidate: 3000}
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Spotify API Error:', errorResponse);
        return null;
      }
  
      const data: SpotifyTokenResponse = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error fetching Spotify access token:', error);
      return null;
    }
  };
  
  export const getCurrentlyPlayingTrack = async (): Promise<SpotifyCurrentlyPlayingResponse | null> => {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) return null;
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
        cache: 'no-store',
      });
  
      if (!response.ok) {
        console.error(`Error fetching currently playing track: ${response.status} - ${response.statusText}`);
        return null;
      }
  
      const data: SpotifyCurrentlyPlayingResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching currently playing track:', error);
      return null;
    }
  };