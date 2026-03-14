export type VocabWord = {
  vietnamese: string
  english: string
}

export type VocabTopic = {
  id: string
  name: string
  words: Array<VocabWord>
}
