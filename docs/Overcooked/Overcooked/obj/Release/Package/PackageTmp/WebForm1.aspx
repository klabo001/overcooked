<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="Overcooked.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div style="margin-left: 640px">
            <asp:Label ID="Label2" runat="server" Font-Size="24pt" ForeColor="#FF3300" Text="Overcooked"></asp:Label>
        </div>
        <br />
        <asp:Label ID="Label1" runat="server" Text="Type the name of Recipe"></asp:Label>
        <br />
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <asp:Button ID="Button1" runat="server" OnClick="Button1_Click" Text="Submit" />
    </form>
</body>
</html>
