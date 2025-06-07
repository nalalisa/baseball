"use client"

import { useState } from "react"
import {
  Home,
  Target,
  BookOpen,
  Gift,
  User,
  Trophy,
  Brain,
  Settings,
  Bell,
  Calendar,
  Clock,
  Star,
  Camera,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// 홈 페이지 컴포넌트
function HomePage() {
  return (
    <div className="space-y-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg">
        <div>
          <h1 className="text-xl font-bold">⚾ 야구팬</h1>
          <p className="text-sm opacity-90">오늘도 야구하기 좋은 날!</p>
        </div>
        <Bell className="w-6 h-6" />
      </div>

      {/* 실시간 경기 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-500" />
            실시간 경기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="font-bold">LG</div>
                  <div className="text-2xl font-bold text-blue-600">7</div>
                </div>
                <div className="text-gray-500">vs</div>
                <div className="text-center">
                  <div className="font-bold">KT</div>
                  <div className="text-2xl font-bold text-red-600">5</div>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="destructive">LIVE</Badge>
                <div className="text-sm text-gray-600">9회말</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 오늘의 경기 일정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            오늘의 경기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { home: "SSG", away: "두산", time: "18:30", status: "예정" },
              { home: "키움", away: "NC", time: "18:30", status: "예정" },
              { home: "롯데", away: "한화", time: "18:30", status: "예정" },
            ].map((game, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{game.away}</span>
                  <span className="text-gray-500">@</span>
                  <span className="font-medium">{game.home}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{game.time}</div>
                  <Badge variant="outline">{game.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 빠른 메뉴 */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 메뉴</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Target, label: "예측게임", color: "text-red-500" },
              { icon: BookOpen, label: "직관일기", color: "text-blue-500" },
              { icon: Trophy, label: "팬랭킹", color: "text-yellow-500" },
              { icon: Brain, label: "POP퀴즈", color: "text-purple-500" },
            ].map((menu, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                  <menu.icon className={`w-6 h-6 ${menu.color}`} />
                </div>
                <div className="text-xs font-medium">{menu.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 예측게임 페이지 컴포넌트
function PredictionPage() {
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [prediction, setPrediction] = useState<string>("")
  const [betPoints, setBetPoints] = useState<number>(100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">🎯 예측게임</h2>
        <div className="text-sm">
          <span className="text-gray-600">보유 포인트: </span>
          <span className="font-bold text-blue-600">1,250P</span>
        </div>
      </div>

      {/* 예측 가능한 경기 목록 */}
      <div className="space-y-3">
        {[
          { id: 1, home: "SSG", away: "두산", time: "18:30", odds: { home: 1.8, away: 2.1 } },
          { id: 2, home: "키움", away: "NC", time: "18:30", odds: { home: 2.3, away: 1.6 } },
          { id: 3, home: "롯데", away: "한화", time: "18:30", odds: { home: 1.9, away: 1.9 } },
        ].map((game) => (
          <Card key={game.id} className={selectedGame === game.id ? "ring-2 ring-blue-500" : ""}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-bold">{game.away}</span>
                  <span className="text-gray-500">@</span>
                  <span className="font-bold">{game.home}</span>
                </div>
                <div className="text-sm text-gray-600">{game.time}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={selectedGame === game.id && prediction === "away" ? "default" : "outline"}
                  onClick={() => {
                    setSelectedGame(game.id)
                    setPrediction("away")
                  }}
                  className="text-sm"
                >
                  {game.away} 승리 ({game.odds.away})
                </Button>
                <Button
                  variant={selectedGame === game.id && prediction === "home" ? "default" : "outline"}
                  onClick={() => {
                    setSelectedGame(game.id)
                    setPrediction("home")
                  }}
                  className="text-sm"
                >
                  {game.home} 승리 ({game.odds.home})
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 배팅 섹션 */}
      {selectedGame && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">배팅하기</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>배팅 포인트</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  value={betPoints}
                  onChange={(e) => setBetPoints(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600">P</span>
              </div>
            </div>
            <div className="flex gap-2">
              {[100, 300, 500, 1000].map((points) => (
                <Button key={points} variant="outline" size="sm" onClick={() => setBetPoints(points)}>
                  {points}P
                </Button>
              ))}
            </div>
            <Button className="w-full" size="lg">
              예측 참여하기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// DiaryPage 컴포넌트를 다음과 같이 완전히 교체합니다:

// 직관일기 페이지 컴포넌트
function DiaryPage() {
  const [activeTab, setActiveTab] = useState("list") // "list", "write", "stats"
  const [formData, setFormData] = useState({
    date: "",
    homeTeam: "",
    awayTeam: "",
    result: "",
    weather: "",
    mood: "",
    seat: "",
    companion: "",
    score: "",
    mvp: "",
    title: "",
    content: "",
  })

  // 일기 작성 폼
  if (activeTab === "write") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveTab("list")}>
            ← 뒤로
          </Button>
          <h2 className="text-lg font-bold">직관일기 작성</h2>
          <div></div>
        </div>

        <Card>
          <CardContent className="p-4 space-y-4">
            {/* 기본 정보 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>날짜</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>경기 결과</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="win">승리 🎉</option>
                  <option value="lose">패배 😢</option>
                  <option value="draw">무승부 😐</option>
                </select>
              </div>
            </div>

            {/* 팀 정보 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>홈팀</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.homeTeam}
                  onChange={(e) => setFormData({ ...formData, homeTeam: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="LG">LG 트윈스</option>
                  <option value="KT">KT 위즈</option>
                  <option value="SSG">SSG 랜더스</option>
                  <option value="두산">두산 베어스</option>
                  <option value="키움">키움 히어로즈</option>
                  <option value="한화">한화 이글스</option>
                  <option value="롯데">롯데 자이언츠</option>
                  <option value="삼성">삼성 라이온즈</option>
                  <option value="NC">NC 다이노스</option>
                  <option value="KIA">KIA 타이거즈</option>
                </select>
              </div>
              <div>
                <Label>원정팀</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.awayTeam}
                  onChange={(e) => setFormData({ ...formData, awayTeam: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="LG">LG 트윈스</option>
                  <option value="KT">KT 위즈</option>
                  <option value="SSG">SSG 랜더스</option>
                  <option value="두산">두산 베어스</option>
                  <option value="키움">키움 히어로즈</option>
                  <option value="한화">한화 이글스</option>
                  <option value="롯데">롯데 자이언츠</option>
                  <option value="삼성">삼성 라이온즈</option>
                  <option value="NC">NC 다이노스</option>
                  <option value="KIA">KIA 타이거즈</option>
                </select>
              </div>
            </div>

            {/* 날씨와 기분 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>날씨</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.weather}
                  onChange={(e) => setFormData({ ...formData, weather: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="sunny">맑음 ☀️</option>
                  <option value="cloudy">흐림 ☁️</option>
                  <option value="rainy">비 🌧️</option>
                  <option value="snowy">눈 ❄️</option>
                  <option value="windy">바람 💨</option>
                </select>
              </div>
              <div>
                <Label>기분</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="excited">신남 😆</option>
                  <option value="happy">기쁨 😊</option>
                  <option value="normal">보통 😐</option>
                  <option value="sad">슬픔 😢</option>
                  <option value="angry">화남 😠</option>
                </select>
              </div>
            </div>

            {/* 좌석과 동행인 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>좌석</Label>
                <Input
                  placeholder="예: 1루 응원석 3층"
                  value={formData.seat}
                  onChange={(e) => setFormData({ ...formData, seat: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>동행인</Label>
                <select
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.companion}
                  onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
                >
                  <option value="">선택하세요</option>
                  <option value="alone">혼자</option>
                  <option value="family">가족</option>
                  <option value="friends">친구</option>
                  <option value="couple">연인</option>
                  <option value="colleagues">동료</option>
                </select>
              </div>
            </div>

            {/* 점수와 MVP */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>최종 점수</Label>
                <Input
                  placeholder="예: 7-5"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>오늘의 MVP</Label>
                <Input
                  placeholder="예: 김현수"
                  value={formData.mvp}
                  onChange={(e) => setFormData({ ...formData, mvp: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            {/* 제목과 내용 */}
            <div>
              <Label>제목</Label>
              <Input
                placeholder="직관일기 제목을 입력하세요"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label>내용</Label>
              <Textarea
                placeholder="오늘의 직관 경험을 자세히 기록해보세요!"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 min-h-[120px]"
              />
            </div>

            {/* 사진 업로드 */}
            <div>
              <Label>사진 업로드</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">사진을 업로드하세요</p>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={() => setActiveTab("list")}>
              일기 작성 완료
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 통계 페이지
  if (activeTab === "stats") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setActiveTab("list")}>
            ← 뒤로
          </Button>
          <h2 className="text-lg font-bold">직관 통계</h2>
          <div></div>
        </div>

        {/* 전체 통계 요약 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">전체 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded">
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-sm text-gray-600">총 직관 횟수</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded">
                <div className="text-2xl font-bold text-green-600">65%</div>
                <div className="text-sm text-gray-600">승률</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">이번 달</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded">
                <div className="text-2xl font-bold text-yellow-600">LG</div>
                <div className="text-sm text-gray-600">최다 관람팀</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 팀별 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">팀별 직관 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { team: "LG 트윈스", count: 8, wins: 6, rate: 75 },
                { team: "KT 위즈", count: 5, wins: 3, rate: 60 },
                { team: "SSG 랜더스", count: 4, wins: 2, rate: 50 },
                { team: "두산 베어스", count: 3, wins: 2, rate: 67 },
                { team: "키움 히어로즈", count: 3, wins: 2, rate: 67 },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-medium">{stat.team}</div>
                    <div className="text-sm text-gray-600">{stat.count}경기 관람</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{stat.wins}승</div>
                    <div className="text-sm text-gray-600">{stat.rate}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 날씨별 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">날씨별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { weather: "맑음 ☀️", count: 12, rate: 70 },
                { weather: "흐림 ☁️", count: 6, rate: 60 },
                { weather: "비 🌧️", count: 4, rate: 50 },
                { weather: "바람 💨", count: 1, rate: 100 },
              ].map((stat, index) => (
                <div key={index} className="p-3 border rounded text-center">
                  <div className="font-medium mb-1">{stat.weather}</div>
                  <div className="text-sm text-gray-600">{stat.count}회</div>
                  <div className="text-sm font-bold text-green-600">승률 {stat.rate}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 기분별 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">기분별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { mood: "신남 😆", count: 10, percentage: 43 },
                { mood: "기쁨 😊", count: 8, percentage: 35 },
                { mood: "보통 😐", count: 3, percentage: 13 },
                { mood: "슬픔 😢", count: 2, percentage: 9 },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{stat.mood}</span>
                    <span className="text-sm text-gray-600">({stat.count}회)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={stat.percentage} className="w-20 h-2" />
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 동행인별 통계 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">동행인별 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { companion: "친구", count: 9, icon: "👥" },
                { companion: "가족", count: 7, icon: "👨‍👩‍👧‍👦" },
                { companion: "혼자", count: 4, icon: "🙋‍♂️" },
                { companion: "연인", count: 3, icon: "💑" },
              ].map((stat, index) => (
                <div key={index} className="p-3 border rounded text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-medium">{stat.companion}</div>
                  <div className="text-sm text-gray-600">{stat.count}회</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 월별 직관 횟수 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">월별 직관 횟수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { month: "1월", count: 0 },
                { month: "2월", count: 0 },
                { month: "3월", count: 2 },
                { month: "4월", count: 4 },
                { month: "5월", count: 6 },
                { month: "6월", count: 5 },
                { month: "7월", count: 3 },
                { month: "8월", count: 2 },
                { month: "9월", count: 1 },
                { month: "10월", count: 0 },
              ].map((stat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium">{stat.month}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(stat.count / 6) * 100} className="w-24 h-2" />
                    <span className="text-sm font-medium w-8">{stat.count}회</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 일기 목록 (기본 화면)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">📝 직관일기</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setActiveTab("stats")}>
            📊 통계
          </Button>
          <Button size="sm" onClick={() => setActiveTab("write")}>
            일기 쓰기
          </Button>
        </div>
      </div>

      {/* 일기 목록 */}
      <div className="space-y-3">
        {[
          {
            title: "잠실에서의 짜릿한 역전승!",
            date: "2024.01.15",
            homeTeam: "LG",
            awayTeam: "KT",
            result: "win",
            weather: "sunny",
            mood: "excited",
            score: "7-5",
            seat: "1루 응원석",
            companion: "friends",
            mvp: "김현수",
            content: "9회말 투아웃에서 터진 끝내기 홈런! 정말 소름돋는 경기였어요...",
            likes: 24,
            image: true,
          },
          {
            title: "비 오는 날의 야구",
            date: "2024.01.12",
            homeTeam: "SSG",
            awayTeam: "두산",
            result: "lose",
            weather: "rainy",
            mood: "sad",
            score: "3-8",
            seat: "3루 내야석",
            companion: "family",
            mvp: "박건우",
            content: "비가 와서 경기가 중단됐지만, 팬들과 함께 응원가를 부르며...",
            likes: 18,
            image: false,
          },
          {
            title: "완벽한 날씨, 완벽한 승리!",
            date: "2024.01.10",
            homeTeam: "키움",
            awayTeam: "한화",
            result: "win",
            weather: "sunny",
            mood: "happy",
            score: "12-4",
            seat: "외야 응원석",
            companion: "alone",
            mvp: "송성문",
            content: "혼자 간 직관이었지만 대승으로 기분 좋은 하루였습니다!",
            likes: 31,
            image: true,
          },
        ].map((diary, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarFallback>⚾</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm">야구팬123</span>
                    <Badge variant="outline" className="text-xs">
                      {diary.awayTeam} @ {diary.homeTeam}
                    </Badge>
                    <Badge
                      variant={
                        diary.result === "win" ? "default" : diary.result === "lose" ? "destructive" : "secondary"
                      }
                      className="text-xs"
                    >
                      {diary.result === "win" ? "승리" : diary.result === "lose" ? "패배" : "무승부"}
                    </Badge>
                  </div>

                  <h3 className="font-bold mb-2">{diary.title}</h3>

                  {/* 상세 정보 */}
                  <div className="grid grid-cols-2 gap-2 mb-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>📅 {diary.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>⚾ {diary.score}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>
                        {diary.weather === "sunny"
                          ? "☀️"
                          : diary.weather === "rainy"
                            ? "🌧️"
                            : diary.weather === "cloudy"
                              ? "☁️"
                              : "💨"}
                        {diary.weather === "sunny"
                          ? "맑음"
                          : diary.weather === "rainy"
                            ? "비"
                            : diary.weather === "cloudy"
                              ? "흐림"
                              : "바람"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>
                        {diary.mood === "excited"
                          ? "😆"
                          : diary.mood === "happy"
                            ? "😊"
                            : diary.mood === "sad"
                              ? "😢"
                              : "😐"}
                        {diary.mood === "excited"
                          ? "신남"
                          : diary.mood === "happy"
                            ? "기쁨"
                            : diary.mood === "sad"
                              ? "슬픔"
                              : "보통"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🪑 {diary.seat}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>
                        {diary.companion === "friends"
                          ? "👥 친구"
                          : diary.companion === "family"
                            ? "👨‍👩‍👧‍👦 가족"
                            : diary.companion === "alone"
                              ? "🙋‍♂️ 혼자"
                              : "💑 연인"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>🏆 MVP: {diary.mvp}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">{diary.content}</p>

                  {diary.image && (
                    <div className="w-full h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{diary.date}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{diary.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 굿즈 페이지 컴포넌트
function GoodsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🎁 굿즈</h2>

      {/* 이벤트 배너 */}
      <Card className="bg-gradient-to-r from-red-500 to-blue-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">🔥 신상품 할인 이벤트</h3>
              <p className="text-sm opacity-90">팬 레벨별 최대 30% 할인!</p>
            </div>
            <ShoppingBag className="w-8 h-8" />
          </div>
        </CardContent>
      </Card>

      {/* 굿즈 카테고리 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: "유니폼", icon: "👕" },
          { name: "모자", icon: "🧢" },
          { name: "응원용품", icon: "📣" },
          { name: "기념품", icon: "🏆" },
        ].map((category, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center text-xl">
              {category.icon}
            </div>
            <div className="text-xs font-medium">{category.name}</div>
          </div>
        ))}
      </div>

      {/* 인기 굿즈 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">인기 굿즈</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "LG 트윈스 홈 유니폼", price: "89,000원", discount: "20%", rating: 4.8 },
              { name: "KT 위즈 응원 타올", price: "15,000원", discount: "10%", rating: 4.6 },
              { name: "SSG 랜더스 캡모자", price: "35,000원", discount: "15%", rating: 4.7 },
              { name: "두산 베어스 키링", price: "8,000원", discount: "5%", rating: 4.5 },
            ].map((item, index) => (
              <Card key={index} className="p-3">
                <div className="w-full h-24 bg-gray-200 rounded mb-2 flex items-center justify-center">
                  <Gift className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-sm">{item.price}</span>
                    <Badge variant="destructive" className="ml-1 text-xs">
                      {item.discount}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 마이페이지 컴포넌트
function MyPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">👤 마이페이지</h2>

      {/* 프로필 카드 */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-lg">⚾</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-bold text-lg">야구팬123</h3>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-blue-500">LV.7 열성팬</Badge>
                <span className="text-sm text-gray-600">1,250P</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-gray-500 mt-1">다음 레벨까지 350P</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 활동 통계 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">나의 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded">
              <div className="text-2xl font-bold text-blue-600">23</div>
              <div className="text-sm text-gray-600">예측 참여</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">예측 적중</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-sm text-gray-600">직관일기</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded">
              <div className="text-2xl font-bold text-yellow-600">12</div>
              <div className="text-sm text-gray-600">퀴즈 정답</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 획득 뱃지 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">획득 뱃지</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "첫 예측", icon: "🎯", earned: true },
              { name: "연승왕", icon: "🔥", earned: true },
              { name: "직관러", icon: "⚾", earned: true },
              { name: "퀴즈킹", icon: "🧠", earned: false },
            ].map((badge, index) => (
              <div key={index} className={`text-center p-2 rounded ${badge.earned ? "bg-yellow-50" : "bg-gray-100"}`}>
                <div className={`text-2xl mb-1 ${badge.earned ? "" : "grayscale"}`}>{badge.icon}</div>
                <div className={`text-xs ${badge.earned ? "font-medium" : "text-gray-400"}`}>{badge.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 구독 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">프리미엄 구독</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">무료 플랜</p>
              <p className="text-sm text-gray-600">기본 기능 이용 가능</p>
            </div>
            <Button variant="outline">업그레이드</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 팬 랭킹 페이지 컴포넌트
function RankingPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">🏆 팬 랭킹</h2>

      {/* 내 순위 */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">내 순위</h3>
              <p className="text-2xl font-bold">#47</p>
              <p className="text-sm opacity-90">LV.7 열성팬 (1,250P)</p>
            </div>
            <Trophy className="w-12 h-12" />
          </div>
        </CardContent>
      </Card>

      {/* 랭킹 리스트 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">전체 랭킹</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { rank: 1, name: "야구왕", level: "LV.15 전설팬", points: 5420, badge: "👑" },
              { rank: 2, name: "홈런킹", level: "LV.12 마니아", points: 4890, badge: "🥈" },
              { rank: 3, name: "직관러", level: "LV.11 마니아", points: 4650, badge: "🥉" },
              { rank: 4, name: "예측왕", level: "LV.10 고수", points: 4200, badge: "" },
              { rank: 5, name: "응원단장", level: "LV.9 고수", points: 3980, badge: "" },
            ].map((user) => (
              <div key={user.rank} className="flex items-center gap-3 p-3 border rounded">
                <div className="text-center w-8">{user.badge || `#${user.rank}`}</div>
                <Avatar>
                  <AvatarFallback>⚾</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-bold">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.level}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600">{user.points.toLocaleString()}P</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// POP 퀴즈 페이지 컴포넌트
function QuizPage() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const quizzes = [
    {
      question: "2023년 KBO 정규시즌 우승팀은?",
      options: ["LG 트윈스", "KT 위즈", "SSG 랜더스", "키움 히어로즈"],
      correct: 0,
      points: 50,
    },
    {
      question: "잠실야구장의 수용인원은?",
      options: ["25,000명", "26,800명", "28,500명", "30,000명"],
      correct: 1,
      points: 30,
    },
  ]

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
  }

  const nextQuiz = () => {
    setCurrentQuiz(currentQuiz + 1)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  if (currentQuiz >= quizzes.length) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold">🧠 POP 퀴즈</h2>
        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-bold mb-2">퀴즈 완료!</h3>
            <p className="text-gray-600 mb-4">총 80포인트를 획득했습니다!</p>
            <Button
              onClick={() => {
                setCurrentQuiz(0)
                setSelectedAnswer(null)
                setShowResult(false)
              }}
            >
              다시 도전하기
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quiz = quizzes[currentQuiz]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">🧠 POP 퀴즈</h2>
        <div className="text-sm text-gray-600">
          {currentQuiz + 1} / {quizzes.length}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">문제 {currentQuiz + 1}</CardTitle>
            <Badge className="bg-green-500">+{quiz.points}P</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="text-lg font-medium">{quiz.question}</h3>

          <div className="space-y-2">
            {quiz.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  showResult
                    ? index === quiz.correct
                      ? "default"
                      : selectedAnswer === index
                        ? "destructive"
                        : "outline"
                    : selectedAnswer === index
                      ? "default"
                      : "outline"
                }
                className="w-full justify-start"
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
              >
                {option}
              </Button>
            ))}
          </div>

          {showResult && (
            <div className="p-4 bg-gray-50 rounded">
              {selectedAnswer === quiz.correct ? (
                <div className="text-green-600">
                  <p className="font-bold">정답입니다! 🎉</p>
                  <p className="text-sm">{quiz.points}포인트를 획득했습니다!</p>
                </div>
              ) : (
                <div className="text-red-600">
                  <p className="font-bold">틀렸습니다 😅</p>
                  <p className="text-sm">정답: {quiz.options[quiz.correct]}</p>
                </div>
              )}
              <Button className="w-full mt-3" onClick={nextQuiz}>
                다음 문제
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// 설정 페이지 컴포넌트
function SettingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⚙️ 설정</h2>

      {/* 알림 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">알림 설정</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "경기 시작 알림", description: "응원팀 경기 시작 30분 전" },
            { label: "예측 결과 알림", description: "예측 게임 결과 발표" },
            { label: "레벨업 알림", description: "팬 레벨 상승 시" },
            { label: "굿즈 할인 알림", description: "굿즈 할인 이벤트 정보" },
          ].map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{setting.label}</div>
                <div className="text-sm text-gray-600">{setting.description}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 개인정보 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">개인정보 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            프로필 수정
          </Button>
          <Button variant="outline" className="w-full justify-start">
            비밀번호 변경
          </Button>
          <Button variant="outline" className="w-full justify-start">
            응원팀 설정
          </Button>
          <Button variant="outline" className="w-full justify-start text-red-600">
            회원탈퇴
          </Button>
        </CardContent>
      </Card>

      {/* 앱 정보 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">앱 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>버전</span>
            <span className="text-gray-600">1.0.0</span>
          </div>
          <Button variant="outline" className="w-full justify-start">
            이용약관
          </Button>
          <Button variant="outline" className="w-full justify-start">
            개인정보처리방침
          </Button>
          <Button variant="outline" className="w-full justify-start">
            고객센터
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// 메인 앱 컴포넌트
export default function BaseballFanApp() {
  const [activeTab, setActiveTab] = useState("home")

  const tabs = [
    { id: "home", label: "홈", icon: Home, component: HomePage },
    { id: "prediction", label: "예측게임", icon: Target, component: PredictionPage },
    { id: "diary", label: "직관일기", icon: BookOpen, component: DiaryPage },
    { id: "goods", label: "굿즈", icon: Gift, component: GoodsPage },
    { id: "my", label: "마이", icon: User, component: MyPage },
  ]

  const additionalPages = [
    { id: "ranking", label: "팬랭킹", icon: Trophy, component: RankingPage },
    { id: "quiz", label: "POP퀴즈", icon: Brain, component: QuizPage },
    { id: "settings", label: "설정", icon: Settings, component: SettingsPage },
  ]

  const allPages = [...tabs, ...additionalPages]
  const currentPage = allPages.find((page) => page.id === activeTab)
  const CurrentComponent = currentPage?.component || HomePage

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* 상단 추가 메뉴 (홈에서만 표시) */}
      {activeTab === "home" && (
        <div className="p-4 border-b">
          <div className="flex justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("ranking")}
              className="flex items-center gap-1"
            >
              <Trophy className="w-4 h-4" />
              랭킹
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setActiveTab("quiz")} className="flex items-center gap-1">
              <Brain className="w-4 h-4" />
              퀴즈
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("settings")}
              className="flex items-center gap-1"
            >
              <Settings className="w-4 h-4" />
              설정
            </Button>
          </div>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="p-4 pb-20">
        <CurrentComponent />
      </div>

      {/* 하단 탭 네비게이션 */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 px-1 text-center ${
                  activeTab === tab.id ? "text-blue-600 bg-blue-50" : "text-gray-600"
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{tab.label}</div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
