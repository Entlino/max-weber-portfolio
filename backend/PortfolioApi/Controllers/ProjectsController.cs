using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController(IDataService dataService) : ControllerBase
{
    [HttpGet]
    public IActionResult Get([FromQuery] string? technology)
    {
        var projects = dataService.GetProjects();
        if (!string.IsNullOrWhiteSpace(technology))
            projects = projects.Where(p => p.Technologies.Contains(technology, StringComparer.OrdinalIgnoreCase));
        return Ok(projects);
    }
}
