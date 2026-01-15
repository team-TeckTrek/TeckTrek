export interface WaitScreenResponse {
  messages: string[]
  initialSeconds: number
  rulesText: string
  spectatorPlayers: WaitPlayer[]
  waitingPlayers: WaitPlayer[]
}

export interface WaitPlayer {
  id: string
  name: string
  iconUrl?: string
  isCurrent?: boolean
  isReady?: boolean
}
