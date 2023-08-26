import { useState, useEffect } from 'react'
import {
  Typography
} from '@material-tailwind/react'
import Table from './Components/Table'
import './App.css'

const VITE_API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState({
    "currentPage": 1,
    "next": 0,
    "previous": 0
  })
  const [commits, setCommits] = useState({})

  async function getCommits(page){
    try {
      const res = await fetch(`${VITE_API_URL}/api/v1/commits?page=${page}`)
      if(!res.ok) {
        setError(true),
        setErrorMessage(res.statusText)
        setLoading(false)
        return
      }
      const response = await res.json()
      setCommits(response)
      setLoading(false)
   } catch (error) {
      setLoading(false)
      setError(true)
      setErrorMessage('Error')
      console.error(error)
   }
  }

  function previousButton(){
    setPage(prev => ({
      ...prev,
      currentPage: page.currentPage !== 1 ? page.currentPage - 1 : 1
    }))
  }

  function nextButton(){
    setPage(prev => ({
      ...prev,
      currentPage: page.currentPage !== Number(commits?.count) ? page.currentPage + 1 : Number(commits?.count)
    }))
  }

  useEffect(() => {
    getCommits(page.currentPage),
    [page.currentPage]
  })

  return (
    <main className='flex items-center justify-center p-2 lg:h-[100vh]'>
      {loading &&
        <Typography
          variant='h2'
          className='font-bold'>
          Loading...
        </Typography>}
      {!loading && error &&
        <Typography
          variant='h2'
          className='font-bold'>
          {errorMessage}
        </Typography>}
      {!loading && !error && 
        <Table
          page={page}
          previousButton={previousButton}
          nextButton={nextButton}
          commits={commits}/>
      }
    </main>
  )
}
