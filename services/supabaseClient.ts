import { createClient } from '@supabase/supabase-js';

// For local development, we read from Vite env if available; otherwise fall back to hardcoded values provided by the user.
// In production, prefer environment variables via import.meta.env.
const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || 'https://ahdwmagkquavrmwsvzml.supabase.co';
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoZHdtYWdrcXVhdnJtd3N2em1sIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc0NjgxNiwiZXhwIjoyMDc1MzIyODE2fQ.EqyPFRms7ZCvBFUmMTgbGfX_3eW3uOLIcTrVnzr7J3I';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function signInWithEmail(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
    return await supabase.auth.signUp({ email, password });
}

export async function signInWithGoogle() {
    return await supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function signOut() {
    return await supabase.auth.signOut();
}

export type UserProfileSummary = {
    id: string;
    email: string | null;
    name: string;
    avatarUrl: string;
};

export async function fetchUserProfileSummary(): Promise<UserProfileSummary | null> {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    const user = data.user;
    const meta: any = user.user_metadata || {};
    const name = meta.name || meta.full_name || meta.user_name || (user.email ? user.email.split('@')[0] : 'User');
    const avatar = meta.avatar_url || meta.picture || `https://i.pravatar.cc/100?u=${encodeURIComponent(user.id)}`;
    return {
        id: user.id,
        email: user.email ?? null,
        name,
        avatarUrl: avatar,
    };
}
