# JJIKPLACE : 셀프사진관 찾기

---

![찍플 로고](https://github.com/seoleunjin/JJIKPLACE/blob/main/%EC%B0%8D%ED%94%8C%20%EB%A1%9C%EA%B3%A0.png)
## 지금  JJIKPLACE는? ~~<https://jjikplace.netlify.app>~~

---

## 프로젝트 진행기간
2025/06/04 - 2025/07/23 (7주)

---

## JJIKPLACE?
오늘의 특별한 순간을 사진으로 평생 간직해보세요.

나만의 컨셉에 맞는 사진관을 찾고 계신가요?

찍플은 이용자들의 솔직한 후기 데이터를 기반으로 매장의 분위기와 촬영 스타일을 분석해,
당신의 취향에 꼭 맞는 셀프사진관을 쉽고 빠르게 추천하는 큐레이션 서비스를 제공합니다.

---

## 주요기능을 소개합니다.

### 1. 위치기반 셀프사진관 탐색
현위치  또는 관심있는 지역을 검색하면 그 주변 셀프사진관의 상세정보를 확인하실 수 있어요.

평점, 리뷰, 사진을 통해 내 취향에 맞는 셀프사진관을 찾아보세요.

### 2. 길찾기 경로 안내
원하는 출발지와 도착지를 자유롭게 설정하고

마음에 드는 셀프사진관까지 빠르게 길안내 받아보세요!

### 3. 세분화된 카테고리로 컨셉에 맞는 셀프사진관 찾기 
셀프사진관 카테고리를 전체, 인기, 컨셉, 하이틴, 캐릭터, 감성, 복고 총 7가지로 세분화했어요.

관심 카테고리를 선택하면 내게 딱맞는 셀프사진관을 볼 수 있어요.

### 4. 리뷰, 찜, 회원 정보를 간편하게 관리하세요
내가 남긴 리뷰와 찜한 매장을 한눈에 확인하고,

회원정보를 손쉽게 변경할 수 있습니다.

### 5. 한 번의 클릭으로 간편하게 찍플 시작하기
아이디 저장, 카카오 · 구글 로그인은 물론, 회원가입까지

원하는 방식으로 간편하게 시작하세요.

### 6. 유효성 검사로 지키는 안전한 회원가입
이메일, 비밀번호 등 모든 정보는

보안 규칙에 맞게 입력해야 가입이 완료됩니다.

---

## 기술 스택 및 Version

### Backend 
development tool : Python (FastAPI + SQLAlchemy) Redis (캐싱)

MySQL 8.0

swagger

### Frontend 
development tool : Visual Studio Code npm : 11.0.0 node.js : 22.13.1

Next.js 15.3.3 React 19.0.0

React Query 5.82.0

Redux Toolkit 2.8.2

Axios 1.9.0

React Hook Form 7.58.1

Zod 3.25.67 

Styled-components 6.1.19

Kakao Map SDK 1.2.0

### CI/CD
Azure

Netlify

Docker

### 그 외 협업툴 
Git, source tree - 브랜치 전략을 통해 기능 분리

Zep, Notion - 전체적인 회의 관할 및 모든 메모

Figma - 모든 디자인 작업

---

## 프로젝트 구조도

```
jjikplace  
├── node_module 
├── public 
│   └── fonts
│   └── images
├── src
│   ├── api
│   ├── assets
│   ├── components
│   ├── constants
│   ├── features
│   ├── hooks
│   ├── layout
│   ├── pages
│   ├── schemas
│   ├── store
│   ├── styles 
│   ├── types
│   └── utils
├── prettierrc
├── eslint.config.mjs
├── next.config.ts
├── package
├── package.lock
└── tsconfig.json 
```

---

## 팀원 구성 및 소개
### B.E
| 팀원 | 역할 | 이메일 |
| --- | --- | --- |
| 김태영 | B.E 팀장, API 설계 및 관리, DB 설계 | qordi124@gmail.com |

### F.E
| 팀원 | 역할 | 이메일 |
| --- | --- | --- |
| 설은진 | F.E 팀장, 기획 및 디자인, 협업 툴 및 문서 관리 | anah9026@gmail.com |
| 강도현 |  기획, 협업 툴 및 문서 관리  | kdh7313@naver.com |

---


## 프로젝트 산출물

[디자인 작업물](https://www.figma.com/design/SJxu0BolWPac66um1bIWwo/%EC%B0%8D%ED%94%8C?node-id=880-1071&t=yG7fFjJABGId2EM7-1)
[SWAGGER](http://jjikplace-backend.kro.kr/docs)
[ERD](https://www.erdcloud.com/d/6zyJ2Fv22H3Cvxs9f)
[회의록](https://www.notion.so/210c7c6edc1d805f8bf8c84d1f6ec5c2?source=copy_link)

---

## 프로젝트 시연화면

### Map 화면
