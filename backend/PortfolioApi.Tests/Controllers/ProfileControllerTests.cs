using Microsoft.AspNetCore.Mvc;
using Moq;
using PortfolioApi.Controllers;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Tests.Controllers;

public class ProfileControllerTests
{
    private readonly Mock<IDataService> _mockDataService = new();
    private readonly ProfileController _sut;

    public ProfileControllerTests()
    {
        var profile = new Profile("Max Weber", "Senior Developer", "Bio text", "max@example.com", "Berlin", "https://github.com", "https://linkedin.com", 8);
        _mockDataService.Setup(s => s.GetProfile()).Returns(profile);
        _sut = new ProfileController(_mockDataService.Object);
    }

    [Fact]
    public void Get_ReturnsOkResult()
    {
        var result = _sut.Get();
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public void Get_ReturnsProfileWithCorrectName()
    {
        var result = (OkObjectResult)_sut.Get();
        var profile = Assert.IsType<Profile>(result.Value);
        Assert.Equal("Max Weber", profile.Name);
    }
}
