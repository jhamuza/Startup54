export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { provider, code } = req.query;
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://startup54.com';

  // Step 1: OAuth redirect (GET /api/auth?provider=github)
  if (req.method === 'GET' && provider === 'github' && !code) {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: 'GITHUB_CLIENT_ID not configured' });
    }

    const redirectUri = `${baseUrl}/api/auth`;
    const scope = 'repo';
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    return res.redirect(githubAuthUrl);
  }

  // Step 2: Token exchange (GET /api/auth?code=...)
  if (req.method === 'GET' && code) {
    try {
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'GitHub OAuth credentials not configured' });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const data = await tokenRes.json();

      if (data.error) {
        return res.status(400).json({ error: data.error });
      }

      // Return token in format Decap expects
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ token: data.access_token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    // Handle POST from client (alternative flow)
    const { code: postCode } = req.body;

    if (!postCode) {
      return res.status(400).json({ error: 'code required' });
    }

    try {
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        return res.status(500).json({ error: 'GitHub OAuth credentials not configured' });
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: postCode,
        }),
      });

      const data = await tokenRes.json();

      if (data.error) {
        return res.status(400).json({ error: data.error });
      }

      res.status(200).json({ token: data.access_token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
