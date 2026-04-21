using Microsoft.AspNetCore.Mvc;
using Moq;
using PortfolioApi.Controllers;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Tests.Controllers;

public class SkillsControllerTests
{
    private readonly Mock<IDataService> _mockDataService = new();
    private readonly SkillsController _sut;

    private static readonly List<Skill> _skills =
    [
        new(1, "C#",     "Languages", 5),
        new(2, "Python", "Languages", 4),
        new(3, "Docker", "Tools",     5),
        new(4, "GCP",    "Cloud",     4),
    ];

    public SkillsControllerTests()
    {
        _mockDataService.Setup(s => s.GetSkills()).Returns(_skills);
        _sut = new SkillsController(_mockDataService.Object);
    }

    [Fact]
    public void Get_WithoutFilter_ReturnsAllSkills()
    {
        var result = (OkObjectResult)_sut.Get(null);
        var skills = Assert.IsAssignableFrom<IEnumerable<Skill>>(result.Value).ToList();
        Assert.Equal(4, skills.Count);
    }

    [Fact]
    public void Get_WithCategoryFilter_ReturnsMatchingSkills()
    {
        var result = (OkObjectResult)_sut.Get("Languages");
        var skills = Assert.IsAssignableFrom<IEnumerable<Skill>>(result.Value).ToList();
        Assert.Equal(2, skills.Count);
        Assert.All(skills, s => Assert.Equal("Languages", s.Category));
    }

    [Fact]
    public void Get_WithUnknownCategory_ReturnsEmptyList()
    {
        var result = (OkObjectResult)_sut.Get("Databases");
        var skills = Assert.IsAssignableFrom<IEnumerable<Skill>>(result.Value).ToList();
        Assert.Empty(skills);
    }
}
