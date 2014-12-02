using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ThenAndNowAPI.Models
{
    public class Question
    {
        #region fields and props
        private int _id;

        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        private string _quest;

        public string Quest
        {
            get { return _quest; }
            set { _quest = value; }
        }

        private int _year;

        public int Year
        {
            get { return _year; }
            set { _year = value; }
        }

        private Category _cat;

        public Category Cat
        {
            get { return _cat; }
            set { _cat = value; }
        }

        private double _price;

        public double Price
        {
            get { return _price; }
            set { _price = value; }
        }

        private bool _isCorrect;

        public bool IsCorrect
        {
            get { return _isCorrect; }
            set { _isCorrect = value; }
        }
        #endregion
    }
}