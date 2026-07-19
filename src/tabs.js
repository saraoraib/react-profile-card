export async function getTabs(role) {
  const response = await fetch(
    "https://raw.githubusercontent.com/saraoraib/react-profile-card/refs/heads/main/src/tabs.json"
  );

  const data = await response.json();
  return data[role];

}
