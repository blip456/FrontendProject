using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models
{
    public class Category
    {
        #region Fields and props
        private int _id;

        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _cat;

        public string Cat
        {
            get { return _cat; }
            set { _cat = value; }
        }


        #endregion
    }
}