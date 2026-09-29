import { site as ko } from "../site";

export const site: typeof ko = {
  ...ko,
  links: ko.links.map((l) => (l.href === "/resume.pdf" ? { ...l, label: "Resume PDF" } : l)),
};
