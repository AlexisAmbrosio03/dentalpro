const { supabase, CORS, ok, err } = require('./_db');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  const { httpMethod, queryStringParameters: q, body } = event;
  const data = body ? JSON.parse(body) : {};

  if (httpMethod === 'GET') {
    const { data: rows, error } = await supabase
      .from('odontogram').select('*').eq('patient_id', q?.patient_id);
    if (error) return err(error.message);
    return ok(rows);
  }

  if (httpMethod === 'POST') {
    const { data: row, error } = await supabase
      .from('odontogram')
      .upsert(data, { onConflict: 'patient_id,tooth_number' })
      .select().single();
    if (error) return err(error.message);
    return ok(row);
  }

  return err('Method not allowed', 405);
};
