/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'books.google.com', 'www.googleapis.com/books/v1']
  }
}

module.exports = nextConfig
