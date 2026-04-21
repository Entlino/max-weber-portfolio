namespace PortfolioApi.Models;

public record Project(
    int Id,
    string Title,
    string Description,
    string[] Technologies,
    string GitHubUrl,
    string? LiveUrl,
    int Year
);
