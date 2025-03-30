export const paths = {
  home: {
    getHref: () => "/",
  },

  auth: {
    login: {
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  app: {
    root: {
      getHref: () => "/app",
    },
    home: {
      getHref: () => "/app",
    },
    entries: {
      getHref: () => "/app/entries",
    },
    entry: {
      getHref: (id: string) => `/app/entries/${id}`,
    },
    calendar: {
      getHref: () => "/app/calendar",
    },
    progress: {
      getHref: () => "/app/progress",
    },
    memo: {
      getHref: () => "/app/memo",
    },
  },
};
