export async function login({ email, password }) {
    if (email === 'user@example.com' && password === 'password') {
        return { token: 'fake-jwt-token' };
    }
    throw new Error('Invalid credentials');
}

export function logout() {
    localStorage.removeItem('authToken');
}