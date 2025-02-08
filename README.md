Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is simple NextJS project that displays news from external API.

User can see 4 different pages:

- Homepage
- Articles
- Favourites
- Single article page

Home page is statically rendered page with no data

Articles page is SSR page rendered on server. It fetches data from external API and some filtering. User can select different filters to find article it wants. Also, user can add any article to his favourites.

Favourites is page that shows all articles user marked as favourite. Articles are saved in local database using sqllite. User cannot unmark article as not favourite, it can be easily implemented in next versions.

Single article page is added just as example how it should look. URL used for this page is with slugified title to improve SEO.

UI & design

App has simple UI. Tailwind is used for styleing. Many styles are used from taliwind.config.js such as theme, font size, screen size, etc. App supports two screen sizes: small and large. Other screen sizes and responsivness in general can be improved in further versions. This is just example how it can be done.

Testing

App has implementation for Jest. In this version there is only one test and that is for ArticleItem component. Setup is created just as example how it sholud be done with mocks, jest configuration, etc.

Development experience

App has eslint and prettier configured so if more developers are working on same code, everyone has same code style at the end.

Other app comments:

- Barrel imports used: small project, cleaner code, simplifying imports across files
- PNG used because SVGs are not free on flat icons
- added client side state management just as example
- used server side rendering
- improved SEO through several points: robots.txt, slugify url, user-friendly routes, SSG, using html tags, adding metadata to pages
