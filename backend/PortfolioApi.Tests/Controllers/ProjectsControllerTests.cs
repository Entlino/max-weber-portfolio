using Microsoft.AspNetCore.Mvc;
using Moq;
using PortfolioApi.Controllers;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Tests.Controllers;

public class ProjectsControllerTests
{
    private readonly Mock<IDataService> _mockDataService = new();
    private readonly ProjectsController _sut;

    private static readonly List<Project> _projects =
    [
        new(1, "Alpha", "Desc A", ["C#", "React"], "https://github.com/a", null, 2024),
        new(2, "Beta",  "Desc B", ["Go", "React"],  "https://github.com/b", null, 2023),
        new(3, "Gamma", "Desc C", ["Python"],       "https://github.com/c", null, 2022),
    ];

    public ProjectsControllerTests()
    {
        _mockDataService.Setup(s => s.GetProjects()).Returns(_projects);
        _sut = new ProjectsController(_mockDataService.Object);
    }

    [Fact]
    public void Get_WithoutFilter_ReturnsAllProjects()
    {
        var result = (OkObjectResult)_sut.Get(null);
        var projects = Assert.IsAssignableFrom<IEnumerable<Project>>(result.Value).ToList();
        Assert.Equal(3, projects.Count);
    }

    [Fact]
    public void Get_WithTechnologyFilter_ReturnsMatchingProjects()
    {
        var result = (OkObjectResult)_sut.Get("React");
        var projects = Assert.IsAssignableFrom<IEnumerable<Project>>(result.Value).ToList();
        Assert.Equal(2, projects.Count);
        Assert.All(projects, p => Assert.Contains("React", p.Technologies, StringComparer.OrdinalIgnoreCase));
    }

    [Fact]
    public void Get_WithUnknownTechnology_ReturnsEmptyList()
    {
        var result = (OkObjectResult)_sut.Get("Cobol");
        var projects = Assert.IsAssignableFrom<IEnumerable<Project>>(result.Value).ToList();
        Assert.Empty(projects);
    }

    [Fact]
    public void Get_WithCaseInsensitiveFilter_ReturnsMatchingProjects()
    {
        var result = (OkObjectResult)_sut.Get("react");
        var projects = Assert.IsAssignableFrom<IEnumerable<Project>>(result.Value).ToList();
        Assert.Equal(2, projects.Count);
    }
}
