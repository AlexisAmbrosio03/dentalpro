const { supabase, CORS, ok, err } = require('./_db');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  const { httpMethod, queryStringParameters: q, body } = event;
  const data = body ? JSON.parse(body) : {};

  if (httpMethod === 'GET') {
    const { data: rows, error } = await supabase
      .from('treatments').select('*')
      .eq('patient_id', q?.patient_id)
      .order('created_at', { ascending: false });
    if (error) return err(error.message);
    return ok(rows);
  }

  if (httpMethod === 'POST') {
    const { data: row, error } = await supabase.from('treatments').insert(data).select().single();
    if (error) return err(error.message);
    return ok(row);
  }

  if (httpMethod === 'PUT') {
    const { id, ...fields } = data;
    const { data: row, error } = await supabase.from('treatments').update(fields).eq('id', id).select().single();
    if (error) return err(error.message);
    return ok(row);
  }

  if (httpMethod === 'DELETE') {
    const { error } = await supabase.from('treatments').delete().eq('id', q?.id);
    if (error) return err(error.message);
    return ok({ deleted: true });
  }

  return err('Method not allowed', 405);
};
