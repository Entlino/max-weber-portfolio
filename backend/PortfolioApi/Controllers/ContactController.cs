using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController(ILogger<ContactController> logger) : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] ContactRequest request)
    {
        logger.LogInformation("Contact form submission from {Name} <{Email}>", request.Name, request.Email);
        return Ok(new { message = "Message received. Thank you!" });
    }
}
