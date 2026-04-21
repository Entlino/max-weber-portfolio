using PortfolioApi.Models;

namespace PortfolioApi.Services;

public interface IDataService
{
    Profile GetProfile();
    IEnumerable<Project> GetProjects();
    IEnumerable<Skill> GetSkills();
}
