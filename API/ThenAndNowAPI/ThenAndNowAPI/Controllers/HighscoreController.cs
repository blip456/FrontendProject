using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using ThenAndNowAPI.Models;
using ThenAndNowAPI.Models._DAL;

namespace ThenAndNowAPI.Controllers
{
    public class HighscoreController : ApiController
    {
        // getting all the highscores
        // GET: api/Highscore
        [EnableCors(origins: "*", headers: "*", methods: "*")]
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
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Get(String name, String location, String score)
        {
            Highscore high = new Highscore { Name = name, Score = Convert.ToInt32(score), Location = location };
            //HighscoreRepository.AddHighscore(high);
        }

        // POST: api/Highscore

        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Post(List<String> values)
        {            
            List<String> arrAnswers = new List<String>();
            List<String> arrIDs = new List<string>();

            String answ = values[3].Replace("[", "");
            answ = answ.Replace("]", "");
            String ids = values[4].Replace("[", "");
            ids = ids.Replace("]", "");

            arrAnswers = answ.Split(',').ToList();
            arrIDs = ids.Split(',').ToList();

            int iTime = Convert.ToInt32(values[1]);

            string name = values[0];
            if(name.Equals(""))
                name = "Anonymous";

            Highscore high = new Highscore { Name = name, Score = Convert.ToInt32(values[1]), Location = values[2] };
            //Highscore high = new Highscore { Name = values[0], Score = Util.Util.CalculateScore(arrAnswers, arrIDs, iTime), Location = values[2] };
            HighscoreRepository.AddHighscore(high);
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
