using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;

namespace Overcooked
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(Page.IsPostBack == true)
            {
                Label1.Text = ("Great job! Data was inserted.");
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            SqlConnection overcookedconn = new SqlConnection("Server=tcp:overcooked.database.windows.net,1433;Initial Catalog=OvercookedDB;Persist Security Info=False;User ID=kcheu022;Password=DAVidc730;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            {
                SqlCommand insert = new SqlCommand("EXEC dbo.InsertRecipe @Recipe", overcookedconn);
                insert.Parameters.AddWithValue("@Recipe", TextBox1.Text);

                overcookedconn.Open();
                insert.ExecuteNonQuery();
                overcookedconn.Close();

                if(IsPostBack)
                {
                    TextBox1.Text = "";
                }
            }
        }
    }
}