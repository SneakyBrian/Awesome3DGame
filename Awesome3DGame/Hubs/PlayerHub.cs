using System;
using System.Web;
using Microsoft.AspNet.SignalR; 

namespace Awesome3DGame.Hubs
{
    public class PlayerHub : Hub
    {
        public void UpdatePlayerPosition(string name, double posx, double posy, double posz, double rotx, double roty, double rotz)
        {
            Clients.All.updatePlayerPosition(name, posx, posy, posz, rotx, roty, rotz);
        }
    } 
}