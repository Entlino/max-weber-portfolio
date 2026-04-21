namespace PortfolioApi.Models;

public record Profile(
    string Name,
    string Title,
    string Bio,
    string Email,
    string Location,
    string GitHubUrl,
    string LinkedInUrl,
    int YearsOfExperience
);
