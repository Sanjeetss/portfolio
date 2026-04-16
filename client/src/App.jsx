import { useEffect, useState } from "react";
import Cube from "./components/Cube";
import LoadingScreen from "./components/LoadingScreen";
import { portfolioApi } from "./api/portfolioApi";
import fallbackPortfolio, {
  normalizePortfolioData,
} from "./data/fallbackPortfolio";

const initialState = fallbackPortfolio;

export default function App() {
  const [portfolio, setPortfolio] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("connecting");

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      try {
        const [about, projects, skills, experience, education, contact] =
          await Promise.all([
            portfolioApi.getAbout(),
            portfolioApi.getProjects(),
            portfolioApi.getSkills(),
            portfolioApi.getExperience(),
            portfolioApi.getEducation(),
            portfolioApi.getContact(),
          ]);

        if (!isMounted) {
          return;
        }

        setPortfolio(
          normalizePortfolioData({
            about,
            projects,
            skills,
            experience,
            education,
            contact,
          }),
        );
        setError("");
        setApiStatus("live");
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setPortfolio(fallbackPortfolio);
        setError(
          "The live portfolio data stream is offline right now. Showing local fallback content while the API or MySQL connection is unavailable.",
        );
        setApiStatus("fallback");
      } finally {
        if (isMounted) {
          window.setTimeout(() => setIsLoading(false), 900);
        }
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="app-shell relative min-h-screen overflow-hidden bg-base text-text">
      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 lg:mb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="hud-label mb-4 text-xs text-accent/80">
              Cube Portfolio Interface
            </p>
            <h1 className="font-display text-4xl uppercase tracking-[0.18em] text-white sm:text-5xl">
              Sanjeet Sawardekar
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Explore each face of the cube to navigate across bio, projects,
              skills, experience, education, and contact details in a single
              cinematic interface.
            </p>
          </div>

          <div className="glass-panel grid gap-3 rounded-3xl px-5 py-4 text-sm text-muted sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="hud-label mb-2 text-[10px] text-accent/70">
                Engine
              </p>
              <p className="font-display text-base text-white">Three.js Cube</p>
            </div>
            <div>
              <p className="hud-label mb-2 text-[10px] text-accent/70">Stack</p>
              <p className="font-display text-base text-white">React + API</p>
            </div>
            <div>
              <p className="hud-label mb-2 text-[10px] text-accent/70">Mode</p>
              <p className="font-display text-base text-white">Interactive</p>
            </div>
            {/* <div>
              <p className="hud-label mb-2 text-[10px] text-accent/70">
                Data Feed
              </p>
              <p className="font-display text-base text-white">
                {apiStatus === "live" ? "Live API" : "Fallback Cache"}
              </p>
            </div> */}
          </div>
        </header>

        {error ? (
          <div className="glass-panel mb-8 rounded-3xl border border-rose-400/20 px-5 py-4 text-rose-100">
            {error}
          </div>
        ) : null}

        <Cube
          key={`${apiStatus}-${portfolio.about?.name ?? "portfolio"}`}
          portfolio={portfolio}
        />
      </section>
    </main>
  );
}
