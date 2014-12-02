using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ThenAndNowAPI.Models;
using ThenAndNowAPI.Models._DAL;

namespace ThenAndNowAPI.Controllers
{
    public class HighscoreController : ApiController
    {
        // getting all the highscores
        // GET: api/Highscore
        public IEnumerable<Highscore> Get()
        {
            List<Highscore> lst = HighscoreRepository.GetHighscores();
            return lst;
        }
        
        // GET: api/Highscore/5
        public string Get(int id)
        {
            return "value";
        }

        // inserting a new highscore
        //GET: api/Highscore?naam=yoran
        public void Get(String name, String location, String score)
        {
            Highscore high = new Highscore { Name = name, Score = Convert.ToInt32(score), Location = location };
            HighscoreRepository.AddHighscore(high);
        }

        // POST: api/Highscore
        public void Post([FromBody]string value)
        {
        }


        // PUT: api/Highscore/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Highscore/5
        public void Delete(int id)
        {
        }
    }
}
