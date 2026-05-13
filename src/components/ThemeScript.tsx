/**
 * Runs before paint to set `data-theme` on <html> from localStorage or prefers-color-scheme.
 */
export function ThemeScript() {
  const code = `
(function(){
  try {
    var k='bbau-theme';
    var s=localStorage.getItem(k);
    var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    var mode=s==='light'||s==='dark'?s:(prefersDark?'dark':'light');
    document.documentElement.setAttribute('data-theme',mode);
  } catch(e) {}
})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
