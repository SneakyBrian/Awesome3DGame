using System;
using System.Web;
using Microsoft.AspNet.SignalR; 

namespace Awesome3DGame.Hubs
{
    public class PlayerHub : Hub
    {
        public void UpdatePlayerPosition(string name, double x, double y, double z)
        {
            Clients.All.updatePlayerPosition(name, x, y, z);
        }
    } 
}