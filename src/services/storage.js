const STORAGE_KEY = 'voteiq_user';

function getDefaultUser() {
  return {
    xp: 0,
    streak: 0,
    lastActiveDate: null,
    completedLessons: [],
    unlockedTopics: ['what-is-democracy'],
  };
}

export function getUserData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...getDefaultUser(), ...JSON.parse(stored) };
    }
  } catch (e) {
    console.warn('Failed to read user data:', e);
  }
  return getDefaultUser();
}

export function saveUserData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save user data:', e);
  }
}

export function addXP(amount) {
  const user = getUserData();
  user.xp += amount;
  
  const today = new Date().toDateString();
  if (user.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (user.lastActiveDate === yesterday) {
      user.streak += 1;
    } else if (user.lastActiveDate !== today) {
      user.streak = 1;
    }
    user.lastActiveDate = today;
  }
  
  saveUserData(user);
  return user;
}

export function completeLesson(topicId, nextTopicId) {
  const user = getUserData();
  if (!user.completedLessons.includes(topicId)) {
    user.completedLessons.push(topicId);
  }
  if (nextTopicId && !user.unlockedTopics.includes(nextTopicId)) {
    user.unlockedTopics.push(nextTopicId);
  }
  saveUserData(user);
  return user;
}

export function isTopicUnlocked(topicId) {
  const user = getUserData();
  return user.unlockedTopics.includes(topicId);
}

export function isTopicCompleted(topicId) {
  const user = getUserData();
  return user.completedLessons.includes(topicId);
}
