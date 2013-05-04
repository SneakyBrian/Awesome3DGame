using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Awesome3DGame.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //ViewBag.Message = "This demo shows building an interactive multiplayer 3D demo using various different technologies";

            //return View();

            return RedirectToActionPermanent("Index", "Game");
        }

        public ActionResult About()
        {
            ViewBag.Message = "This is an interactive massively multiplayer 3D demo.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Game()
        {
            return RedirectToActionPermanent("Index", "Game");
        }

        public ActionResult Controls()
        {
            ViewBag.Message = "Game Controls";

            return View();
        }
    }
}
