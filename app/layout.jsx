import Nav from '@components/Nav'
import Provider from '@components/Provider'

//put metadata here

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