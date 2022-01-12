import ReactDOM from 'react-dom'
import { App } from './App'
import { GameContextProvider } from './GameContext'

ReactDOM.render(<GameContextProvider><App/></GameContextProvider>, document.getElementById('app'))
