export function chooseInspiration(candidates, recentIds = [], count = 4, random = Math.random) {
  const seen = new Set(recentIds);
  const fresh = candidates.filter(d => d?.id && !seen.has(d.id));
  const pool = fresh.length >= count ? fresh : candidates.filter(d => d?.id);
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
