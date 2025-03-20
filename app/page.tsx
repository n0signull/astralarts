import ArtistGrid from "@/components/artist-grid"
import CosmicBackground from "@/components/cosmic-background"
import { ArtistProvider } from "@/components/artist-context"

export default function AstralArtsPage() {
  return (
    <ArtistProvider>
      <div className="relative min-h-screen overflow-hidden bg-black text-white">
        <CosmicBackground />
        <div className="relative z-10">
          <header className="container mx-auto py-16 text-center">
            <h1 className="font-greatVibes text-4xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-slate-200 to-indigo-200 md:text-7xl leading-relaxed md:leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.25)]">
              Star Syndicate
            </h1>
            <h2 className="font-serif text-2xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-pink-500 md:text-5xl my-2 drop-shadow-[0_1px_2px_rgba(234,179,8,0.3)]">
              An Astral Arts Awakening
            </h2>
            <div className="mt-6 relative max-w-2xl mx-auto">
              <div
                className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 30px 10px rgba(30, 58, 138, 0.1), 0 0 30px 10px rgba(30, 58, 138, 0.05)",
                  background:
                    "radial-gradient(circle, rgba(30, 58, 138, 0.15) 0%, rgba(30, 58, 138, 0.05) 70%, rgba(30, 58, 138, 0) 100%)",
                }}
              ></div>
              <p className="relative z-10 text-xl font-medium tracking-wide text-blue-100 leading-relaxed p-6 drop-shadow-[0_0.5px_1px_rgba(148,163,184,0.4)]">
                Ahoy, cosmic voyagers and seekers of the unknown! The next new moon beckons us to the stars and this
                interstellar crew of mystics will unite to share their cosmic talents.
                <span className="block mt-2"></span>
                Navigate the astral seas with tarot, energy healing, and tattoos that channel the energy of the
                cosmos.
                <span className="block mt-2"></span>
                Don't miss this rare opportunity to unlock the mysteries of the innerverse in an intimate setting.
                <span className="block mt-2 font-bold text-white">
                  March 29th from 1pm-5pm at 184 Provencher Blvd, 2nd floor
                </span>
              </p>
            </div>
          </header>
          <main className="container mx-auto px-4 py-8">
            <ArtistGrid />
          </main>
          <footer className="container mx-auto py-8 text-center text-purple-300">
            <p>© {new Date().getFullYear()} The Star Syndicate • An Astral Awakening</p>
          </footer>
        </div>
      </div>
    </ArtistProvider>
  )
}
