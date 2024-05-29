# Clothing Bin Locator

한 줄 소개: 서울시 의류 수거함 위치를 제공하는 지도

활동 목적: Next.js, Docker, CI/CD 학습 및 적용

개발 인원: 풀스택 1명

진행 기간: 2024/05/11 → 진행 중

🔗 배포 링크 (무료 plan 사용 중임으로 최초 로드 시 속도 저하 있음)

-   [by Vercel](https://clothing-bin-locator.vercel.app)
-   [by Render using Docker](https://clothing-bin-locator.onrender.com)

# 💡 프로젝트 소개 및 목표

새로 이사 온 동네에서 더 이상 입지 않는 옷들이 담긴 박스를 들고 1시간 정도 돌아다니며 의류 수거함을 찾던 기억이 있어 의류 수거함들의 위치를 간편하게 조회할 수 있는 서비스를 개발했습니다.

의류 수거함 위치 데이터는 서울시 각 구청에서 제공하는 공공데이터를 기반으로 하고 있으며 Kakao 지도 API를 통해 시각화했습니다.

본 프로젝트를 통해 Next.js 14, Docker, CI/CD를 학습하고 서비스 최적화 경험을 통해 많은 사람이 이용하는 서비스를 개발하고 싶습니다.

# 🏗️ 주요 기능

구현 완료

-   서울시에 있는 약 10,000개의 의류 수거함 위치 표시
-   사용자의 현재 위치 표시

구현 예정

-   의류 수거함 위치 데이터 CRUD가 가능한 페이지 유지보수용 admin 페이지

개선 예정

-   지도에 마커 rendering 시간 단축
-   SEO 향상

# ⚙️ 주요 언어 / 기술

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
