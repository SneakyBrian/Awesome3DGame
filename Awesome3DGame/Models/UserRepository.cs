using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace Awesome3DGame.Models
{
    public class UserRepository : IUserRepository
    {
        private static int _currentUserId = 0;

        public int GetOAuthMembership(string provider, string providerUserId)
        {
            var userId = HttpContext.Current.Cache.Get(string.Format("{0}-{1}", provider, providerUserId));

            if (userId == null)
                return -1;
            else
                return (int)userId;
        }

        public void SaveOAuthMembership(string provider, string providerUserId, int userId)
        {
            if (userId < 0)
                userId = NextUserId;

            HttpContext.Current.Cache.Add(string.Format("{0}-{1}", provider, providerUserId), userId, null,
                System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(20), System.Web.Caching.CacheItemPriority.Default, null);
        }

        private static int NextUserId
        {
            get { return Interlocked.Increment(ref _currentUserId); }
        }

        public int GetUserIdFromUserName(string username)
        {
            foreach (var item in HttpContext.Current.Cache.OfType<KeyValuePair<int, string>>())
            {
                if (item.Value == username)
                    return item.Key;
            }

            return -1;
        }

        public string GetUserNameFromUserId(int userId)
        {
            var item = (KeyValuePair<int, string>)HttpContext.Current.Cache.Get(string.Format("User-{0}", userId));

            return item.Value;
        }

        public int SaveUser(int userId, string username)
        {
            if (userId < 0)
                userId = NextUserId;

            HttpContext.Current.Cache.Insert(string.Format("User-{0}", userId), new KeyValuePair<int, string>(userId, username), null,
                System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(20), System.Web.Caching.CacheItemPriority.Default, null);

            return userId;
        }
    }
}