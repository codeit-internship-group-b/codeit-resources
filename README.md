<div align="center">
  <img src="https://github.com/user-attachments/assets/38a66efd-c2c1-4b87-8a5a-497605a72ad3" width="100px" height="100px" />
  <h1>Codeit Resources</h1>
  
[![GitHub issues](https://img.shields.io/github/issues/codeit-internship-group-b/codeit-resources?color=red)]()
[![GitHub stars](https://img.shields.io/github/stars/codeit-internship-group-b/codeit-resources?color=yellow)]()
[![GitHub forks](https://img.shields.io/github/forks/codeit-internship-group-b/codeit-resources?color=orange)]()
[![GitHub watchers](https://img.shields.io/github/watchers/codeit-internship-group-b/codeit-resources?color=blue)]()

  <p>사내 리소스 예약/대여/반납 플랫폼</p>
  <p align="center">
    <a href="https://codeit.click">View Web Site</a>
    ·
    <a href="https://api.codeit.click">API Docs</a>
  </p>
  
![CodeitResources](https://github.com/user-attachments/assets/95a700e0-b710-4f99-85b2-9d11a4e0fdbc)

</div>

<br />
<br />

# 💫 Table of contents

- [<code>👥 Team</code>](#-team)
- [<code>🛠️ Tech stack</code>](#️-tech-stack)
- [<code>📁 Project structure</code>](#-project-structure)
- [<code>🌟 Challenges</code>](#-challenges)
- [<code>✨ Features</code>](#-features)
- [<code>🚀 Installation</code>](#-installation)

<br />
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
<br />

# 🛠️ Tech stack

## 1. Frontend

- Language

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

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

## 2. Mobile

- Language

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

- Library & Framework

  <img src="https://img.shields.io/badge/ReactNative (Expo)-222222?style=for-the-badge&logo=React&logoColor=">

## 3. Backend

- Language

  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">

- Library & Framework

  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

- Database

  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

- Deploy

  <img src="https://img.shields.io/badge/AWS%20EC2-ff9900?style=for-the-badge&logo=amazon-ec2&logoColor=white">

## 4. CI/CD

<img src="https://img.shields.io/badge/githubactions-2088FF?style=for-the-badge&logo=github-actions&logoColor=black">

<br />
<br />

# 📁 Project Structure

## MonoRepo

웹과 모바일 앱이 동일한 백엔드 API를 사용하고, UI 컴포넌트를 공유하기 때문에 **모노레포**로 구성하였습니다. 또한 **TurboRepo**를 도입하여 빌드 속도를 개선하고 효율적인 개발 환경을 구축했습니다.

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
│   │       └── swagger/       # API 문서
│   │
│   └── mobile/                # 모바일 앱
│   │    └── app/
│   │       ├── (route)/       # 라우팅 디렉토리
│   │       ├── assets/        # 정적 자산 폴더
│   │       ├── components/    # 재사용 가능한 컴포넌트
│   │       ├── constants/     # 앱 전역 상수
│   │       ├── utils/         # 유틸리티 함수
│   │       ├── hooks/         # 커스텀 훅
│   │       └── store/         # 상태 관리 스토어
│   │
│   ├── storybook/             # StoryBook 설정 및 구성 파일
│   │
│   └── web/                   # 웹 클라이언트
│       ├── api/               # API 호출 관련 코드
│       ├── app/
│       │   ├── _components/   # 재사용 가능한 컴포넌트
│       │   ├── _hooks/        # 커스텀 훅
│       │   ├── (admin)/       # 관리자 페이지
│       │   ├── (seats)/       # 좌석 예약 페이지
|       |   ...                # 이외의 프로젝트에 구성된 페이지들
│       │   ├── layout.tsx     # 레이아웃 컴포넌트
│       │   └── page.tsx       # 루트 컴포넌트
│       ├── components/        # 공통 UI 컴포넌트
│       └── lib/               # 라이브러리 함수 및 모듈
│
└── packages/                  # 공유 패키지 디렉토리
    ├── constants/             # 프로젝트 전역 상수
    ├── eslint-config/         # ESLint 설정
    ├── prettier-config/       # Prettier 설정
    ├── tailwind-config/       # Tailwind CSS 설정
    └── ui/                    # 공통 UI 컴포넌트
```

## Architecture

**1. Web / Mobile**

- AWS S3에 빌드된 정적 파일을 저장하고, 이를 AWS CloudFront를 통해 배포하였습니다.
- React Native Webview를 사용하여 Next.js로 만든 웹을 모바일 앱 내에 표시하였습니다.

**2. Backend**

- AWS EC2 인스턴스에서 Express.js 서버를 실행한 뒤, MongoDB와 연동하였습니다.
- AWS S3를 이용하여 이미지를 저장하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/0a76d65a-1662-4843-a3a2-37791ac55a53" width="800px" />
</div>

<br />
<br />

# 🌟 Challenges

프로젝트를 진행하며 마주한 다양한 기술적 문제들과 해결 과정을 기록했습니다.

## 1. 정적 배포를 선택한 이유

### 서버 비용 절감

동적 배포의 경우 모든 페이지 요청마다 서버의 리소스를 사용하게 되어 트래픽에 따른 서버 비용이 증가합니다.

반면 AWS S3와 CloudFront를 이용한 정적 배포는 **CDN**을 통해 효율적으로 트래픽을 처리할 수 있어 비용 효율적인 운영이 가능했습니다.

## 2. Mongo DB 해킹

AWS EC2에 배포된 MongoDB 서버에서 주기적인 데이터 초기화 현상이 발생했습니다.
![스크린샷 2025-01-31 132651](https://github.com/user-attachments/assets/44d0273e-c267-430d-87f3-3bcbff3b009c)

이는 외부로부터 무단 접근 시도로 인한 것으로 판단되어 EC2의 /etc/mongod.conf 설정 파일에 보안 설정을 추가하여 인증된 사용자만 데이터베이스에 접근할 수 있도록 제한했습니다.

```
security:
  authorization: enabled
```

### 추가 개선 방안

TODO: 추가 개선 방안 작성

## 3. CI/CD 트러블 슈팅

### Shell 관련 이슈

Github Actions에서 배포 스크립트 실행 시 **command not found** 오류가 발생했습니다.

![스크린샷 2025-01-14 162317](https://github.com/user-attachments/assets/e3956e2b-e7b7-4146-847d-c6edbd27b4ed)

원인은 shell의 환경 설정 문제였습니다. Github Actions의 SSH 실행은 **non-interactive, non-login shell** 환경에서 실행되는데 `.bashrc` 파일은 기본적으로 **non-interactive shell**에서 아무 작업도 수행하지 않도록 설정되어 있었습니다.

이를 해결하기 위해 .bashrc 파일의 interactive shell 여부를 확인하는 조건문 이전에 pnpm 실행 경로를 추가하여 배포 스크립트가 정상적으로 실행되도록 수정했습니다.

```bash
# Add pnpm and pm2 to PATH
export PATH="$PATH:/home/ubuntu/.local/share/pnpm"

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

<br />

### 메모리 부족

EC2 프리티어 인스턴스(1GiB RAM)에서 모노레포의 여러 패키지를 동시에 설치하는 과정에서 메모리 사용량이 급격히 증가하여 시스템에 의해 **프로세스가 강제 종료**되었습니다.

![스크린샷 2025-01-14 163305](https://github.com/user-attachments/assets/47589f66-fe72-4558-b666-4981ea18744b)

이를 해결하기 위해 **Swap Memory를 2G로 설정**하여 **제한된 메모리 환경에서도 안정적으로 빌드 프로세스를 완료**할 수 있었습니다.

![스크린샷 2025-01-17 155425](https://github.com/user-attachments/assets/f1f575e5-fe5f-4d62-a532-8e6cc4e32c1d)

<br />

### SSH 연결 끊김

배포 과정에서 **client_loop: send disconnect: Broken pipe** 오류가 발생하여 배포가 중단되는 현상이 발생했습니다.

![스크린샷 2025-01-14 162535](https://github.com/user-attachments/assets/f476e1e7-46c7-4e6b-b520-4ff3f79a1e80)

이는 GitHub Actions에서 EC2로의 SSH 연결이 일정 시간 동안 데이터 전송이 없으면 자동으로 종료되는 문제였고, 특히 패키지 설치 과정이 길어지면서 SSH 연결이 타임아웃되어 발생한 문제였습니다.

이를 해결하기 위해 EC2 인스턴스의 SSH 설정 파일(/etc/ssh/sshd_config)에 다음 설정을 추가했습니다.

```
ClientAliveInterval 60    # 60초마다 클라이언트에게 응답 요청
ClientAliveCountMax 3     # 최대 3번까지 재시도
```

따라서 SSH 연결이 안정적으로 유지되어 배포가 정상적으로 완료될 수 있었습니다.

<br />

## 4. Suspense, ErrorBoundary

컴포넌트 내에서 **isLoading**이나 **isError** 처리를 한 경우 컴포넌트의 의도나 동작을 한눈에 파악하기 어려웠습니다.

```
import { useQuery } from 'react-query';

const ResponsiveTeamsPage = () => {
  const { data, isLoading, isError, error } = useQuery('teams', fetchTeams);

  if (isLoading) {
    return (
      <>
        <TeamListHeader />
        <TeamListSkeletonGroup />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <TeamListHeader />
        <div>Error occurred: {error.message}</div>
      </>
    );
  }

  return (
    <>
      <TeamListHeader />
      <TeamList data={data} />
    </>
  );
};
```

<br />

따라서 **Suspense**와 **ErrorBoundary**를 사용하여 상태를 UI 레벨에서 선언적으로 처리하여 코드를 읽기 쉽고 유지보수 하기 쉬운 구조로 변경하였습니다.

```
export default function ResponsiveTeamsPage(): JSX.Element | null {

  return (
    <>
      <TeamListHeader />
      <ErrorResetBoundary fallbackComponent={ErrorFallback}>
        <Suspense fallback={<TeamListSkeletonGroup />}>
          <TeamList />
        </Suspense>
      </ErrorResetBoundary>
    </>
  );
}
```

<br />
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

개인 프로필 정보를 확인 할 수 있으며 비밀번호 변경, 로그아웃을 할 수 있습니다.

![스크린샷 2025-01-14 134649](https://github.com/user-attachments/assets/0cff8370-4c18-4525-9da6-9d2be79959f0)

<br />

## 2. Admin 기능

### 멤버 관리

전체 멤버 목록을 확인할 수 있습니다.

![스크린샷 2025-01-14 133616](https://github.com/user-attachments/assets/aae08e78-6f12-455c-aa02-22a42c022695)

멤버 검색 기능을 통해 특정 멤버를 찾을 수 있습니다.

![스크린샷 2025-01-14 133601](https://github.com/user-attachments/assets/648e673c-af33-4b1f-b4c2-ab9583bf0aa2)

멤버의 정보를 추가, 수정, 삭제 할 수 있습니다.

![스크린샷 2025-01-14 134750](https://github.com/user-attachments/assets/1daddc78-e610-4c99-bbe3-ff38d930d978)

<br />

### 팀 관리

전체 팀 목록을 확인할 수 있으며 드래그 앤 드롭 기능으로 팀 위치를 변경 할 수 있습니다.

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
