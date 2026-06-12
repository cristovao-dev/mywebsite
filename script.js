const githubUser = "cristovao-dev";

const repoGrid = document.querySelector("#repo-grid");
const repoStatus = document.querySelector("#repo-status");
const filterButtons = [...document.querySelectorAll(".filter-button")];

document.querySelector("#year").textContent = new Date().getFullYear();

const featuredFallback = [
  {
    name: "mywebsite-vibecoded",
    html_url: "https://github.com/cristovao-dev/mywebsite-vibecoded",
    description: "This GitHub Pages portfolio site.",
    proof: "What it shows: HTML, CSS, JavaScript, GitHub Pages deployment.",
    language: "HTML",
    stargazers_count: 0,
    topics: ["portfolio", "github-pages"],
    homepage: ""
  }
];

const privateAppPreviews = [
  {
    name: "web-fpsgame",
    html_url: "",
    description: "A private first-person game experiment built to explore browser-based interaction and game logic.",
    proof: "What it shows: JavaScript, interaction design, canvas-style thinking, rapid prototyping.",
    language: "JavaScript",
    stargazers_count: 0,
    topics: ["private", "javascript", "game"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "comicbook-app",
    html_url: "",
    description: "A vibe-coded comic book app for experimenting with structured content and interactive reading flows.",
    proof: "What it shows: TypeScript, component thinking, UI state, app organization.",
    language: "TypeScript",
    stargazers_count: 0,
    topics: ["private", "typescript", "app"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "financesapp-vibecoded",
    html_url: "",
    description: "A private finance tracking app focused on personal finance workflows and clear UI logic.",
    proof: "What it shows: JavaScript, personal finance workflow, UI logic, data handling.",
    language: "JavaScript",
    stargazers_count: 0,
    topics: ["private", "javascript", "finance"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "mywebsite-vibecoded",
    html_url: "https://github.com/cristovao-dev/mywebsite-vibecoded",
    description: "This portfolio site for skills, experience, certifications, and app previews.",
    proof: "What it shows: static site delivery, recruiter-focused content, responsive layout.",
    language: "HTML",
    stargazers_count: 0,
    topics: ["private", "html", "github-pages"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "chatapp-vibecoded",
    html_url: "",
    description: "Chat app to talk with AI through API linking if needed, with desktop and web versions.",
    proof: "What it shows: Python, AI chat experimentation, API integration thinking, desktop/web workflows.",
    language: "Python",
    stargazers_count: 0,
    topics: ["private", "python", "ai", "chat"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "notetaking-vibecoded",
    html_url: "",
    description: "A private note-taking app experiment for organizing information and capturing useful notes quickly.",
    proof: "What it shows: JavaScript, note-taking workflow, interface structure, productivity tooling.",
    language: "JavaScript",
    stargazers_count: 0,
    topics: ["private", "javascript", "notes"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "local-ai-transcriptor",
    html_url: "",
    description: "A local AI transcription project focused on privacy-aware speech-to-text experimentation.",
    proof: "What it shows: Python, local transcription, privacy-first experimentation, AI tooling.",
    language: "Python",
    stargazers_count: 0,
    topics: ["private", "python", "ai", "transcription"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "chatapp-playground",
    html_url: "",
    description: "A playground app for learning how to code with AI assistance and local LLM workflows.",
    proof: "What it shows: Python, local LLM usage, prompt iteration, learning-by-building.",
    language: "Python",
    stargazers_count: 0,
    topics: ["private", "python", "ai", "local-llm"],
    homepage: "",
    visibility: "Private preview"
  },
  {
    name: "noteapp-playground",
    html_url: "",
    description: "A simple local AI app playground for comparing approaches to notes and small workflows.",
    proof: "What it shows: Python, local AI app structure, note workflows, experimentation.",
    language: "Python",
    stargazers_count: 0,
    topics: ["private", "python", "ai", "notes"],
    homepage: "",
    visibility: "Private preview"
  }
];

let repositories = [];

function normalizeRepo(repo) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  return {
    ...repo,
    description: repo.description || "A small GitHub project by Cristovao Freitas.",
    proof: repo.proof || "",
    language: repo.language || "Project",
    topics,
    visibility: repo.visibility || "Public"
  };
}

function repoMatchesFilter(repo, filter) {
  const language = (repo.language || "").toLowerCase();
  const topics = (repo.topics || []).join(" ").toLowerCase();
  const name = repo.name.toLowerCase();

  if (filter === "all") return true;
  if (filter === "private") return topics.includes("private") || repo.visibility.toLowerCase().includes("private");
  if (filter === "page") return topics.includes("github-pages") || name.includes("page") || repo.homepage;
  return language === filter || topics.includes(filter);
}

function renderRepos(filter = "all") {
  const visibleRepos = repositories.filter((repo) => repoMatchesFilter(repo, filter));

  repoGrid.innerHTML = "";
  repoStatus.textContent = visibleRepos.length
    ? `Showing ${visibleRepos.length} project preview${visibleRepos.length === 1 ? "" : "s"}.`
    : "No projects match this filter yet.";

  visibleRepos.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "repo-card";
    const safeDescription = repo.description || "A small GitHub project by Cristovao Freitas.";

    const title = document.createElement("h3");
    if (repo.html_url) {
      const titleLink = document.createElement("a");
      titleLink.href = repo.html_url;
      titleLink.target = "_blank";
      titleLink.rel = "noreferrer";
      titleLink.textContent = repo.name;
      title.append(titleLink);
    } else {
      title.textContent = repo.name;
    }

    const description = document.createElement("p");
    description.textContent = safeDescription;

    const proof = document.createElement("p");
    proof.className = "repo-proof";
    proof.textContent = repo.proof || `What it shows: ${repo.language} project work and practical implementation.`;

    const meta = document.createElement("div");
    meta.className = "repo-meta";

    const language = document.createElement("span");
    language.className = "tag";
    language.textContent = repo.language;

    const stars = document.createElement("span");
    stars.className = "tag";
    stars.textContent = repo.visibility === "Public" ? `${repo.stargazers_count} stars` : repo.visibility;

    meta.append(language, stars);

    if (repo.homepage) {
      const homepage = document.createElement("a");
      homepage.className = "tag accent";
      homepage.href = repo.homepage;
      homepage.target = "_blank";
      homepage.rel = "noreferrer";
      homepage.textContent = "Live";
      meta.append(homepage);
    }

    card.append(title, description, proof, meta);
    repoGrid.append(card);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderRepos(button.dataset.filter);
  });
});

async function loadRepositories() {
  try {
    const response = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=24`);
    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status}`);
    }

    const repos = await response.json();
    const publicRepos = repos
      .filter((repo) => !repo.fork)
      .map(normalizeRepo)
      .sort((a, b) => {
        const hasHomepageA = Boolean(a.homepage);
        const hasHomepageB = Boolean(b.homepage);
        if (hasHomepageA !== hasHomepageB) return hasHomepageA ? -1 : 1;
        return new Date(b.updated_at || 0) - new Date(a.updated_at || 0);
      });

    repositories = [...privateAppPreviews.map(normalizeRepo), ...publicRepos];

    if (!repositories.length) {
      repositories = [...privateAppPreviews, ...featuredFallback].map(normalizeRepo);
    }

    renderRepos();
  } catch (error) {
    repositories = [...privateAppPreviews, ...featuredFallback].map(normalizeRepo);
    repoStatus.textContent = "GitHub projects could not be loaded right now. Showing local previews.";
    renderRepos();
  }
}

loadRepositories();
