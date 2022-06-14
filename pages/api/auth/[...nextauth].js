import NextAuth from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import axios from "axios"
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
     signIn: "/auth/signin",
  },
  providers: [
    // OAuth authentication providers
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const config = {
          method: 'post',
          url: 'https://kanbox.vn/wp-json/jwt-auth/v1/token',
          data : {
            password: credentials.password,
            username: credentials.username
          },
        };
        const user_res = await axios(config)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });

        if (user_res) {
          return user_res
        } else {
          return null
        }
      }
    }),
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      const provider = account.provider;
      switch(provider){
        case 'google':
          let data = {     
            'user_id' : user.id,
            'user_email' : user.email,
            'fullname': profile.name,
            'first_name' : profile.given_name,
            'last_name' : profile.family_name,
            'picture' : profile.picture,
            'provider' : provider,
          };
    
          const config = {
            method: 'post',
            url: 'https://kanbox.vn/wp-json/jwt-auth/v1/token/validate_social_user',
            data : data,
          };
      
          const response = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
              console.log(error);
            });
    
            if(!response){
              return false
            }
          user.token = {...response};
          return true;
        break;
        case 'facebook':
          let data_fb = {     
            'user_id' : user.id,
            'user_email' : user.email,
            'fullname': profile.name,
            'first_name' : profile.given_name,
            'last_name' : profile.family_name,
            'picture' : profile.picture.data.url,
            'provider' : provider,
          };
          
          const config_fb = {
            method: 'post',
            url: 'https://kanbox.vn/wp-json/jwt-auth/v1/token/validate_social_user',
            data : data_fb,
          };
      
          const response_fb = await axios(config_fb)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
              console.log(error);
            });

            console.log('response_fb', response_fb)

            if(!response_fb){
              return false
            }
            user.token = {...response_fb};
          return true
        break;
        default:  
        user.token = {...user};
        return true
      }
    },

    async redirect({ account, token , url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/dang-nhap/")) {
        const baseUrl = `${baseUrl}${url}`;
        return baseUrl;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({token, user}) {
      user && (token.user = user);
      return token;
    },
    async session({token, session , user, account}){ 
      session.user = token.user;  // Setting token in session
      return session;
    }
  }
}

export default (req, res) => {
  return NextAuth(req, res, options)
}