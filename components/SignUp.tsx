import React, { useState } from 'react';
import { signUpWithEmail, signInWithGoogle } from '../services/supabaseClient';
import { GoogleIcon } from './icons';

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
        <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-color)]">
            <div className="w-full max-w-md neumorphic-pane rounded-2xl p-6 sm:p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)]">Create your account</h1>
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Get started in seconds</p>
                </div>
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                    <div className="neumorphic-inset rounded-xl p-3">
                        <label className="block mb-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">Email</label>
                        <input
                            type="email"
                            className="w-full bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div className="neumorphic-inset rounded-xl p-3">
                        <label className="block mb-1 text-xs sm:text-sm text-[var(--color-text-secondary)]">Password</label>
                        <input
                            type="password"
                            className="w-full bg-transparent outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)]"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    {error && <div className="text-red-500 text-xs sm:text-sm">{error}</div>}
                    {message && <div className="text-green-500 text-xs sm:text-sm">{message}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 sm:py-3 rounded-xl font-semibold text-white bg-[var(--color-primary,#2563eb)] hover:opacity-95 transition disabled:opacity-50 neumorphic-convex"
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <div className="my-4 text-center text-xs sm:text-sm text-[var(--color-text-secondary)]">or</div>
                <button
                    onClick={handleGoogle}
                    disabled={loading}
                    className="w-full py-2 sm:py-3 rounded-xl flex items-center justify-center gap-2 bg-white text-black dark:bg-[#1a1a1a] dark:text-[var(--color-text-primary)] hover:opacity-95 transition disabled:opacity-50 neumorphic-convex"
                >
                    <GoogleIcon className="w-5 h-5" />
                    <span>Continue with Google</span>
                </button>
                <div className="mt-4 text-xs sm:text-sm text-center text-[var(--color-text-secondary)]">
                    Already have an account?{' '}
                    <button className="underline text[var(--color-text-primary)]" onClick={onSwitchToSignIn}>Sign In</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;



