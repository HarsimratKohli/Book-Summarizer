'use client'

import { useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Search, Book, Headphones, List, Moon, Sun, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Index() {
  const { data: session, status } = useSession()
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <header className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-900 dark:to-pink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Book className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            <h1 className="text-xl sm:text-3xl font-bold text-white">BookSummarizer</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              {status === 'authenticated' && session ? (
                <>
                  <Avatar className="ring-2 ring-white">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback className="bg-yellow-500 text-yellow-900">{session.user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button variant="secondary" size="sm" onClick={() => signOut()}>Sign out</Button>
                </>
              ) : (
                <Button variant="secondary" size="sm" onClick={() => signIn('google')}>Sign in with Google</Button>
              )}
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
              className="ml-4"
              aria-label="Toggle dark mode"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-400" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-300" />
            </Switch>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {status === 'authenticated' && session ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onSelect={() => signIn('google')}>
                    Sign in with Google
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto space-y-8">
          <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
              <CardTitle className="text-white text-xl sm:text-2xl">Search for a Book</CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  placeholder="Enter book title or ISBN"
                  className="flex-grow"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-600 dark:to-orange-700">
                <CardTitle className="text-white text-xl sm:text-2xl">Recent Summaries</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 mt-4">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex-shrink-0">
                        <Avatar className="ring-2 ring-orange-300">
                          <AvatarImage src={`/placeholder.svg?text=Book${i}`} alt={`Book ${i}`} />
                          <AvatarFallback className="bg-orange-500 text-white">B{i}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium dark:text-white">Book Title {i}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Author Name</p>
                      </div>
                      <div className="flex space-x-2 w-full sm:w-auto">
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-initial text-purple-600 hover:text-purple-700 hover:bg-purple-100 dark:text-purple-400 dark:hover:text-purple-300 dark:hover:bg-purple-900">
                          <Headphones className="w-4 h-4 mr-2" />
                          Listen
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 sm:flex-initial text-blue-600 hover:text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900">
                          Read
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            {status === 'authenticated' && (
              <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-pink-400 to-red-500 dark:from-pink-600 dark:to-red-700">
                  <CardTitle className="text-white text-xl sm:text-2xl">Your Playlists</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mt-4">
                    {[1, 2, 3].map((i) => (
                      <li key={i} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <List className="w-5 h-5 text-pink-500 dark:text-pink-400" />
                        <span className="dark:text-white">Playlist {i}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white">
                    Create New Playlist
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-900 dark:to-pink-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-white">
          © 2023 BookSummarizer. All rights reserved.
        </div>
      </footer>
    </div>
  )
}