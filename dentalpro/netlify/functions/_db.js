const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
  'Content-Type': 'application/json'
};

const ok  = (data)  => ({ statusCode: 200, headers: CORS, body: JSON.stringify(data) });
const err = (msg, code = 500) => ({ statusCode: code, headers: CORS, body: JSON.stringify({ error: msg }) });

module.exports = { supabase, CORS, ok, err };
