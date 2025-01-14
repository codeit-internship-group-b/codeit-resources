<div align="center">
  <img src="https://github.com/user-attachments/assets/38a66efd-c2c1-4b87-8a5a-497605a72ad3" width="100px" height="100px" />
  <h1>Codeit Resources</h1>
  
[![GitHub issues](https://img.shields.io/github/issues/codeit-internship-group-b/codeit-resources?color=red)]()
[![GitHub stars](https://img.shields.io/github/stars/codeit-internship-group-b/codeit-resources?color=yellow)]()
[![GitHub forks](https://img.shields.io/github/forks/codeit-internship-group-b/codeit-resources?color=orange)]()
[![GitHub watchers](https://img.shields.io/github/watchers/codeit-internship-group-b/codeit-resources?color=blue)]()
    
사내 리소스 예약/대여/반납 플랫폼

❗**GIF 추가 예정**

<p align="center">
  <a href="https://codeit.click">View Web Site</a>
  ·
  <a href="https://api.codeit.click">API Docs</a>
</p>
</div>

<br />

# 📋 Overview

❗**GIF 추가 예정**

**Codeit Resources**는 회사의 리소스를 효율적으로 예약, 대여, 반납할 수 있는 통합 플랫폼입니다.

**실시간 예약 시스템**과 **직관적인 사용자 인터페이스**를 통해 사용자와 관리자 모두 손쉽게 이용할 수 있습니다.

<br />

# 💫 Table of contents

- [<code>📋 Overview</code>](#-overview)
- [<code>👥 Team</code>](#-team)
- [<code>🛠️ Tech stack</code>](#️-tech-stack)
- [<code>📁 Project structure</code>](#-project-structure)
- [<code>✨ Features</code>](#-features)
- [<code>🌟 Challenges</code>](#-challenges)
- [<code>🚀 Installation</code>](#-installation)

<br />

# 👥 Team

<table align="center">
    <tbody>
        <tr>
             <td>
                <a href="https://github.com/miraclee1226">
                    <img src="https://avatars.githubusercontent.com/miraclee1226" width="100" height="100"/>
                </a>  
            </td>
            <td>
                <a href="https://github.com/bokeeeey">
                    <img src="https://avatars.githubusercontent.com/bokeeeey" width="100" height="100"/>
                </a>
            </td>
            <td>
                <a href="https://github.com/AdamSeungheonShin">
                    <img src="https://avatars.githubusercontent.com/AdamSeungheonShin" width="100px" height="100px"/>
                </a>
            </td>
            <td>
                <a href="https://github.com/cindycho0423">
                    <img src="https://avatars.githubusercontent.com/cindycho0423" width="100px" height="100px"/>
                </a>  
            </td>
          <td>
                <a href="https://github.com/dudwns0213">
                    <img src="https://avatars.githubusercontent.com/dudwns0213" width="100px" height="100px"/>
                </a>
            </td>
        </tr>
        <tr>
            <th>
                <a href="https://github.com/miraclee1226">소혜린</a>
            </th>
            <th>
                <a href="https://github.com/bokeeeey">김보경</a>
            </th>
            <th>
                <a href="https://github.com/AdamSeungheonShin">신승헌</a>
            </th>
            <th>
                <a href="https://github.com/cindycho0423">조현지</a>
            </th>
            <th>
                <a href="https://github.com/dudwns0213">배영준</a>
            </th>
        </tr>
        <tr>
            <th>
                FullStack, PM
            </th>
            <th>
                FullStack
            </th>
            <th>
                FullStack
            </th>
            <th>
                FrontEnd
            </th>
            <th>
                FrontEnd
            </th>
        </tr>
    </tbody>
</table>

<br />

# 🛠️ Tech stack

## 1. Frontend

- Language

  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

- Library & Framework

  <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack%20Query-ff5a1f?style=for-the-badge&logo=react-query&logoColor=white">
  <img src="https://img.shields.io/badge/Storybook-ff4785?style=for-the-badge&logo=storybook&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-1c6c7e?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/React%20Hook%20Form-61dafb?style=for-the-badge&logo=react-hook-form&logoColor=black">

- Deploy

  <img src="https://img.shields.io/badge/AWS%20S3-232f3e?style=for-the-badge&logo=amazon-s3&logoColor=white">
  <img src="https://img.shields.io/badge/AWS%20CloudFront-ff9900?style=for-the-badge&logo=aws&logoColor=white">

## 2. Mobile❗진행중

## 3. Backend

- Language

  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

- Library & Framework

  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

- Database

  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

- Deploy

  <img src="https://img.shields.io/badge/AWS%20EC2-ff9900?style=for-the-badge&logo=amazon-ec2&logoColor=white">

## 4. CI/CD

<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=github-actions&logoColor=black">

<br />

# 📁 Project Structure

## MonoRepo

웹과 모바일 앱이 동일한 백엔드 API를 사용하고, UI 컴포넌트를 공유하기 때문에 모노레포로 구성하였습니다. 또한 TurboRepo를 도입하여 빌드 속도를 개선하고 효율적인 개발 환경을 구축했습니다.

전체적인 폴더구조는 아래와 같습니다.

```
codeit-resources/              # Project Root
├── apps/
│   ├── api/                   # 백엔드 서버
│   │   └── src/
│   │       ├── controllers/   # API 엔드포인트 핸들러
│   │       ├── middleware/    # API 미들웨어
│   │       ├── models/        # MongoDB 스키마 및 모델 정의
│   │       ├── routes/        # API 라우트
│   │       └── swagger/       # API 문서 (Swagger)
│   │
│   ├── mobile/                # 모바일 앱 (진행중)
│   │
│   ├── storybook/             # StoryBook 설정 파일
│   │
│   └── web/                   # 웹 클라이언트 (진행중)
└── packages/
    ├── constants/             # 상수
    ├── eslint-config/         # ESLint 설정
    ├── prettier-config/       # Prettier 설정
    ├── tailwind-config/       # Tailwind 설정
    ├── tsconfig/              # TypeScript 설정
    └── ui/                    # 공통 UI 컴포넌트
```

## Architecture

**1. Web / Mobile**

- AWS S3에 빌드된 정적 파일을 저장하고, 이를 AWS CloudFront를 통해 배포하였습니다.
- React Native Webview를 사용하여 Next.js로 만든 웹을 모바일 앱 내에 표시하였습니다.

**2. Backend**

- AWS EC2 인스턴스에서 Express.js 서버를 실행한 뒤, MongoDB 데이터베이스와 연동하였습니다.
- AWS S3를 이용하여 이미지를 저장하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/0a76d65a-1662-4843-a3a2-37791ac55a53" width="800px" />
</div>

<br />

# ✨ Features

## 1. Member 기능

### 대시보드

오늘 예약된 회의나 좌석을 확인 할 수 있습니다.

![스크린샷 2025-01-14 134555](https://github.com/user-attachments/assets/45a79e2f-384f-4716-87bb-b3293858b478)

<br />

### 회의실 예약

특정 날짜와 시간을 선택하여 회의실을 예약 할 수 있습니다.

![스크린샷 2025-01-14 141122](https://github.com/user-attachments/assets/703e396c-8d28-4a81-9e70-8b2d58578d60)

회의는 제목, 회의실, 시간, 참여자를 선택할 수 있으며 예약한 회의는 수정, 취소가 가능합니다.

![스크린샷 2025-01-14 134523](https://github.com/user-attachments/assets/d8fbc607-ba5d-4e75-a5f6-a7b2e46bf71a)

<br />

### 좌석 예약

원하는 좌석을 예약 할 수 있습니다.

![스크린샷 2025-01-14 142225](https://github.com/user-attachments/assets/05736685-b3e0-4e73-bb7c-b277d049c7dd)

좌석은 이동과 반납이 가능합니다.

![스크린샷 2025-01-14 142257](https://github.com/user-attachments/assets/f292417e-b534-46f0-b486-89c1165c1213)

<br />

### 내 프로필

개인 프로필 정보를 확인 할 수 있습니다.

비밀번호 변경, 로그아웃을 할 수 있습니다.

![스크린샷 2025-01-14 134649](https://github.com/user-attachments/assets/0cff8370-4c18-4525-9da6-9d2be79959f0)

<br />

## 2. Admin 기능

### 멤버 관리

전체 멤버 목록을 확인 할 수 있습니다.

![스크린샷 2025-01-14 133616](https://github.com/user-attachments/assets/aae08e78-6f12-455c-aa02-22a42c022695)

멤버 검색을 통해 특정 멤버를 찾을 수 있습니다.

![스크린샷 2025-01-14 133601](https://github.com/user-attachments/assets/648e673c-af33-4b1f-b4c2-ab9583bf0aa2)

멤버의 정보를 추가, 수정, 삭제 할 수 있습니다.

![스크린샷 2025-01-14 134750](https://github.com/user-attachments/assets/1daddc78-e610-4c99-bbe3-ff38d930d978)

<br />

### 팀 관리

전체 팀 목록을 확인할 수 있습니다. 드래그 앤 드롭으로 팀 위치를 변경 할 수 있습니다.

![스크린샷 2025-01-14 133640](https://github.com/user-attachments/assets/23a08bbe-fee2-4bef-94aa-b36327fd54e9)

팀은 추가, 수정, 삭제가 가능합니다.

![스크린샷 2025-01-14 134838](https://github.com/user-attachments/assets/7826470e-af41-4e7e-a1cb-57cea986fe09)

<br />

### 회의실 설정

전체 회의실 목록을 확인 할 수 있습니다.

![스크린샷 2025-01-14 133716](https://github.com/user-attachments/assets/20ce9c61-874d-4d51-877a-134377085dfd)

회의실은 추가, 수정, 삭제가 가능합니다.

![스크린샷 2025-01-14 135011](https://github.com/user-attachments/assets/8bb8967a-fa87-4e25-907d-922a9d2f422c)

<br />

### 좌석 설정

특정 좌석의 상태(예약 가능, 고정 좌석, 사용 불가)를 변경 할 수 있습니다.

![스크린샷 2025-01-14 142346](https://github.com/user-attachments/assets/19b3ff3c-e555-4e3b-8afd-86b89ef4f427)

<br />

# 🌟 Challenges

프로젝트를 진행하며 마주한 다양한 기술적 문제들과 해결 과정을 기록했습니다.

## 1. 정적 배포 선택 배경

해당 서비스는 다음과 같은 페이지에서 실시간 데이터 처리가 필요했습니다.

- 회의실 예약
- 좌석 예약

이 두 페이지는 각각 예약 현황과 좌석 상태를 **실시간으로 반영**하는 것이 필수적이었습니다.

다른 사용자가 회의실을 예약하거나 좌석을 선점하는 상황을 즉시 확인할 수 있어야 하기 때문에 프로젝트 초기에는 서버 사이드 렌더링(SSR)을 통한 동적 배포를 고려했습니다.

하지만 **결과적으로 정적 배포를 선택**했는데, 그 이유는 다음과 같습니다.

### 1. 실시간 데이터가 필요한 페이지는 일부인 점

회의실 예약과 좌석 예약 페이지를 제외한 대시보드, 프로필 페이지, 관리자 설정 페이지 등 **대부분의 페이지가 정적 컨텐츠**입니다.

이러한 페이지들은 즉각적인 데이터 갱신이 필요하지 않고 변경 사항이 실시간으로 반영될 필요가 없었습니다.

### 2. 서버 비용 절감

동적 배포의 경우 모든 페이지 요청마다 서버의 리소스를 사용하게 되어 트래픽에 따른 서버 비용이 증가합니다.

반면 AWS S3와 CloudFront를 이용한 정적 배포는 **CDN**을 통해 효율적으로 트래픽을 처리할 수 있어 비용 효율적인 운영이 가능했습니다.

### 웹소켓을 통한 실시간 처리

실시간 데이터가 필요한 페이지들은 클라이언트 사이드에서 **웹소켓**을 통해 처리하여 정적 배포의 장점을 살리면서도 실시간 데이터 갱신을 구현할 수 있었습니다.

<br />

## 2. CI/CD 트러블 슈팅

### Shell

### 메모리 부족

### SSH 연결 끊김

<br />

# 🚀 Installation

### 패키지 설치

```bash
pnpm install
```

### 개발 모드

```bash
pnpm run dev
```

### 프로덕션 모드

```bash
pnpm run build
```
