import { INTRO_HTML_ATTR, INTRO_SESSION_KEY } from "./intro-config";

/**
 * Inline, render-blocking script placed at the very top of <body>. It runs
 * before the page paints, so on a first visit the plain-CSS black cover
 * (`html[data-intro="pending"]` in globals.css) is up before any portfolio
 * content can flash — React and the animated overlay take over after
 * hydration. On repeat visits (sessionStorage hit) it does nothing and the
 * intro costs zero work. Same technique next-themes uses for theming;
 * server-rendered HTML is unaffected, so SEO and hydration stay clean.
 */
const script = `(function(){try{if(sessionStorage.getItem(${JSON.stringify(
  INTRO_SESSION_KEY,
)}))return;document.documentElement.setAttribute(${JSON.stringify(
  INTRO_HTML_ATTR,
)},"pending")}catch(e){}})()`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
