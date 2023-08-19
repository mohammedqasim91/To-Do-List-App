import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://anjvdcdztmtxicraesef.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuanZkY2R6dG10eGljcmFlc2VmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwOTUzNTgsImV4cCI6MjAwNzY3MTM1OH0.ECLF-IN1PNodPEx8fCwA7NF2ShmpPLEkUzZIPeE1elg";

export default createClient (supabaseUrl,supabaseAnonkey);
