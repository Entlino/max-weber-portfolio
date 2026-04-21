using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillsController(IDataService dataService) : ControllerBase
{
    [HttpGet]
    public IActionResult Get([FromQuery] string? category)
    {
        var skills = dataService.GetSkills();
        if (!string.IsNullOrWhiteSpace(category))
            skills = skills.Where(s => s.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
        return Ok(skills);
    }
}
