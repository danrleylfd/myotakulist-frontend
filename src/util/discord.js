import axios from 'axios';
import btoa from 'btoa';

const CLIENT_ID="701539768043044999"
const CLIENT_SECRET="dMas7HBmbji2kZb9_FOCzySsWpr6z2oD"
const REDIRECT="https://myotakulist.danrleylfd.now.sh/discord/callback"

export async function authCallback(query) {
  if(!query.code) return undefined;
  const { code } = query;
  const redirect = encodeURIComponent(REDIRECT);
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  const res = await axios.post(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    null, { headers: { Authorization: `Basic ${creds}` } }
  );
  return res;
}

export async function getMe(auth) {
  const res = await axios.get('https://discordapp.com/api/users/@me', { headers: { Authorization: `${auth.token_type} ${auth.access_token}` } });
  return res;
}

export async function getConnections(auth) {
  const res = await axios.get('https://discordapp.com/api/users/@me/connections', { headers: { Authorization: `${auth.token_type} ${auth.access_token}` } });
  return res;
}

export async function refreshToken(auth) {
  // const { data } = await axios.post(`https://discordapp.com/api/v6/oauth2/token?grant_type=refresh_token&refresh_token=${auth.refresh_token}&redirect_uri=${redirect}`)
  return undefined;
}
