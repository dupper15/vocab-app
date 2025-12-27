export type VocabWord = {
  vietnamese: string
  english: string
}

export type VocabTopic = {
  id: string
  name: string
  words: VocabWord[]
}

export const vocabularyData: VocabTopic[] = [
  {
    id: 'education',
    name: 'Education',
    words: [
      { vietnamese: 'giáo dục', english: 'education' },
      { vietnamese: 'học sinh', english: 'student' },
      { vietnamese: 'giáo viên', english: 'teacher' },
      { vietnamese: 'trường học', english: 'school' },
      { vietnamese: 'đại học', english: 'university' },
      { vietnamese: 'kiến thức', english: 'knowledge' },
      { vietnamese: 'học tập', english: 'study' },
      { vietnamese: 'bài tập', english: 'homework' },
      { vietnamese: 'kỳ thi', english: 'exam' },
      { vietnamese: 'bằng cấp', english: 'degree' },
    ],
  },
  {
    id: 'environment',
    name: 'Environment',
    words: [
      { vietnamese: 'môi trường', english: 'environment' },
      { vietnamese: 'ô nhiễm', english: 'pollution' },
      { vietnamese: 'khí hậu', english: 'climate' },
      { vietnamese: 'tái chế', english: 'recycle' },
      { vietnamese: 'rừng', english: 'forest' },
      { vietnamese: 'đại dương', english: 'ocean' },
      { vietnamese: 'bảo vệ', english: 'protect' },
      { vietnamese: 'năng lượng', english: 'energy' },
      { vietnamese: 'động vật hoang dã', english: 'wildlife' },
      { vietnamese: 'bền vững', english: 'sustainable' },
    ],
  },
  {
    id: 'technology',
    name: 'Technology',
    words: [
      { vietnamese: 'công nghệ', english: 'technology' },
      { vietnamese: 'máy tính', english: 'computer' },
      { vietnamese: 'internet', english: 'internet' },
      { vietnamese: 'phần mềm', english: 'software' },
      { vietnamese: 'ứng dụng', english: 'application' },
      { vietnamese: 'đổi mới', english: 'innovation' },
      { vietnamese: 'thiết bị', english: 'device' },
      { vietnamese: 'dữ liệu', english: 'data' },
      { vietnamese: 'trí tuệ nhân tạo', english: 'artificial intelligence' },
      { vietnamese: 'kỹ thuật số', english: 'digital' },
    ],
  },
  {
    id: 'health',
    name: 'Health',
    words: [
      { vietnamese: 'sức khỏe', english: 'health' },
      { vietnamese: 'bệnh viện', english: 'hospital' },
      { vietnamese: 'bác sĩ', english: 'doctor' },
      { vietnamese: 'thuốc', english: 'medicine' },
      { vietnamese: 'tập thể dục', english: 'exercise' },
      { vietnamese: 'dinh dưỡng', english: 'nutrition' },
      { vietnamese: 'bệnh tật', english: 'disease' },
      { vietnamese: 'chữa trị', english: 'treatment' },
      { vietnamese: 'phòng ngừa', english: 'prevention' },
      { vietnamese: 'thể chất', english: 'physical' },
    ],
  },
  {
    id: 'travel',
    name: 'Travel',
    words: [
      { vietnamese: 'du lịch', english: 'travel' },
      { vietnamese: 'kỳ nghỉ', english: 'vacation' },
      { vietnamese: 'sân bay', english: 'airport' },
      { vietnamese: 'khách sạn', english: 'hotel' },
      { vietnamese: 'hành khách', english: 'passenger' },
      { vietnamese: 'hành lý', english: 'luggage' },
      { vietnamese: 'điểm đến', english: 'destination' },
      { vietnamese: 'văn hóa', english: 'culture' },
      { vietnamese: 'du khách', english: 'tourist' },
      { vietnamese: 'chuyến bay', english: 'flight' },
    ],
  },
]
