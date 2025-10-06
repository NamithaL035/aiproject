import React, { useState } from 'react';
import { signUpWithEmail, signInWithGoogle } from '../services/supabaseClient';

interface SignUpProps {
    onSignedUp: () => void;
    onSwitchToSignIn: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSignedUp, onSwitchToSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        setLoading(true);
        const { error } = await signUpWithEmail(email, password);
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
        setMessage('Check your email to confirm your account.');
        onSignedUp();
    };

    const handleGoogle = async () => {
        setError(null);
        setLoading(true);
        const { error } = await signInWithGoogle();
        setLoading(false);
        if (error) {
            setError(error.message);
            return;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)] p-4">
            <div className="w-full max-w-md rounded-xl shadow-lg p-6 bg-[var(--card-bg,#111213)] text-[var(--color-text-primary)]">
                <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border-color,#2a2a2a)] focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 rounded-md bg-transparent border border-[var(--border-color,#2a2a2a)] focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {message && <div className="text-green-500 text-sm">{message}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <div className="my-4 text-center text-sm opacity-70">or</div>
                <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full py-2 rounded-md bg-white text-black hover:opacity-90 transition disabled:opacity-50"
                >
                    Continue with Google
                </button>
                <div className="mt-4 text-sm text-center">
                    Already have an account?{' '}
                    <button className="underline" onClick={onSwitchToSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;



