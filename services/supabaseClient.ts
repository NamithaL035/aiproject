import { createClient } from '@supabase/supabase-js';

// Require explicit env configuration to avoid writing to the wrong project
const SUPABASE_URL = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_SUPABASE_URL : undefined;
const SUPABASE_ANON_KEY = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_SUPABASE_ANON_KEY : undefined;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Visible error to help configure environments correctly
    console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Configure your environment variables.');
}

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_ANON_KEY || '');

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

// Domain models used in the app
export type AppTransaction = {
    id: string;
    type: 'income' | 'expense';
    description: string;
    amount: number;
    date: string;
    category: string;
};

export type AppSavedPlan = {
    id: string;
    date: string;
    title?: string;
    items?: any[];
};

// Persistence helpers
async function getCurrentUserId(): Promise<string | null> {
    const { data } = await supabase.auth.getUser();
    return data.user?.id ?? null;
}

export async function upsertProfile(payload: { hasOnboarded: boolean; profile: any; summary?: UserProfileSummary }): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    const row = {
        id: userId,
        has_onboarded: payload.hasOnboarded,
        profile: payload.profile,
        name: payload.summary?.name ?? null,
        avatar_url: payload.summary?.avatarUrl ?? null,
        email: payload.summary?.email ?? null,
    };
    await supabase.from('profiles').upsert(row, { onConflict: 'id' });
}

export async function getProfile(): Promise<{ hasOnboarded: boolean; profile: any } | null> {
    const userId = await getCurrentUserId();
    if (!userId) return null;
    const { data, error } = await supabase
        .from('profiles')
        .select('has_onboarded, profile')
        .eq('id', userId)
        .maybeSingle();
    if (error || !data) return null;
    return { hasOnboarded: !!data.has_onboarded, profile: data.profile ?? null };
}

export async function saveTransactions(transactions: AppTransaction[]): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    const rows = transactions.map(t => ({ ...t, user_id: userId }));
    await supabase.from('transactions').upsert(rows, { onConflict: 'id' });
}

export async function appendTransaction(transaction: AppTransaction): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    await supabase.from('transactions').upsert([{ ...transaction, user_id: userId }], { onConflict: 'id' });
}

export async function loadTransactions(): Promise<AppTransaction[]> {
    const userId = await getCurrentUserId();
    if (!userId) return [];
    const { data, error } = await supabase
        .from('transactions')
        .select('id, type, description, amount, date, category')
        .eq('user_id', userId)
        .order('date', { ascending: true });
    if (error || !data) return [];
    return data as AppTransaction[];
}

export async function savePlans(plans: AppSavedPlan[]): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    const rows = plans.map(p => ({ id: p.id, user_id: userId, plan: p }));
    await supabase.from('plans').upsert(rows, { onConflict: 'id' });
}

export async function upsertPlan(plan: AppSavedPlan): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    await supabase.from('plans').upsert([{ id: plan.id, user_id: userId, plan }], { onConflict: 'id' });
}

export async function deletePlan(id: string): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    await supabase.from('plans').delete().eq('id', id).eq('user_id', userId);
}

export async function loadPlans(): Promise<AppSavedPlan[]> {
    const userId = await getCurrentUserId();
    if (!userId) return [];
    const { data, error } = await supabase
        .from('plans')
        .select('plan')
        .eq('user_id', userId)
        .order('plan->date', { ascending: false });
    if (error || !data) return [];
    return data.map((r: any) => r.plan) as AppSavedPlan[];
}

export async function recordActivity(action: string, metadata?: any): Promise<void> {
    const userId = await getCurrentUserId();
    if (!userId) return;
    await supabase.from('activities').insert({ user_id: userId, action, metadata: metadata ?? null });
}
