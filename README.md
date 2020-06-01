# 일일업무보고서 앱

**프로젝트 정보**

기간 | 2020.05 - 2020.05

개발인원 | 1명

기여도 | 80%

**개발 기능**

SASS 사용 : full-calendar 패키지, 앱 css를 위해 SASS사용

Vue : 뷰의 CRUD 기능 중 CRU 기능 구현

MySQL : 일정 데이터의 등록 및 수정을 RESTful api 로 구현

FullCalendar : 달력 사용을 위해 fullcalendar 패키지 설치

![Untitled-1-01](https://user-images.githubusercontent.com/56074618/82902684-cc531b80-9f9a-11ea-8027-3daef60dcd21.jpg)


**프로젝트 시행 영상**
[![daily_report](http://img.youtube.com/vi/JTsuxY3P0XE/0.jpg)](https://youtu.be/JTsuxY3P0XE)

**개발 목적**

Vue의 CRUD 기능 중 CRU 기능을 구현하고, MySQL를 통해 등록한 데이터를 node.js로 불러와
RESTful api 를 구현했습니다.

월간 달력에서 MySQL로 미리 등록한 일정 데이터를 불러와 저장한 데이터를 기준으로 한 일정을 클릭하면 확인할 수 있습니다.

**개발 내용**

_버튼소개_
- 오늘 : 오늘 날짜의 일정 관리로 이동
- 달력 : 오늘 날짜의 기준인 월간 달력으로 이동
- 설정 : 시작시간 / 언어 변경
- 소개 : 앱 소개

1. Intro 화면
Start 를 누르면 오늘 날짜의 일정관리로 이동합니다.
2. 오늘 버튼
2시간 단위로 나뉘어진 일정표에 업무 보고서를 작성합니다.
업무 제목 - 완성도 (완료 / 컨펌중 / 미완료) - 업무 내용 - 저장버튼 을 순서대로 기입 및 작동합니다.
3. 달력 버튼
오늘 날짜를 기준으로 한 월간 달력으로 이동합니다.
원하는 날짜를 클릭하면 해당 날짜 일정관리 페이지로 이동합니다. 
4. 설정 버튼
일정관리의 시작시간을 변경할 수 있습니다. 
8시 / 9시 / 10시 로 변경 가능
한국어 / 영어 설정 변경 가능


**RESTful API 구조**
![Untitled-2-01](https://user-images.githubusercontent.com/56074618/83068955-15db5d80-a0a4-11ea-8b2c-eace5a1408f5.jpg)

**VUEX (store) 구조**
![Untitled-3-01-01](https://user-images.githubusercontent.com/56074618/83069549-07417600-a0a5-11ea-9104-60b31ee382d9.jpg)
