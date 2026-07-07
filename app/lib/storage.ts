export function saveUser(name: string) {
  localStorage.setItem("forgefit-user", name);
}

export function getUser() {
  return localStorage.getItem("forgefit-user");
}

export function saveWeight(weight: string) {
  localStorage.setItem("forgefit-weight", weight);
}

export function getWeight() {
  return localStorage.getItem("forgefit-weight");
}

export function saveGoal(goal: string) {
  localStorage.setItem("forgefit-goal", goal);
}

export function getGoal() {
  return localStorage.getItem("forgefit-goal");
}