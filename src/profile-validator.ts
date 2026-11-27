// Real APIs can send null instead of leaving a field out, so both are allowed.
export type UserProfile = {
  readonly id: number;
  username: string;
  settings?: {
    notifications?: boolean | null;
  } | null;
};

const users: UserProfile[] = [
  { id: 1, username: 'alice', settings: { notifications: true } },
  { id: 2, username: 'bob' },
  { id: 3, username: 'carol', settings: {} },
  { id: 4, username: 'dave', settings: { notifications: false } },
  { id: 5, username: 'erin', settings: null },
  { id: 6, username: 'frank', settings: { notifications: null } },
];

export function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

for (const user of users) {
  console.log(`${user.username}: ${isNotified(user)}`);
}
