import Keycloak, { type KeycloakConfig } from 'keycloak-js';
import { writable } from 'svelte/store';

const authStore = () => {
    const { update, subscribe } = writable<any>({ loading: true, user: null })
    let keycloak: Keycloak;
	
	// important: only call this in your root layout once
	async function init(config: KeycloakConfig) {
		keycloak = new Keycloak(config);
		try {
			const auth = await keycloak.init({
				onLoad: 'check-sso'
			});
			if (auth) {
				await keycloak.loadUserInfo();
				update((auth) => ({ ...auth, user: keycloak.userInfo as any}));				
				await autoRefresh(keycloak);
			} else {
				update((auth) => ({ ...auth, user: null }));
			}
		} catch (e) {
			console.error(e);
		} finally {
            update((auth) => ({...auth, loading: false }))
		}
    }
    
	async function logout() {
        update((auth) => ({...auth, loading: true }))
		await keycloak.logout();
		update((auth) => ({...auth, loading: false }))
	}

	async function login() {
		await keycloak.login({ redirectUri: 'http://127.0.0.1:3000' });
	}

	// remove the console logs in production and adopt the refresh and polling intervall to your needs
    async function autoRefresh(kc: Keycloak) {
		// because this is only calles once, a cleanup of the timer is not needed
		setInterval(async () => {
			try {
				const refreshed = await kc.updateToken(70)
				if (refreshed) {
					console.log('Token refreshed' + refreshed);
				} else {
					console.log(
						'Token not refreshed, valid for ' +
							Math.round((kc?.tokenParsed?.exp as number) + (kc.timeSkew as number) - new Date().getTime() / 1000) +
							' seconds'
					);
				}
			} catch(e) {
				console.error('Failed to refresh token', e);
			}			
		}, 6000);
	}
    
    return { subscribe, init, login, logout }
}

export const auth = authStore()