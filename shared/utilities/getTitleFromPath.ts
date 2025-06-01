export const getTitleFromPath = (path: string) => {
  console.log(path);
  
  switch (true) {
    case path === "/challenge":
      return "Challenge";
      case path.startsWith("/challenge/"):
      return "";
    default:
      return "Home";
  }
};
