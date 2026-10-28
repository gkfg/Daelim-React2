# 202230336 최주형

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
