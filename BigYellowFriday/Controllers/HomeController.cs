using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BigYellowFriday.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Big Yellow Friday";
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public JsonResult Decide(int upper) {
            var random = new Random();
            return new JsonResult() { Data = random.Next(0, upper) };
        }
    }
}

/*
 * Requirements:
 * Football table, randomly pick one square out of x. highlight and unhighlight
 * squares slowing down as the app comes to choose selected square
 * 
 * Ideas:
 * v0.1:
 * html table
 * add css classes on button press
 * remove and add to random square on another press
 * 
 */