function reauthenticate() {
  const token = localStorage.getItem('token');
  if(!token) return undefined;
  const _id = localStorage.getItem('_id');
  const discrim = localStorage.getItem('discrim');
  const email = localStorage.getItem('email');
  const name = localStorage.getItem('name');
  const avatar = localStorage.getItem('avatar');
  return { token, _id, discrim, email, name, avatar };
}

export default reauthenticate;
