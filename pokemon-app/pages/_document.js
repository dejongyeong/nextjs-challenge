import Document from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// References: https://www.simplenextjs.com/posts/next-styled-components
// References: https://egghead.io/lessons/react-add-styled-components-to-a-next-js-project
// References: https://dev.to/aprietof/nextjs--styled-components-the-really-simple-guide----101c
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
