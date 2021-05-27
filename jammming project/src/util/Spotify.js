const clientId = 'c5a20206b6354d3fbb1f7ead8aab0115';
const redirectUri = 'http://localhost:3000/';
let accessToken;
let userDetails;



const Spotify = {


    getAccessToken(){

        if(accessToken){
            return accessToken;

        } 
            //Check for access token match
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                accessToken = accessTokenMatch[1];
                const  expiresIn = Number(expiresInMatch[1]);
                //This clears the parameters, allowing u to grab a new access token when it expires.
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken

            } else {
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
                return window.location = accessUrl;

            }
          
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch (`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        return response.json();
    }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album:  track.album.name,
            uri: track.uri
        }
        ));

    })
    },

    async savePlaylist(name, trackUris, id, delTrackUris) {

            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}`};     
     
            let userId = await Spotify.getUserDetails(); 
            if(id && trackUris.length) {    
                return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${id}`,
                {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({name: name})
                }).then( fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${id}/tracks`,
                {
                    headers: headers,
                    method: 'DELETE',
                    body: JSON.stringify({tracks: delTrackUris})
                })
                ).then( fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${id}/tracks`,
                {headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackUris})
                })
                )
            } else if(id) {
                return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${id}`,
                {
                    headers: headers,
                    method: 'PUT',
                    body: JSON.stringify({name: name})
                }).then( fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${id}/tracks`,
                {
                    headers: headers,
                    method: 'DELETE',
                    body: JSON.stringify({tracks: delTrackUris})
                })
                )
            } else if (!name || !trackUris.length){
                return;
            }else {
                return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name})
                }).then(response => response.json()
                ).then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${playlistId}/tracks`,
                    {headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                    })
                })
            }
            
        
    },

    getUserDetails() {
        if(userDetails) {
            return userDetails;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        return fetch('https://api.spotify.com/v1/me', 
        { headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userDetails = jsonResponse;
            return userDetails;
        })


    },

    async getUserPlaylists() {
        
        let userId = await Spotify.getUserDetails();
        const accessToken = Spotify.getAccessToken();


        return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists`, 
            {headers: 
                { Authorization: `Bearer ${accessToken}`}
            }
        ).then( response => response.json()
        ).then( jsonResponse => {
            
           return  jsonResponse.items.map(item =>({
               id: item.id,
               name: item.name,
               tracks: item.tracks

           })
           );

        })
    },

    async getPlaylist(id) {
        let userId = await Spotify.getUserDetails();
        const accessToken = Spotify.getAccessToken();
        let idT = id;
      
        return fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists/${idT}/tracks`,
            {headers: 
                { Authorization: `Bearer ${accessToken}`}
            }
        ).then (response => response.json()
        ).then( jsonResponse => {
            if (!jsonResponse.items){
                return [];
            }


            return jsonResponse
        }
            )

    },

    async getPlaylistName(id) {
        // let userId = await Spotify.getUserDetails();
        const accessToken = Spotify.getAccessToken();
        let idT = id;
      
        return fetch(`https://api.spotify.com/v1/playlists/${idT}`,
            {headers: 
                { Authorization: `Bearer ${accessToken}`}
            }
        ).then (response => response.json()
        ).then( jsonResponse => {

            return jsonResponse.name
        }
            )
    }


}

export default Spotify;