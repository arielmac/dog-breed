import 'bootstrap/dist/css/bootstrap.min.css';
import '../app/assets/globals.scss';

export const metadata = {
  title: 'The Dog Breed Search',
  description: '',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>
        <main className='dogs__main'>
          <div className="dogs__wrapper">
            <header className='dogs__header'>
              <div className='dogs__title'>The <span>Dog Breed</span> Search</div>
            </header>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
