using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using PortfolioApi.Models;

namespace PortfolioApi.Tests.Controllers;

public class ContactControllerTests(WebApplicationFactory<Program> factory) : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client = factory.CreateClient();

    [Fact]
    public async Task Post_WithValidRequest_ReturnsOk()
    {
        var request = new ContactRequest("Alice", "alice@example.com", "Hello, this is a test message that is long enough.");
        var response = await _client.PostAsJsonAsync("/api/contact", request);
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    [Fact]
    public async Task Post_WithInvalidEmail_ReturnsBadRequest()
    {
        var request = new { Name = "Bob", Email = "not-an-email", Message = "This is a valid message length." };
        var response = await _client.PostAsJsonAsync("/api/contact", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Post_WithEmptyName_ReturnsBadRequest()
    {
        var request = new { Name = "", Email = "bob@example.com", Message = "This is a valid message length." };
        var response = await _client.PostAsJsonAsync("/api/contact", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Post_WithTooShortMessage_ReturnsBadRequest()
    {
        var request = new { Name = "Bob", Email = "bob@example.com", Message = "Short" };
        var response = await _client.PostAsJsonAsync("/api/contact", request);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
