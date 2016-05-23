using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Web.Http;
using System.Data.Linq;
using System.Web.Script.Serialization;
using System.Configuration;
using API.Models;

namespace API.Controllers
{
    public class championshipController : ApiController
    {
        // Connection to database
        Model1Container db = new Model1Container();
        JavaScriptSerializer jss = new JavaScriptSerializer();


        [System.Web.Http.AcceptVerbs("Get")]
        [System.Web.Http.HttpGet]
        public string top(string count)
        {        
            // Define variables
            int numVal = 10;

            // Run Query
            try{ numVal = Int32.Parse(count); } catch {}             
            var playerResults =(from players in db.UserDetail
                        orderby players.score descending
                        select players).Take(numVal);
            // To json
            var json = jss.Serialize(playerResults);
            return json;
        }
       

        [System.Web.Http.AcceptVerbs("Post")]
        [System.Web.Http.HttpPost]
        public string result(string first, string second)
        {
            var firstPlace = (from playerOne in db.UserDetail
                              where playerOne.userName == first
                              select playerOne);

            var secondPlace = (from playerTwo in db.UserDetail
                               where playerTwo.userName == second
                               select playerTwo);

            message message = new message();

            try { 
                saveScores(secondPlace, 1, second);
                saveScores(firstPlace, 3, first);
            }
            catch{ message.status = "error"; }

            var json = jss.Serialize(message);
            db.SaveChanges();
            return json;

        }

        [System.Web.Http.AcceptVerbs("Delete")]
        [System.Web.Http.HttpDelete]
        public string reset()
        {
            var firstPlace = (from players in db.UserDetail
                              select players);

            foreach (UserDetail user in firstPlace)
	        {
                db.UserDetail.Remove(user);
	        }

            message message = new message();
            try
            {
                db.SaveChanges();
            }
            catch { message.status = "error"; }
            var json = jss.Serialize(message);
            return json;

        }

        private void saveScores(IQueryable<API.UserDetail> player,  int score, string name) {
            if (player.ToList().Count > 0)
            {
                UserDetail user = player.FirstOrDefault();
                user.score = user.score + score;
            }
            else
            {
                UserDetail user = new UserDetail();
                user.score = score;
                user.userName = name;
                db.UserDetail.Add(user);
            }
        }

    }
}
