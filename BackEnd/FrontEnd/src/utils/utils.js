export function getInitials(name) {
  let initials = "";
  if (name) {
    name.split(" ").map((item) => {
      initials = initials + item.charAt(0);
    });
  }

  return initials;
}
