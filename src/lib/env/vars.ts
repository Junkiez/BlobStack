const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
export const SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_SECRET
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
if (!SUPABASE_API_KEY) {
    throw new Error("Missing Api Key")
}
if (!SUPABASE_URL) {
    throw new Error("Missing Api Url")
}

export default {PUBLISHABLE_KEY, SUPABASE_API_KEY, SUPABASE_URL}
