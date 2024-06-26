import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  type Session = {
    user: {
      /** The user's postal address. */
      name: string;
      email: string;
    };
  };
}
