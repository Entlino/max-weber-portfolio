using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class DataService : IDataService
{
    private static readonly Profile _profile = new(
        Name: "Max Weber",
        Title: "Senior Application Developer",
        Bio: "Passionate about building scalable, maintainable software. 8+ years crafting full-stack solutions across finance, logistics, and SaaS domains. Clean code advocate, open-source contributor, and lifelong learner.",
        Email: "max.weber@example.com",
        Location: "Berlin, Germany",
        GitHubUrl: "https://github.com/maxweber-dev",
        LinkedInUrl: "https://linkedin.com/in/maxweber-dev",
        YearsOfExperience: 8
    );

    private static readonly List<Project> _projects =
    [
        new(1, "TrackFlow",
            "A real-time logistics tracking SaaS platform enabling companies to monitor shipments across multiple carriers with live map updates and automated alerts.",
            ["C#", ".NET", "React", "PostgreSQL", "Docker", "Azure"],
            "https://github.com/maxweber-dev/trackflow", null, 2024),

        new(2, "FinLedger",
            "Personal finance dashboard that aggregates bank transactions, visualises spending patterns, and generates monthly budget reports with AI-powered insights.",
            ["Python", "FastAPI", "Vue.js", "PostgreSQL", "Docker"],
            "https://github.com/maxweber-dev/finledger", "https://finledger.example.com", 2023),

        new(3, "CloudNote",
            "Real-time collaborative note-taking application supporting markdown, code blocks, and live co-editing powered by WebSockets and operational transformation.",
            ["TypeScript", "Node.js", "React", "Redis", "WebSockets", "Docker"],
            "https://github.com/maxweber-dev/cloudnote", "https://cloudnote.example.com", 2023),

        new(4, "DevMetrics",
            "Developer productivity analytics dashboard integrating with GitHub, Jira, and CI/CD pipelines to surface cycle time, DORA metrics, and bottlenecks.",
            ["Go", "React", "PostgreSQL", "Grafana", "GCP"],
            "https://github.com/maxweber-dev/devmetrics", null, 2022),

        new(5, "ShopPulse",
            "E-commerce analytics plugin for Shopify stores providing real-time sales dashboards, customer segmentation, and conversion funnel analysis.",
            ["TypeScript", "React", "Node.js", "MongoDB", "GCP"],
            "https://github.com/maxweber-dev/shoppulse", "https://shoppulse.example.com", 2022),
    ];

    private static readonly List<Skill> _skills =
    [
        new(1,  "C#",         "Languages",   5),
        new(2,  "TypeScript", "Languages",   4),
        new(3,  "Python",     "Languages",   4),
        new(4,  "Go",         "Languages",   3),
        new(5,  ".NET",       "Frameworks",  5),
        new(6,  "React",      "Frameworks",  4),
        new(7,  "Vue.js",     "Frameworks",  3),
        new(8,  "FastAPI",    "Frameworks",  4),
        new(9,  "Docker",     "Tools",       5),
        new(10, "Git",        "Tools",       5),
        new(11, "PostgreSQL", "Tools",       4),
        new(12, "Redis",      "Tools",       3),
        new(13, "GCP",        "Cloud",       4),
        new(14, "Azure",      "Cloud",       3),
    ];

    public Profile GetProfile() => _profile;

    public IEnumerable<Project> GetProjects() => _projects;

    public IEnumerable<Skill> GetSkills() => _skills;
}
