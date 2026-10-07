// Spinner. Use fullPage to center it on the whole screen.
export default function Loading({ label = "Loading...", fullPage = false }) {
  return (
    <div className={fullPage ? "loading loading-full" : "loading"} role="status">
      <span className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
