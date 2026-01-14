'use client'

import RandomMatchButton from './random-match/RandomMatchButton'
import FriendsMatchButton from './friend-match/FriendsMatchButton'

export default function MatchButtons() {
  return (
    <div className="mt-12 flex justify-center gap-24">
      <RandomMatchButton />
      <FriendsMatchButton />
    </div>
  )
}
