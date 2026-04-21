using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProfileController(IDataService dataService) : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(dataService.GetProfile());
}
