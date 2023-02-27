import markdownIt from "markdown-it";

const md = new markdownIt();

const link = md.normalizeLink;
let baseLink = ".";
md.normalizeLink = function (url: string) {
  if (/[^:|/]*:\/\//.test(url)) return link(url);
  return link(`${baseLink}/${url}`);
};

export default function renderMd(data: string, baseUrl?: string) {
  baseLink = baseUrl ? baseUrl : ".";
  return md.render(data);
}
