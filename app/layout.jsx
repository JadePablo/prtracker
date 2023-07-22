import Nav from '@components/Nav'
import Provider from '@components/Provider'

//put metadata here
export const metadata = {
  title: 'PRTracker',
  description: 'compare your prs with other people',
  icons: {
    icon: [
      '/favicon.ico?v=4',
    ],
    apple: [
      '/apple-touch-icon.png?v=4'
    ],
    shortcut: [
      '/apple-touch-icon.png'
    ]
  },
  manifest: '/site.webmanifest'
}
const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div>
            <main>
              <Nav />
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>

  )
}

export default RootLayout