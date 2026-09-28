const { supabase, CORS, ok, err } = require('./_db');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: CORS, body: '' };

  const { httpMethod, queryStringParameters: q, body } = event;
  const data = body ? JSON.parse(body) : {};

  if (httpMethod === 'GET') {
    let query = supabase
      .from('appointments')
      .select('*, patients(full_name)')
      .order('appointment_date').order('appointment_time');
    if (q?.date) query = query.eq('appointment_date', q.date);
    const { data: rows, error } = await query;
    if (error) return err(error.message);
    return ok(rows);
  }

  if (httpMethod === 'POST') {
    const { data: row, error } = await supabase.from('appointments').insert(data).select().single();
    if (error) return err(error.message);
    return ok(row);
  }

  if (httpMethod === 'DELETE') {
    const { error } = await supabase.from('appointments').delete().eq('id', q?.id);
    if (error) return err(error.message);
    return ok({ deleted: true });
  }

  return err('Method not allowed', 405);
};
