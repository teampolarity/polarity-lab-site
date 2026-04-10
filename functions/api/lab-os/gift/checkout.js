export async function onRequestPost({ request, env }) {
  const body = await request.json().catch(() => null);
  if (!body?.project || !body?.amount_cents) {
    return new Response(JSON.stringify({ error: 'project and amount_cents required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  if (body.amount_cents < 1000 || body.amount_cents > 99900) {
    return new Response(JSON.stringify({ error: 'amount_cents must be between 1000 and 99900' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  const origin = new URL(request.url).origin;
  const params = new URLSearchParams({
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][product_data][name]': `Polarity Lab, ${body.project}`,
    'line_items[0][price_data][unit_amount]': String(body.amount_cents),
    'line_items[0][quantity]': '1',
    'mode': 'payment',
    'success_url': `${origin}/fund?success=1`,
    'cancel_url': `${origin}/fund`
  });

  try {
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });
    const session = await res.json();
    if (!session.url) throw new Error('No checkout URL');
    return new Response(JSON.stringify({ checkout_url: session.url }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch {
    return new Response(JSON.stringify({ error: 'Checkout unavailable' }), { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
}
