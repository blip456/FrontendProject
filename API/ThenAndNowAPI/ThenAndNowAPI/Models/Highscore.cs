using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models
{
    public class Highscore
    {
        #region fields and props
        private int _id;

        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _name;

        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }

        private int _score;

        public int Score
        {
            get { return _score; }
            set { _score = value; }
        }

        private String _date;

        public String Date
        {
            get { return _date; }
            set { _date = value; }
        }

        private string _location;

        public string Location
        {
            get { return _location; }
            set { _location = value; }
        }

        #endregion
    }
}