export function getContactArray(contacts) {
  if (contacts) {
    if (Array.isArray(contacts))
      return contacts;
    return [].join(JSON.parse(contacts));
  }
  return [];
}
export function getMyContactArray() {
  return getContactArray(this.contacts);
}
