export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center animate-page-in">
        <h1 className="text-5xl font-bold text-primary mb-4">Resumeify</h1>
        <p className="text-xl text-text-secondary mb-8">
          Free Professional Resume Builder
        </p>
        <a
          href="/create"
          className="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition text-lg"
        >
          Create Your Resume
        </a>
      </div>
    </main>
  );
}
