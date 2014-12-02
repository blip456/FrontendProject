using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models._DAL
{
    public class CategoryRepository
    {
        #region SQL
        // Create a catogory object
        private static Category CreateCategory(DbDataReader reader)
        {
            try
            {
                Category cat = new Category();
                cat.ID = Convert.ToInt32(reader["categories_id"]);
                cat.Cat = Convert.ToString(reader["categories_cat"]);
                return cat;
            }
            catch (Exception ex)
            {
                Console.WriteLine("create cat: " + ex.Message);
                return null;
            }
        }

        public static List<Category> GetCategories()
        {
            // create new list
            List<Category> lstCats = new List<Category>();

            // database reader
            DbDataReader reader = Database.GetData("SELECT * FROM dbo.categories");

            while (reader.Read())
            {
                lstCats.Add(CreateCategory(reader));
            }

            // close the reader
            if (reader != null)
                reader.Close();

            return lstCats;
        }

        public static Category GetCategoryByID(int id)
        {
            try
            {
                Category cat = new Category();

                string sql = "SELECT * FROM dbo.categories WHERE categories_id=@id;";
                DbParameter parID = Database.AddParameter("@id", id);
                DbDataReader reader = Database.GetData(sql, parID);
                while (reader.Read())
                {
                    cat = CreateCategory(reader);
                }
                if (reader != null)
                    reader.Close();

                return cat  ;
            }
            catch (Exception ex)
            {
                Console.WriteLine("" + ex.Message);
                return null;
            }

        }
        #endregion
    }
}