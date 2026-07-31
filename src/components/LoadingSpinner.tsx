export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-20">
      <i className="fas fa-spinner fa-spin text-4xl text-accent-500"></i>
      <p className="mt-3 text-gray-400">Loading...</p>
    </div>
  );
}
