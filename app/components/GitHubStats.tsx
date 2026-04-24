import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface GitHubUser {
  public_repos: number;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  languages_url: string;
  html_url: string;
}

interface LanguageData {
  [key: string]: number;
}

interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number; bytes: number }[];
  topRepos: { name: string; stars: number; url: string }[];
  avatarUrl?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Lua: "#000080",
  R: "#198CE7",
  Dart: "#00B4AB",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

function StatCard({ label, value, suffix, index }: { label: string; value: number; suffix?: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: "#111a2e",
        border: "1px solid rgba(148,163,184,0.08)",
        padding: "28px 20px",
        textAlign: "center",
      }}
    >
      <p style={{
        fontFamily: "Unbounded, sans-serif",
        fontSize: 32,
        fontWeight: 800,
        color: "#e6edf7",
        letterSpacing: "-0.03em",
        marginBottom: 8,
      }}>
        {value.toLocaleString()}{suffix}
      </p>
      <p style={{
        fontFamily: "DM Mono, monospace",
        fontSize: 10,
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}>
        {label}
      </p>
    </motion.div>
  );
}

function LanguageBar({ language, percentage, index, color }: { language: string; percentage: number; index: number; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.3 + index * 0.08 }}
      style={{ marginBottom: 12 }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
      }}>
        <span style={{
          fontFamily: "DM Mono, monospace",
          fontSize: 12,
          color: "#e6edf7",
        }}>
          {language}
        </span>
        <span style={{
          fontFamily: "DM Mono, monospace",
          fontSize: 11,
          color: "#64748b",
        }}>
          {percentage}%
        </span>
      </div>
      <div style={{
        height: 4,
        background: "#1a2740",
        borderRadius: 2,
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          style={{
            height: "100%",
            background: color,
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}

function RepoCard({ repo, index }: { repo: { name: string; stars: number; url: string }; index: number }) {
  return (
    <motion.a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
      style={{
        display: "block",
        padding: "16px 20px",
        background: "#162238",
        border: "1px solid rgba(148,163,184,0.08)",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "DM Mono, monospace",
          fontSize: 12,
          fontWeight: 500,
          color: "#e6edf7",
        }}>
          {repo.name}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e6edf7" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span style={{
            fontFamily: "DM Mono, monospace",
            fontSize: 11,
            color: "#94a3b8",
          }}>
            {repo.stars}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch("https://api.github.com/users/FAIZAN-MAKER", {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/users/FAIZAN-MAKER/repos?per_page=30&sort=pushed", {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return null;
    }

    const user: GitHubUser = await userRes.json();
    const repos: GitHubRepo[] = await reposRes.json();

    if (!repos || repos.length === 0) {
      return null;
    }

    let totalStars = 0;
    let totalForks = 0;
    const languageBytes: Record<string, number> = {};
    const repoStars: { name: string; stars: number; url: string }[] = [];

    const reposWithLanguages = repos.filter((r) => r.languages_url);

    const languageResults = await Promise.allSettled(
      reposWithLanguages.map((repo) =>
        fetch(repo.languages_url, { headers })
          .then((res) => {
            if (!res.ok) throw new Error(`Failed to fetch languages for ${repo.name}`);
            return res.json() as Promise<LanguageData>;
          })
          .then((langData) => ({ repo, langData }))
      )
    );

    for (const result of languageResults) {
      if (result.status === "fulfilled") {
        const { repo, langData } = result.value;
        
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;

        if (repoStars.length < 3 || repo.stargazers_count > 0) {
          repoStars.push({
            name: repo.name,
            stars: repo.stargazers_count,
            url: repo.html_url,
          });
        }

        for (const [lang, bytes] of Object.entries(langData)) {
          languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
        }
      }
    }

    const sortedByStars = repoStars.sort((a, b) => b.stars - a.stars);
    const topRepos = sortedByStars.slice(0, 3);

    const totalBytes = Object.values(languageBytes).reduce((sum, bytes) => sum + bytes, 0);

    if (totalBytes === 0) {
      return null;
    }

    const topLanguages = Object.entries(languageBytes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / totalBytes) * 100),
        bytes,
      }));

    return {
      publicRepos: user.public_repos,
      totalStars,
      totalForks,
      topLanguages,
      topRepos,
      avatarUrl: user.avatar_url,
    };
  } catch {
    return null;
  }
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      try {
        const data = await fetchGitHubStats();
        if (mounted) {
          setStats(data);
        }
      } catch {
        if (mounted) {
          setStats(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  const CONTAINER = { maxWidth: 1200, margin: "0 auto", width: "100%", paddingLeft: 48, paddingRight: 48 } as const;

  if (loading || !stats) {
    return null;
  }

  return (
    <section style={{ paddingTop: 64, paddingBottom: 64 }}>
      <div style={CONTAINER} className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <h2 style={{ fontFamily: "Unbounded, sans-serif", fontSize: 24, fontWeight: 800, color: "#e6edf7", letterSpacing: "-0.02em" }}>GitHub Activity</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          <StatCard label="Public Repos" value={stats.publicRepos} index={0} />
          <StatCard label="Total Stars" value={stats.totalStars} index={1} />
          <StatCard label="Total Forks" value={stats.totalForks} index={2} />
          <StatCard label="Languages" value={stats.topLanguages.length} index={3} />
        </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {stats.topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: "#111a2e",
              border: "1px solid rgba(148,163,184,0.08)",
              padding: "24px 28px",
            }}
          >
            <p style={{
              fontFamily: "Unbounded, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#e6edf7",
              background: "#162238",
              padding: "5px 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: 20,
            }}>
              Top Languages
            </p>
            {stats.topLanguages.map((lang, i) => (
              <LanguageBar 
                key={lang.name} 
                language={lang.name} 
                percentage={lang.percentage} 
                index={i}
                color={LANGUAGE_COLORS[lang.name] || "#7c3aed"}
              />
            ))}
          </motion.div>
        )}

        {stats.topRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              background: "#111a2e",
              border: "1px solid rgba(148,163,184,0.08)",
              padding: "24px 28px",
            }}
          >
            <p style={{
              fontFamily: "Unbounded, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              color: "#e6edf7",
              background: "#162238",
              padding: "5px 12px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              display: "inline-block",
              marginBottom: 16,
            }}>
              Top Repos
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stats.topRepos.map((repo, i) => (
                <RepoCard key={repo.name} repo={repo} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      </div>
    </section>
  );
}