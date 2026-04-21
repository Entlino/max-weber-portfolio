using PortfolioApi.Services;

namespace PortfolioApi.Tests.Services;

public class DataServiceTests
{
    private readonly DataService _sut = new();

    [Fact]
    public void GetProfile_ReturnsProfileWithCorrectName()
    {
        var profile = _sut.GetProfile();
        Assert.Equal("Max Weber", profile.Name);
    }

    [Fact]
    public void GetProfile_HasRequiredFields()
    {
        var profile = _sut.GetProfile();
        Assert.NotEmpty(profile.Title);
        Assert.NotEmpty(profile.Bio);
        Assert.NotEmpty(profile.Email);
        Assert.NotEmpty(profile.Location);
        Assert.True(profile.YearsOfExperience > 0);
    }

    [Fact]
    public void GetProjects_ReturnsNonEmptyList()
    {
        var projects = _sut.GetProjects();
        Assert.NotEmpty(projects);
    }

    [Fact]
    public void GetProjects_AllProjectsHaveRequiredFields()
    {
        foreach (var p in _sut.GetProjects())
        {
            Assert.NotEmpty(p.Title);
            Assert.NotEmpty(p.Description);
            Assert.NotEmpty(p.Technologies);
            Assert.NotEmpty(p.GitHubUrl);
            Assert.True(p.Year > 2000);
        }
    }

    [Fact]
    public void GetSkills_ReturnsNonEmptyList()
    {
        var skills = _sut.GetSkills();
        Assert.NotEmpty(skills);
    }

    [Fact]
    public void GetSkills_AllSkillsHaveValidProficiencyLevel()
    {
        foreach (var s in _sut.GetSkills())
        {
            Assert.InRange(s.ProficiencyLevel, 1, 5);
            Assert.NotEmpty(s.Name);
            Assert.NotEmpty(s.Category);
        }
    }

    [Fact]
    public void GetSkills_ContainsExpectedCategories()
    {
        var categories = _sut.GetSkills().Select(s => s.Category).Distinct().ToList();
        Assert.Contains("Languages", categories);
        Assert.Contains("Frameworks", categories);
        Assert.Contains("Tools", categories);
        Assert.Contains("Cloud", categories);
    }
}
