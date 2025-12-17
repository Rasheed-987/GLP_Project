import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Page not found
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
