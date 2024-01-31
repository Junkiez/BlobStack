import {createClient} from "@supabase/supabase-js";
import VARS from "../env/vars.ts";

export default createClient(VARS.SUPABASE_URL, VARS.SUPABASE_API_KEY);
