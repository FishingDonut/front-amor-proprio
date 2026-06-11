let API_BASE_URL = 'https://amorproprio.free.nf/public/api';

// Robust detection for local development to use Vite proxy
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/) ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('10.') ||
    window.location.hostname.startsWith('172.')
);

if (import.meta.env && import.meta.env.VITE_API_URL) {
    API_BASE_URL = import.meta.env.VITE_API_URL;
} else if (window.location.origin.includes('amorproprio.free.nf')) {
    API_BASE_URL = window.location.origin + '/public/api';
} else if (isLocalhost) {
    // If we're on localhost or a local network IP, use the relative path to trigger Vite proxy
    // This avoids CORS issues during development
    API_BASE_URL = '/public/api';
}

/**
 * Helper to execute HTTP requests to the API.
 * Automatically attaches Authorization headers if a token exists in localStorage.
 */
async function fetchAPI(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    // Set headers
    const headers = {
        'Accept': 'application/json',
        ...options.headers
    };

    // Only set Content-Type if there is a body and it's not FormData
    // This avoids unnecessary OPTIONS preflight requests for GET/DELETE
    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    // Ensure endpoint starts with /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    try {
        const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, config);

        // If unauthorized, clear token and redirect to login (if not on public pages)
        if (response.status === 401 && window.location.pathname !== '/login' && window.location.pathname !== '/') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Não autorizado. Redirecionando para login...');
        }

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        let data;
        
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            console.error("Erro na API (Resposta não é JSON):", text);
            throw new Error(`Erro no servidor (${response.status}). Verifique o console do navegador.`);
        }

        if (!response.ok) {
            throw new Error(data.message || `Erro ao processar requisição (${response.status})`);
        }

        return data;
    } catch (error) {
        console.error("Erro na chamada API:", error);
        throw error;
    }
}

// Export utilities as ES module
const API = {
    BASE_URL: API_BASE_URL,
    fetch: fetchAPI,
    get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
    post: (endpoint, body) => fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(body) }),
    put: (endpoint, body) => fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
    delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
    upload: (endpoint, formData) => fetchAPI(endpoint, { method: 'POST', body: formData })
};

export default API;
