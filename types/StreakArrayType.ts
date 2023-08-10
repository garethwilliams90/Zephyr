export type StreakObjectType = {
  array: StreakArrayType[]
}

type StreakArrayType = {
  id: string
  type: string
  totalTime: number
  roundsCompleted: number
  breatheLength: number
  status: string
  startedAt: Date
  userId: string
}
