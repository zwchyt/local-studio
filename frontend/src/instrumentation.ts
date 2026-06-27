export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const mod = "node:net";
  const net: { setDefaultAutoSelectFamilyAttemptTimeout?: (value: number) => void } = await import(mod);
  if (typeof net.setDefaultAutoSelectFamilyAttemptTimeout !== "function") return;
  const configured = Number(process.env.LOCAL_STUDIO_AUTOSELECT_FAMILY_TIMEOUT_MS);
  const timeoutMs = Number.isFinite(configured) && configured > 0 ? configured : 2000;
  net.setDefaultAutoSelectFamilyAttemptTimeout(Math.max(timeoutMs, 250));
}
