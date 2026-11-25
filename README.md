# 202230336 최주형

## 2026.11.25

### 중복된 요청 제거 및 데이터 캐시

- 중복된 fetch 요청을 제거하는 한 가지 방법은 요청 메모이제이션을 사용하는것
  즉, 같은 데이터를 여러번 요청하지 않게 하려면, '요청 메모이제이션'을 사용할 수 있다는 의미다.
- 이 매커니즘을 사용하면 하나의 랜더링 과정안에서 같은 URL과 옵션을 가진 GET 또는 HEAD방식의 fetch 호출들은 하나의 요청으로 결합된다.
  즉, 렌더링 중에 같은 주소와 설정으로 여러 번 fetch()를 호출하더라도, Next.js는 그것들을 하나의 네트워크 요청으로 통합해서 처리한다는 의미
- 이 작업은 자동으로 수행되며 fetch에 Abort 신호를 전달하여 작업을 취소할 수 있다.

- Next.js의 데이터 캐시를 사용하여 fetch 중복을 제거할 수도 있다. 예를들어 fetch옵션에서 cache:'force-cache'를 설정.
- 데이터 캐시를 사용하면 현재 랜더 패스와 수신 요청에서 데이터를 공유할 수 있다.
- fetch를 사용하지 않고 대신 ORM이나 데이터베이스를 직접 사용하는 경우 React 캐시 함수로 데이터 액세스를 래핑할 수 있다.

### Promise<...>란 무엇인가?

- Next.js 15.1부터 주요 내부 API들이 비동기 구조로 변경되었다.
- 내부 API가 즉시 사용 가능한 값이 아니라 비동기적으로 처리되며 Promise를 반환하게 된다.
- 즉 Promise<...>는 비동기 연산의 결과를 나타내는 객체 타입으로, 연산이 즉시 완료되지 않고 미래의 어느 시점에서 결과가 결정될 때 이를 표현한다는 의미다.
- Promise<{id:string}>는 미래에 {id:string} 객체를 반환하겠다는 약속이다.
- 즉, 서버 컴포넌트로부터 Promise<{id:string}>객체를 받았다면, 클라이언트 컴포넌트에서는 use Hook을 사용해서 개별 데이터에 적접근한다.

### Suspense Component란 무엇인가?

- 비동기 작업 중에 UI의 일부를 일시적으로 대체 UI로 보여주어 사용자 경험을 향상시키는 React기능이다(예: 데이터 로딩, 컴포넌트 동적 임포트)

[Suspense의 핵심 기능]

- 비동기 작업이 완료될 때까지 해당 컴포넌트 트리 렌더링을 일시 중단
- 작업이 완료되면 실제 UI로 자동 전환
- 비동기 로딩 중 보여줄 fallback UI를 지정할 수 있다.
- import하여 사용. import { Suspense } from 'react'
- Suspense 내부에 여러 개의 컴포넌트가 있을 경우, 내부 컴포넌트 중 하나라도 로딩 중이면 falllback UI가 표시되고, 모든 작업이 완려되면 한번에 실제 UI가 노출된다
- 이 기능을 활용하면 여러 비동기 컴포넌트를 독립적으로 대기하거나, 병렬 로딩 상태를 효과적으로 관리할 수 있다.

### Fetch의 이해

| 구성요소  | 소속            | 설명                                         | 예시                 |
| :-------- | :-------------- | :------------------------------------------- | :------------------- |
| `fetch()` | 전역 함수       | HTTP요청을 보내고 `Promise<Response>`를 반환 | `fetch(url)`         |
| `.then()` | Promise 메서드  | Promise가 완료되면 callback 실행             | `fetch(url).then(…)` |
| `.json()` | Response 메서드 | Body를 JSON으로 변환하는 또다른 Promise 반환 | `res.json()`         |

- res.json()

1. res.json()은 이 Response 객체의 본문을 JSON으로 파싱하는 비동기 함수이다.
2. 내부적으로 문자열 형태의 Response body를 읽고 JSON.parse()를 수행하며 자바스크립트 객체로 변환한다.
3. 이 함수도 Promise를 반환하기 때문에 다시 then() 체이닝을 통해 파싱된 데이터를 사용할 수 있다.
4. 파싱이 완료되면 resolve되고, 파싱에 실패하면 reject된다.
5. Response body는 한 번만 읽을 수 있습니다. res.json() 또는 res.text()등 하나만 사용이 가능하다.
6. 내부적으로 response stream -> text -> JSON.parse(text) 처럼 동작한다.
7. JSON 파싱 에러의 예외처리가 필요하다.

- .then((res) => ...)

1. fetch가 반환한 Promise객체가 .then() 매서드를 가지고 있다
2. Promise 객체가 resolve되면 .then()의 callback함수가 실행된다
3. 여기서 res는 서버에서 반환된 Promise 객체이다.
4. Promise 객체는 status, header, body등 HTTP 응답 전체를 포함한다.
5. res.ok는 상태 코드가 200~299인지 Boolean으로 알려준다.
6. res.status는 숫자로 알려준다.
7. fetch와 마찬가지로 예외처리는 별도로 해야한다

## 2026.11.18

### Fetching Data

[알아두면 좋은 정보]

- fetch 응답은 기본적으로 캐싱되지 않습니다.
- 그러나 next,js는 라우팅 페이지를 미리 렌더링 하고, 성능 향상을 위해 출력은 캐싱됩니다.
- 동적 렌더링을 사용하려면 {cache: 'no=store' } 옵션을 사용합니다. fetch API 참고
- 개발중에는 가시성과 디버깅을 위해 fetch 호출을 기록할 수 있습니다.

1. 서버 컴포넌트

- 서버 컴포넌트에서 데이터를 fetch하는 방법은 두 가지가 있습니다.
  1. fetch API
  2. ORM 또는 데이터베이스

[ 1. fetch API 사용]

- 데이터를 가져오려면 fetch API를 사용하여 컴포넌트를 비동기식 함수로 변환하고 다음 fetch의 호출을 기다린다
  [ 2. orm 또는 데이터베이스를 사용 ]
- 서버 컴포넌트는 서버에서 렌더링 되기 때문에 ORM이나 데이터베이스 클라이언트를 사용해서 안전하게 데이터베이스 쿼리를 실행할 수 있다.
- 컴포넌트를 비동기 함수로 변환하고 호출을 기다린다

2. 클라이언트 컴포넌트

- 클라이언트 컴포넌트에서 데이터를 fetch하는 방법은 두 가지가 있다
  1. React의 use state
  2. SWR 또는 React 쿼리와 같은 통신 라이브러리

[ 1. use Hook을 사용한 스트리밍 데이터]

- React의 use Hook을 사용하여 서버에서 클라이언트로 데이터를 스트리밍합니다.
- 서버 컴포넌트에서 데이터를 먼저 fetch하고, 그 결과(promise)를 클라이언트 컴포넌트에 prop로 전달한다.
- 서버 컴포넌트는 async가 가능하기 때문에 await fetch()도 사용 가능하다
- 하지만 클라이언트 컴포넌트에서는 async가 불가능하기 때문에 직접 fetch가 불가능하다.
- 이런 이유 때문에 서버에서 fetch한 결과를 prop로 넘기고 클라이언트에서는 use(promise)를 써서 데이터를 가져온다.

### 환경 변수 노출 예방

- 이 함수에는 client에 노출되어서는 안 되는 API_KEY 내용이 포함되어 있습니다.

- next.js에서는 NEXT*PUBLIC* 접두사가 붙은 환경 변수만 client 번들에 포함됩니다.
- 접두사가 붙지 않은 변수의 경우 next.js에서 빈 문자열로 대체됩니다.

- 결과적으로 client에서 getData()를 가져와서 실행할 수 는 있짐나 예상대로 작동하지는 않습니다.
  ㅜ

## 2026.11.11

### 외부(서드 파티) component

- client 전용 기능에 의존하는 외부 component를 사용하는 경우, 해당 component를 client component에 래핑하여 예상대로 작동하는지 확인할 수 있습니다.
- 예를 들어, <Carousel />은 acme-carousel 패키지에서 가져올 수 있습니다.
- 이 component는 useState를 사용하지만 "use client"지시문은 없습니다
- client component 내에서 <Carousel />을 사용하면 예상대로 작동합니다.
- 그러나 server component 내에서 직접 사용하려고 하면 오류가 발생
- 이는 Next.js가 <Carousel /> 이 client 전용 기능을 사용하고 있다는 것을 알지 못하기 때문
- 이 문제를 해결하려면 client 전용 기능에 의존하는 외부 component를 자체 client component로 래핑할 수 있다

### Context Provider 동작 순서

1. 사용자가 ThemeStatus의 버튼 클릭
2. toggleTheme() 호출.
3. Provider 내부의 setTheme이 실행되어 theme상태가 변경
4. 상태 변경으로 Provider와 그 하위 컴포넌트들이 리렌더링되어 theme 값이 최신으로 반영됨
5. useEffect가 실행되어 document.documentElement.dataset.theme 값도 갱신

**순서도 형식**

1. 앱 시작 / RootLayout 렌더

- RootLayout이 렌더되고 ThemeProvider로 children을 감쌈

2. Context생성(초기화)

- ThemeContext = createContext(...)가 정의되어 있음

3. Provider 인스턴스 생성

- ThemeProvider 컴포넌트가 실행되어 내부 state(theme, setTheme) 생성(useState)
- Provider의 value = {theme, toggleTheme}로 설정

4. 하위 트리 렌더링

- Provider로 감싼 children이 렌더됨. 이 하위 트리는 context에 접근 가능

5. Consumer 사용: ThemeStatus 렌더

- ThemeStatus가 렌더되어 useContext로 {theme, toggleTheme}를 가져옴

6. 사용자 상호작용: 버튼 클릭

- 사용자가 ThemeStatus의 버튼을 클릭하면 toggleTheme() 호출

7. 상태 변경 내부 처리
8. 부수효과 실행(useEffect)

- theme 변경으로 ThemeProvider의 useEffect가 실행되어 document.documentElement.dataset.theme = theme로 설정

9. 리렌더링 전파

- state 변경으로 Provider와 그 하위 Consumenr 들이 최신 value를 받아 리랜더링됨.
- ThemeStatus는 새 theme값을 받아 UI를 갱신
  10 결과: 레이아웃/스타일 반영

### Context Provider의 실행 과정

1. Context 생성(theme-provider.tsx)

- createContent(...)로 context 객체 만듦: 초기값은 provider가 없을 때 fallback값
- 이 파일 내부에서 ThemeProvider 컴포넌트 정의

* useState로 theme 상태를 관리
* toggleTheme 함수는 setTheme을 호출해 상태를 변경
* useEffect로 상태 변경 시 document.documentElement.dataset.theme에 값을 기록
* ThemeContext.Provider에 value={{theme, toggleTheme}}를 넣고 children을 감싸줌

2. Provider 배치(RootLayout)

- RootLayout에서 ThemeProvider로 루트를 감싸줌
- 이렇게하면 Provider 하위에 랜더링 되는 모든 컴포넌트들이 접근 가능

3. Consumer 사용 (theme-status.tsx)

- ThemeStatus는 'use clinet'로 클라이언트 컴포넌티이며, useContext를 사용해 value를 읽어 들임
- UI에서는 theme값을 표시하고, 버튼 클릭 시 toggleTheme()을 호출함

## 2026.11.04

### Context란 무엇인가

- React에서도 나온 개념
- Next.js에서 Context는 React의 Context API를 사용하여 컴포넌트 사이에 데이터를 공유하는 메커니즘을 의미
- 즉, 부모 컴포넌트에서 자식 컴포넌트로 직접 props를 전달하지 않고도, 특정 데이터를 필요한 컴포넌트에서 쉽게 접근하고 사용할 수 있게 도와줌

[주요 특징]

1. 전역 상태 관리

- context를 사용하면 애플리케이션 전체에서 공유해야 하는 데이터를 중앙 집중적으로 관리

2. props drilling 문제 해걀

- 컴포넌트 트리가 깊어질수록 props를 계속 전달해야하는 번거로움을 줄여줌
- context를 사용하면 필요한 컴포넌트에서 바로 데이터를 가져올 수 있으므로, 코드 가독성을 높이고 유지 보수를 용이하게 함

3. React 컴포넌트에서 사용

- Context는 React에서 제공하는 기능이기 때문에, Next.js에서도 React컴포넌트를 사용하여 구현

### server 및 client component 인터리빙

- 인터리빙(Interleaving)은 여러 데이터 블록이나 비트를 섞어서 전송하거나 처리하여 오류 발생 시 영향을 최소화하는 기술
- 특히 데이터 통신에서 버스트 오류를 줄이고 오류 정정 코드를 효과적으로 사용하기 위해 사용
- 문서에서는 server 컴포넌트와 client 컴포넌트가 섞여서 동작할 때 자주 등장하는 패턴
- server component의 prop를 client component에 전달할 수 있다.
- 이를 통해 client component 내에서 server에서 랜더링된 UI를 시각적으로 중첩
- <ClientComponent>에 공간(slot)을 만들고 children을 끼워넣는 패턴이 일방적

### server에서 client component로 데이터 전달

- props를 사용하여 server component에서 client component로 데이터를 전달할 수 있음.

- 다른 방법으로는 use Hook을 사용하여 server component에서 client component로 데이터를 스트리밍 할 수 있다.

* 직렬화란?

- 일반적으로는 메모리에 있는 복잡한 데이터를 바이트의 연속 형태로 변환하는 과정
- 자바스크립트의 객체나 배열처럼 구조가 있는 데이터를 파일로 저장하거나, 네트워크로 전송하기 쉽게 만드는 과정
- React나 Next.js는 같은 프레임워크는 컴포넌트의 상태나 트리 구조를 서버에서 직렬화 하여 클라이언트로 전송, 클라이언트에서 역직렬화 하는 과정

## 2026.10.28

### JS bundle 크기 줄이기

- UI의 큰 부분을 client component로 표시하는 대신 특정 대화형 component에 "use client"를 추가한다.
- <Search />는 사용자와의 상호작용이 바로 이루어질 가능성이 있기 때문에 Client Component로 사용하고, <Logo />는 상대적으로 중요하지 않고 이미지 등 용량이 크기 때문에 Server Component로 사용하는 것이 좋음

전체적인 실전 코드작업

###

## 2026.10.14

### client component 사용

- 파일의 맨 위, import 문 위에 "use client" 지시문을 추가하여 client component를 생성할 수 있다.
- use client는 server와 client 모듈 트리 사이의 경계를 선언하는데 사용

| 비교항목    | JSON                                   | Binary(RSC)                                                 |
| :---------- | :------------------------------------- | :---------------------------------------------------------- |
| 크기        | 크다                                   | 작다                                                        |
| 파싱 속도   | 느리다                                 | 빠르다                                                      |
| 구조 표현력 | 문자열, 숫자, 불리언, 객체, 배열, null | 이미지, 오디오, 비디오, 구조화된 컴파일 데이터 등 제한 없음 |

### next.js에서 server와 client component는 어떻게 동작하나

2. 2-2. client component의 작동

- html은 사용자에게 경로의 비대화형 미리보기를 즉시 보여주는데 사용
- RSC 페이로드는 client와 server component트리를 조정하는데 사용
- JS는 client component를 hydration하고, 애플리케이션을 대화형으로 만드는데 사용

#### Hydration이란?

- 이벤트 핸들러를 DOM에 연결하여 정적 HTML을 인터랙티브하게 만드는 React의 프로세슨

1. 2-1.server component의 작동

- next.js는 server에서 React의 API를 사용하여 렌더링을 조절
- 개별 라우팅 세그먼트 별 묶음으로 나뉨

- server component는 RSC Payload(React Server Component Payload)라는 특수한 데이터 형식으로 렌더링 된다.
- client component와 RSC Payload는 HTML을 머리 렌더링 하는데 사용된다

### Falsy

- 프로그래밍 언어, 특히 JS에서 조건문이나 논리 연산 등 Boolean 값이 필요한 맥락에서 false로 평가되는 값
- false만 아니라 다양한 false에 해당하는 값을 포괄하는 개념
- 거짓 같은 값(Falsy 혹은 falsey)은 Boolean 문맥에서 false 로 평가되는 값

(예시)

1. false: 불리언 false 값 자체
2. 0: 0은 false로 취급
3. (빈 문자열): 문자열이 비어있는 경우 false
4. null: 값이 없음을 의도적으로 명시
5. undefined: 값이 할당되지 않았을때
6. NaN: Not-a-Number, 숫자가 아님을 나타냄

### NULL 병합 연산자

- 왼쪽 피연산자가 null또는 undefined이면 오른쪽 값을 반환하고 아니면 왼쪽 반환

```JS
const [count, setCount] = useState<number>(like ?? 0)
```

### 비관적 업데이트

- 이벤트가 발행하면 먼저 서버에 요청을 보내고 성공 응답을 받은 후에만 클라이언트에 UI 업데이트

1. 장점

- 데이터 일관성 보장
- 오류가 발생할 가능성이 낮고, 잘못된 정보가 표시될 염려 없음

2. 단점

- 사용자는 서버의 응답을 기다려야한다.
-

### 낙관적 업데이트

- 사용자에 의해 이벤트가 발생하면, 서버 응답을 기다리지 않고 즉시 업데이트
- 서버에 보낸 요청의 성공을 낙관(성공한다) 가정해서 먼저 화면에 변화
- 서버에 응답이 없다면 UI RoolBack
- 네트워크 지연에도 빠르게 반응하듯 느끼게 하는것이 목적

1. 장점

- 서버 응답 속도와 관계없이 즉각적인 피드백을 제공
- 네트워크 상태가 나쁘거나 응답이 길어도 사용자에게 체감되는 속도가 빠름

2. 단점

- 서버에서 오류 발생 시 사용자에게는 잠시 잘못된 정보가 표시될 수 있습니다.
- 오류 발생 시 복구 로직이 필요

### server 및 client component를 사용하는 시기

1. client component

- state, event handler, onClick, onChange
- Lifecycle logic -> useEffect
- 브라우저 전용 api -> localStorage, window, Navigator.geolocation 등
- 사용자 정의 Hook

2. server component

- 서버의 데이터베이스 혹은 api에서 data를 가져오는 경우
- API key, token 및 기타 보안 데이터를 client에 노출하지 않고 사용
- 브라우저로 전송되는 JS의 양을 줄이고 싶을 때
- 콘텐츠가 포함된 첫 번째 페인트(First Contentful Paint-FCP)를 개선하고 콘텐츠를 client에 점진적으로 스트리밍 할 때

## 2026.10.7

### 네이티브 히스토리 API

- next.js를 사용하면 기본 window.history.pushState 및 window.history.replaceState

### await이 없어도 async를 붙여두는 이유

- Next.js 13+의 App Router에서 page.tsx 같은 Server Component는 비동기 렌더링을 전제로 하고 있습니다.
- 즉, page.tsx안에서 데이터를 fetch 하는 경우가 많기 때문에 async를 기본으로 붙여도 전혀 문제가 없습니다.

1. 일관성 유지: 같은 프로젝트 안에서 어떤 페이지는 async, 어떤 페이지는 일반 fucntion이면 혼란스러울 수 있습니다.
2. 확장성: 지금은 더미 데이터(posts.find(...))을 쓰지만, 나중에 DB나 API에서 데이터를 가져올 때 await fetch(...) 같은 코드가 들어갈 수 있기 때문에, 미리 async를 붙여두면 수정할 필요가 없습니다
3. React Server Component 호환성: Server Component는 Promise를 반환할 수 있어야 하고, Next.js는 내부적으로 async함수 패턴에 맞춰 최적화된 렌더링 파이프라인을 갖고 있어서 async가 붙어있어도 불필요한 오버헤드가 거의 없습니다.

### generateStaticParams를 사용하는 경우 실습

- 빌드 시점에 Next.js가 app/blog/[slug]/page.tsx 같은 동적 라우트를 찾으면 generateStaticParams()를 실행합니다.

### 일반 함수와 객체 구조 분해 할당 매개 변수 처리

```ts
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
});
```

- 첫 번째 {params,}는 실제로 받을 값을 구조 분해 할당하는 부분
- 두 번째 {params:Promise<{slug:string}>}는 TS에서 위의 매개변수 params의 타입을 설명하는 부분
- slug: string은 객체 중 slug의 값이 문자열이라는 의미
- Promise로 이 객체를 감싸고 있는것은 나중에 이런 형태로 prop을 전달하겠다는 의미
- params가 Promise이기 떄문에 아래 코드에서 await params로 받을 수 있는 것입니다.

## 2026.09.30

### prefetching

- 경로의 어느 정도를 프리페칭할지는 정적 경로인지 동적 경로인지에 따라 달라집니다.

1. 정적 경로: 전체 경로가 프리페치 됩니다.
2. 동적 경로: 프리페치를 건너뛰거나, loding.tsx.가 있는 경우 경로가 부분적으로 프리페칭 됩니다

### 서버 렌더링

1. 정적 렌더링은 빌드 시점이나 재검증 중에 발생하며, 결과는 캐시 됩니다.
2. 동적 렌더링은 클라이언트 요청에 대한 응답으로 요청 시점에 발생합니다.

- 서버 렌더링의 단점은 클라이언트가 새 경로를 표시하기 전에 서버의 응답을 기다려야 한다는 것입니다.

### Route 방식 비교

1. 중첩 레이아웃: 어러 레벨의 layout.js 파일을 통해 레이아웃을 계층적으로 구성 가능
2. 서버 컴포넌트(RSC) 서버에서만 렌더링되는 컴포넌트로 성능 최적화 가능
3. 로딩 UI: 페이지 전환 중 보여줄 loading.js파일 제공
4. 에러 UI: 특정 경로에서만 발생하는 에러를 처리할 error.js 제공
5. 병렬 라우팅:하나의 경로 안에서 탭같은 독립적인 뷰를 병렬로 렌더링 가능

## 2026.09.23

### Link Component

### nested route(중첩 라우트)

- **정의**: 다중 URL 세그먼트로 구성된 라우트.

* 예시: /blog/[slug] 경로는 세 개의 세그먼트로 구성된다.

1. / (Root Segment)
2. blog (Segment)
3. [slug] (Leaf Segment)

- **Nest.js**: 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 정의하는데 사용된다.

## 2026.09.16

### await

```ts
export default async function BlogPage(){
    await new Promise((resolve) => setTimeout(resolve, 3000));//3초 대기
    return()
}
```

### next layout 순서

1. app>layout.tsx
2. marketing>layout.tsx
3. blog&&about>layout.tsx

- **정의**: {children}은 하위 있는 모든 children을 가져온다.

### 비공개 폴더 (Private Folders)

- **정의**: 폴더 이름 앞에 밑줄(`_`)을 붙여 생성합니다. (예: `_folderName`)
- **특징**: 해당 폴더가 **내부 구현 세부 사항**임을 나타내며, 라우팅 시스템에서 완전히 제외됩니다. 하위 폴더 역시 라우팅되지 않습니다.

### 경로 및 URL 매핑 (Path to URL)

| Path                        | URL             | Pattern & Notes                           |
| :-------------------------- | :-------------- | :---------------------------------------- |
| `app/layout.tsx`            | —               | 모든 경로를 감싸는 **Root layout**        |
| `app/blog/layout.tsx`       | —               | `/blog` 및 그 하위 경로를 감싸는 레이아웃 |
| `app/page.tsx`              | `/`             | 공개(Public) 루트 페이지                  |
| `app/blog/page.tsx`         | `/blog`         | 공개(Public) 블로그 메인 페이지           |
| `app/blog/authors/page.tsx` | `/blog/authors` | 공개(Public) 작가 목록 페이지             |

---

## 2026.09.09 | 폴더 및 파일 컨벤션

### 폴더 규칙

- **동적 라우팅 (Dynamic Routes)**: 대괄호(`[segment]`)를 사용하여 세그먼트를 매개변수화(Parameterize)합니다.

### 파일 특수 규칙 (File-Folder Rule)

| File Name          | Extension             | Role                                               |
| :----------------- | :-------------------- | :------------------------------------------------- |
| **`layout`**       | `.js`, `.jsx`, `.tsx` | 상태를 유지하고 리렌더링을 방지하는 레이아웃 UI    |
| **`page`**         | `.js`, `.jsx`, `.tsx` | 경로의 고유한 UI를 나타내는 페이지                 |
| **`loading`**      | `.js`, `.jsx`, `.tsx` | 데이터 로딩 중에 표시되는 UI (Skeletons 구조 활용) |
| **`not-found`**    | `.js`, `.jsx`, `.tsx` | 404 Not Found UI                                   |
| **`error`**        | `.js`, `.jsx`, `.tsx` | 해당 세그먼트와 하위 세그먼트의 에러 핸들링 UI     |
| **`global-error`** | `.js`, `.jsx`, `.tsx` | 전역(Root) 에러 핸들링 UI                          |
| **`route`**        | `.js`, `.ts`          | API 엔드포인트 생성                                |
| **`template`**     | `.js`, `.jsx`, `.tsx` | 새 네비게이션 시 항상 다시 렌더링되는 레이아웃     |
| **`default`**      | `.js`, `.jsx`, `.tsx` | 병렬 라우트(Parallel Routes)의 폴백 페이지         |

> **Skeletons 이란?**
> 사용자가 페이지 로딩을 인지하고 기대할 수 있도록 미리보기 형태로 보여주는 로딩 UI입니다. (예: 뉴스 홈 화면에서 실제 콘텐츠가 채워지기 전, 규격에 맞춰 빈 칸이나 회색 박스를 띄워두는 방식)

- tsconfig.json

```ts
    "paths":{
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"]
    }
    //baseUrl의 경우 "ignoreDeprecations": "6.0"이 없으면 빨간줄. 오류가 생기는건 아니나 추후 삭제될 코드
    "ignoreDeprecations": "6.0",
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
```

## gitignore 정보 확인용

- https://www.toptal.com/developers/gitignore/
