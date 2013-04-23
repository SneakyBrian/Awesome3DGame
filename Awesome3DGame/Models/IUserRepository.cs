using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Awesome3DGame.Models
{
    public interface IUserRepository
    {
        int GetUserIdFromUserName(string username);
        string GetUserNameFromUserId(int userId);
        int SaveUser(int userId, string username);

        // OAuth Membership
        int GetOAuthMembership(string provider, string providerUserId);
        void SaveOAuthMembership(string provider, string providerUserId, int userId);
    }
}
