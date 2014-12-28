using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ThenAndNowAPI.Models;
using ThenAndNowAPI.Models._DAL;
using System.Web.Http.Cors;

namespace ThenAndNowAPI.Controllers
{
    public class QuestionController : ApiController
    {
        // GET: api/Question
        //[EnableCors(origins: "url van waar de reqest gaat komen voorlopig is het * (alles)", headers: "*", methods: "*")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Question> Get()
        {
            //return new string[] { "value1", "value2" };
            List<Question> lst = QuestionRepository.GetRandomQuestions();
            return lst;
        }

        // GET: api/Question/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Question> Get(string values)
        {            
            List<String> arrIDs = new List<string>();
            String ids = values.Replace("[", "");
            ids = ids.Replace("]", "");
            arrIDs = ids.Split(',').ToList();

            List<Question> arrCorrectAnsw = new List<Question>();
            foreach (var id in arrIDs)
            {
                Question q = QuestionRepository.GetQuestionById(Convert.ToInt32(id));
                arrCorrectAnsw.Add(q);
            }
            return arrCorrectAnsw;
        }

        // POST: api/Question
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Question/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Question/5
        public void Delete(int id)
        {
        }
    }
}
