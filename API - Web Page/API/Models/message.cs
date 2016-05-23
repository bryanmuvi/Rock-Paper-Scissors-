using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class message
    {
        public string status { get; set; }

        public message() {
            this.status = "success";
        }

    }


}