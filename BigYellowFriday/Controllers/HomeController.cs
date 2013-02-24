using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;

namespace BigYellowFriday.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Big Yellow Friday Football Table";
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

        public JsonResult GetTeams()
        {
            var teams = GetTeamsFromDatabase();
            return new JsonResult
            {
                Data = new
                {
                    Teams = teams
                }
            };
        }

        private List<object> GetTeamsFromDatabase() {
            //access the database and pull out all teams
            var list = new List<object>();
            var connectionsString = "Data Source=SHANDY-RC520\\MYSQLINSTANCE;Initial Catalog=BYFTeamsProd;Integrated Security=True";
            try{
                var SQLConnection = new SqlConnection(connectionsString);
                SQLConnection.Open();
                var sqlCommand = SQLConnection.CreateCommand();
                sqlCommand.CommandText = "SELECT F1 FROM Teams";
                var sqlReader = sqlCommand.ExecuteReader();

                while(sqlReader.Read()){
                    
                    var temp = sqlReader[0];
                    list.Add(temp);
                
                }

                sqlReader.Close();
                SQLConnection.Close();

            }
            catch(Exception ex){
                
            }



            return list;
        }
    }

    public class ReturnedTeams {
        public int ID { get; set; }
        public string TeamName { get; set; }
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