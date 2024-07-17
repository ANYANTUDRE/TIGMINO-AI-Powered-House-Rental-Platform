import Cookies from 'js-cookie';

export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();

    const token = await fetch('http://localhost:8000/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                Cookies.set('session_access_token', json.access, {
                    expires: 60 / 1440, // 60 minutes
                    path: '/'
                });

                return json.access;
            } else {
                resetAuthCookies();
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
        })

    return token;
}

export async function handleLogin(userId, accessToken, refreshToken) {
    Cookies.set('session_userid', userId, {
        expires: 7, // One week
        path: '/'
    });

    Cookies.set('session_access_token', accessToken, {
        expires: 60 / 1440, // 60 minutes
        path: '/'
    });

    Cookies.set('session_refresh_token', refreshToken, {
        expires: 7, // One week
        path: '/'
    });
}

export async function resetAuthCookies() {
    Cookies.remove('session_userid');
    Cookies.remove('session_access_token');
    Cookies.remove('session_refresh_token');
}

//
// Get data
export async function getUserId() {
    const userId = Cookies.get('session_userid');
    return userId ? userId : null;
}

export async function getAccessToken() {
    let accessToken = Cookies.get('session_access_token');

    if (!accessToken) {
        accessToken = await handleRefresh();
    }

    return accessToken;
}

export async function getRefreshToken() {
    let refreshToken = Cookies.get('session_refresh_token');

    return refreshToken;
}
