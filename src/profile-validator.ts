export{};
type UserProfile = {
  readonly id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};
const userWithNotifications: UserProfile = {
  id: 1,
  username: 'alice',
  settings: { notifications: true },
};

const userWithoutSettings: UserProfile = {
  id: 2,
  username: 'bob',
};

const userWithEmptySettings: UserProfile = {
  id: 3,
  username: 'carol',
  settings: {},
};

const userWithNotificationsOff: UserProfile = {
  id: 4,
  username: 'dave',
  settings: { notifications: false },
};

function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}
console.log(`${userWithNotifications.username}: ${isNotified(userWithNotifications)}`);
console.log(`${userWithoutSettings.username}: ${isNotified(userWithoutSettings)}`);
console.log(`${userWithEmptySettings.username}: ${isNotified(userWithEmptySettings)}`);
console.log(`${userWithNotificationsOff.username}: ${isNotified(userWithNotificationsOff)}`);