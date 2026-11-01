// A large, faint field of braille behind the hero: "Leticia" on the first
// line, "Diniz" on the second. Tilted back like a page catching low light,
// and faded at the edges so it never competes with the text.

const LETTERS: Record<string, number[]> = {
  a: [1], b: [1, 2], c: [1, 4], d: [1, 4, 5], e: [1, 5], f: [1, 2, 4], g: [1, 2, 4, 5],
  h: [1, 2, 5], i: [2, 4], j: [2, 4, 5], k: [1, 3], l: [1, 2, 3], m: [1, 3, 4],
  n: [1, 3, 4, 5], o: [1, 3, 5], p: [1, 2, 3, 4], q: [1, 2, 3, 4, 5], r: [1, 2, 3, 5],
  s: [2, 3, 4], t: [2, 3, 4, 5], u: [1, 3, 6], v: [1, 2, 3, 6], w: [2, 4, 5, 6],
  x: [1, 3, 4, 6], y: [1, 3, 4, 5, 6], z: [1, 3, 5, 6],
};
const GRID = [1, 4, 2, 5, 3, 6];

export default function BrailleBackdrop({ lines }: { lines: string[] }) {
  let cell = 0;
  return (
    <div aria-hidden="true" className="braille-backdrop pointer-events-none absolute inset-0 overflow-hidden">
      <div className="braille-plane">
        {lines.map((word, li) => (
          <div key={li} className="braille-line">
            {word
              .toLowerCase()
              .split('')
              .map((ch, i) => {
                const dots = LETTERS[ch] ?? [];
                const delay = 200 + cell++ * 110;
                return (
                  <span key={i} className="braille-cell">
                    {GRID.map((n) =>
                      dots.includes(n) ? (
                        <span key={n} className="bd bd-on" style={{ animationDelay: `${delay}ms` }} />
                      ) : (
                        <span key={n} className="bd bd-off" />
                      ),
                    )}
                  </span>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
