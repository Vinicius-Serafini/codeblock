import './App.css';
import { CodeBlockMenu } from './components/CodeBlockMenu';
import { CodeBlockDOMRenderer } from './components/CodeBlockDOMRenderer';
import { CodeBlockProvider } from './context/CodeBlockContext';
import { CodeBlockCanvas } from './components/CodeBlockCanvas';

function App() {

  return (
    <CodeBlockProvider>
      <main className='w-screen min-h-screen max-h-screen flex p-6 gap-3'>
        <section className='flex-[1.2] flex gap-3 items-stretch'>
          <CodeBlockMenu className="flex-1" />
          <div className='flex-[2] max-h-screen'>
            <CodeBlockDOMRenderer
              className='flex-1 bg-gray-300 rounded-lg'
            />
          </div>
        </section>
        <section className='flex-1 rounded-lg overflow-hidden bg-gray-300 p-2'>
          <div className='h-full w-full rounded-lg overflow-hidden'>
            <CodeBlockCanvas />
          </div>
        </section>
      </main>
    </CodeBlockProvider>
  )
}

export default App
