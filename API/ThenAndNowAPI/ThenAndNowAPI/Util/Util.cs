using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ThenAndNowAPI.Models;
using ThenAndNowAPI.Models._DAL;

namespace ThenAndNowAPI.Util
{
    public class Util
    {
        public static int CalculateScore(List<String> arrAnswers, List<String> arrIDs, int iTimeInSeconds)
        {
            int score = 0;
            int i = 0;
            foreach (var id in arrIDs)
            {
                Question q = QuestionRepository.GetQuestionById(Convert.ToInt32(id));
                if (Convert.ToBoolean(arrAnswers[i]))
                    if(q.Year < 80)
                    score += 50;
                if (!Convert.ToBoolean(arrAnswers[i]))
                    if (q.Year >= 80)
                        score+=50;

                i++;
            }
            return score - (iTimeInSeconds / 10);
        }
    }
}