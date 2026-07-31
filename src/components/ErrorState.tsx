interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Something went wrong" }: ErrorStateProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="glass max-w-md rounded-3xl p-10 text-center">
        <i className="fas fa-exclamation-triangle text-4xl text-red-400"></i>
        <p className="mt-3 text-gray-400">{message}</p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-gray-950 transition hover:bg-gray-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
