using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models._DAL
{
    public class QuestionRepository
    {
        #region SQL
        // Create a catogory object
        private static Question CreateQuestion(DbDataReader reader)
        {
            try
            {
                Question quest = new Question();
                quest.ID = Convert.ToInt32(reader["questions_id"]);
                quest.Quest = Convert.ToString(reader["questions_question"]);
                quest.Year = Convert.ToInt32(reader["questions_year"]);
                quest.Cat = CategoryRepository.GetCategoryByID(Convert.ToInt32(reader["questions_cat"]));
                //quest.Price = Convert.ToDouble(reader["questions_price"]);
                return quest;
            }
            catch (Exception ex)
            {
                Console.WriteLine("create quest: " + ex.Message);
                return null;
            }
        }

        // Get all questions
        public static List<Question> GetQuestions()
        {
            // create new list
            List<Question> lstQuest = new List<Question>();

            // database reader
            DbDataReader reader = Database.GetData("SELECT * FROM dbo.questions");

            while (reader.Read())
            {
                lstQuest.Add(CreateQuestion(reader));
            }

            // close the reader
            if (reader != null)
                reader.Close();

            return lstQuest;
        }

        // Get 30 random questions >> probably going to use this one the most (no need to constantly get all the questions for the quiz)
        public static List<Question> GetRandomQuestions()
        {
            // create new list
            List<Question> lstQuest = new List<Question>();

            // database reader
            DbDataReader reader = Database.GetData("SELECT TOP 30 * FROM dbo.questions ORDER BY NEWID()");

            while (reader.Read())
            {
                lstQuest.Add(CreateQuestion(reader));
            }

            // close the reader
            if (reader != null)
                reader.Close();

            return lstQuest;
        }
        #endregion
    }
}