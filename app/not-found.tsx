import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <p className="mt-4 text-lg text-gray-600">Page not found</p>
            <Link
              href="/en"
              className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
