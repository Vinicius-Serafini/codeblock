import './App.css';
import { CodeBlockMenu } from './components/CodeBlockMenu';
import { CodeBlockDOMRenderer } from './components/CodeBlockDOMRenderer';
import { CodeBlockProvider } from './context/CodeBlockContext';

function App() {

  return (
    <CodeBlockProvider>
      <main className='w-screen min-h-screen max-h-screen flex p-6 gap-3'>
        <section className='flex-[1.2] flex gap-3 items-stretch'>
          <CodeBlockMenu className="flex-1" />
          <div className='flex-[2] p-4 flex flex-col gap-1 bg-gray-300 rounded-lg overflow-auto max-h-screen'>
            <CodeBlockDOMRenderer
              className='flex-1'
            />
          </div>
        </section>
        <section className='flex-1 bg-blue-400 p-4 rounded-lg'>
          <p>
          </p>
        </section>
      </main>
    </CodeBlockProvider>
  )
}

export default App
