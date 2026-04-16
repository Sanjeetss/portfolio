export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(88,246,255,0.14),transparent_35%)]" />
      <div className="relative flex flex-col items-center">
        <div className="loading-ring relative mb-8 h-24 w-24 rounded-full border border-accent/20">
          <div className="absolute inset-3 animate-spin rounded-full border-2 border-transparent border-t-accent border-r-accentSoft" />
          <div className="absolute inset-[1.65rem] rounded-full bg-accent/10 shadow-glow" />
        </div>
        <p className="font-display text-sm uppercase tracking-[0.45em] text-accent">
          Loading Sanjeets Portfolio
        </p>
      </div>
    </div>
  );
}
