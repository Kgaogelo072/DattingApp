using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("auth")]
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }

    [HttpGet("not-found")]
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("server-error")]
    public IActionResult GetServerError()
    {
        return BadRequest("Server error occurred");
    }
    
    [HttpGet("bad-request")]
    public IActionResult GetBadRequest()
    {       
         throw new Exception("This is a bad request");
    }
}
