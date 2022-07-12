import { writable } from 'svelte/store'
import { goto } from '$app/navigation';

function createUser() {
    if (typeof window !== 'undefined') {
        const localUser = JSON.parse(localStorage.getItem('gotrue.user'))
        let avatar;

        let u = null
        if (localUser) {
            u = {
                username: localUser.user_metadata.full_name,
                email: localUser.email,
                avatar: avatar,
                access_token: localUser.token.access_token,
                expires_at: localUser.token.expires_at,
                refresh_token: localUser.token.refresh_token,
                token_type: localUser.token.token_type,
            }
        }
        const { subscribe, set } = writable(u)

        return {
            subscribe,
            u,
            login(user) {
                (async () => {
                    const res = await GET('/get-user-avatar');
                    avatar = 'data:image/png;base64, ' + res;
                    localStorage.setItem('avatar', avatar)
                })();
                const currentUser = {
                    username: user.user_metadata.full_name,
                    email: user.email,
                    avatar: 'red',
                    access_token: user.token.access_token,
                    expires_at: user.token.expires_at,
                    refresh_token: user.token.refresh_token,
                    token_type: user.token.token_type,
                }
                // set(currentUser)
                goto('/clients')
            },
            logout() {
                goto('/')
                set(null)
            },
        }
    }
}

export async function GET(api) {
    // const token = JSON.parse(localStorage.getItem('gotrue.user')).token.access_token
    return (await fetch('/api' + api, {
        // headers: { Authorization: 'Bearer ' + token }s
    })).json()
}

export async function POST(api, body) {
    const token = JSON.parse(localStorage.getItem('gotrue.user')).token.access_token
    const rawResponse = await fetch('/.netlify/functions' + api, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    console.log(content);
    return content
}

export async function UPLOAD(api, body, name, uuid) {
    const token = JSON.parse(localStorage.getItem('gotrue.user')).token.access_token
    console.log(body)
    const rawResponse = await fetch('/.netlify/functions' + api, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            name: name,
            uuid: uuid
        },
        body: body,
    });
    const content = await rawResponse.json();
    console.log(content);
    return content
}

export const user = createUser()
