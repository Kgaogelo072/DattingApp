using System;
using API;

namespace API.Interfaces;

public interface ITokenService
{
    string CreateToken(AppUser appUser);
}
