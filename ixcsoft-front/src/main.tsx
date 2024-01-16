import { X } from '@phosphor-icons/react'
import { SnackbarProvider, closeSnackbar } from 'notistack'
import { CookiesProvider } from 'react-cookie'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ClientsProvider } from './contexts/ClientsContext.tsx'
import { MessagesProvider } from './contexts/MessagesContext.tsx'
import { SocketProvider } from './contexts/SocketContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnackbarProvider
    maxSnack={4}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    autoHideDuration={5000}
    action={(snackbarId) => (
      <button onClick={() => closeSnackbar(snackbarId)}>
        <X size={20} />
      </button>
    )}
  >
    <BrowserRouter>
      <CookiesProvider>
        <ClientsProvider>
          <MessagesProvider>
            <SocketProvider>
              <App />
            </SocketProvider>
          </MessagesProvider>
        </ClientsProvider>
      </CookiesProvider>
    </BrowserRouter>
  </SnackbarProvider>,
)
