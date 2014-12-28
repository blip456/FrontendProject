using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models._DAL
{
    public class HighscoreRepository
    {
        #region SQL
        // Create a highscore object
        private static Highscore CreateHighscore(DbDataReader reader)
        {
            try
            {
                Highscore high = new Highscore();
                high.ID = Convert.ToInt32(reader["highscores_id"]);
                high.Name = Convert.ToString(reader["highscores_name"]);
                high.Score = Convert.ToInt32(reader["highscores_score"]);
                high.Date = Convert.ToDateTime(reader["highscores_date"]);
                high.Location = Convert.ToString(reader["highscores_location"]);
                return high;
            }
            catch (Exception ex)
            {
                Console.WriteLine("create highscore: " + ex.Message);
                return null;
            }
        }

        // Get all highscores
        public static List<Highscore> GetHighscores()
        {
            // create new list
            List<Highscore> lstHighs = new List<Highscore>();

            // database reader
            DbDataReader reader = Database.GetData("SELECT * FROM dbo.highscores ORDER BY highscores_score DESC");

            while (reader.Read())
            {
                lstHighs.Add(CreateHighscore(reader));
            }

            // close the reader
            if (reader != null)
                reader.Close();

            return lstHighs;
        }

        // Add a new highscore
        public static void AddHighscore(Highscore high)
        {
            string sql = "INSERT INTO dbo.highscores(highscores_name, highscores_score, highscores_date, highscores_location) VALUES (@name, @score, GETDATE(), @location);";

            DbParameter par1 = Database.AddParameter("@name", high.Name);
            DbParameter par2 = Database.AddParameter("@score", high.Score);
            DbParameter par3 = Database.AddParameter("@location", high.Location);

            int i = Database.ModifyData(sql, par1, par2, par3);
        }

        public static Highscore GetLatestHighscore()
        {
            Highscore high = new Highscore();
            DbDataReader reader = Database.GetData("SELECT TOP 1 * FROM dbo.highscores ORDER BY highscores_id DESC;");
            while (reader.Read())
            {
                high = CreateHighscore(reader);
            }
            if (reader != null)
                reader.Close();
            return high;
        }

        #endregion
    }
}