using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models;

public record ContactRequest(
    [Required][StringLength(100, MinimumLength = 1)] string Name,
    [Required][EmailAddress] string Email,
    [Required][StringLength(2000, MinimumLength = 10)] string Message
);
