import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        const userExist = await User.findOne({ email: profile.email });

        if (!userExist) {
          // Generate a valid username from the profile name
          let baseUsername = profile.name.toLowerCase()
            .replace(/[^a-z0-9]/g, ''); // Remove non-alphanumeric characters

          // Ensure the base username fits the length requirement
          if (baseUsername.length < 8) {
            baseUsername = baseUsername.padEnd(8, '0'); // Pad with zeros to meet minimum length
          } else if (baseUsername.length > 20) {
            baseUsername = baseUsername.slice(0, 20); // Trim to maximum length
          }

          let username = baseUsername;
          let usernameExists = await User.findOne({ username });
          let counter = 1;

          // Adjust the username if it does not fit the regex or is not unique
          while (usernameExists || !/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
            username = `${baseUsername}${counter}`.slice(0, 20); // Append counter and trim to fit length
            usernameExists = await User.findOne({ username });
            counter++;
          }

          // Create the user
          await User.create({
            email: profile.email,
            username: username,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
