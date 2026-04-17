import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import users from '../data/users'
import UserCard from './UserCard'

function UsersList() {
  const [searchEmail, setSearchEmail] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(users)
  const [isSearched, setIsSearched] = useState(false)

  function handleSearch() {
    const result = users.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    )
    setFilteredUsers(result)
    setIsSearched(true)
  }

  function handleReset() {
    setSearchEmail('')
    setFilteredUsers(users)
    setIsSearched(false)
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-yellow-500 tracking-tight">Users</h2>
      <div className="flex gap-3 mb-8">
        <Input
          placeholder="Search by email..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="border-yellow-900/40 focus:border-yellow-600"
        />
        <Button onClick={handleSearch} className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6">
          Search
        </Button>
        {isSearched && (
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UsersList