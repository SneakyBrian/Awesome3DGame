using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace Awesome3DGame.Controllers
{
    //[Authorize]
    public class GameController : Controller
    {
        //
        // GET: /Game/

        public ActionResult Index()
        {
            //using (var hashAlgorithm = new SHA256CryptoServiceProvider())
            //{
            //    var inputBytes = Encoding.UTF8.GetBytes(User.Identity.Name);

            //    var hashedBytes = hashAlgorithm.ComputeHash(inputBytes);

            //    ViewBag.PlayerGuid = new Guid(hashedBytes.Take(16).ToArray());
            //}

            ViewBag.PlayerGuid = Guid.NewGuid();

            return View();
        }

    }
}
